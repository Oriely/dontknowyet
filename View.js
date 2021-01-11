function mainScreen() {
    container.innerHTML = `
    <div class="wrapper">
        <div class="input-form">
            <div class="input-title"><input id="" type="text" onkeyup="input_title = this.value" placeholder="Some title...."></div>
            <div class="input-content"><textarea onkeyup="input_content = this.value"></textarea></div>
            ${(error ? '<div class="errors  ">'+ error +'</div>' : '')}

            <div class="todo-controls">

                <div class="todo-controls-left">
                    <div><button onclick="addTodo()">Add todo</button></div>
                    
                </div>
                <div class="todo-controls-right">
                    <div class="todo-filter">

                        <label>Filter by</label>

                        <select name="cars" id="cars" onchange="filterTodos(this)">
                            <option ${(filter == 0 ? 'selected' + ' ': '')}value="0">Nothing</option>
                            <option ${(filter == 1 ? 'selected' + ' ': '')}value="1">High</option>
                            <option ${(filter == 2 ? 'selected' + ' ': '')}value="2">Medium</option>
                            <option ${(filter == 3 ? 'selected' + ' ': '')}value="3">Low</option>
                        </select>
                        
                    </div>
                    <div><button class="switch" onclick="changeViewmode('panes')"><i class="fas fa-columns"></i></button></div>
                    
                </div>
            </div>
            
            
        </div>
       
        <div class="todo-${model.app.todo_viewmode}">
            ${todoHTML}
            
        </div>
    </div>
    `;
}

function screenPanes() {
    todoHTML = `
        <section>
        ${todoHTML_high}
        </section>
        <div class="divider"></div>
        <section>
        ${todoHTML_med}
        </section>
        <div class="divider"></div>
        <section>
        ${todoHTML_low}
        </section>
    `;
}



function todoCreateHTML(data, id) {
    return `
    <div class="todo-wrapper" data-key="${id}" >
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