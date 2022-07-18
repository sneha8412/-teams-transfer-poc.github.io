   //===============Teams Repro================================
    

    // step 2- use either blob uri or data uri to reference the image that we created in JS
    // step 3- Pass the blob uri or data uri as input to shownotification function using it as an icon or image for notification options.
    // step 4- Create and show notification for teams
    // function showCallForwardedNotification(transferredByName, transferredByImage, callerName, callerImage){} 


    //======Experiments=======================================
    //=========Try out basic canvas API===================================

    //Step 1- Create/render a new image using the above function parameters and 2D canvas API. 

    const transferredByCanvas = document.getElementById('canvas');
    const ctx = transferredByCanvas.getContext('2d');

    const image = new Image();
  
    image.onload = function() {
        ctx.save();
        //For a circle 
        ctx.beginPath();

        //The arc is given an x-coordinate of 100, a y-coordinate of 75, 
        //and a radius of 25. To make a full circle, the arc begins at an angle of 0 radians (0°),
        //and ends at an angle of 2π radians (360°).
        ctx.arc(65,95, 25, 0, 2 * Math.PI);
        ctx.strokeStyle = '#2465D3';
        ctx.stroke();
        ctx.clip();
        ctx.drawImage(image, 10, 50);
        ctx.restore();

       // ctx.fill();
        ctx.font = '20px serif';
        ctx.fillText('Transferred by', 99, 95);
        ctx.fillText('Contoso Reception', 110, 130, 300);

        //loadCombinedImage();
    };
        image.src = './img/pika-128.png';

    //===========USE THE CREATE BITMAP IMAGE function==============================
    //solution works

    // circle canvas' reference
    let callerCanvas = document.getElementById('myCanvas');
    let circleCtx = callerCanvas.getContext('2d');
  
    const img = new Image();
  
    img.onload = function() {
      // draw image with circle shape clip
      circleCtx.save();
      circleCtx.beginPath();
      circleCtx.arc(85, 45, 40, 0, Math.PI * 2, false);
      circleCtx.strokeStyle = '#2465D3';
      circleCtx.stroke();
      circleCtx.clip();
      circleCtx.drawImage(img, 20, 0);
      circleCtx.restore();

      circleCtx.font ='20px serif';
      circleCtx.fillText('Jane Smith Calling', 135 , 50, 300); 

      //loadCombinedImage();
    };
  
    img.src = './img/red-icon.png';

    function loadCombinedImage(){
        // Combined Canvas
        let img1 = new Image();
        img1.src = transferredByCanvas.toDataURL("image/png");
        let img2 = new Image();
        img2.src = callerCanvas.toDataURL("image/png");

        let buffer = document.getElementById("composite");
        let buffer_context = buffer.getContext("2d");
        buffer_context.drawImage(img1, 0, 0);
        buffer_context.drawImage(img2, 0, 0);

        let buffer_image = new Image();
        buffer_image.src = buffer.toDataURL("image/png");

        let final_img = document.getElementById('combined');
        final_img.src = buffer_image.src;
    };


  //==================Convert canvas element to data URI ============================================================

    // let circleCanvas = document.getElementById('myCanvas');

    // // Convert canvas to dataURL and log to console
    // const dataURL = circleCanvas.toDataURL();
    // console.log(dataURL);
    // // Logs data:image/png;base64,wL2dvYWwgbW9yZ...

    // const getBase64StringFromDataURL = (dataURL) =>
    // dataURL.replace('data:', '').replace(/^.+,/, '');

    // // Convert to Base64 string
    // const base64 = getBase64StringFromDataURL(dataURL);
    // console.log(base64);
    
    // // Logs wL2dvYWwgbW9yZ...

    // // use this data URL as an image url inside the notification

//================Convert image to canvas element to data URI==================================================
// https://www.tutorialspoint.com/convert-image-to-data-uri-with-javascript

// function getDataUrl(img) {
//     // Create canvas
//     const pikaCanvas = document.createElement('pika-canvas');
//     const ctx = pikaCanvas.getContext('2d');
//     // Set width and height
//     pikaCanvas.width = img.width;
//     pikaCanvas.height = img.height;
//     // Draw the image
//     ctx.drawImage(img, 0, 0);
//     return pikaCanvas.toDataURL('pika-image/jpeg');
//  }
//  // Select the image
//  const img = document.getElementById('image-pika');
//  img.addEventListener('load', function (event) {
//     const  dataUrl = getDataUrl(event.currentTarget);
//     console.log(dataUrl);
//  });

// =====================TRY out canvas with image=========================================
    // let canvas = document.getElementById('myCanvas');
    // ctx = canvas.getContext('2d');
    // let centerX = canvas.width;
    // let centerY = canvas.height;
    // let radius = 30;
    // ctx.beginPath();
    // ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, true);
    // ctx.clip();

    // //create an instance of the image
    // image = new Image();

    // //What to do when the image is loaded
    // image,addEventListener('load', function(e){
    //     //draw an image
    //     ctx.drawImage(image, 0, 0, 200, 300);
    // }, true);
   
    // // Load the image file (can be data URL here instead of the image from folder)
    // image.src = './img/catthumb.png';

//--------------Try out the face thumbnail on circular canvas-----------------------------------------
  //SOLUTION WORKS
  //const imageSrc = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/157293/i1.jpg';
  
//   document.addEventListener("DOMContentLoaded", () => {

//     // circle canvas' reference
//     let circleCanvas = document.getElementById('myCanvas')
//     let circleCtx = circleCanvas.getContext('2d')
  
//     const img = new Image();
  
//     img.onload = function() {
//       // draw image with circle shape clip
//       circleCtx.save()
//       circleCtx.beginPath()
//       circleCtx.arc(100, 75, 25, 0, Math.PI * 2, false)
//       circleCtx.strokeStyle = '#2465D3'
//       circleCtx.stroke()
//       circleCtx.clip()
//       circleCtx.drawImage(img, 36, 35)
//       circleCtx.restore()
//     };
  
//     img.src = './img/red-icon.png';
//   });


