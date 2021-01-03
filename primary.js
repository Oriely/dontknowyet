//server
let db = firebase.database();
let db_ref = db.ref();
let data = db_ref.child('todos');



// local
let critError;
let todos;
let container = document.getElementById('container');
let todoHTML = '';
let input_title = '';
let input_content = '';
let input_priority = '';
let errors = '';
let mode = '';
let selectedToEdit = '';
let input_title_edit = '';
let input_content_edit = '';
let priority = [1, 2, 3];
let filter = '';
let sorting = '';


function updateScreen() {
    db_ref.child("todos").once("value",snapshot => {
        if (snapshot.exists()){
            data.on('value', function(snap){
                todoHTML= '';
                todos = snap.val();
                snap.forEach(function(child) {
                        todoHTML += todoCreateHTML(child.key);
                });

                mainScreen();
            });
        } else {
            errorHandler(1);
        
        }
        
    });
}

updateScreen();

function mainScreen() {
    container.innerHTML = `
    <div class="wrapper">
        <div class="input-form">
            <div class="input-title"><input id="" type="text" onkeyup="input_title = this.value" placeholder="Some title...."></div>
            <div class="input-content"><textarea onkeyup="input_content = this.value"></textarea></div>
            ${(errors ? showErrors() : '')}
            <div class="todo-controls">

                <div>
                    <div><button onclick="addTodo()">Add todo</button></div>
                    <div class="priority">
                        <div><label>Priority: </label></div>
                        <div><input class="priority" onclick="input_priority = 1" id="high" type="radio" name="priority" value="test" ><label for="high">High</label></div>
                        <div><input class="priority" onclick="input_priority = 2" id="medium" type="radio"  name="priority"value="test"><label for="medium">Medium</label></div>
                        <div><input class="priority" onclick="input_priority = 3" id="low" type="radio" name="priority" value="test"><label for="low">Low</label></div>
                    </div>
                </div>
                <div>
                <div class="todo-filter">
                    <label>Filter by</label>
                    <select name="cars" id="cars" onchange="filterTodos(this)">
                        <option ${(filter == 0 ? 'selected' + ' ': '')}value="0">Nothing</option>
                        <option ${(filter == 1 ? 'selected' + ' ': '')}value="1">High</option>
                        <option ${(filter == 2 ? 'selected' + ' ': '')}value="2">Medium</option>
                        <option ${(filter == 3 ? 'selected' + ' ': '')}value="3">Low</option>
                    </select>
                </div>
                <div class="todo-sort">
                    <label>Sort by</label>
                    <select name="cars" id="cars" onchange="sortTodos(this)">
                        <option ${(sorting == 1 ? 'selected' + ' ': '')}value="1">High > Low</option>
                        <option ${(sorting == 2 ? 'selected' + ' ': '')}value="2">Low > High</option>
                    </select>
                </div>
                </div>
            </div>
            
            
        </div>
       
        <div class="todos">
            ${todoHTML}
            
        </div>
    </div>
    `;
}

function errorHandler(err) {

    if(err === 1) { critError = 'Error ' + err + ' Reference database is missing.'; }

    if(err === 2) { critError = '' }
    container.innerHTML = critError;
}

function todoCreateHTML(id) {
    return `
    <div class="todo-wrapper${(todos[id].completed === true ? ' fin' : '')}${setPriority(todos[id].priority)}" >
        <div class="todo-title">${(mode == 'edit' && id == selectedToEdit ? '<input class="edit" type="text" onkeyup="input_title_edit = this.value" value="' + todos[id].title +'">' : '<h1>' + todos[id].title + '</h1>')}</div>
        <div class="todo-dates">
            <span>Added: ${todos[id].date_added}</span>
            <span>${(todos[id].date_finished != '' ? 'Completed: ' + todos[id].date_finished : '')}</span>
            <span>${(todos[id].date_edited != '' ? 'Edited: ' + todos[id].date_edited : '')}</span>
        </div>
        <div class="todo-content">  
            ${(mode == 'edit' && id == selectedToEdit ? '<textarea class="edit" onkeyup="input_content_edit = this.value">'+ todos[id].content + '</textarea>' : todos[id].content)}
        </div>
        <div class="todo-controls-edit">
            ${(todos[id].completed == true ? '' : '<button '+ (id != selectedToEdit && mode == 'edit' ? 'disabled ' : '') + 'onclick="editTodo(\''+id+'\')">' + (id == selectedToEdit ? (mode == 'edit' ? 'Save' : 'Edit') : 'Edit') + '</button>')}
            ${(todos[id].completed == false ? '<button onclick="completeTodo(\''+id+'\');">Complete</button>' : '')}
   
            <button onclick="removeTodo('${id}')">Remove</button>
        </div>
    </div>
    `;
}

function grabData(){

}

function filterTodos(a) {
    mode = '';
    filter = a.value;
    sorting = ''
    updateScreen();
}

function sortTodos(a) {
    mode = '';
    filter = '';
    sorting = a.value;
    updateScreen();
}

function setPriority(pri) {
    if (pri === priority[0]) {
        return ' ' + 'high-priority';
    }
    if (pri === priority[1]) {
        return ' ' + 'medium-priority';
    }
    if (pri === priority[2]) {
        return ' ' + 'low-priority';
    }
}

function showErrors() {
    return '<div class="errors"><p>' + errors + '<p><span>X</span></div>';
}

function hideErrors() {
    errors = '';
    updateScreen();
}



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
    db.ref('todos/' + id).remove();
    updateScreen();
}

function keyGen() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

function checkId(a) {
    if (Object.keys(todos).length < 0) {
        for (keys in todos) {
            return (todos[keys].id === a)
        }
    } else return false;

}

function genId() {
    let new_id = Math.floor(Math.random() * Math.floor(Math.random() * Date.now()));
    return (checkId(new_id) === false ? new_id : Math.floor(Math.random() * Math.floor(Math.random() * Date.now())));
}