function showList(page){
    $.ajax({
        type:"GET",
        url:`http://localhost:8080/transcripts?page=${page}`,
        success: function (data){
            let transcripts = data.content
            let content = '';



            for (let i = 0; i < transcripts.length; i++) {

                let diemtb = (transcripts[i].point1+transcripts[i].point2)/2
                let xephang
                if (diemtb>8.5){
                    xephang = 'A'
                }
                else if(6.5<diemtb){
                    xephang = 'B'
                }
                else {
                    xephang = 'C'
                }
                content += `<tr>
        <th scope="row">${i+1}</th>
        <td>${transcripts[i].point1}</td>
        <td>${transcripts[i].point2}</td>
        <td>${diemtb}</td>
        <td>${xephang}</td>
        <td>${transcripts[i].appSubject.name}</td>
        <td>${transcripts[i].student.fullName}</td>
        
        <td><button type="button" class="btn btn-outline-danger" onclick="deleteTranscript(${transcripts[i].id})">Delete</button></td>
        <td><button type="button" class="btn btn-outline-primary" onclick="showEditFormTranscript(${transcripts[i].id})" data-bs-toggle="modal" data-bs-target="#myModal1">Update</button></td>

    </tr>`
            }
            $("#list-transcript").html(content);
            let iconPage =  `<button id="first" onclick="showList(0)"><i class="fa-solid fa-backward-fast">First</i></button> 
                <button  id="backup" onclick="showList(${data.pageable.pageNumber} - 1)"><i class ="fa-solid fa-backward-step">Back</i></button>
                      <span> Trang </span> <span>${data.pageable.pageNumber +1 }/ ${data.totalPages}</span>
                      <button id="next" onclick="showList(${data.pageable.pageNumber}+1)" ><i class="fa-solid fa-forward-step">Next</i></button>
                        <button id="last" onclick="showList(${data.totalPages} -1)"><i class="fa-solid fa-forward-fast">Last</i></button>`
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
showList();

//DELETE TRANSCRIPT.................................................

function deleteTranscript(id) {
    $.ajax({
        type: "DELETE",
        url: `http://localhost:8080/transcripts/delete/${id}`,
        success: function () {
            showList()
        }
    })
}
//CREATE TRANSCRIPT..................................................

function showSubject(){
    $.ajax({
        type:"GET",
        url:"http://localhost:8080/transcripts/subjects",
        success: function (sub){
            let content = "";
            for (let i = 0; i < sub.length; i++) {
                content +=`<option value="${sub[i].id}">${sub[i].name}</option>`
            }
            $("#subject").html(content);
            $("#u-subject").html(content);
        }
    })
}

function showStudent(){
    $.ajax({
        type:"GET",
        url:"http://localhost:8080/transcripts/students",
        success: function (stu){
            let content = "";
            for (let i = 0; i < stu.length; i++) {
                content +=`<option value="${stu[i].id}">${stu[i].fullName}</option>`
            }
            $("#student").html(content);
            $("#u-student").html(content);
        }
    })
}

function createTranscript() {
    // lay du lieu
    let point1 = $('#point1').val();
    let point2 = $('#point2').val();
    let subject = $('#subject').val();
    let student = $('#student').val();

    let transcriptForm = {
        point1 : point1,
        point2 : point2,
        appSubject :{
            id:parseInt(subject)
        },
        student :{
            id:parseInt(student)
        },
    };


    // goi ajax
    $.ajax({
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",

        url: "http://localhost:8080/transcripts",
        data: JSON.stringify(transcriptForm),
        success: function (){
            showList()
        }
    });
    event.preventDefault();
}

//FIND_BY_NAME................................................

function findByName(page){
    let q = $("#q").val();
    $.ajax({
        type : 'GET',
        url : `http://localhost:8080/transcripts?q=${q}&page=${page}`,
        success: function (data) {
            let transcripts = data.content;
            let content = '';
            for (let i = 0; i < transcripts.length; i++) {

                let diemtb = (transcripts[i].point1+transcripts[i].point2)/2
                let xephang
                if (diemtb>8.5){
                    xephang = 'A'
                }
                else if(6.5<diemtb){
                    xephang = 'B'
                }
                else {
                    xephang = 'C'
                }
                content += `<tr>
        <th scope="row">${i+1}</th>
        <td>${transcripts[i].point1}</td>
        <td>${transcripts[i].point2}</td>
        <td>${diemtb}</td>
        <td>${xephang}</td>
        <td>${transcripts[i].appSubject.name}</td>
        <td>${transcripts[i].student.fullName}</td>
        
        <td><button onclick="deleteTranscript(${transcripts[i].id})">Delete</button></td>
        <td><button type="button" onclick="showEditFormTranscript(${transcripts[i].id})" data-bs-toggle="modal" data-bs-target="#myModal1">Update</button></td>
        </tr>`
            }
            $(`#list-transcript`).html(content);

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

//UPDATE_Transcript..............................................
function updateTranscript(id) {
    // lay du lieu
    let point1 = $('#u-point1').val();
    let point2 = $('#u-point2').val();
    let subject = $('#u-subject').val();
    let student = $('#u-student').val();

    let transcriptEdit = {
        point1 : point1,
        point2 : point2,
        appSubject :{id:parseInt(subject)},
        student :{id:parseInt(student)},
    };


    // goi ajax
    $.ajax({
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "PUT",
        data: JSON.stringify(transcriptEdit),
        url: `http://localhost:8080/transcripts/edit/${id}`,

        success: function (){
            showList()
        }
    })
    event.preventDefault();
}


function showEditFormTranscript(id){
    let content = `<div class="container">
                    <form>
                        <div class="mb-3">
                            <label for="point1" class="form-label">Diem Li Thuyet</label>
                            <input type="text" class="form-control" id="u-point1" >
                        </div>
                        
                        <div class="mb-3">
                            <label for="point2" class="form-label">Diem Thuc Hanh</label>
                            <input type="text" class="form-control" id="u-point2" >
                        </div>
      
                        
                        <tr>
                            <div>
                                <label>Mon Hoc:</label>
                                
                                <select name="subject" id="u-subject"> </select>
                            </div>
                        </tr>
                        
                
                        <tr>
                            <div>
                                <label>Ten Hoc Sinh:</label>
                                
                                <select name="student" id="u-student"> </select>
                           
                            </div>
                        </tr>
                        
                      
                       
                        <div class="modal-footer">
                             <button type="submit" class="btn btn-primary" onclick="updateTranscript(${id})">Update</button>
                             <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                        </div>
                    </form>
                </div>`
    $("#showModalEdit").html(content);
    $.ajax({
        type:"GET",
        url:`http://localhost:8080/transcripts/${id}`,
        success:function (transcripts){
            $('#u-point1').val(transcripts.point1);
            $('#u-point2').val(transcripts.point2);
            $('#u-subject').val(transcripts.appSubject.name);
            $('#u-student').val(transcripts.student.fullName);
        }
    })
    showSubject();
    showStudent();

}


showSubject();
showStudent();

