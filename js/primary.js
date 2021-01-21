


function errorHandler(err) {
    error = err;
    updateScreen();

    // if(err === 3) { error = 'Something went wrong while trying to send data.' }
    // if(err === 4) { error = 'Missing inputs...'}


}

function filterTodos(a) {
    mode = '';
    filter = parseInt(a.value);
    sorting = ''


    updateScreen();
}




function hideErrors() {
    error = '';
    updateScreen();
}
