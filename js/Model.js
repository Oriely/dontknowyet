//server
let db = firebase.firestore();
let model = {
    app: {
        pages: ['login', 'register', 'main', 'config', 'history', 'chat', 'profile'],
        on_page: '',
        todo_viewmode: 'list',
        edit_mode: false,
        mobile: false,

    },

    data: {
        user: {
            info: {
                
            },
            todos: {
                ongoing: {},
                completed: {} 
            },
            settings: {}
        }
    },
    inputs: {
        // register: {
        //     firstname: '',
        //     lastname: '',
        //     ''
        // },

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
        const userInformation = await db.collection('users').doc(uid).get();
        
        const todos = db.collection('todos').doc(uid);

        const ongoingTodos = await todos.collection('ongoing').get();
        
        const completedTodos = await todos.collection('completed').get();

        console.log(completedTodos.size)
        
        for(const doc of ongoingTodos.docs) {

            model.data.user.todos.ongoing[doc.id] = doc.data(); // TODO pagination? make new array of objects for every "20" todo modulo for loop --Scratched--
        }
        
        const dbSettingsRef = db.collection('user_settings').doc(uid);
        
        model.data.user.info = userInformation.data();

        
        const userSettings = await dbSettingsRef.get();
        if(userSettings.data()) {
            model.data.user.settings = userSettings.data();
        } else {
            errorHandler('Did not find user settigns.');     
        }


        
        
        

        updateScreen();
    }
    catch (error) {
        console.log(error);
    }


}

function actuallyReadableDate(date) {
    const pre = new Date(date);
    return pre.toISOString();
}




