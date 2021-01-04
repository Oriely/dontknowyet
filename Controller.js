
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
        input_title_edit = todos[id].title;
        input_content_edit = todos[id].content;
    }

    if (mode == 'edit' && id == selectedToEdit) {

        todos[id].date_edited = date.toUTCString();
        todos[id].title = input_title_edit;
        todos[id].content = input_content_edit;

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
    let date = new Date();
    todos[id].date_finished = date.toUTCString();
    todos[id].completed = true;

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