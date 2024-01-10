// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, setPersistence } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCD0GVyT7NFcsF-UCt9dHk753bRZNmhbwo",
  authDomain: "carty-c96d8.firebaseapp.com",
  databaseURL: "https://carty-c96d8-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "carty-c96d8",
  storageBucket: "carty-c96d8.appspot.com",
  messagingSenderId: "192709310913",
  appId: "1:192709310913:web:01f48cb77aed7de229d740"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
console.log(app)
let flag;
//----- Login code start	
document.getElementById("login").addEventListener("click", function() {
    var email =  document.getElementById("login_email").value;
    var password = document.getElementById("login_password").value;

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
        window.localStorage.setItem('userID', user.uid);
        showAlert(`&#10004; &nbsp;`+ user.email + "&nbsp; Login successful!");
        flag = "success"
        
        // document.getElementById('logout').style.display = 'block';
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        showAlert(errorMessage)
        flag = "error"
    });		  		  
});

//----- End
function showAlert(message) {
    let alertBox = document.createElement('div')
    alertBox.classList.add('alert-box')
    alertBox.id = "alert";
    alertBox.innerHTML = message;
    document.body.appendChild(alertBox)
    alertBox.addEventListener('animationend', function() {
        alertBox.classList.add('disappear')
        if (flag == "success") {
            window.location.href = "home.html";
        }
    })
}
