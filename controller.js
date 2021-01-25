

function addTodo() {

    let obj;

    if (!input_title || !input_content || !input_priority) {
        errors = 'Something is missing....';
    } else {
        errors = '';

        obj = todos[keyGen()] = {
            id: genId(),
            date_added: Date.now(),
            date_edited: '',
            date_finished: '',
            title: input_title,
            content: input_content,
            priority: input_priority,
            completed: false,
        };
    }


    input_title = '';
    input_content = '';
    input_priority = '';

    updateScreen();

    return obj;
}

function editTodo(id) {

    selectedToEdit = id;

    if (input_title_edit == '' && input_content_edit == '') {
        input_title_edit = todos[id].title;
        input_content_edit = todos[id].content;
    }
    
    if (mode == 'edit' && id == selectedToEdit) {

        todos[id].date_edited = Date.now();
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
    todos[id].date_finished = Date.now();
    todos[id].completed = true;

    updateScreen();
}

function removeTodo(id) {
    delete todos[id];
    updateScreen();
}


function filterTodos(a) {
    mode = '';
    filter = a.value;
    sorting = '';
    updateScreen();
}

function sortTodos(a) {
    mode = '';
    filter = '';
    sorting = a.value;
    updateScreen();
}

function changeScreen(page) {
    on_page = page;
    updateScreen();
}

function clearError() {
    errors = '';
    updateScreen();
}

function keyGen() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

function genId() {
    let new_id = Math.floor(Math.random() * Math.floor(Math.random() * Date.now()));
    return new_id;
}

  
function checkId(a) {
    if (Object.keys(todos).length < 0) {
        for (keys in todos) {
            return (todos[keys].id === a)
        }
    } else return false;

}
