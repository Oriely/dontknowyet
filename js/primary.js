
function updateScreen() {

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {

            mainScreen();

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