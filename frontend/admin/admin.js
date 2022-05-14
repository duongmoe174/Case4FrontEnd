
let data = localStorage.getItem("data");
if (data == null){
    window.location.href = "../login/login.html"
}
else {
    let obj = JSON.parse(data);
    let name = obj.name;
    console.log(name);
    $('#nameUser').html(name)
    let token = obj.accessToken;
    console.log(token);
    getAdmin(token);
}

function getAdmin(token){
    $.ajax({
        headers:{
            'Authorization': 'Bearer '+ token,
            'Access-control-allow-origin': '*'
        },
        type: "GET",
        url:"http://localhost:8080/admin",
        success: function (data){
            console.log(data)
        }
    })
}