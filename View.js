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