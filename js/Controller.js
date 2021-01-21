
function login(e, form) {
    e.preventDefault();
    
    let email = form['login-email'].value
    let password = form['login-password'].value;
   
   
    if (email && password) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((user) => {
            // Signed in 
            // ...
            })
            .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            });

    console.log(email);
    console.log(password);


    } else {

    }
    
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
        setTimeout(function () {
            hideErrors();

        }, 3000);
    } else {
        
        let date = new Date();
        db.ref('todos/' + keyGen()).set({
            id: genId(),
            date_added: date.toUTCString(),
            date_edited: '',
            date_finished: '',
            title: model.inputs.todo_new.title,
            content: model.inputs.todo_new.content,
            category: model.inputs.todo_new.category,
            completed: false,
        }, (error) => {
        if (error) {
            errorHandler(3);
        } else {
            error = '';
            console.log('Success')
            model.inputs.todo_new.title = '';
            model.inputs.todo_new.content = '';
            model.inputs.todo_new.category = '';
        }});
    }



    updateScreen();

}


function editTodo(id) {
    let date = new Date();

    selectedToEdit = id;

    if (input_title_edit == '' && input_content_edit == '') {
        input_title_edit = getValueOf(id, 'title');
        input_content_edit = getValue(id, 'title');
    }

    if (mode == 'edit' && id == selectedToEdit) {

        // todos[id].date_edited = date.toUTCString();
        // todos[id].title = input_title_edit;
        // todos[id].content = input_content_edit;

        db.ref('todos/').child(id).update({'date_edited': date.toUTCString()})
        db.ref('todos/').child(id).update({'title': model.inputs.todo_edit.title})
        db.ref('todos/').child(id).update({'content': model.inputs.todo_edit.content})

        selectedToEdit = '';
        input_title_edit = '';
        input_content_edit = '';
        mode = '';

    } else {
        mode = "edit"
    }


    updateScreen();

}

function completeTodo(id) {
    mode = '';
    selectedToEdit = '';
    let completed = getValueOf(id, 'completed');
    

    if (completed === false) {
        let date = new Date();
        db.ref('todos/').child(id).update({'date_finished': date.toUTCString()})
        db.ref('todos/').child(id).update({'completed': true})
    } else {console.log(completed);}
    updateScreen();
}

function removeTodo(id) {
    db.ref('todos/' + id).set(null, (error) => {
    if (error) {
       errorHandler(3);
    } else {
        console.log('Success')
    }});
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

    let mailregex = /^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/;

    if(email.match(mailregex)) {
        return true;
    } else false;
}