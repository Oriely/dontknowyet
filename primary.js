let td = new Date();

let todos = {
    0: {
        id: 5881239,
        date_added: td.toUTCString(),
        date_edited: "",
        date_finished: "",
        title: "soemthing",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum dictum nibh erat, quis dictum diam porta a. Nullam tristique, elit malesuada sagittis porttitor, neque quam ullamcorper orci, non molestie lacus erat sit amet elit. Phasellus eleifend hendrerit commodo. Vestibulum convallis, nisl quis feugiat varius, dui urna accumsan leo, eu hendrerit dolor libero eget metus. Aliquam nunc dolor, fringilla ac posuere ut, tincidunt eu nisi. Nulla non nisi at orci dignissim gravida. Cras sit amet suscipit quam. Proin a est diam.",
        completed: false
    },
    1: {
        id: 5881239,
        date_added: td.toUTCString(),
        date_edited: "",
        date_finished: "",
        title: "soemthing",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum dictum nibh erat, quis dictum diam porta a. Nullam tristique, elit malesuada sagittis porttitor, neque quam ullamcorper orci, non molestie lacus erat sit amet elit. Phasellus eleifend hendrerit commodo. Vestibulum convallis, nisl quis feugiat varius, dui urna accumsan leo, eu hendrerit dolor libero eget metus. Aliquam nunc dolor, fringilla ac posuere ut, tincidunt eu nisi. Nulla non nisi at orci dignissim gravida. Cras sit amet suscipit quam. Proin a est diam.",
        completed: false
    },
    9: {
        id: 5881239,
        date_added: td.toUTCString(),
        date_edited: "",
        date_finished: "",
        title: "soemthing",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum dictum nibh erat, quis dictum diam porta a. Nullam tristique, elit malesuada sagittis porttitor, neque quam ullamcorper orci, non molestie lacus erat sit amet elit. Phasellus eleifend hendrerit commodo. Vestibulum convallis, nisl quis feugiat varius, dui urna accumsan leo, eu hendrerit dolor libero eget metus. Aliquam nunc dolor, fringilla ac posuere ut, tincidunt eu nisi. Nulla non nisi at orci dignissim gravida. Cras sit amet suscipit quam. Proin a est diam.",
        completed: false
    },
    3: {
        id: 5881239,
        date_added: td.toUTCString(),
        date_edited: "",
        date_finished: "",
        title: "soemthing",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum dictum nibh erat, quis dictum diam porta a. Nullam tristique, elit malesuada sagittis porttitor, neque quam ullamcorper orci, non molestie lacus erat sit amet elit. Phasellus eleifend hendrerit commodo. Vestibulum convallis, nisl quis feugiat varius, dui urna accumsan leo, eu hendrerit dolor libero eget metus. Aliquam nunc dolor, fringilla ac posuere ut, tincidunt eu nisi. Nulla non nisi at orci dignissim gravida. Cras sit amet suscipit quam. Proin a est diam.",
        completed: false
    },
    4: {
        id: 5881239,
        date_added: td.toUTCString(),
        date_edited: "",
        date_finished: "",
        title: "soemthing",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum dictum nibh erat, quis dictum diam porta a. Nullam tristique, elit malesuada sagittis porttitor, neque quam ullamcorper orci, non molestie lacus erat sit amet elit. Phasellus eleifend hendrerit commodo. Vestibulum convallis, nisl quis feugiat varius, dui urna accumsan leo, eu hendrerit dolor libero eget metus. Aliquam nunc dolor, fringilla ac posuere ut, tincidunt eu nisi. Nulla non nisi at orci dignissim gravida. Cras sit amet suscipit quam. Proin a est diam.",
        completed: false
    },
    5: {
        id: 5881239,
        date_added: td.toUTCString(),
        date_edited: "",
        date_finished: "",
        title: "soemthing",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum dictum nibh erat, quis dictum diam porta a. Nullam tristique, elit malesuada sagittis porttitor, neque quam ullamcorper orci, non molestie lacus erat sit amet elit. Phasellus eleifend hendrerit commodo. Vestibulum convallis, nisl quis feugiat varius, dui urna accumsan leo, eu hendrerit dolor libero eget metus. Aliquam nunc dolor, fringilla ac posuere ut, tincidunt eu nisi. Nulla non nisi at orci dignissim gravida. Cras sit amet suscipit quam. Proin a est diam.",
        completed: false
    },


};
let container = document.getElementById('container');
let todoHTML;

