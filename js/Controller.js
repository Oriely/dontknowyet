
function login(e, form) {
    e.preventDefault();
    
    let email = form['login-email'].value
    let password = form['login-password'].value;
   
    if(!email || !password) {
        error = 'Type in email and password';
    }
   
    if (email && password) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((user) => {
            // Signed in 
            // ...
            })
            .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;

            error = errorMessage;
            updateScreen();
            });

    console.log(email);
    console.log(password);


    } else {

    }
    
    updateScreen();
}

function signout() {

    firebase.auth().signOut().then(() => {
        updateScreen();
    // Sign-out successful.
    }).catch((error) => {
        alert(error);
    });

    updateScreen();
}

function register(e, form) {
    e.preventDefault();

    let email = form['register-email'].value;
    let password = form['register-password'].value;

    if(!validateEmail(email)) { errorHandler('Thats not a valid email address'); return false;}

    if(password.length < 8) { errorHandler('Passwords has to be 8 characters long or more'); return false;}
    
    if(validateEmail(email) && password.length >= 8) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((user) => {
            // Signed in 
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            // ..
        });
    }
    updateScreen();
}

function addTodo() {
    if (!model.inputs.todo_new.title || !model.inputs.todo_new.content || !model.inputs.todo_new.category) {
        errorHandler(4);

    } else {    
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // Add a new document with a generated id.
                db.collection("todos").doc(user.uid).collection('ongoing').add({
                    id: genId(),
                    date_created: Date.now(),
                    date_edited: '',
                    date_finished: '',
                    title: model.inputs.todo_new.title,
                    content: model.inputs.todo_new.content,
                    priority: model.inputs.todo_new.category,
                    completed: false
                })
                
                .then(function(docRef) {
                    console.log("Document written with ID: ", docRef.id);
                })
                .catch(function(err) {
                    console.error("Error adding document: ", err);
                    console.log(user.uid)
                    error = err;
                });
            
                updateScreen();
            }
        });
    }



    updateScreen();

}


function editTodo(id) {
    firebase.auth().onAuthStateChanged((user) => {

        if (user) {
            let date = new Date();

            selectedToEdit = id;
        
            if (input_title_edit == '' && input_content_edit == '') {
                input_title_edit = getValueOf(id, 'title');
                input_content_edit = getValue(id, 'title');
            }
        
            if (mode == 'edit' && id == selectedToEdit) {
        
        
            } else {
                mode = "edit"
            }
        
        
            updateScreen();
        } else {

        }
    });
}

function completeTodo() {
    mode = '';
    selectedToEdit = '';
    let completed = getValueOf(id, 'completed');
    

    if (completed === false) {

    } else {console.log(completed);}
    updateScreen();
}

function removeTodo() {

    updateScreen();
}

function changeViewmode(p) {
    model.app.todo_viewmode = p;
    updateScreen() 
}

function changeScreen(p) {
    model.app.on_page = p;
    updateScreen();
}

function selectCategory(a, b) {
    model.inputs.todo_new.category = model.app.todo_categories[b].name
    updateScreen();
}

function validateEmail(email) {

    let mailregex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(email.match(mailregex)) {
        return true;
    } else false;
}