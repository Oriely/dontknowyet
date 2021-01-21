
if(window.innerWidth <= 700) {
    model.app.mobile = true; 
    model.app.todo_viewmode = 'list';
}

window.addEventListener('resize',function (e) {
    if (window.innerWidth <= 700) {
        model.app.mobile = true; 
        updateScreen();
    } else {
        model.app.mobile = false; 
        updateScreen();
    }

});
function updateScreen() {
    if (!model.app.pages.includes(model.app.on_page)) {alert('something'); return}

    firebase.auth().onAuthStateChanged((user) => {

        if (user) {
            mainScreen();
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            var uid = user.uid;
            // ...
            if (model.app.on_page == 'config') {
                configScreen();
            }
        
            if (model.app.on_page == 'main') {
                mainScreen();
            }
            if(!model.app.on_page) {
                mainScreen();
        
            }
        } else {
            if (model.app.on_page == 'login') {
                loginScreen();
            }
        
            if (model.app.on_page == 'register') {
                registerScreen();
            }
        }
    });




    



    
}

updateScreen();     