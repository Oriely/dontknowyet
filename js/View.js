function navbar(css) {

    return `
        <nav ${(css ? 'class="'+ css +'"' : '')}>
            <div class="navigation">
                <ul>
                    <li><a onclick="changeScreen('main')">Main</a></li>
                    <li><a onclick="changeScreen('history')">History</a></li>
                    <li><a onclick="changeScreen('chat')">Chat</a></li>
                    <li><a onclick="changeScreen('config')">Configuration</a></li>
                </ul>
            </div>
            <div>
                <span class="username">${model.data.user.info.username}</span>
                <button ${(model.app.mobile === true ? 'disabled' : '')} 
                class="switch" onclick="changeViewmode('${(model.app.todo_viewmode === 'panes' ? 'list' : 'panes')}')">
                ${(model.app.todo_viewmode === 'panes' ? '<i class="fas fa-stream"></i>' : '<i class="fas fa-columns"></i>')}
                </button>
                <button onclick="changeScreen('profile')" title="Sign out"><i class="far fa-user-circle"></i></button>
                <button onclick="signout()" title="Sign out"><i class="fas fa-sign-out-alt"></i></button>
                
                
            </div>

        </nav>
    `;
}

function loginScreen() {
    firebase.auth().onAuthStateChanged((user) => {
        if (!user) {


            container.innerHTML = `
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
            
            let html = '';

            html += `
            
                <div class="wrapper">
                
                    ${navbar()}

                    <div class="input-form">
                        <div class="input-title"><input id="" type="text" onkeyup="model.inputs.todo_new.title = this.value" value="${model.inputs.todo_new.title}" placeholder="Some title...."></div>
                        <div class="input-content"><textarea onkeyup="model.inputs.todo_new.content = this.value" value="">${model.inputs.todo_new.content}</textarea></div>
                        ${(error ? '<div class="errors">'+ error +'</div>' : '')} 
                        ${(response ? '<div class="response">' + response + '</div>' : '')}
                        <div class="todo-controls">

                            <div class="todo-controls-left">
                                <div class="categories">
                                `;
                                if(Object.keys(model.data.user.settings).length != 0 ) {
                                    if(model.data.user.settings.todo_categories.length === 0) {
                                        html += 'No categories found. Please create one to add todos.';
                             
                                    } else {
                                        for(let i = 0; i < model.data.user.settings.todo_categories.length; i++) {
                                            const cat_name = model.data.user.settings.todo_categories[i].name;
                                            const cat_color = model.data.user.settings.todo_categories[i].color;
                                            html += categoryCreate(cat_name, cat_color)
                                        }
                                        
                                        }
                                    
                                    
                                }

                            html += `
                            
                                </div>
                                <div><button onclick="addTodo()">Add todo</button></div>
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
            `;
                for(const todo in model.data.user.todos.ongoing) {
                    html += todoCreateHTML(model.data.user.todos.ongoing[todo], todo)
                } // TODO pagination maybe???

                html += `
                </div>
                </div>
                `;
                container.innerHTML = html;
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

        if(user) {
            let html = '';
            html += `
            <div class="wrapper">
                ${navbar()}
                <div class="testing">
            
            `;

            model.data.user.settings.todo_categories.forEach(cat => {
                html += `
                    <div class="config-category">
                        <div>
                        ${(!model.inputs.edit_category.edit ? '<p>'+ cat.name+ '</p>' : '<input type="te"')}
                        ${(!model.inputs.edit_category.edit ? '<p style="background-color:'+ cat.color + '">'+ cat.color + '</p>' : '<input data-jscolor="{value:\''+ cat.color + '\'}">')}
                        </div><div>
                        <!--<button onclick="editCategory('${cat.name}')">Edit</button>-->
                        
                        <button onclick="removeCategory('${cat.name}','${cat.color}')">remove category</button></div>
                    </div>
                `;
            });

            html += `
                <label>Category name:</label>
                <input oninput="model.inputs.new_category.name = this.value" type="text">
                <label>Category color:</label>
                <input onchange="model.inputs.new_category.color = this.value" data-jscolor="{value:'', position:'bottom', height:80, backgroundColor:'#333',
                palette:'rgba(0,0,0,0) #fff #808080 #000 #996e36 #f55525 #ffe438 #88dd20 #22e0cd #269aff #bb1cd4',
                paletteCols:11, hideOnPaletteClick:true}">
                <button onclick="createNewCategory()">Create new category</button>
                `;


            html += `
            </div>
            </div>
            `;

            
            container.innerHTML = html;
            jscolor.install()
        }


    })
}

function historyScreen() {
    firebase.auth().onAuthStateChanged((user) => {

        if(user) {
            let html = '';

            html += `
            <div class="wrapper">
                ${navbar()}
                <div class="completed-todos">


                    <h2>Completed todos:</h2>
                    <div class="table-labels">
                    <div></div>
                    <div>Category</div>
                    <div>Title</div>
                    <div>Content</div>
                    <div>Date completed</div>
                    <div></div>
                    </div>
                `;
                let count = 0;
                
            for (const key in model.data.user.todos.completed) {
                
                console.log('et')
                console.log(key)
                html += `

                    <div class="completed-row">
                        <div>${count}</div>
                        <div>${model.data.user.todos.completed[key].category}</div>
                        <div>${model.data.user.todos.completed[key].title}</div>
                        <div>${model.data.user.todos.completed[key].content}</div>
                        <div>${actuallyReadableDate(model.data.user.todos.completed[key].date_completed)}</div>
                        <div><button onclick="removeCompletedTodo('${key}')">Remove</button></div>
                    </div>
                `;
                count++
            }
            html += `
                </div>
            </div>
            `;

            
            container.innerHTML = html;
        }


    })
}

function chatScreen() {
    firebase.auth().onAuthStateChanged((user) => {
        if(user) {
            let html = '';

            html += `
                <div class="wrapper chat">
            `;
            html += navbar('navbar-chat-fix');
            html += `
            <div class="chat-container">

                <aside class="chat-sidebar">
                    <div>Private chats here</div>
                    <div>Group chats listed here</div>
                </aside>
            `;


            html += `
                <section class="chat-wrapper">
                    <div class="chat-messages">`;
            let x = 0
            while(x != 15){
                x++;
                html += `
                        <div class="message-wrapper">
                            <label class="message-username">${model.data.user.info.username}</label>
                            <div class="message-text">powkfpowekfpowkefpokwepk</div>
                        </div>`
            }
            html += '</div>'
            html += `
                    <div class="chat-input">
                        <div>
                            <input onkeypress="sendChatMessage(event, this.value)"  type="text">
                            <button>Send</button>
                        </div>
                    </div>
                </section>
            </div>
            `;

            html += `
                </div>
            `;

            
            container.innerHTML = html;

        }
    });
}


function profileScreen() {
    firebase.auth().onAuthStateChanged((user) => {
        if(user) {
            console.log('a');

            let html = '';
            html+= '<div class="wrapper">'
            html+= navbar();
            html+= `
                <div class="profile">
                    <div>Username: ${model.data.user.info.username}</div>
                    <div>Email: ${model.data.user.info.email}</div>
                    <div>Firstname: ${model.data.user.info.firstname}</div>

                    <div>Lastname: ${model.data.user.info.lastname}</div>
                </div>
            `;
            html += '</div>'
            container.innerHTML = html;
        }
    });
}

function getcolorpicker() {
    return ``
     // recognizes new inputs and installs jscolor on them
}


function todoCreateHTML(data, id) {
    return `
    <div class="todo-wrapper" data-key="${id}" style="background-color: ${getCategory(data.category)}">
        <div class="todo-title">${(model.app.edit_mode == 'edit' && id == model.inputs.todo_edit.selectedToEdit ? '<input class="edit" type="text" onkeyup="model.inputs.todo_edit.title = this.value" value="' + data.title +'">' : '<h1>' + data.title + '</h1>')}</div>
        <div class="todo-dates"> 
            <span>Added: ${actuallyReadableDate(data.date_created)}</span>
            <span>${(data.date_completed != '' ? 'Completed: ' + actuallyReadableDate(data.date_completed) : '')}</span>
            <span>${(data.date_edited != '' ? 'Edited: ' + actuallyReadableDate(data.date_edited) : '')}</span>
        </div>
        <div class="todo-content">  
            ${(model.app.edit_mode == 'edit' && id == selectedToEdit ? '<textarea class="edit" onkeyup="model.inputs.todo_edit.content = this.value">'+ data.content + '</textarea>' : data.content)}
            <br>
            <div class="pri">Category: ${data.category}</div>
        </div>
        <div class="todo-controls-edit">
            ${(data.completed == true ? '' : '<button '+ (id != model.inputs.todo_edit.selectedToEdit && model.app.edit_mode === true ? 'disabled ' : '') + 'onclick="editTodo(\''+ id +'\')">' + (id == model.inputs.todo_edit.selectedToEdit1 ? (model.app.edit_mode === true ? 'Save' : 'Edit') : 'Edit') + '</button>')}
            ${(data.completed == false ? '<button onclick="completeTodo(\''+id+'\');">Complete</button>' : '')}
   
            <button onclick="removeTodo('${id}')">Remove</button>
        </div>
    </div>
    `;
}


function categoryCreate(cat_name, cat_color) {
    return '<div onclick="selectCategory(\'' + cat_name + '\')" class="category-item" ><span class="color-preview ' + (model.inputs.todo_new.category == cat_name ? 'selected-category' : '') + '" style="background-color: '+ cat_color + ';"></span><p>' + (model.inputs.todo_new.category == cat_name ? '<u>' + cat_name + '</u>' : cat_name) + '</p></div>';
}

function getCategory(cat) {
    console.log(cat)
    if(cat) {
        for(let x = 0; x < model.data.user.settings.todo_categories.length; x++) {
            if(model.data.user.settings.todo_categories[x].name == cat) {
                
                return model.data.user.settings.todo_categories[x].color;
            }
        }
    } else return '';
}


