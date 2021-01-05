//server
let db = firebase.database();
let db_ref = db.ref();



// local
let critError;
let todos = [];
let container = document.getElementById('container');
let todoHTML = '';
let input_title = '';
let input_content = '';
let input_priority = '';
let errors = '';
let mode = '';
let selectedToEdit = '';
let input_title_edit = '';
let input_content_edit = '';
let priority = [1, 2, 3];
let filter = 0;
let sorting = 1;

