function showRoleStudent(page){
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
        <td><img src="${'http://localhost:8080/image/' + student[i].avatar}" width="100px"></td>
        <td>${student[i].phoneNumber}</td>
        <td>${student[i].email}</td>
        <td>${student[i].address}</td>
        <td><button type="button" class="btn btn-outline-success" onclick="showProfile(${student[i].id})" data-bs-toggle="modal" data-bs-target="#showViewStudent">View</button></td>    
     </tr>`
            }

            $("#role-student").html(content);

            let iconPage =  `<button id="first" onclick="showRoleStudent(0)"><i class="fa-solid fa-backward-fast"><span aria-hidden="true">&laquo;</span></i></button>
                <button  id="backup" onclick="showRoleStudent(${data.pageable.pageNumber} - 1)"><i class ="fa-solid fa-backward-step">Previous</i></button>
                <span> Trang </span> <span>${data.pageable.pageNumber +1 }/ ${data.totalPages}</span>
                <button id="next" onclick="showRoleStudent(${data.pageable.pageNumber}+1)" ><i class="fa-solid fa-forward-step">Next</i></button>
                <button id="last" onclick="showRoleStudent(${data.totalPages} -1)"><i class="fa-solid fa-forward-fast"><span aria-hidden="true">&raquo;</span></i></button>`

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
showRoleStudent();

function showProfile(id){
    let content = `<div class="container">
                    <form>
                        <div class="mb-3">
                            <label for="fullName" class="form-label">Name</label>
                            <input type="text" class="form-control" id="fullName" >
                        </div>
                        <div class="mb-3">
                            <label for="point1" class="form-label">Point 1</label>
                            <input type="text" class="form-control" id="point1" >
                        </div>
                        <div class="mb-3">
                            <label for="point2" class="form-label">Point 2</label>
                            <input type="text" class="form-control" id="point2" >
                        </div>
                        <div class="mb-3">
                            <label for="tuition" class="form-label">Tuition</label>
                            <input type="text" class="form-control" id="tuition" >
                        </div>
                        <div class="mb-3">
                            <label for="statusStudent" class="form-label">Status</label>
                            <input type="text" class="form-control" id="statusStudent" >
                        </div>
                                      
                       
                        <div class="modal-footer">
                           
                             <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                        </div>
                    </form>
                </div>`
    $("#showProfile").html(content);
    $.ajax({
        type:"GET",
        url:`http://localhost:8080/students/roleStudent/${id}`,
        success:function (student){
            $('#fullName').val(student.name)
            $('#point1').val(student)
            $('#point2').val(student)
            $('#tuition').val(student)
            $('#statusStudent').val(student)
        }
    })
}

