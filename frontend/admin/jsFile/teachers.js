function getGender() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/admin/genders",
        success: function (genders) {
            let result = "";
            for (let i = 0; i < genders.length; i++) {
                result += `<option value="${genders[i].id}">${genders[i].name}</option>`

            }
            $("#createGenderTC").html(result);
            $("#editGenderTC").html(result);
        }
    })
}

getGender();

function getRole() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/admin/roles",
        success: function (roles) {
            let result = "";
            for (let i = 0; i < roles.length; i++) {
                result += `<option value="${roles[i].id}">${roles[i].name}</option>`
            }
            $("#createRoleSetTC").html(result);
            $("#editRoleSetTC").html(result);
        }
    })
}

getRole();

function getClasses() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/admin/classesSelect",
        success: function (classes) {
            let result = "";
            for (let i = 0; i < classes.length; i++) {
                result += `<option value="${classes[i].id}">${classes[i].name}</option>`;
            }
            $("#createClassTC").html(result);
            $("#editClassTC").html(result);
        }
    })
}

getClasses();

function showListTeacher(page) {
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/admin/teachers?page=${page}`,
        success: function (data) {
            let teachers = data.content;
            let content = "";
            for (let i = 0; i < teachers.length; i++) {
                content += `<tr>
                <td>${teachers[i].id}</td>
                <td>${teachers[i].fullName}</td>
                <td>${teachers[i].phoneNumber}</td>
                <td><img src="${'http://localhost:8080/image/' + teachers[i].avatar}" style="width: 80px"></td>
                <td>${teachers[i].email}</td>
                <td>${teachers[i].gender.name}</td>
                <td>${teachers[i].address}</td>
               <td><button class="btn-action btn-edit" role="button" data-bs-toggle="modal" data-bs-target="#edit_modalTeacher" onclick="showFormEditTeacher(${teachers[i].id})">Edit</button></td>
                    <td><a href="${teachers[i].id}" onclick="deleteTeacher(this)"><button class="btn-action btn-delete">Delete</button></a></td>
                </tr>`
            }
            $("#listTeacher").html(content);
            let iconPage = `<button id="first" onclick="showListTeacher(0)"><i class="fa-solid fa-backward-fast">First</i></button> 
                <button  id="backup" onclick="showListTeacher(${data.pageable.pageNumber} - 1)"><i class ="fa-solid fa-backward-step">Back</i></button>
                      <span> Trang </span> <span>${data.pageable.pageNumber + 1}/ ${data.totalPages}</span>
                      <button id="next" onclick="showListTeacher(${data.pageable.pageNumber}+1)" ><i class="fa-solid fa-forward-step">Next</i></button>
                        <button id="last" onclick="showListTeacher(${data.totalPages} -1)"><i class="fa-solid fa-forward-fast">Last</i></button>`
            $(`#iconPageTeacher`).html(iconPage);

            if (data.pageable.pageNumber === 0) {
                document.getElementById("backup").hidden = true
                document.getElementById("first").hidden = true

            }
            if (data.totalPages === 0) {
                document.getElementById("backup").hidden = true
                document.getElementById("first").hidden = true
                document.getElementById("next").hidden = true
                document.getElementById("last").hidden = true
            }
            if (data.pageable.pageNumber + 1 === data.totalPages) {
                document.getElementById("next").hidden = true
                document.getElementById("last").hidden = true
            }
        }
    })
}

showListTeacher();

function showCreateForm() {
    event.preventDefault();
    let footer = `<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" onclick="createTeacher()">Save</button>`;
    $("#create_footer").html(footer);
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/admin/teachers",
        success: function () {
        }
    })
}

