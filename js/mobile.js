if(window.innerWidth <= 700) {
    model.app.mobile = true; 
    model.app.todo_viewmode = 'list';
}

window.addEventListener('resize',function (e) {
    if (window.innerWidth <= 700) {
        model.app.mobile = true; 
        updateScreen();
    }

});