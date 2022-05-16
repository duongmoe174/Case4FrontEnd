function showListSubject() {
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/admin/subject`,
        success: function (data) {
            let content = "";
            for (let i = 0; i < data.length; i++) {
                content += `
                <tr>
                    <td>${data[i].id}</td>
                    <td>${data[i].name}</td>
                    <td><button class="btn-action btn-edit" role="button" data-bs-toggle="modal" data-bs-target="#edit_modalSubject" onclick="showFormEditSubject(${data[i].id})">Edit</button></td>
                    <td><a href="${data[i].id}" onclick="deleteSubject(this)"><button class="btn-action btn-delete">Delete</button></a></td>
                    </tr>
                `
            }
            $("#listSubject").html(content);
        }
    })
}

showListSubject();

function showCreateFormSubject() {
    event.preventDefault();
    let footer = `<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" onclick="createSubject()">Save</button>`
    $("#create_footerSubject").html(footer);
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/admin/subject",
        success: function () {
        }
    })
}

function createSubject() {
    event.preventDefault();
    let name = $("#createNameSubject").val();
    let subject = {
        "name": name,
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        data: JSON.stringify(subject),
        url: "http://localhost:8080/admin/subject",
        success: function () {
            $(`#create_modalSubject`).modal('hide');
            $(`#createNameSubject`).val("");
            showListSubject();
        }
    })
}

function showFormEditSubject(id) {
    let footer = `<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" onclick="editSubject(${id})">Save</button>`;
    $("#edit_footerSubject").html(footer);
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/admin/subject/${id}`,
        success: function (data) {
            $("#editNameSubject").val(data.name);
        }
    })
}

function editSubject(id) {
    event.preventDefault();
    let name = $("#editNameSubject").val()
    let subject = {
        "name": name,
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        data: JSON.stringify(subject),
        url: `http://localhost:8080/admin/subject/edit/${id}`,
        success: function () {
            $("#edit_modalSubject").modal('hide');
            showListSubject();
        }
    })
}

function deleteSubject(element) {
    event.preventDefault();
    let subjectId = element.getAttribute("href");
    if (confirm("Yes") === true) {
        $.ajax({
            type: "DELETE",
            url: `http://localhost:8080/admin/subject/${subjectId}`,
            success: function () {
                showListSubject();
            }
        })
    } else {
        window.location.href = "../admin/subject.html";
    }
}