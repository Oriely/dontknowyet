

window.onbeforeunload = function() { };
let tmpCat = '';
function mainScreen() {
    tmpCat = '';
    
    if(model.app.todo_viewmode === 'panes') {todosPanes()}
    
    if(model.app.todo_viewmode === 'list') {todosList()}

    for (let i = 0; i < model.app.todo_categories.length; i++) {
        tmpCat += categoryCreate(i);
    }

    container.innerHTML = `
    <div class="wrapper">
        <div class="input-form">
            <div class="input-title"><input id="" type="text" onkeyup="model.inputs.todo_new.title = this.value" value="${model.inputs.todo_new.title}" placeholder="Some title...."></div>
            <div class="input-content"><textarea onkeyup="model.inputs.todo_new.content = this.value" value="">${model.inputs.todo_new.content}</textarea></div>
            ${(error ? '<div class="errors  ">'+ error +'</div>' : '')}

            <div class="todo-controls">

                <div class="todo-controls-left">
                    <div><button onclick="addTodo()">Add todo</button></div>
                    <div class="categories">
                        ${tmpCat}
                    </div>
                </div>
                <div class="todo-controls-right">
                <div class="todo-filter">
                ${(model.app.todo_viewmode != 'panes' ? ` 
                
                    <div>
                        <label>Filter by</label>
                    </div>
                    <div>
                        <select name="cars" id="cars" onchange="filterTodos(this)">
                            <option ${(filter == 0 ? 'selected' + ' ': '')}value="0">Nothing</option>
                            <option ${(filter == 1 ? 'selected' + ' ': '')}value="1">High</option>
                            <option ${(filter == 2 ? 'selected' + ' ': '')}value="2">Medium</option>
                            <option ${(filter == 3 ? 'selected' + ' ': '')}value="3">Low</option>
                        </select>
                    </div>
                    </div>
                    
                    
                ` : '')}
                <div><button class="switch" onclick="changeViewmode('${(model.app.todo_viewmode === 'panes' ? 'list' : 'panes')}')">${(model.app.todo_viewmode === 'panes' ? '<i class="fas fa-stream"></i>' : '<i class="fas fa-columns"></i>')}</button></div>
                </div>
            </div>
            
            
        </div>
       
        <div class="todo-${model.app.todo_viewmode}">
            ${todoHTML}
            
        </div>
    </div>
    `;
}



function categoryCreate(e) {
    return'<div onclick="selectCategory(this, \'' + e + '\')" class="category-item" ><span class="color-preview ' + (model.inputs.todo_new.category == model.app.todo_categories[e].name ? 'selected-category' : '') + '" style="background-color: '+ model.app.todo_categories[e].color + '"></span><p>'+ model.app.todo_categories[e].name +'</p></div>';
}

function todosPanes() {
    return `<section>

    // todoHTML = `
    //     <section>
    //     ${todoHTML_high}
    //     </section>
    //     <div class="divider"></div>
    //     <section>
    //     ${todoHTML_med}
    //     </section>
    //     <div class="divider"></div>
    //     <section>
    //     ${todoHTML_low}
    //     </section>
    // `;
}

function todosList() {
    todoHTML = todoHTML_high + todoHTML_med + todoHTML_low;
}

function todoCreateHTML(data, id) {
    return `
    <div class="todo-wrapper" data-key="${id}" style="background-color: ">
        <div class="todo-title">${(mode == 'edit' && id == selectedToEdit ? '<input class="edit" type="text" onkeyup="model.inputs.todo_edit.title = this.value" value="' + data.title +'">' : '<h1>' + data.title + '</h1>')}</div>
        <div class="todo-dates">
            <span>Added: ${data.date_added}</span>
            <span>${(data.date_finished != '' ? 'Completed: ' + data.date_finished : '')}</span>
            <span>${(data.date_edited != '' ? 'Edited: ' + data.date_edited : '')}</span>
        </div>
        <div class="todo-content">  
            ${(mode == 'edit' && id == selectedToEdit ? '<textarea class="edit" onkeyup="model.inputs.todo_edit.content = this.value">'+ data.content + '</textarea>' : data.content)}
            <br>
            <div class="pri">PRI: ${data.priority}</div>
        </div>
        <div class="todo-controls-edit">
            ${(data.completed == true ? '' : '<button '+ (id != selectedToEdit && model.app.edit_mode === true ? 'disabled ' : '') + 'onclick="editTodo(\''+ id +'\')">' + (id == selectedToEdit ? (model.app.edit_mode === true ? 'Save' : 'Edit') : 'Edit') + '</button>')}
            ${(data.completed == false ? '<button onclick="completeTodo(\''+id+'\');">Complete</button>' : '')}
   
            <button onclick="removeTodo('${id}')">Remove</button>
        </div>
    </div>
    `;
}