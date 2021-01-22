

let todos = {
    [keyGen()]: {
        id: genId(),
        date_added: Date.now(),
        date_edited: '',
        date_finished: '',
        title: '123123123',
        content: 'asdoqdpoqkdpqkwdpoqwkdpqkwdpoqwd',
        priority: 1,
        completed: false
    },
    [keyGen()]: {
        id: genId(),
        date_added: Date.now(),
        date_edited: '',
        date_finished: '',
        title: '123123123',
        content: 'asdoqdpoqkdpqkwdpoqwkdpqkwdpoqwd',
        priority: 2,
        completed: false
    },
    [keyGen()]: {
        id: genId(),
        date_added: Date.now(),
        date_edited: '',
        date_finished: '',
        title: '123123123',
        content: 'asdoqdpoqkdpqkwdpoqwkdpqkwdpoqwd',
        priority: 1,
        completed: false
    },
    [keyGen()]: {
        id: genId(),
        date_added: Date.now(),
        date_edited: '',
        date_finished: '',
        title: '123123123',
        content: 'asdoqdpoqkdpqkwdpoqwkdpqkwdpoqwd',
        priority: 1,
        completed: false
    },
    [keyGen()]: {
        id: genId(),
        date_added: Date.now(),
        date_edited: '',
        date_finished: '',
        title: '123123123',
        content: 'asdoqdpoqkdpqkwdpoqwkdpqkwdpoqwd',
        priority: 1,
        completed: false
    },
    [keyGen()]: {
        id: genId(),
        date_added: Date.now(),
        date_edited: '',
        date_finished: '',
        title: '123123123',
        content: 'asdoqdpoqkdpqkwdpoqwkdpqkwdpoqwd',
        priority: 2,
        completed: false
    },
    [keyGen()]: {
        id: genId(),
        date_added: Date.now(),
        date_edited: '',
        date_finished: '',
        title: '123123123',
        content: 'asdoqdpoqkdpqkwdpoqwkdpqkwdpoqwd',
        priority: 2,
        completed: false
    },
    [keyGen()]: {
        id: genId(),
        date_added: Date.now(),
        date_edited: '',
        date_finished: '',
        title: '123123123',
        content: 'asdoqdpoqkdpqkwdpoqwkdpqkwdpoqwd',
        priority: 2,
        completed: false
    },
    [keyGen()]: {
        id: genId(),
        date_added: Date.now(),
        date_edited: '',
        date_finished: '',
        title: '123123123',
        content: 'asdoqdpoqkdpqkwdpoqwkdpqkwdpoqwd',
        priority: 3,
        completed: false
    },
    [keyGen()]: {
        id: genId(),
        date_added: Date.now(),
        date_edited: '',
        date_finished: '',
        title: '123123123',
        content: 'asdoqdpoqkdpqkwdpoqwkdpqkwdpoqwd',
        priority: 3,
        completed: false
    },
    [keyGen()]: {
        id: genId(),
        date_added: Date.now(),
        date_edited: '',
        date_finished: '',
        title: '123123123',
        content: 'asdoqdpoqkdpqkwdpoqwkdpqkwdpoqwd',
        priority: 3,
        completed: false
    },

    
};

let container = document.getElementById('container');
let todoHTML_high = '';
let todoHTML_low = ''
let todoHTML_medium = '';
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
let on_page = 'main';

function updateScreen() {
    if (on_page == "main") {
        mainPage();
    }
    if (on_page == 'second') {
        secondPage();
    }
}

updateScreen();