let input_title;
let input_content;

let errors;

let mode;
let selectedToEdit;
let input_title_edit;
let input_content_edit;

function updateScreen() {

    todoHTML = '';

    for (let keys in todos) {
        todoHTML += todoCreateHTML(keys);
    }

    container.innerHTML = `
    <div class="wrapper">
        <div class="input-form">
            <div><input id="" type="text" onkeyup="input_title = this.value" placeholder="Some title...."></div>
            <div><textarea onkeyup="input_content = this.value"></textarea></div>
            <div class="todo-controls">
                <button onclick="addTodo(input_title, input_content)">Add todo</button>
                <label>something</label>
            </div>
            
            ${(errors === undefined || errors == '' ? '' : showErrors())}
        </div>
       
        <div class="todos">
            ${todoHTML}
        </div>
    </div>
    `;
}

updateScreen();
function todoCreateHTML(id) {
    return `
    <div class="todo-wrapper">
        <div class="todo-title">${(mode == 'edit' && id == selectedToEdit ? '<input class="edit" type="text" onkeyup="input_title_edit = this.value" value="' + todos[id].title +'">' : '<h1>' + todos[id].title + '</h1>')}</div>
        <div class="todo-dates">
            <span>Added: ${todos[id].date_added}</span>
            <span>${(todos[id].date_finished != '' ? 'Completed: ' + todos[id].date_finished : '')}</span>
            <span>${(todos[id].date_edited != '' ? 'Edited: ' + todos[id].date_edited : '')}</span>
        </div>
        <div class="todo-content">  
            ${(id == selectedToEdit ? '<textarea class="edit" onkeyup="input_content_edit = this.value">'+ todos[id].content + '</textarea>' : todos[id].content)}
        </div>
        <div class="todo-controls">
            ${(todos[id].completed == true ? '' : '<button '+ (id != selectedToEdit && mode == 'edit' ? 'disabled ' : '') + 'onclick="editTodo(' + id + ')">' + (id == selectedToEdit ? (mode == 'edit' ? 'Save' : 'Edit') : 'Edit') + '</button>')}
            ${(todos[id].completed == false ? '<button onclick="completeTodo(' + id + ');">Complete</button>' : '')}
   
            <button onclick="removeTodo(${id})">Remove</button>
        </div>
    </div>
    `;
}

function showErrors() {
    return '<div class="errors">'+ errors + '</div>';
}

function addTodo(title, content){
    let date = new Date();
    if (input_title != undefined && input_content != undefined || input_title != undefined && input_content != undefined) {
        todos[Object.keys(todos).length] = {
            id: genId(),
            date_added: date.toUTCString(),
            date_edited: '',
            date_finished: '',
            title: title,
            content: content,
            completed: false,
        }
        input_title = '';
        input_content = '';
    } else {
        errors = 'Add something to the input fields'
    }

    return updateScreen();
}

function editTodo(id) {

    console.log(id);
    let date = new Date();
    selectedToEdit = id;

    if(mode == 'edit' && id == selectedToEdit){

        todos[id].date_edited = date.toUTCString();
        todos[id].title = input_title_edit;
        todos[id].content = input_content_edit;

        selectedToEdit = '';
        input_title_edit = '';
        input_content_edit = ''; 
        mode = '';

    }else {
        
        mode = "edit"
    }
    
   
    updateScreen();

}

function completeTodo(id) {
    let date = new Date();
    todos[id].date_finished = date.toUTCString();
    todos[id].completed = true;
    updateScreen();
}

function removeTodo(id) {
    delete todos[id];
    updateScreen();
}

function checkId(a) {
    for (let i = 0; i < Object.keys(todos).length; i++) {
        return (todos[i].id == a)
    }
}

function genId() {
    let new_id = Math.round(Math.random() * 500000) + 100000;
    return (checkId(new_id) === false ? new_id : Math.round(Math.random() * 500000) + 100000 && console.log('winner'));
}