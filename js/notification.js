(async () => {
    // place js code here
    const notifyAll = document.getElementById('notify-button');
    const checkPermission = document.getElementById('check-button');
    const clearAll = document.getElementById('clear-button');

    // To Clear up notifications
    let displayedNotifications = [];

   // Event handlers
    notifyAll.addEventListener( 'click', () => {
        let granted = checkForNotificationPermission();
        
        // show notification or the error message 
        granted ? showNotification() : showError();
    } );

    checkPermission.addEventListener( 'click', () => {
        checkForNotificationPermission();
	});

    clearAll.addEventListener('click', () => {
        displayedNotifications.forEach((not) => {
            not.close();
        });
    });

    // Functions
    const checkForNotificationPermission = async () => {
        let granted = false;

        if (Notification.permission === 'granted') {
            granted = true;
        } else if (Notification.permission !== 'denied') {
            let permission = await Notification.requestPermission();
            granted = permission === 'granted' ? true : false;
        }
        console.log("Permission Granted Status: " + granted);
        return granted;
    };

    // create and show a basic notification
    const showNotification = () => {

        loadCombinedImage((combinedImageSrc) => {

                console.log('CombinedImage src: ' + combinedImageSrc);

                // create a new notification
                const notification = new Notification('Teams Call', {
                    image: combinedImageSrc,
                    // image:'data:image/gif;base64,R0lGODlhyAAiALM...DfD0QAADs=',
                    // image: 'blob:https://javascript.info/1e67e00e-860d-40a5-89ae-6ab0cbee6273',
                    // body: 'This is a JavaScript Notification API demo',
                    // icon: combinedImageSrc
                    // vibrate: true
                });

                displayedNotifications.push(notification);

                // navigate to a URL
                notification.addEventListener('click', () => {
                    window.open('https://teams.microsoft.com', '_blank');
                });
        });
    }
   
    // show an error message
    const showError = () => {
        const error = document.querySelector('.error');
        error.style.display = 'block';
        error.textContent = 'You blocked the notifications';
    }
    
 })();