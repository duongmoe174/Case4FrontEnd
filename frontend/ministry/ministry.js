function showListMinistry(page){
    $.ajax({
        type:"GET",
        url:`http://localhost:8080/ministry/ministries?page=${page}`,
        success: function (ministry){
            // let ministry = data.content;
            let content = '';
            for (let i = 0; i < ministry.length; i++){
                content += `<tr>
        <th scope="row">${i+1}</th>
        <td>${ministry[i].fullName}</td>
        <td>${ministry[i].phoneNumber}</td>
        <td><img src="${'http://localhost:8080/image/' + ministry[i].avatar}" width="100px"></td>
        <td>${ministry[i].email}</td>
        <td>${ministry[i].gender.name}</td>
        <td>${ministry[i].dateOfBirth}</td>
        <td>${ministry[i].address}</td>
        <td><button type="button" class="btn btn-outline-danger" onclick="deleteMinistry(${ministry[i].id})">Delete</button></td>
        <td><button type="button" class="btn btn-outline-primary" onclick="showEditFormMinistry(${ministry[i].id})" data-bs-toggle="modal" data-bs-target="#myModal1">Update</button></td>
        </tr>`
            }

            $("#list-ministry").html(content);

            let iconPage =  `<button id="first" onclick="showListMinistry(0)"><i class="fa-solid fa-backward-fast">First</i></button> 
                <button  id="backup" onclick="showListMinistry(${ministry.pageable.pageNumber} - 1)"><i class ="fa-solid fa-backward-step">Back</i></button>
                      <span> Trang </span> <span>${ministry.pageable.pageNumber +1 }/ ${ministry.totalPages}</span>
                      <button id="next" onclick="showListMinistry(${ministry.pageable.pageNumber}+1)" ><i class="fa-solid fa-forward-step">Next</i></button>
                        <button id="last" onclick="showListMinistry(${ministry.totalPages} -1)"><i class="fa-solid fa-forward-fast">Last</i></button>`
            $(`#iconPage`).html(iconPage);
            if (ministry.pageable.pageNumber === 0) {
                document.getElementById("backup").hidden = true
                document.getElementById("first").hidden = true

            }

            if (ministry.totalPages ===0 ) {
                document.getElementById("backup").hidden = true
                document.getElementById("first").hidden = true
                document.getElementById("next").hidden = true
                document.getElementById("last").hidden = true
            }

            if (ministry.pageable.pageNumber + 1 === data.totalPages) {
                document.getElementById("next").hidden = true
                document.getElementById("last").hidden = true
            }
        }
    })
}
showListMinistry();

//----------DELETE MINISTRY--------------

function deleteMinistry(id) {
    $.ajax({
        type: "DELETE",
        url: `http://localhost:8080/ministry/ministries/${id}`,
        success: function () {
            showListMinistry()
        }
    })
}

//C----------CREATE MINISTRY--------------

function showGender(){
    $.ajax({
        type:"GET",
        url:"http://localhost:8080/ministry/genders",
        success: function (genders){
            let content = ``;
            for (let i = 0; i < genders.length; i++) {
                content +=`<option value="${genders[i].id}">${genders[i].name}</option>`
            }
            $("#gender").html(content);
            $("#newGender").html(content);
        }
    })
}

function createMinistry(){
    let userName = $('#userName').val();
    let password = $('#password').val();
    let roleSet = $('#roleSet').val();
    let fullName = $('#fullName').val();
    let phoneNumber = $('#phoneNumber').val();
    let avatar = $('#avatar');
    let email = $('#email').val();
    let gender = $('#gender').val();
    let dateOfBirth = $('#dateOfBirth').val();
    let address = $('#address').val();
    let ministryForms = new FormData();
    ministryForms.append('userName',userName);
    ministryForms.append('password',password);
    ministryForms.append('roleSet',roleSet);
    ministryForms.append('fullName', fullName);
    ministryForms.append('phoneNumber', phoneNumber);
    ministryForms.append('avatar', avatar.prop('files')[0]);
    ministryForms.append('email', email);
    ministryForms.append('gender', gender);
    ministryForms.append('dateOfBirth', dateOfBirth);
    ministryForms.append('address', address);
    $.ajax({

        type: "POST",
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        url: "http://localhost:8080/ministry/ministries",
        data: ministryForms,
        success: function (){
            showListMinistry();
        }
    });
    event.preventDefault();
}


//----------FIND BY NAME OF MINISTRY--------------

