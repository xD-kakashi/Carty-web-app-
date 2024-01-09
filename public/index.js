var itemsDB;
var user_id;


import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js'
import{ getDatabase, ref, push, onValue, remove } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';

const appSettings = {
    databaseURL: "https://carty-c96d8-default-rtdb.asia-southeast1.firebasedatabase.app/",
    apiKey: "AIzaSyCD0GVyT7NFcsF-UCt9dHk753bRZNmhbwo",
    authDomain: "carty-c96d8.firebaseapp.com",
    projectId: "carty-c96d8",
    storageBucket: "carty-c96d8.appspot.com",
    messagingSenderId: "192709310913",
    appId: "1:192709310913:web:01f48cb77aed7de229d740"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);


console.log(app)

const inputField = document.getElementById('input-field');
const addButton = document.getElementById('add-button');
addButton.addEventListener("click", addToDB);

function addToDB () {
    let inputVal = inputField.value;
    if (inputVal.length>0) {
        push(itemsDB, inputVal);
        console.log(`${inputVal} added to database`);
        clearInput();
    }
    else {
        let invalid = document.getElementById('input-field');
        invalid.classList.add('shake')
        invalid.addEventListener('animationend', () => {
            invalid.classList.remove('shake')
        })
    }
}

function clearInput () {
    inputField.value = "";
}

function fetchItems() {
    if (itemsDB) {
        onValue(itemsDB, function(snapshot) {
            if (snapshot.exists()) {
                let itemList = Object.entries(snapshot.val())
                document.getElementById('cart-items').innerHTML = "";
                for (let i of itemList) {
                    let curItem = i;
                    console.log(curItem)
                    addItem(curItem);
                }
            }
            else {
                document.getElementById('cart-items').innerHTML = "";
            }
        })
    }
}
function addItem (val) {
    let curItemKey = val[0]
    let curItemVal = val[1]
    var cart = document.getElementById('cart-items')
    var item = document.createElement('li');
    item.classList.add('cart-item')
    item.innerHTML = curItemVal;
    cart.appendChild(item);
    user_id = document.getElementById('user-id').innerHTML; 
    item.addEventListener('click', function() {
        let itemLoc = ref(database, `${user_id}/${curItemKey}`)
        remove(itemLoc)
    })
}
function dataLoad() {
    try {
        user_id = document.getElementById('user-id').innerHTML;
        console.log(user_id)
        itemsDB = ref(database, `${user_id}`);
        console.log(itemsDB)
        fetchItems()
    } catch (error) {
        showAlert('Please reload.')
    }
}


window.addEventListener('load', () => {
    setTimeout(clickButton, '500')
})

document.getElementById('load-button').addEventListener('click',dataLoad)

function clickButton() {
    document.getElementById('load-button').click()
}
