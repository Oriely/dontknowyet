function keyGen() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

function errorHandler(err) {
    errors.push(err);
}

function clearErrors() {
    errors = [];
    error =  '';
}
