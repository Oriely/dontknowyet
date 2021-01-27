
function updateScreen() {

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            db.collection('todos').doc(user.uid).collection('ongoing')
            .onSnapshot(function(querySnapshot) {
                model.tmpHTML.todos = '';
                querySnapshot.forEach(function(doc) {
                    // doc.data() is never undefined for query doc snapshots
                    model.tmpHTML.todos += todoCreateHTML(doc.data(), doc.id);
                });
            })
            
            db.collection('user_settings').doc(user.uid).get().then(function (doc) {
                console.log(doc.data());
            });

            mainScreen();

            if (model.app.on_page == 'config') {
                configScreen();
            }
        
            if (model.app.on_page == 'main') {
                mainScreen();
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