function showListStudent(page){
    $.ajax({
        type:"GET",
        url:`http://localhost:8080/students?page=${page}`,
        success: function (data){
            let student = data.content;
            let content = '';
            for (let i = 0; i < student.length; i++){
                content += `<tr>
        <th scope="row">${i+1}</th>
        <td>${student[i].code}</td>
        <td>${student[i].fullName}</td>
        <td>${student[i].phoneNumber}</td>
        <td><img src="${'http://localhost:8080/image/' + student[i].avatar}" width="100px"></td>
        <td>${student[i].email}</td>
        <td>${student[i].gender.name}</td>
        <td>${student[i].dateOfBirth}</td>
        <td>${student[i].address}</td>
        <td>${student[i].classes.name}</td>
        <td>${student[i].tuition.name}</td>
        <td>${student[i].statusStudent.name}</td>
        <td><button type="button" class="btn btn-outline-danger" onclick="deleteStudent(${student[i].id})">Delete</button></td>
        <td><button type="button" class="btn btn-outline-primary" onclick="showEditFormStudent(${student[i].id})" data-bs-toggle="modal" data-bs-target="#myModal1">Update</button></td>
        </tr>`
            }

            $("#list-student").html(content);

            let iconPage =  `<button id="first" onclick="showListStudent(0)"><i class="fa-solid fa-backward-fast">First</i></button> 
                <button  id="backup" onclick="showListStudent(${data.pageable.pageNumber} - 1)"><i class ="fa-solid fa-backward-step">Back</i></button>
                      <span> Trang </span> <span>${data.pageable.pageNumber +1 }/ ${data.totalPages}</span>
                      <button id="next" onclick="showListStudent(${data.pageable.pageNumber}+1)" ><i class="fa-solid fa-forward-step">Next</i></button>
                        <button id="last" onclick="showListStudent(${data.totalPages} -1)"><i class="fa-solid fa-forward-fast">Last</i></button>`
            $(`#iconPage`).html(iconPage);
            if (data.pageable.pageNumber === 0) {
                document.getElementById("backup").hidden = true
                document.getElementById("first").hidden = true

            }

            if (data.totalPages ===0 ) {
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
showListStudent();

//DELETE STUDENT.................................................

function deleteStudent(id) {
    $.ajax({
        type: "DELETE",
        url: `http://localhost:8080/students/delete/${id}`,
        success: function () {
            showListStudent()
        }
    })
}

//CREATE STUDENT..................................................

function showClass(){
    $.ajax({
        type:"GET",
        url:"http://localhost:8080/admin/classes",
        success: function (classes){
            let content = `<option disabled>Choose...</option>`;
            for (let i = 0; i < classes.length; i++) {
                content +=`<option value="${classes[i].id}">${classes[i].name}</option>`
            }
            $("#classes").html(content);
            $("#u-classes").html(content);
        }
    })
}


function showGender(){
    $.ajax({
        type:"GET",
        url:"http://localhost:8080/students/genders",
        success: function (genders){
            let content = `<option disabled>Choose...</option>`;
            for (let i = 0; i < genders.length; i++) {
                content +=`<option value="${genders[i].id}">${genders[i].name}</option>`
            }
            $("#gender").html(content);
            $("#u-gender").html(content);
        }
    })
}

function showTuition(){
    $.ajax({
        type:"GET",
        url:"http://localhost:8080/students/tuitions",
        success: function (tuitions){
            let content = `<option disabled>Choose...</option>`;
            for (let i = 0; i < tuitions.length; i++) {
                content +=`<option value="${tuitions[i].id}">${tuitions[i].name}</option>`
            }
            $("#tuition").html(content);
            $("#u-tuition").html(content);
        }
    })
}

function showStatus(){
    $.ajax({
        type:"GET",
        url:"http://localhost:8080/students/status",
        success: function (statuses){
            let content = `<option disabled>Choose...</option>`;
            for (let i = 0; i < statuses.length; i++) {
                content +=`<option value="${statuses[i].id}">${statuses[i].name}</option>`
            }
            $("#statusStudent").html(content);
            $("#u-statusStudent").html(content);
        }
    })
}

function createStudent(){
    let code = $('#code').val();
    let fullName = $('#fullName').val();
    let phoneNumber = $('#phoneNumber').val();
    let avatar = $('#avatar');
    let email = $('#email').val();
    let gender = $('#gender').val();
    let dateOfBirth = $('#dateOfBirth').val();
    let address = $('#address').val();
    let classes = $('#classes').val();
    let tuition = $('#tuition').val();
    let statusStudent = $('#statusStudent').val();
    let studentForms = new FormData();
    studentForms.append('code', code);
    studentForms.append('fullName', fullName);
    studentForms.append('phoneNumber', phoneNumber);
    studentForms.append('avatar', avatar.prop('files')[0]);
    studentForms.append('email', email);
    studentForms.append('gender', gender);
    studentForms.append('dateOfBirth', dateOfBirth);
    studentForms.append('address', address);
    studentForms.append('classes', classes);
    studentForms.append('tuition', tuition);
    studentForms.append('statusStudent', statusStudent);

    $.ajax({

        type: "POST",
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        url: "http://localhost:8080/students",
        data: studentForms,
        success: function (){
            showListStudent()
        }
    });
    event.preventDefault();
}


//FIND_BY_NAME................................................

function findByName(page){
    let q = $("#q").val();
    $.ajax({
        type : 'GET',
        url : `http://localhost:8080/students?q=${q}&page=${page}`,
        success: function (data) {
            let students = data.content;
            let content = '';
            for (let i = 0; i < students.length; i++) {
                content += `<tr>
        <th scope="row">${i + 1}</th>
        <td>${students[i].code}</td>
        <td>${students[i].fullName}</td>
        <td>${students[i].phoneNumber}</td>
        <td><img src="${'http://localhost:8080/image/' + students[i].avatar}" width="100px"></td>
        <td>${students[i].email}</td>
        <td>${students[i].gender.name}</td>
        <td>${students[i].dateOfBirth}</td>
        <td>${students[i].address}</td>
        <td>${students[i].classes.name}</td>
        <td>${students[i].tuition.name}</td>
        <td>${students[i].statusStudent.name}</td>
        <td><button onclick="deleteStudent(${students[i].id})">Delete</button></td>
        <td><button type="button" onclick="showEditFormStudent(${students[i].id})" data-bs-toggle="modal" data-bs-target="#myModal1">Update</button></td>
        </tr>`
            }
            $(`#list-student`).html(content);

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


//UPDATE_STUDENT..............................................

function updateStudent(id){
    let code = $('#u-code').val();
    let fullName = $('#u-fullName').val();
    let phoneNumber = $('#u-phoneNumber').val();
    let avatar = $('#u-avatar');
    let email = $('#u-email').val();
    let gender = $('#u-gender').val();
    let dateOfBirth = $('#u-dateOfBirth').val();
    let address = $('#u-address').val();
    let classes = $('#u-classes').val();
    let tuition = $('#u-tuition').val();
    let statusStudent = $('#u-statusStudent').val();
    let studentForm = new FormData();
    studentForm.append('code', code);
    studentForm.append('fullName', fullName);
    studentForm.append('phoneNumber', phoneNumber);
    studentForm.append('avatar', avatar.prop('files')[0]);
    studentForm.append('email', email);
    studentForm.append('gender', gender);
    studentForm.append('dateOfBirth', dateOfBirth);
    studentForm.append('address', address);
    studentForm.append('classes', classes);
    studentForm.append('tuition', tuition);
    studentForm.append('statusStudent', statusStudent);

    if (avatar.prop('files')[0]=== undefined){
        let file = new File([""],"filename.jpg")
        studentForm.append('avatar',file);
    } else {
        studentForm.append('avatar',avatar.prop('files')[0]);
    }
    $.ajax({
        type:"POST",
        enctype: 'multipart/from-data',
        processData: false,
        contentType: false,
        data: studentForm,
        url:`http://localhost:8080/students/edit/${id}`,
        success:function (){
            showListStudent()
        }
    })
    event.preventDefault();
}

function showEditFormStudent(id){
    let content = `<div class="container">
                    <form>
                        <div class="mb-3">
                            <label for="code" class="form-label">Code</label>
                            <input type="text" class="form-control" id="u-code" >
                        </div>
                        
                        <div class="mb-3">
                            <label for="fullName" class="form-label">Name</label>
                            <input type="text" class="form-control" id="u-fullName" >
                        </div>
                
                        <div class="mb-3">
                            <label for="phoneNumber" class="form-label">Phone number</label>
                            <input type="text" class="form-control" id="u-phoneNumber">
                        </div>
                        
                         <div class="mb-3">
                            <label for="avatar" class="form-label">Avatar</label>
                            <div id="showAvatar"></div>
                            <input type="file" class="form-control" id="u-avatar">
                        </div>
                        
                         <div class="mb-3">
                            <label for="email" class="form-label">Email</label>
                            <input type="email" class="form-control" id="u-email">
                        </div>
                        
                        <tr>
                            <div>
                                <label>Gender:</label>
                                
                                <select name="u-gender" id="u-gender"> </select>
                            </div>
                        </tr>
                        
                         <div class="mb-3">
                            <label for="dateOfBirth" class="form-label">Date of Birth</label>
                            <input type="date" class="form-control" id="u-dateOfBirth">
                        </div>
                        
                         <div class="mb-3">
                            <label for="address" class="form-label">Address</label>
                            <input type="text" class="form-control" id="u-address">
                        </div>
                        <tr>
                            <div>
                                <label>Class:</label>
                                
                                <select name="u-classes" id="u-classes"> </select>
                           
                            </div>
                        </tr>
                        
                        <tr>
                            <div>
                                <label>Học phí:</label>
                                
                                <select name="u-tuition" id="u-tuition"> </select>
                           
                            </div>
                        </tr>
                       
                       <tr>
                            <div>
                                <label>Trạng thái:</label>
                                
                                <select name="u-statusStudent" id="u-statusStudent"> </select>
                           
                            </div>
                        </tr>
                       
                        <div class="modal-footer">
                             <button type="submit" class="btn btn-primary" onclick="updateStudent(${id})">Update</button>
                             <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                        </div>
                    </form>
                </div>`
    $("#showModalEdit").html(content);
    $.ajax({
        type:"GET",
        url:`http://localhost:8080/students/${id}`,
        success:function (student){
            $('#u-code').val(student.code)
            $('#u-fullName').val(student.fullName)
            $('#u-phoneNumber').val(student.phoneNumber)
            let img = `<img src="http://localhost:8080/image/${student.avatar}" width="100">`
            $(`#showAvatar`).html(img)
            $('#u-email').val(student.email)
            $('#u-gender').val(student.gender.name)
            $('#u-dateOfBirth').val(student.dateOfBirth)
            $('#u-address').val(student.address)
            $('#u-classes').val(student.classes.name)
            $('#u-tuition').val(student.tuition.namespaceURI)
            $('#u-statusStudent').val(student.statusStudent.name)
        }
    })
    showGender()
    showClass();
    showTuition();
    showStatus();

}
showGender()
showClass();
showTuition();
showStatus();