function todoCreateHTML(id) {
    return `
        <div class="todo-wrapper${(todos[id].completed === true ? ' fin' : '')}${setPriority(todos[id].priority)}" >
            <div class="todo-title">${(mode == 'edit' && id == selectedToEdit ? '<input class="edit" type="text" onkeyup="input_title_edit = this.value" value="' + todos[id].title +'">' : '<h1>' + todos[id].title + '</h1>')}</div>
            <div class="todo-dates">
                <span>Added: ${stupidToReadableDate(todos[id].date_added)}</span>
                <span>${(todos[id].date_finished != '' ? 'Completed: ' + stupidToReadableDate(todos[id].date_finished) : '')}</span>
                <span>${(todos[id].date_edited != '' ? 'Edited: ' + todos[id].date_edited : '')}</span>
            </div>
            <div class="todo-content">  
                ${(mode == 'edit' && id == selectedToEdit ? '<textarea class="edit" onkeyup="input_content_edit = this.value">'+ todos[id].content + '</textarea>' : todos[id].content)}
            </div>
            <div>Priority: ${(todos[id].priority === 1 ? 'High' : '') || (todos[id].priority === 2 ? 'Medium' : '') ||(todos[id].priority === 3 ? 'Low' : '')}</div>
            <div class="todo-controls-edit">
                ${(todos[id].completed == true ? '' : '<button '+ (id != selectedToEdit && mode == 'edit' ? 'disabled ' : '') + 'onclick="editTodo(\''+id+'\')">' + (id == selectedToEdit ? (mode == 'edit' ? 'Save' : 'Edit') : 'Edit') + '</button>')}
                ${(todos[id].completed == false ? '<button ' + (mode == 'edit' ? 'disabled' : '') + ' onclick="completeTodo(\''+id+'\');">Complete</button>' : '')}
    
                <button onclick="removeTodo('${id}')">Remove</button>
            </div>
        </div>
    `;
}

function stupidToReadableDate(date) {
    return new Date(date).toLocaleDateString() + ' ' + new Date(date).toLocaleTimeString()

}


function mainPage() {
    todoHTML_high = '';
    todoHTML_low = '';
    todoHTML_medium = '';

    
    for (let keys in todos) {

        if (todos[keys].completed === false ) {
            if (todos[keys].priority === 1) {
                todoHTML_high += todoCreateHTML(keys);
            }
        

            if (todos[keys].priority === 2) {

                todoHTML_medium += todoCreateHTML(keys);
            }

        

            if (todos[keys].priority === 3) {
                todoHTML_low += todoCreateHTML(keys);
            }
        } 
    }
        


    container.innerHTML = `
    <div class="wrapper">
        <nav>
            <div onclick="changeScreen('main')">Main</div>
            <div onclick="changeScreen('second')">Completed todos</div>
        </nav>
        
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
            ${listTodos(filter, sorting)}
            
        </div>
    </div>
    `;
}


function secondPage() {
    todoHTML_high = '';
    todoHTML_low = '';
    todoHTML_medium = '';
    for (let keys in todos) {

        if (todos[keys].completed === true ) {
            if (todos[keys].priority === 1) {
                todoHTML_high += todoCreateHTML(keys);
            }
    
    
            if (todos[keys].priority === 2) {
                todoHTML_medium += todoCreateHTML(keys);
            }
 
            if (todos[keys].priority === 3) {
                todoHTML_low += todoCreateHTML(keys);
            }
        }
        
    }


    container.innerHTML = `
    <div class="wrapper">
        <nav>
            <div onclick="changeScreen('main')">Main</div>
            <div onclick="changeScreen('second')">Completed todos</div>
        </nav>
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
        <div class="todos">
            ${listTodos(filter, sorting)}
            
        </div>
    </div>
    `;
}

function listTodos(filt, sort) {

    if (sort == 1 || sort == '') {
        if (filt == 1) {
            return todoHTML_high;
        }
        if (filt == 2) {
            return todoHTML_medium;
        }
        if (filt == 3) {
            return todoHTML_low;
        }
        return todoHTML_high + todoHTML_medium + todoHTML_low;
    }

    if (sort == 2) {
        return todoHTML_low + todoHTML_medium + todoHTML_high;
    }



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
    return '<div class="errors"><p>' + errors + '<p><span onclick="clearError()">X</span></div>';
}

function hideErrors() {
    errors = '';
    updateScreen();
}



