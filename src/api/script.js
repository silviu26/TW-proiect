function toggleForm() {
    var loginForm = document.getElementById("loginForm");
    var signupForm = document.getElementById("signupForm");

    if (loginForm.style.display === "none") {
        loginForm.style.display = "block";
        signupForm.style.display = "none";
    } else {
        loginForm.style.display = "none";
        signupForm.style.display = "block";
    }
}

function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    
    var encodedPassword = btoa(password);

   
    var formData = new FormData();
    formData.append("username", username);
    formData.append("password", encodedPassword);

    
    fetch("script.php", {
        method: "POST",
        body: formData
    })
    .then(function(response) {
        
        return response.text();
    })
    .then(function(data) {
        console.log(data); 

        if (data === "success") {
            
            window.location.href = "../explore.html";

        }
    })
    .catch(function(error) {
        console.log(error); 
    });
}

function signup() {
    var newUsername = document.getElementById("newUsername").value;
    var newPassword = document.getElementById("newPassword").value;

    
    var encodedNewPassword = btoa(newPassword);

    
    var formData = new FormData();
    formData.append("newUsername", newUsername);
    formData.append("newPassword", encodedNewPassword);

    
    fetch("script.php", {
        method: "POST",
        body: formData
    })
    .then(function(response) {
        
        return response.text();
    })
    .then(function(data) {
        console.log(data); 
    })
    .catch(function(error) {
        console.log(error); 
    });
}

