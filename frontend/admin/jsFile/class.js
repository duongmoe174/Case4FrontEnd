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
                    <td><button>Edit</button></td>
                    <td><a><button>Delete</button></a></td>
                    </tr>
                `
            }
            $("#listClass").html(content);

            let iconPage = `<button id="first" onclick="showListClass(0)"><i class="fa-solid fa-backward-fast">First</i></button> 
                <button  id="backup" onclick="showListClass(${data.pageable.pageNumber} - 1)"><i class ="fa-solid fa-backward-step">Back</i></button>
                      <span> Trang </span> <span>${data.pageable.pageNumber +1 }/ ${data.totalPages}</span>
                      <button id="next" onclick="showListClass(${data.pageable.pageNumber}+1)" ><i class="fa-solid fa-forward-step">Next</i></button>
                        <button id="last" onclick="showListClass(${data.totalPages} -1)"><i class="fa-solid fa-forward-fast">Last</i></button>`
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
showListClass();

function showCreateForm() {
    let footer = `<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" onclick="createClass()">Save</button>`
    $("#create_footer").html(footer);
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/admin/classes",
        success: function (){}
    })
}

function createClass() {

}