
function login(e, form) {
    e.preventDefault();
    
    if(firebase.auth().onAuthStateChanged((user) => {
        if(!user) {
            clearErrors();

            let email = form['login-email'].value
            
            let password = form['login-password'].value;
        
            if(!email || !password) {
                errorHandler('Please type in email and password.'); 
            }
        
            if (email && password) {
                firebase.auth().signInWithEmailAndPassword(email, password)
                    .then((user) => {
                        
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;

                        errorHandler(fbErrors[errorCode]);

                        updateScreen();

                    
                    });
            } else {

            }
        }
    }))
    
    updateScreen();
}

function signout() {
    firebase.auth().onAuthStateChanged((user) => {
        if(user) {
            clearErrors();

            firebase.auth().signOut().then(() => {
                
                updateScreen();

            }).catch((error) => {
                alert(error);
            });

            updateScreen();
        }
    });
}



function register(e, form) {
    
    e.preventDefault();
    
    if(!e || !form) {
        return false;
    }

    firebase.auth().onAuthStateChanged((user) => {
        if(!user) {
            clearErrors();

            const username = form['register-username'].value.toLowerCase();
            const email = form['register-email'].value.toLowerCase();
            const password = form['register-password'].value;
            const password_comf = form['register-password-comf'].value;
            const firstname = form['register-firstname'].value.toLowerCase();
            const lastname = form['register-lastname'].value.toLowerCase();
        
            if(password_comf != password) { errorHandler('Comfirm password is not same as password.') }
        
            if (!firstname || !lastname) { errorHandler('You need to type in your first and last name.')} 
        
            if(!username) {errorHandler('You need to type in a username')}
        
            if(!validateEmail(email)) { errorHandler('Thats not a valid email address');}
            
            if(!password) { errorHandler('Please type in a password and comfirm it.')}
        
            if(password.length < 8) { errorHandler('Passwords has to be 8 characters long or more'); }

            if(validateEmail(email) && password.length >= 8 && firstname && lastname && password_comf === password) {
                firebase.auth().createUserWithEmailAndPassword(email, password)
                .then((response) => {
                    const uid = response.user.uid
                    const user_data = {
                        id: uid,
                        username: username,
                        firstname:  firstname.toLowerCase(),
                        lastname: lastname.toLowerCase(),
                        groups: ['user'],
                        email,
                        date_registered: Date.now()
                    }
                    db.collection('users')
                        .doc(uid)
                        .set(user_data)
                        .catch((error) => {
                            console.log(error);
                        })
        
                    const default_settings = {
                        language: 'en',
                        todo_categories: [
                            {
                                name: 'work',
                                color: 'red'
                            },
                            {
                                name: 'personal',
                                color: 'red'
        
                            },
                            {
                                name: 'random',
                                color: 'blue'
                            }
        
                        ],
                    };
        
                    db.collection('user_settings')
                        .doc(uid)
                        .set(default_settings)
                        .catch((err) => {
                            console.log(err);
                        })
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;

                    errorHandler(fbErrors[errorCode]);

                    updateScreen();

                    
                });
            }

            updateScreen();
            
        }
    });

}

function addTodo() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                clearErrors();

                if (!model.inputs.todo_new.title || !model.inputs.todo_new.content || !model.inputs.todo_new.category) {
                    errorHandler('eh');
                } else {   
                    // Add a new document with a generated id.
                    db.collection("todos").doc(user.uid).collection('ongoing').add({
                        date_created: Date.now(),
                        date_edited: '',
                        date_finished: '',
                        title: model.inputs.todo_new.title,
                        content: model.inputs.todo_new.content,
                        category: model.inputs.todo_new.category,
                        completed: false
                    })    
                    .then(function(docRef) {
                        response = 'Successfully added todo.'
                        updateScreen();
                    })
                    .catch(function(err) {

                    });
                
                    updateScreen();
                }
        }
    });

    updateScreen();
}


function editTodo(id) {
    firebase.auth().onAuthStateChanged((user) => {

        if (user) {
            clearErrors();
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
    clearErrors();
    updateScreen();
}

function removeTodo(todo_id) {
    clearErrors();
    firebase.auth().onAuthStateChanged( function (user) {
        if(user) {
            const uid = user.uid; 
            db.collection('todos').doc(uid).collection('ongoing').doc(todo_id)
            .delete()
            .then(function() {
                console.log('successfully removeTodo')
            })
            .catch(err   => {
                console.log(err);
            })
        }
    });
    updateScreen();
}

function changeViewmode(p) {
    model.app.todo_viewmode = p;
    updateScreen() 
}

function changeScreen(page) {
    clearErrors();
    
    if (!model.app.pages.includes(page)) {alert('something');  false} else { model.app.on_page = page; }

    updateScreen();
}

function selectCategory(selected_category) {
    model.inputs.todo_new.category = selected_category;
    updateScreen();
}

function validateEmail(email) {

    const mailregex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(email.match(mailregex)) {
        return true;
    } else false;

}

function createNewCategory(cat_name, cat_color) {
    firebase.auth().onAuthStateChanged(function (user){
        if(user) {
            db.collection('user_settings').doc(user.uid).update({
                todo_categories: firebase.firestore.FieldValue.arrayUnion({
                    name: cat_name,
                    color: cat_color
                })
            })
        }
    })
}

function removeCategory(cat_name, cat_color) {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            db.collection('user_settings').doc(user.uid).update({
                todo_categories: firebase.firestore.FieldValue.arrayRemove({
                    name: cat_name,
                    color: cat_color
                })
            })
        }
    })
}