function findByName(page){
    let q = $("#q").val();
    $.ajax({
        type : 'GET',
        url : `http://localhost:8080/ministry/ministries?q=${q}&page=${page}`,
        success: function (data) {
            let ministries = data.content;
            let content = '';
            for (let i = 0; i < ministries.length; i++) {
                content += `<tr>
        <th scope="row">${i + 1}</th>
        <td>${ministries[i].fullName}</td>
        <td>${ministries[i].phoneNumber}</td>
        <td><img src="${'http://localhost:8080/image/' + ministries[i].avatar}" width="100px"></td>
        <td>${ministries[i].email}</td>
        <td>${ministries[i].gender.name}</td>
        <td>${ministries[i].dateOfBirth}</td>
        <td>${ministries[i].address}</td>
        <td><button onclick="deleteStudent(${ministries[i].id})">Delete</button></td>
        <td><button type="button" onclick="showEditFormMinistry(${ministries[i].id})" data-bs-toggle="modal" data-bs-target="#myModal1">Update</button></td>
        </tr>`
            }
            $(`#list-ministry`).html(content);

            let iconPage = `<button id="first" ><i class="fa-solid fa-backward-fast">First</i></button> 
                <button  id="backup" onclick="findByName(${data.pageable.pageNumber} - 1)"><i class ="fa-solid fa-backward-step">Back</i></button>
                      <span> Trang </span> <span>${data.pageable.pageNumber +1 }/ ${data.totalPages}</span>
                      <button id="next" onclick="findByName(${data.pageable.pageNumber}+1)" ><i class="fa-solid fa-forward-step">Next</i></button>
                        <button id="last" onclick="findByName(${data.totalPages} -1)"><i class="fa-solid fa-forward-fast">Last</i></button>`
            $(`#iconPage`).html(iconPage);
            if (data.pageable.pageNumber === 0) {
                document.getElementById("backup").hidden = true
                document.getElementById("first").hidden = true

            }

            if (data.pageable.pageNumber + 1 === data.totalPages) {
                document.getElementById("next").hidden = true
                document.getElementById("last").hidden = true
            }
        }
    })
    event.preventDefault();
}


//----------UPDATE MINISTRY--------------

function updateMinistry(id){
    let userName = $('#newName').val();
    let password = $('#newPassword').val();
    let fullName = $('#newFullName').val();
    let phoneNumber = $('#newPhoneNumber').val();
    let avatar = $('#newAvatar');
    let email = $('#newEmail').val();
    let gender = $('#newGender').val();
    let dateOfBirth = $('#newDateOfBirth').val();
    let address = $('#newAddress').val();
    let ministryForm = new FormData();
    ministryForm.append('userName',userName);
    ministryForm.append('password',password);
    ministryForm.append('fullName', fullName);
    ministryForm.append('phoneNumber', phoneNumber);
    ministryForm.append('avatar', avatar.prop('files')[0]);
    ministryForm.append('email', email);
    ministryForm.append('gender', gender);
    ministryForm.append('dateOfBirth', dateOfBirth);
    ministryForm.append('address', address);


    if (avatar.prop('files')[0]=== undefined){
        let file = new File([""],"filename.jpg")
        ministryForm.append('avatar',file);
    } else {
        ministryForm.append('avatar',avatar.prop('files')[0]);
    }
    $.ajax({
        type:"POST",
        enctype: 'multipart/from-data',
        processData: false,
        contentType: false,
        data: ministryForm,
        url:`http://localhost:8080/ministry/ministries/edit/${id}`,
        success:function (){
            showListMinistry()
        }
    })
    event.preventDefault();
}

function showEditFormMinistry(id){
    let content = `<div class="container">
                    <form>

                        <div class="mb-3">
                            <label for="userName" class="form-label">User Name</label>
                            <input type="text" class="form-control" id="newUserName" >
                        </div>

                        <div class="mb-3">
                            <label for="password" class="form-label">Password</label>
                            <input type="text" class="form-control" id="newPassword" >
                        </div>

                        <div class="mb-3">
                            <label for="fullName" class="form-label">Full Name</label>
                            <input type="text" class="form-control" id="newFullName" >
                        </div>

                        <div class="mb-3">
                            <label for="phoneNumber" class="form-label">Phone number</label>
                            <input type="text" class="form-control" id="newPhoneNumber">
                        </div>

                         <div class="mb-3">
                            <label for="avatar" class="form-label">Avatar</label>
                            <div id="showAvatar"></div>
                            <input type="file" class="form-control" id="newAvatar">
                        </div>

                         <div class="mb-3">
                            <label for="email" class="form-label">Email</label>
                            <input type="email" class="form-control" id="newEmail">
                        </div>

                        <tr>
                            <div>
                                <label>Gender</label>

                                <select name="newGender" id="newGender"> </select>
                            </div>
                        </tr>

                         <div class="mb-3">
                            <label for="dateOfBirth" class="form-label">Date of Birth</label>
                            <input type="date" class="form-control" id="newDateOfBirth">
                        </div>

                         <div class="mb-3">
                            <label for="address" class="form-label">Address</label>
                            <input type="text" class="form-control" id="newAddress">
                        </div>

                        <div class="modal-footer">
                             <button type="submit" class="btn btn-primary" onclick="updateMinistry(${id})">Update</button>
                             <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                        </div>
                    </form>
                </div>`
    $("#showModalEdit").html(content);
    $.ajax({
        type:"GET",
        url:`http://localhost:8080/ministry/ministries/${id}`,
        success:function (ministry){
            $(`#newUserName`).val(ministry.appUser.name)
            $(`#newPassword`).val(ministry.appUser.password)
            $(`#newFullName`).val(ministry.fullName)
            $(`#newPhoneNumber`).val(ministry.phoneNumber)
            // let img = `<img src="http://localhost:8080/image/${ministry.avatar}" width="100">`
            let img = `<img src="${'http://localhost:8080/image/' + ministry.avatar}" width="100">`
            $(`#showAvatar`).html(img)
            $(`#newEmail`).val(ministry.email)
            $(`#newGender`).val(ministry.gender.name)
            $(`#newDateOfBirth`).val(ministry.dateOfBirth)
            $(`#newAddress`).val(ministry.address)

        }
    })
    showGender();

}
showGender();









