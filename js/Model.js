//server
let db = firebase.firestore();
let model = {
    app: {
        pages: ['login', 'register', 'main', 'config', 'stats'],
        on_page: 'login',
        todo_viewmode: 'panes',
        edit_mode: false,
        mobile: false,

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
        todos: '',

    }
}

let fbErrors = {
    'auth/wrong-password': 'Wrong password.',
    'auth/user-not-found': 'User was not found.',
    'auth/invalid-user-token': '',
    'auth/too-many-requests': '',
    'auth/user-disabled': '',
    'auth/invalid-email': '',


}

// local
let critError;
let error;
let response = '';
let errors = [];
let todos = [];
let container = document.getElementById('container');
let todoHTML = '';
let mode = '';
let selectedToEdit;