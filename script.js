const students = [];
const promedioDiv = document.getElementById("average");

document.getElementById("studentForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const grade = parseFloat(document.getElementById("grade").value);
    const date = document.getElementById("date").value;

    if (grade < 1 || grade > 7 || !name || !lastName || isNaN(grade) || !date) {
        alert("Error al ingresar los datos");
        return;
    }

    const student = { name, lastName, grade, date };
    students.push(student);
    console.log(students);
    addStudentToTable(student);
    calculateAverage();
    this.reset();
});

const tableBody = document.querySelector("#studentsTable tbody");

function addStudentToTable(student) {
    const row = document.createElement("tr");
    row.innerHTML = `
    <td>${student.name}</td>
    <td>${student.lastName}</td>
    <td>${student.grade}</td>
    <td>${student.date}</td>
    <td>
      <button class="delete-btn">Eliminar</button>
    </td>
    `;

    row.querySelector(".delete-btn").addEventListener("click", function () {
        borrarEstudiante(student, row);
    });
    tableBody.appendChild(row);
}

function borrarEstudiante(student, row) {
    const index = students.indexOf(student);
    if (index > -1) {
        students.splice(index, 1);
        calculateAverage();
        row.remove();
       
    }
}

function calculateAverage() {
    if (students.length === 0) {
        promedioDiv.textContent = "Promedio General del curso: N/A";
        return;
    }
    const total = students.reduce((acumulador, student) => {
        return acumulador + (typeof student.grade === "number" ? student.grade : 0);
    }, 0);
    const average = total / students.length;
    promedioDiv.textContent = `Promedio General del curso: ${average.toFixed(2)}`;
}

function addStudentToTable(student) {
    const row = document.createElement("tr");
    row.innerHTML = `
    <td>${student.name}</td>
    <td>${student.lastName}</td>
    <td>${student.grade}</td>
    <td>${student.date}</td>
    <td>
      <button class="delete-btn">Eliminar</button>
      <button class="edit-btn">Editar</button>
    </td>
    `;

    // Botón de eliminar
    row.querySelector(".delete-btn").addEventListener("click", function () {
        borrarEstudiante(student, row);
    });

    // Botón de editar
    row.querySelector(".edit-btn").addEventListener("click", function () {
        editarEstudiante(student, row);
    });

    tableBody.appendChild(row);
}

function editarEstudiante(student, row) {
    // Llenar el formulario con los datos del estudiante
    document.getElementById("name").value = student.name;
    document.getElementById("lastName").value = student.lastName;
    document.getElementById("grade").value = student.grade;
    document.getElementById("date").value = student.date;

    // Eliminar el estudiante actual de la tabla y del array
    borrarEstudiante(student, row);
}