
function addTodo() {
    if (!input_title || !input_content || !input_priority) {
        errors = 'Something is missing....';
    } else {
        
        let date = new Date();
        db.ref('todos/' + keyGen()).set({
            id: genId(),
            date_added: date.toUTCString(),
            date_edited: '',
            date_finished: '',
            title: input_title,
            content: input_content,
            priority: input_priority,
            completed: false,
        }, (error) => {
        if (error) {
            errors = 'Something went wrong... ' + error;
        } else {
            console.log('Success')
        }});
    }


    input_title = '';
    input_content = '';
    input_priority = '';

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
        db.ref('todos/').child(id).update({'title': input_title_edit})
        db.ref('todos/').child(id).update({'content': input_content_edit})

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
        errors = 'Something went wrong... ' + error;
    } else {
        console.log('Success')
    }});
    updateScreen();
}

