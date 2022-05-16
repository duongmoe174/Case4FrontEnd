function login() {
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
        success: function (data) {
            if (password === re_password) {
                localStorage.setItem("data", JSON.stringify(data));
                let dataStorage = localStorage.getItem("data");
                let dataJSON = JSON.parse(dataStorage);
                let role = dataJSON.roles[0].authority;
                switch (role) {
                    case "ROLE_ADMIN":
                        window.location.href = "../admin/index.html";
                        break;
                    case "ROLE_TEACHER" :
                        window.location.href = "../teacher/listClass.html";
                        break;
                    case "ROLE_STUDENT" :
                        window.location.href = "../student/student.html";
                        break
                    default:
                        window.location.href = "../login/login.html";
                        break;
                }
            } else {
                $("#message").html("password not match!")
            }
        }
    })
}