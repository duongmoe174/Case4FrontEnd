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

function showListClass() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/teacher/list-class",
        success: function (students) {
            let content = `<tr>
                                        <th class="border-top-0">#</th>
                                        <th class="border-top-0">Teacher</th>
                                        <th class="border-top-0">Class</th>
                                    </tr>`;
            for (let i = 0; i < students.length; i++) {
                content += `<tr>
                                            <td>${students[i].id}</td>
                                            <td>${students[i].nameTeacher}</td>
                                            <td>${students[i].nameClass}</td>
                                        </tr>`;
            }
            $("#listClass").html(content);
        }
    })
}

function getListClassByTeacherId() {
    let id = $("#getTeacher").val();
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/teacher/list-class/${id}`,
        success: function (students) {
            let content = `<tr>
                                            <th class="border-top-0">#</th>
                                            <th class="border-top-0">Teacher</th>
                                            <th class="border-top-0">Class</th>
                                        </tr>`;
            for (let i = 0; i < students.length; i++) {
                content += `<tr>
                                            <td>${students[i].id}</td>
                                            <td>${students[i].nameTeacher}</td>
                                            <td>${students[i].nameClass}</td>
                                        </tr>`;
            }
            $("#listClass").html(content);
        }
    })
}

showTeacher();
showListClass();