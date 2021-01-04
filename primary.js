updateScreen();

function updateScreen() {
    // high to low
    
    todoHTML = '';
    todos = [];

    if (filter === 0) {
        data.orderByChild("priority").on("child_added", snapshot => {

            let to = snapshot.val()
            let to_key = snapshot.key;
            todos.push(todoCreateHTML(to, to_key));     
            for(let x = 0; x < todos.length; x++) {
                todoHTML += todos[x];
            }   
                mainScreen();
            });
            
            
    }
    if(filter === 1 || filter === 2 || filter === 3) {
        data.orderByChild("priority").equalTo(filter).on("child_added", snapshot => {

            
            let to = snapshot.val()
            let to_key = snapshot.key;
    
            todos.push(todoCreateHTML(to, to_key)) ;        
            for(let x = 0; x < todos.length; x++) {
                todoHTML += todos[x];
            }
            
            mainScreen()
           
            });
    }
    if(sorting == 1 || sorting == 2) {

    }

    

}


function errorHandler(err) {

    if(err === 1) { critError = 'Error ' + err + ' Reference database is missing.'; }

    if(err === 2) { critError = '' }

    container.innerHTML = critError;
}

function filterTodos(a) {
    mode = '';
    filter = parseInt(a.value);
    sorting = ''


    updateScreen();
}

function sortTodos(a) {
    // mode = '';
    // filter = '';
    // sorting = a.value;
    
    updateScreen();
}



function hideErrors() {
    errors = '';
    updateScreen();
}
