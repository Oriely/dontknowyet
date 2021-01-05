function keyGen() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

// function checkId(a) {
//     if (Object.keys(todos).length < 0) {
//         for (keys in todos) {
//             return (todos[keys].id === a)
//         }
//     } else return false;

// }

function genId() {
    let new_id = Math.floor(Math.random() * Math.floor(Math.random() * Date.now()));
    // return (checkId(new_id) === false ? new_id : Math.floor(Math.random() * Math.floor(Math.random() * Date.now())));
    return new_id;
}

