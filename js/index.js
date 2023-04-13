"use strict";
// signup variables\
 let  signupName=document.getElementById("signupName");
 let  signupEmail=document.getElementById("signupEmail");
 let  signupPassword=document.getElementById("signupPassword");

// login variables\

 let  signinEmail=document.getElementById("signinEmail");
 let  signinPassword=document.getElementById("signinPassword");

// shared
let customers;
if (localStorage.getItem('customers') == null) {
    customers = [];
} else {
    customers = JSON.parse(localStorage.getItem('customers'));
}
// to get local url
// var pathparts = location.pathname.split('/');
// var baseURL = ''
// for (var i = 0; i < pathparts.length - 1; i++) {
//     baseURL += '/' + pathparts[i]
// }

// signUp
// to add the validat new user to the users array (not empty&unique e-mail)
function signUp() {
    if (signupEmpty() == false) {
        document.getElementById('exist').innerHTML = '<span class="text-danger m-3">All inputs is required</span>'
        return false
    }
    if(EmailExist()==false){
        document.getElementById('exist').innerHTML = '<span class="text-danger m-3">email already exists</span>'
    }else{
        let newCustomer = {
            name: signupName.value,
            email: signupEmail.value,
            password: signupPassword.value,
        }
    customers .push(newCustomer);
    localStorage.setItem("customers", JSON.stringify(customers));
    console.log(customers);

    document.getElementById('exist').innerHTML = '<span class="text-success m-3">Success</span>'
    
        clearForm();
    }
  
}

function clearForm() {
    signupName.value = "";
    signupEmail.value = "";
    signupPassword.value = "";
}
// to check if there is an empty input
function signupEmpty() {
    if (signupName.value == "" || signupEmail.value == "" || signupPassword.value == "") {
    return false
    } else {
   return true
    }
}
// to check if there is adublicated e-mail 

function EmailExist() {
    for (var i = 0; i < customers.length; i++) {
        if (customers[i].email.toLowerCase() == signupEmail.value.toLowerCase()) {
            return false
        }
    }
}

// signin
// to check if e-mail or passwword is empty 
function loginEmpty() {
    if (signinEmail.value == "" || signinPassword.value == "") {
    return false
    } else {
   return true
    }
}
// to 
function login() {
    if (loginEmpty() == false) {
        document.getElementById('incorrect').innerHTML = '<span class="text-danger m-3">All inputs is required</span>'
        return false
    }
    let password = signinPassword.value
    let email = signinEmail.value
    for (let i = 0; i < customers.length; i++) {
        if (customers[i].email.toLowerCase() == email.toLowerCase() && customers[i].password.toLowerCase() == password.toLowerCase()) {
            localStorage.setItem('sessionUsername', customers[i].name)
            document.getElementById('incorrect').innerHTML = '<span class="p-2 text-success">success</span>'
            console.log('success')
             window.open("welcome.html")
            // if (baseURL == '/') {
            //     location.replace('https://' + location.hostname + '/welcome.html')

            // } else {
            //     location.replace(baseURL + '/welcome.html')

            // }
        } else {
            document.getElementById('incorrect').innerHTML = '<span class="p-2 text-danger">incorrect email or password</span>'
        }
    }

}
// welcome+username
let username = localStorage.getItem('sessionUsername')
if (username) {
    document.getElementById('username').innerHTML = "Welcome " + username;
}

function logout() {
    localStorage.removeItem('sessionUsername');
    window.open("index.html");
   
}

