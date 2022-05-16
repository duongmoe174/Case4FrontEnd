function showTeacher() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/teacher",
        success: function (teachers) {
            let content = `<option selected disabled>Name of Teacher...</option>`;
            for (let i = 0; i < teachers.length; i++) {
                content += `<option value="${teachers[i].id}">${teachers[i].fullName}</option>`
            }
            $("#getTeacher").html(content);
        }
    })
}

function showListStudent() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/teacher/list-student",
        success: function (students) {
            let content = `<tr>
                                            <th class="border-top-0">#</th>
                                            <th class="border-top-0">Full Name</th>
                                            <th class="border-top-0">Gender</th>
                                            <th class="border-top-0">Email</th>
                                            <th class="border-top-0">Date Of Birth</th>
                                            <th class="border-top-0">Phone Number</th>
                                            <th class="border-top-0">Avatar</th>
                                            <th class="border-top-0">Status</th>
                                        </tr>`;
            for (let i = 0; i < students.length; i++) {
                content += `<tr>
                                            <td>${students[i].id}</td>
                                            <td>${students[i].name}</td>
                                            <td>${students[i].gender}</td>
                                            <td>${students[i].email}</td>
                                            <td>${students[i].date}</td>
                                            <td>${students[i].phone}</td>
                                            <td>${students[i].avatar}</td>
                                            <td>${students[i].status}</td>
                                        </tr>`;
            }
            $("#listStudent").html(content);
        }
    })
}
function getListStudentByTeacherId() {
    let id = $("#getTeacher").val();
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/teacher/list-student/${id}`,
        success: function (students) {
            let content = `<tr>
                                            <th class="border-top-0">#</th>
                                            <th class="border-top-0">Full Name</th>
                                            <th class="border-top-0">Gender</th>
                                            <th class="border-top-0">Email</th>
                                            <th class="border-top-0">Date Of Birth</th>
                                            <th class="border-top-0">Phone Number</th>
                                            <th class="border-top-0">Avatar</th>
                                            <th class="border-top-0">Status</th>
                                        </tr>`;
            for (let i = 0; i < students.length; i++) {
                content += `<tr>
                                            <td>${students[i].id}</td>
                                            <td>${students[i].name}</td>
                                            <td>${students[i].gender}</td>
                                            <td>${students[i].email}</td>
                                            <td>${students[i].date}</td>
                                            <td>${students[i].phone}</td>
                                            <td>${students[i].avatar}</td>
                                            <td>${students[i].status}</td>
                                        </tr>`;
            }
            $("#listStudent").html(content);
        }
    })
}
showListStudent();
showTeacher();
