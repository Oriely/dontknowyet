//server
let db = firebase.database();
let db_ref = db.ref();

let model = {
    app: {    
        on_page: '',
        todo_viewmode: 'panes',
        todo_categories: [
            {color:red, ''}
        ],
    },

    inputs: {
        todo_new: {
            input_title: '',
            input_priority: '',
            input_content: '',
        },
        todo_edit: {
            input_edit_title: '',
            input_edit_priority: '',
            input_edit_content: '',
        }
    }
}




// local
let critError;
let error;
let todos = [];
let container = document.getElementById('container');
let todoHTML = '';

let todoHTML_all = '';
let todoHTML_low = '';
let todoHTML_med = '';
let todoHTML_high = '';


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






