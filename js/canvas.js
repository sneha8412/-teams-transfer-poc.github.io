const top_padding = 10;
const left_padding = 16;
const transferred_by_description_x = 12;
const padding_top_circle = 15;

const transferred_by_radius = 25;
const transferred_by_center_x = left_padding + transferred_by_radius;
const transferred_by_center_y = top_padding + transferred_by_radius;

const transferred_by_caller_distance = 16;
const caller_radius = 50;
const caller_center_x = left_padding + caller_radius;
const caller_center_y = transferred_by_center_y + transferred_by_radius + transferred_by_caller_distance + caller_radius;

let font_color;
navigator.userAgentData.getHighEntropyValues(['platformVersion']).then(uapv => {
  win_version = uapv.platformVersion.split(".")[0];
  // win 10 has white default font for notifications
  if(win_version <= 10)
    font_color = "#ffffff"
});

const caller_canvas_id = "myCanvas";
const transferred_canvas_id = "canvas";
const composite_canvas_id = "composite";
const combined_canvas_id = "combined";

// Hero image is 364x180 px
function onLoadTransferredByImage(image, canvas_id)
{
    let transferredByCanvas = document.getElementById(canvas_id);
    const ctx = transferredByCanvas.getContext('2d');
    ctx.save();
    //For a circle 
    ctx.beginPath();

    //The arc is given an x-coordinate of 65, a y-coordinate of 95, 
    //and a radius of 25. To make a full circle, the arc begins at an angle of 0 radians (0°),
    //and ends at an angle of 2π radians (360°).
    ctx.arc(transferred_by_center_x, transferred_by_center_y, transferred_by_radius, 0, 2 * Math.PI);
    ctx.strokeStyle = '#2465D3';
    ctx.stroke();
    ctx.clip();
    ctx.drawImage(image, -20, -10);
    ctx.restore();

   // ctx.fill();
    ctx.font = '14px system-ui';
    ctx.fillStyle = font_color;
    ctx.fillText('Transferred by', left_padding + 2*transferred_by_radius+transferred_by_description_x, top_padding + padding_top_circle);
    ctx.fillStyle = font_color+'80';
    ctx.fillText('Contoso Reception', left_padding + 2*transferred_by_radius+transferred_by_description_x, top_padding + padding_top_circle + 16, 300);
};

function onLoadCallerImage(img, canvas_id)
{
    // circle canvas' reference myCanvas
    let callerCanvas = document.getElementById(canvas_id);

    let circleCtx = callerCanvas.getContext('2d');
    // draw image with circle shape clip
    circleCtx.save();
    circleCtx.beginPath();
    circleCtx.arc(caller_center_x, caller_center_y, caller_radius, 0, Math.PI * 2, false);
    circleCtx.strokeStyle = '#2465D3';
    circleCtx.stroke();
    circleCtx.clip();
    circleCtx.drawImage(img, 0, 60);
    circleCtx.restore();
    
    circleCtx.fillStyle = font_color;
    circleCtx.font ='bold 14px system-ui';
    circleCtx.fillText('Jane Smith Calling', caller_center_x+caller_radius+transferred_by_description_x , caller_center_y - caller_radius + 2*padding_top_circle, 300); 
};


/**
 * Load an image from a given URL
 * @param {String} url The URL of the image resource
 * @returns {Promise<Image>} The loaded image
 */
 function loadImage(url, canvas_id, onImageLoadCallback) {
    /*
     * We are going to return a Promise which, when we .then
     * will give us an Image that should be fully loaded
     */
    return new Promise(resolve => {
      /*
       * Create the image that we are going to use to
       * to hold the resource
       */
      const image = new Image();
      /*
       * The Image API deals in even listeners and callbacks
       * we attach a listener for the "load" event which fires
       * when the Image has finished the network request and
       * populated the Image with data
       */
      image.addEventListener('load', () => {
        /*
         * You have to manually tell the Promise that you are
         * done dealing with asynchronous stuff and you are ready
         * for it to give anything that attached a callback
         * through .then a realized value.  We do that by calling
         * resolve and passing it the realized value
         */
        onImageLoadCallback(image, canvas_id);
        resolve(image);
      });
      /*
       * Setting the Image.src is what starts the networking process
       * to populate an image.  After you set it, the browser fires
       * a request to get the resource.  We attached a load listener
       * which will be called once the request finishes and we have
       * image data
       */
      image.src = url;
    });
  }
  
  /*
   * To use this we call the loadImage function and call .then
   * on the Promise that it returns, passing a function that we
   * want to receive the realized Image
   */
function loadCombinedImage(onCombinedImageLoaded){

  Promise.all([
      loadImage('./img/pika-128.png', transferred_canvas_id, onLoadTransferredByImage), 
      loadImage('./img/red-icon.png', caller_canvas_id, onLoadCallerImage)]).then( (values) => {

    console.log('Transferred By and Caller Images loaded. Trying to render combined image.')

    let final_img = document.getElementById('combined');
    final_img.addEventListener('load', () => {
        onCombinedImageLoaded(final_img.src);
    });

    createCombinedImage();
  });
}

function createCombinedImage(){
  // Combined Canvas
  let img1 = new Image();
  let img2 = new Image();
  let transferred_by_canvas = document.getElementById(transferred_canvas_id);
  let caller_canvas = document.getElementById(caller_canvas_id);
  function imgLoadedCallback(image) {
    let buffer = document.getElementById("composite");
    let buffer_context = buffer.getContext("2d");
    buffer_context.drawImage(image, 0, 0);
  }
  Promise.all([
    loadImage(transferred_by_canvas.toDataURL("image/png"), composite_canvas_id, imgLoadedCallback),
    loadImage(caller_canvas.toDataURL("image/png"), composite_canvas_id, imgLoadedCallback)
  ]).then(values => {
      let buffer_image = new Image();
      let buffer = document.getElementById("composite");
      buffer_image.src = buffer.toDataURL("image/png");
      let final_img = document.getElementById('combined');
      final_img.src = buffer.toDataURL("image/png");
  })
};

loadCombinedImage((combinedImageSource) => { console.log('On Combined Image Loaded. Combined ImageSrc:' + combinedImageSource) });