function createTeacher() {
    event.preventDefault();
    let username = $("#createUsernameTC").val();
    let password = $("#createPasswordTC").val();
    let roleSet = $("#createRoleSetTC").val();
    let fullName = $("#createFullNameTC").val();
    let phoneNumber = $("#createPhoneNumberTC").val();
    let avatar = $("#createAvatarTC")
    let email = $("#createEmailTC").val();
    let gender = $("#createGenderTC").val();
    let dateOfBirth = $("#createDateOfBirthTC").val();
    let address = $("#createAddressTC").val();
    let classes = $("#createClassTC").val();
    let teacherForm = new FormData();
    teacherForm.append("userName", username);
    teacherForm.append("password", password);
    teacherForm.append("roleSet", roleSet);
    teacherForm.append("fullName", fullName);
    teacherForm.append("phoneNumber", phoneNumber);
    teacherForm.append("avatar", avatar.prop("files")[0]);
    teacherForm.append("email", email);
    teacherForm.append("gender", gender);
    teacherForm.append("dateOfBirth", dateOfBirth);
    teacherForm.append("address", address);
    teacherForm.append("classes", classes);
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/admin/teachers",
        data: teacherForm,
        enctype: "multipart/from-data",
        processData: false,
        contentType: false,
        success: function () {
            $("#create_modalTeacher").modal('hide');
            $("#createUsernameTC").val("");
            $("#createPasswordTC").val("");
            $("#createFullNameTC").val("");
            $("#createPhoneNumberTC").val("");
            $("#createEmailTC").val("");
            $("#createDateOfBirthTC").val("");
            $("#createAddressTC").val("");
            showListTeacher();
        }
    })
}

function showFormEditTeacher(id) {
    let footer = `<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" onclick="editTeacher(${id})">Save</button>`;
    $("#edit_footerTeacher").html(footer);
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/admin/teachers/${id}`,
        success: function (teacher) {
            let img = `<img src="${'http://localhost:8080/image/' + teacher.avatar}" style="width: 80px">`;
            $("#editUsernameTC").val(teacher.appUser.name);
            $("#editPasswordTC").val(teacher.appUser.password);
            $("#editRoleSetTC").val(teacher.appUser.roleSet);
            $("#editFullNameTC").val(teacher.fullName);
            $("#editPhoneNumberTC").val(teacher.phoneNumber);
            $("#showImgTC").html(img);
            $("#editEmailTC").val(teacher.email);
            $("#editGenderTC").val(teacher.gender.name);
            $("#editDateOfBirthTC").val(teacher.dateOfBirth);
            $("#editAddressTC").val(teacher.address);
            $("#editClassTC").val(teacher.classes.name);
        }
    })
}

function editTeacher(id) {
    event.preventDefault();
    let username = $("#editUsernameTC").val();
    let password = $("#editPasswordTC").val();
    let roleSet = $("#editRoleSetTC").val();
    let fullName = $("#editFullNameTC").val();
    let phoneNumber = $("#editPhoneNumberTC").val();
    let avatar = $("#editAvatarTC")
    let email = $("#editEmailTC").val();
    let gender = $("#editGenderTC").val();
    let dateOfBirth = $("#editDateOfBirthTC").val();
    let address = $("#editAddressTC").val();
    let classes = $("#editClassTC").val();
    let teacherForm = new FormData();
    teacherForm.append("userName", username);
    teacherForm.append("password", password);
    teacherForm.append("roleSet", roleSet);
    teacherForm.append("fullName", fullName);
    teacherForm.append("phoneNumber", phoneNumber);
    teacherForm.append("avatar", avatar.prop("files")[0]);
    teacherForm.append("email", email);
    teacherForm.append("gender", gender);
    teacherForm.append("dateOfBirth", dateOfBirth);
    teacherForm.append("address", address);
    teacherForm.append("classes", classes);
    $.ajax({
        type: "POST",
        url: `http://localhost:8080/admin/teachers/edit/${id}`,
        data: teacherForm,
        enctype: "multipart/from-data",
        processData: false,
        contentType: false,
        success: function () {
            $("#edit_modalTeacher").modal('hide');
            showListTeacher();
        }
    })
}

function deleteTeacher(element) {
    event.preventDefault();
    let teacherId = element.getAttribute("href");
    if (confirm("Yes") === true) {
        $.ajax({
            type: "DELETE",
            url: `http://localhost:8080/admin/teachers/${teacherId}`,
            success: function () {
                showListTeacher();
            }
        })
    } else {
        window.location.href = "../admin/teacher.html";
    }
}