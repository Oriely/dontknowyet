
function login(e, form) {
    e.preventDefault();
    clearErrors();
    firebase.auth().onAuthStateChanged((user) => {
        if(!user) {
            if (debounce) return;
            debounce = true;
            let email = form['login-email'].value
            
            let password = form['login-password'].value;
        
            if (email && password) {
                firebase.auth().signInWithEmailAndPassword(email, password)
                    .then((user) => {
                        model.app.on_page = 'main';
                        debounce = false;
                        
                    })
                    .catch((error) => {
                        console.log('error')
                        console.log(error)
                        const errorCode = error.code;
                        errorHandler((fbErrors[errorCode] ? fbErrors[errorCode] : error));// TODO fiks
                        debounce = false;

                        updateScreen();
                    });
            } else {
                errorHandler('Please type in email and password.');
                updateScreen();
            }
        }
    });
    
}


function signout() {
    clearErrors();
    firebase.auth().signOut();
    model.app.on_page = '';
    clearModel();
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
        
            if(!username) {errorHandler('You need to type in a username')}
        
            if(!validateEmail(email)) { errorHandler('Thats not a valid email address');}
            
            if(!password) { errorHandler('Please type in a password and comfirm it.')}
        
            if(password.length < 8) { errorHandler('Passwords has to be 8 characters long or more'); }
            
            updateScreen();

            if(validateEmail(email) && password.length >= 8 && password_comf === password) {
                if (debounce) return;
                debounce = true;
                firebase.auth().createUserWithEmailAndPassword(email, password)
                .then((response) => {
                    const uid = response.user.uid
                    const user_data = {
                        id: uid,
                        username: username,
                        firstname:  firstname.toLowerCase(),
                        lastname: lastname.toLowerCase(),
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
                                color: 'green'
        
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
                        });
                    debounce = false;
                    model.app.on_page = 'main';
                })
                .catch((error) => {
                    debounce = false;
                    const errorCode = error.code;
                    console.log('asdasd')
                    console.log(error.message)
                    console.log(error.code)
                    errorHandler(fbErrors[errorCode]);
                    updateScreen();
                });
            }
        }
    });
}

function addTodo() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                clearErrors();

                if (!model.inputs.todo_new.title || !model.inputs.todo_new.content || !model.inputs.todo_new.category) {
                    errorHandler('Please type in something.');
                    updateScreen();
                } else {  
                    if (debounce) return;
                    debounce = true;
                    // Add a new document with a generated id.
                    db.collection("todos").doc(user.uid).collection('ongoing').add({
                        date_created: Date.now(),
                        date_edited: '',
                        date_completed: '',
                        title: model.inputs.todo_new.title,
                        content: model.inputs.todo_new.content,
                        category: model.inputs.todo_new.category,
                        completed: false
                    })    
                    .then(function(docRef) {
                        response = 'Successfully added todo.'
                        model.inputs.todo_new.title = '';
                        model.inputs.todo_new.content = '';
                        model.inputs.todo_new.category = '';
                        getData(user.uid);
                        debounce = false;
                    })
                    .catch(function(err) {
                        deounce = false;
                        errorHandler(err);
                        updateScreen();
                    });
                }
        }
    });
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
        
        
            getData(user.uid);
        } else {

        }
    });
}

function completeTodo(key) {

    clearErrors();

    let data;

    firebase.auth().onAuthStateChanged(function (user) {
        const uid = user.uid;
        if (user) {

            if(key) { 
                if(debounce) return;
                debounce = true;
                data = model.data.user.todos.ongoing[key];

                data.date_completed = Date.now();
    
                db.collection("todos").doc(uid).collection('ongoing').doc(key).delete().then(function(){}).catch(function(error) {

                });
    
                db.collection("todos").doc(user.uid).collection('completed').add(data)    
                .then(function(docRef) {
                    response = 'Nice! you completed a todo.';
                    debounce = false;
                })
                .catch( (err) => {
                    debounce = false;
                });
    
                
                getData(uid);
            }
        }
    });
            
}

function removeTodo(todo_id,) {
    clearErrors();
    firebase.auth().onAuthStateChanged( function (user) {
        if(user) {
            if(debounce) return;
            debounce = true;
            const uid = user.uid; 
            db.collection('todos').doc(uid).collection('ongoing').doc(todo_id)
            .delete()
            .then(function() {
                console.log('successfully removeTodo');
                debounce = false;
                getData(uid);
            })
            .catch(err   => {
                console.log(err);
                debounce = false;
            })

    
        }
    });
}

function removeCompletedTodo(todo_id,) {
    clearErrors();
    firebase.auth().onAuthStateChanged( function (user) {
        if(user) {
            if(debounce) return;
            debounce = true;
            const uid = user.uid; 
            db.collection('todos').doc(uid).collection('completed').doc(todo_id)
            .delete()
            .then(function() {
                getData(uid);
                debounce = false;
            })
            .catch(err   => {
                console.log(err);
                debounce = false;
            })

    
        }
    });
}

function changeViewmode(p) {
    model.app.todo_viewmode = p;
    updateScreen();
}

function changeScreen(page) {
    clearErrors();
    response = '';
    if (!model.app.pages.includes(page)) {alert('Page not found');  false} else { model.app.on_page = page; }

    // firebase.auth().onAuthStateChanged(user => {
    //     if(user) {
    //         getData(user.uid)
    //     } else {
            updateScreen();
    //     }
    // });
}

function selectCategory(selected_category) {
    clearErrors();
    model.inputs.todo_new.category = selected_category;
    updateScreen()
}

function validateEmail(email) {

    const mailregex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(email.match(mailregex)) {
        return true;
    } else false;

}

function createNewCategory() {
    firebase.auth().onAuthStateChanged(function (user){
        if(user) {
            const uid = user.uid;
            
            if(model.inputs.new_category.name && model.inputs.new_category.color) {
                if(debounce) return;
                debounce = true;
                if(!categoryExists(model.inputs.new_category.name)) {
                    
                    db.collection('user_settings').doc(uid).update({
                        todo_categories: firebase.firestore.FieldValue.arrayUnion({
                            name: model.inputs.new_category.name.toLowerCase(),
                            color: model.inputs.new_category.color.toLowerCase()
                        })
                    }).then(cat => {
                        debounce = false
                    })
                    .catch((err) => {
                        debounce = false;
                    })
                    ;
                getData(uid);
                } else { alert('category exists'); }
                model.inputs.new_category.name = '';
                model.inputs.new_category.color = '';
            }   
        }
    })
}

function categoryExists(cat_name){
    let bool;
    model.data.user.settings.todo_categories.forEach(element => {
        if(element.name == cat_name) {
            bool = true;
        }
    });
    return bool;
}

function removeCategory(cat_name, cat_color) {
    console.log(cat_name, cat_color)
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            if(debounce) return;
            debounce = true;
            const uid = user.uid;
            db.collection('user_settings').doc(uid).update({
                todo_categories: firebase.firestore.FieldValue.arrayRemove({
                    name: cat_name,
                    color: cat_color
                })
            }).then(cat => {
                debounce = false;
            })
            .catch((error) => {
                debounce = false;
                console.log(error)
            });
            getData(uid);
        }
    });
}

function editCategory(cat) {
    model.inputs.edit_category.selectedToEdit = cat;
    updateScreen();
}

function clearModel() {
    model.data.user.todos.completed = {};
    model.data.user.todos.ongoing = {};
    model.data.user.settings = {};
    model.data.user.info = {};
}