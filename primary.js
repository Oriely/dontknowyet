


function errorHandler(err, i) {

    if(err === 1) { critError = 'Error ' + err + ' Reference database is missing.'; container.innerHTML = critError;}

    if(err === 2) { critError = ''; container.innerHTML = critError;}

    if(err === 3) { error = 'Something went wrong while trying to send data.' }
    if(err === 4) { error = 'Missing inputs...'}


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
