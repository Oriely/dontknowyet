
function updateScreen() {
    if (!model.app.pages.includes(model.app.on_page)) {alert('something'); return}
    
    firebase.auth().onAuthStateChanged((user) => {
        

        if (user) {
                                


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