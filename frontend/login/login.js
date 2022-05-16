
function login(){
    event.preventDefault();
    let name = $('#name').val();
    let password = $('#password').val();
    let user = {
        "name": name,
        "password": password
    }

    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        url: "http://localhost:8080/login",
        data: JSON.stringify(user),
        success: function (data){
            localStorage.setItem("data", JSON.stringify(data));
            window.location.href = "../admin/index.html"
        }
    })
}

function checkConfirmPassword () {
    let password = $("#password").val();
    let confirmPassword = $("#confirmPassword").val();
    if (password===confirmPassword) {
        $("#resultPassword").html("<span style='color: green'>Matched!</span>")
    } else {
        $("#resultPassword").html("<span style='color: red'>Matched!</span>")
    }
}