function loginScreen() {
    firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
            errors.forEach((err) => {
                error += err + '<br>';
            });

            return container.innerHTML = `
            <div class="wrapper">
    
                <div class="login">
    
                    <form class="form" onsubmit="login(event, this)">
                        <div>
                            <label for="login-email">email</label>
                            <input autofocus id="login-email" type="email" placeholder="testing@testing.com">
                        </div>
                        <div>
                            <label for="login-password">password</label>
                            <input id="login-password" type="password" placeholder="password">
                        </div>
                        ${(error ? '<div class="error-wrapper"><div class="errors  ">'+ error +'</div></div>' : '')}
                        <div class="login-submit">
                            <input type="submit" value="Login">
                        </div>
                        <div>
                            <a onclick="changeScreen('register')">Dont have an account? Register</a>
                        </div>
                    </form>
    
                    
                </div>
    
            </div>   
        `;
        } 
    });
    
}

function registerScreen() {
    firebase.auth().onAuthStateChanged((user) => {

        if (!user) {

            errors.forEach((err) => {
                error += err + '<br>';
            });

    
            container.innerHTML = `
            <div class="wrapper">
    
                <div class="register">
    
                    <form class="form" onsubmit="register(event, this)">    
                        <div>
                            <label for="register-username">username</label>
                            <input autofocus id="register-username" type="text" placeholder="Johnny93">
                        </div>
                        <div class="full-name">
                            <div>               
                                <label for="register-firstname">first name</label>
                                <input autofocus id="register-firstname" type="text" placeholder="John">
                            </div>
                            <div>               
                                <label for="register-lastname">last name</label>
                                <input autofocus id="register-lastname" type="text" placeholder="Johnny">
                            </div>
                        </div>
                        <div>
                            <label for="register-email">email</label>
                            <input id="register-email" type="email" placeholder="johnny@johnnymail.com">
                        </div>
                        <div>
                            <label for="register-password">password</label>
                            <input id="register-password" type="password" placeholder="password">
                        </div>
                        <div>
                            <label for="register-password-comf">comfirm password</label>
                            <input id="register-password-comf" type="password" placeholder="password">
                        </div>
                        ${(error ? '<div class="error-wrapper"><div class="errors  ">'+ error +'</div></div>' : '')}
                        <div class="login-submit">
                            <input type="submit" value="Register">
                        </div>
                        <div>
                        <a onclick="changeScreen('login')">Already have an account? Login here.</a>
                        </div>
                    </form>
    
                    
                </div>
    
            </div>   
        `;
        } 
    });

}

function mainScreen() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            errors.forEach((err) => {
                error += err + '<br>';
            });
            



            

            container.innerHTML = `
                <div class="wrapper pad">
                    <nav>
                        <div class="navigation">
                            <ul>
                                <li><a onclick="changeScreen('main')">Main</a></li>
                                <li><a onclick="changeScreen('config')">Configuration</a></li>
                            </ul>
                        </div>
                        <div>
                            <button ${(model.app.mobile === true ? 'disabled' : '')} 
                            class="switch" onclick="changeViewmode('${(model.app.todo_viewmode === 'panes' ? 'list' : 'panes')}')">
                            ${(model.app.todo_viewmode === 'panes' ? '<i class="fas fa-stream"></i>' : '<i class="fas fa-columns"></i>')}
                            </button>
                            <button onclick="signout()" title="Sign out"><i class="fas fa-sign-out-alt"></i></button>
                        </div>

                    </nav>

                    <div class="input-form">
                        <div class="input-title"><input id="" type="text" onkeyup="model.inputs.todo_new.title = this.value" value="${model.inputs.todo_new.title}" placeholder="Some title...."></div>
                        <div class="input-content"><textarea onkeyup="model.inputs.todo_new.content = this.value" value="">${model.inputs.todo_new.content}</textarea></div>
                        ${(error ? '<div class="errors  ">'+ error +'</div>' : '')} 
                        ${(response ? '<div class="response">' + response + '</div>' : '')}
                        <div class="todo-controls">

                            <div class="todo-controls-left">
                                <div><button onclick="addTodo()">Add todo</button></div>
                                <div class="categories">
                                    $   
                                </div>
                            </div>
                            <div class="todo-controls-right">
                            <div class="todo-filter">
                            ${(model.app.todo_viewmode != 'panes' ? ` 
                            
                                <div>
                                    <label>Filter by</label>
                                </div>
                                <div>

                                </div>
                                </div>
                                
                                
                            ` : '')}
                            </div>
                        </div>
                        
                        
                    </div>

                    <div class="todo-${model.app.todo_viewmode}">
                        ${model.tmpHTML.todos}
                        
                    </div>
                </div>
                `;
        }
    });



}

/* <select name="cars" id="cars" onchange="filterTodos(this)">
<option ${(filter == 0 ? 'selected' + ' ': '')}value="0">Nothing</option>
<option ${(filter == 1 ? 'selected' + ' ': '')}value="1">High</option>
<option ${(filter == 2 ? 'selected' + ' ': '')}value="2">Medium</option>
<option ${(filter == 3 ? 'selected' + ' ': '')}value="3">Low</option>
</select> */

function configScreen() {
    firebase.auth().onAuthStateChanged((user) => {
        errors.forEach((err) => {
            error += err + '<br>';
        });

        if(user) {
            container.innerHTML = `
            <div class="wrapper pad">
                <nav>
                    <div class="navigation">
                        <ul>
                            <li><a onclick="changeScreen('main')">Main</a></li>
                            <li><a onclick="changeScreen('config')">Configuration</a></li>
                        </ul>
                    </div>
                    <div><button onclick="signout()" title="Sign out"><i class="fas fa-sign-out-alt"></i></button></div>
                </nav>
            </div>
            <div class="testing">

            </div>
            `;
        }


    })
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
            <div class="pri">PRI: ${data.category}</div>
        </div>
        <div class="todo-controls-edit">
            ${(data.completed == true ? '' : '<button '+ (id != selectedToEdit && model.app.edit_mode === true ? 'disabled ' : '') + 'onclick="editTodo(\''+ id +'\')">' + (id == selectedToEdit ? (model.app.edit_mode === true ? 'Save' : 'Edit') : 'Edit') + '</button>')}
            ${(data.completed == false ? '<button onclick="completeTodo(\''+id+'\');">Complete</button>' : '')}
   
            <button onclick="removeTodo('${id}')">Remove</button>
        </div>
    </div>
    `;
}


function categoryCreate(cat_name, cat_color) {
    return '<div onclick="selectCategory(\'' + cat_name + '\')" class="category-item" ><span class="color-preview ' + (model.inputs.todo_new.category == cat_name ? 'selected-category' : '') + '" style="background-color: '+ cat_color + '"></span><p>'+ cat_name +'</p></div>';
}