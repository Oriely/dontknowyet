


function errorHandler(err) {

    if(err === 1) { critError = 'Error ' + err + ' Reference database is missing.'; container.innerHTML = critError;}

    if(err === 2) { critError = ''; container.innerHTML = critError;}

    if(err === 3) { error = 'Missing inputs...'}

    
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
