
function login(){
    event.preventDefault();
    let name = $('#name').val();
    let password = $('#password').val();
    let re_password = $('#re_password').val();
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
            if (password === re_password) {
                localStorage.setItem("data", JSON.stringify(data));
                let userStorage =  localStorage.getItem("data");
                let userJSON = JSON.parse(userStorage);
                let role = userJSON.roleSet[0].authority;
                switch (role) {
                    case "ROLE_ADMIN": window.location.href = "../admin/index.html"
                }



                window.location.href = "../admin/index.html"
            } else {
                $("#message").html("password not match!")
            }
        }
    })
}