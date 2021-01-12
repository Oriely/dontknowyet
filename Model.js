//server
let db = firebase.database();
let db_ref = db.ref();

let model = {
    app: {
        on_page: '',
        todo_viewmode: 'panes',
        todo_categories: [
            { name: 'personal', color: 'red' },
            { name: 'work', color: '#CCC' },
            { name: 'testin', color: 'blue' },
            { name: 'help', color: 'yellow' },
            { name: 'kkok', color: 'brown' }
        ],
        edit_mode: false,

    },

    inputs: {
        todo_new: {
            title: '',
            category: '',
            content: '',
        },
        todo_edit: {
            title: '',
            category: '',
            content: '',
        }
    },
    tmpHTML: {
        
        todo_low: '',

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






