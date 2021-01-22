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

function getValueOf(key, p) {
    firebase.database().ref('todos/' + key).once('value').then((snapshot) => {
        return snapshot.val()[p];
    });
}

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

function loadTodos(uid) {
    db.collection('todos').doc(uid).collection('ongoing').where("completed" , "==", false)
    .get()
    .then(function(snap) {
        snap.forEach(function(doc) {
            console.log(doc.id, " => ", doc.data());
        });
    })
    .catch(function(err) {
        console.log(err);
    });

}