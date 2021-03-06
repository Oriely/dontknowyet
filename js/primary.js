firebase.auth().onAuthStateChanged((user) => {
    if(user) {
        if(model.app.on_page == '') {model.app.on_page = 'main'}
        getData(user.uid);
    }
    if(!user) {
        if(model.app.on_page == '') {model.app.on_page = 'login'}
        
        updateScreen();
    }
});


function updateScreen() {
    if(errors.length != 0) {
        errors.forEach((err) => {
            error += err + '<br>';
        });
    }

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
        
            mainScreen();

        
            if (model.app.on_page == 'main') {
                mainScreen();
            }

            if (model.app.on_page == 'history') {
                historyScreen();
            }

            if (model.app.on_page == 'chat') {
                chatScreen();
            }

            if (model.app.on_page == 'config') {
                configScreen();
            }

            if (model.app.on_page == 'profile') {
                profileScreen();
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
