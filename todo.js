// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-analytics.js";
import { getDatabase, ref, set, push, onChildAdded, remove } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCOBEr5TgBdpCkH6Z4qLuoEEE3CagAwADE",
    authDomain: "todo-2-d3a20.firebaseapp.com",
    projectId: "todo-2-d3a20",
    storageBucket: "todo-2-d3a20.appspot.com",
    messagingSenderId: "205035917205",
    appId: "1:205035917205:web:f0c0a95c3f7d88121c709c",
    measurementId: "G-Z9P20TBWR8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase();

var arr = []
var inp = document.getElementById("inp")
var parent = document.getElementById("parent")

window.addData = function () {
    var refere;
    var obj = {
        task: inp.value,
    }
    console.log(obj)
    const keyrefer = ref(db, `task/`)
    obj.id = push(keyrefer).key
    refere = ref(db, `task/${obj.id}`)
    set(refere, obj)
    inp.value = ''
    getData()
}

window.render = function () {
    console.log(arr)
    parent.innerHTML = ''
    arr.forEach((data) => {
        parent.innerHTML += `<ul class="container fs-5 text-white"> 
        <li  >${data.task} <br> <button onclick="delData('${data.id}')" class="btn btn-danger">Delete</button> </li>
        </ul>`
    })
}

window.delData = function (e) {
    console.log(e)
    if (arr.length == "") {
        alert("no any task in firebase ")
        parent.innerHTML = ""
    } else {
        const del = ref(db, `task/${e}`)
        remove(del)
        getData()
        console.log(arr)
    }
}

window.getData = function () {
    arr = []
    const refer = ref(db, `task`)
    onChildAdded(refer, (data) => {
        console.log(data.val())
        arr.push(data.val())
        console.log(arr)
        render()
    })
}
getData()