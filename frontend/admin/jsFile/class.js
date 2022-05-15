function showListClass(page) {
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/admin/classes?page=${page}`,
        success: function (data) {
            let classes = data.content;
            let content = "";
            for (let i = 0; i < classes.length; i++) {
                content += `
                <tr>
                    <td>${classes[i].id}</td>
                    <td>${classes[i].name}</td>
                    <td><button class="btn-action btn-edit" role="button" data-bs-toggle="modal" data-bs-target="#edit_modalClass" onclick="showFormEdit(${classes[i].id})">Edit</button></td>
                    <td><a href="${classes[i].id}" onclick="deleteClasses(this)"><button class="btn-action btn-delete">Delete</button></a></td>
                    </tr>
                `
            }
            $("#listClass").html(content);

            let iconPage = `<button id="first" onclick="showListClass(0)"><i class="fa-solid fa-backward-fast">First</i></button> 
                <button  id="backup" onclick="showListClass(${data.pageable.pageNumber} - 1)"><i class ="fa-solid fa-backward-step">Back</i></button>
                      <span> Trang </span> <span>${data.pageable.pageNumber + 1}/ ${data.totalPages}</span>
                      <button id="next" onclick="showListClass(${data.pageable.pageNumber}+1)" ><i class="fa-solid fa-forward-step">Next</i></button>
                        <button id="last" onclick="showListClass(${data.totalPages} -1)"><i class="fa-solid fa-forward-fast">Last</i></button>`
            $(`#iconPage`).html(iconPage);

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

showListClass();

function showCreateForm() {
    event.preventDefault();
    let footer = `<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" onclick="createClass()">Save</button>`
    $("#create_footer").html(footer);
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/admin/classes",
        success: function () {
        }
    })
}

function createClass() {
    event.preventDefault();
    let name = $("#createName").val();
    let classes = {
        "name": name,
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        data: JSON.stringify(classes),
        url: "http://localhost:8080/admin/classes",
        success: function () {
            $(`#create_modalClass`).modal('hide');
            $(`#createName`).val("");
            showListClass();
        }
    })
}

function showFormEdit(id) {
    let footer = `<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" onclick="editClasses(${id})">Save</button>`;
    $("#edit_footer").html(footer);
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/admin/classes/${id}`,
        success: function (classesOptional) {
            $("#editName").val(classesOptional.name);
        }
    })
}

function editClasses(id) {
    event.preventDefault();
    let name = $("#editName").val()
    let classes = {
        "name": name,
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        data: JSON.stringify(classes),
        url: `http://localhost:8080/admin/classes/edit/${id}`,
        success: function () {
            $("#edit_modalClass").modal('hide');
            showListClass();
        }
    })
}

function deleteClasses(element) {
    event.preventDefault();
    let classId = element.getAttribute("href");
    if (confirm("Yes") === true) {
        $.ajax({
            type: "DELETE",
            url: `http://localhost:8080/admin/classes/${classId}`,
            success: function () {
                showListClass();
            }
        })
    } else {
        window.location.href = "../admin/class.html";
    }
}