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

    data: {
        user: {
            todos: {

            },
            settings: {}
        }
    },
    inputs: {
        todo_new: {
            title: '',
            category: '',
            content: '',
        },
        todo_edit: {
            mode: '',
            selectedToEdit: '',
            title: '',
            category: '',
            content: '',
        },
        new_category: {
            name: '',
            color: ''
        },
        edit_category: {
            edit: false,
            selectedToEdit: '',
            name: '',
            color: ''
        }
    },

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

async function getData(uid) {
    try {
        container.innerHTML += `
        <div class="loader-container">
            <div class="loader-box">
                <div class="loader-circle-three">
                    <div class="loader-circle-two">
                        <div class="loader-circle-one"></div>
                    </div>
            </div>
        </div>
        `;
        const dbTodoRef = db.collection('todos').doc(uid).collection('ongoing');
        const todoData = await dbTodoRef.get();
        const dbSettingsRef = db.collection('user_settings').doc(uid);
        const userSettings = await dbSettingsRef.get();
        model.data.user.todos = [];

        for(const test of todoData.docs) {
            model.data.user.todos[test.id] = test.data();
        }

        model.data.user.settings = userSettings.data();
        updateScreen();
    }
    catch (error) {
        console.log(error);
        updateScreen();
    }


}

function actuallyReadableDate(date) {
    const pre = new Date(date);
    return pre.toISOString();
}

