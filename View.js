function screenList() {


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
                <div class="controls">
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
                    <div><button class="panes" onclick="changeScreen('screen_panes')"><i class="fas fa-columns"></i></button></div>
                    
                </div>
            </div>
            
            
        </div>
       
        <div class="todos">
            ${todoHTML}
            
        </div>
    </div>
    `;
}

function screenPanes() {


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
                    <button><i class="fas fa-columns"></i></button>
                </div>
            </div>
            
            
        </div>
       
        <div class="todos">
            ${todoHTML}
            
        </div>
    </div>
    `;
}

function todoCreateHTML(data, id) {
    return `
    <div class="todo-wrapper${(data.completed === true ? ' fin' : '')}${setPriority(data.priority)}" data-key="${id}" >
        <div class="todo-title">${(mode == 'edit' && id == selectedToEdit ? '<input class="edit" type="text" onkeyup="input_title_edit = this.value" value="' + data.title +'">' : '<h1>' + data.title + '</h1>')}</div>
        <div class="todo-dates">
            <span>Added: ${data.date_added}</span>
            <span>${(data.date_finished != '' ? 'Completed: ' + data.date_finished : '')}</span>
            <span>${(data.date_edited != '' ? 'Edited: ' + data.date_edited : '')}</span>
        </div>
        <div class="todo-content">  
            ${(mode == 'edit' && id == selectedToEdit ? '<textarea class="edit" onkeyup="input_content_edit = this.value">'+ data.content + '</textarea>' : data.content)}
            <br>
            <div class="pri">PRI: ${data.priority}</div>
        </div>
        <div class="todo-controls-edit">
            ${(data.completed == true ? '' : '<button '+ (id != selectedToEdit && mode == 'edit' ? 'disabled ' : '') + 'onclick="editTodo(\''+id+'\')">' + (id == selectedToEdit ? (mode == 'edit' ? 'Save' : 'Edit') : 'Edit') + '</button>')}
            ${(data.completed == false ? '<button onclick="completeTodo(\''+id+'\');">Complete</button>' : '')}
   
            <button onclick="removeTodo('${id}')">Remove</button>
        </div>
    </div>
    `;
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



function e() {
    return '<div class="errors"><p>' + errors + '<p><span>X</span></div>';
}

function showEditControls(){

}