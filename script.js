const students = [];
const promedioDiv = document.getElementById("average");

document.getElementById("studentForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const grade = parseFloat(document.getElementById("grade").value);
    const date = document.getElementById("date").value;

    if (grade < 1 || grade > 7 || !name || !lastName || isNaN(grade) || !date) {
        alert("Por favor, complete todos los campos correctamente. La nota debe estar entre 1 y 7.");
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
        document.getElementById("statistics").innerHTML = `
            Total de estudiantes: 0<br>
            Porcentaje de aprobados: 0%<br>
            Porcentaje de reprobados: 0%
        `;
        return;
    }

    const total = students.reduce((sum, student) => sum + student.grade, 0);
    const average = (total / students.length).toFixed(2);

    const totalStudents = students.length;
    const approved = students.filter(student => student.grade >= 4.0).length;
    const failed = totalStudents - approved;

    const approvedPercentage = ((approved / totalStudents) * 100).toFixed(2);
    const failedPercentage = ((failed / totalStudents) * 100).toFixed(2);

    promedioDiv.textContent = `Promedio General del curso: ${average}`;
    document.getElementById("statistics").innerHTML = `
        Total de estudiantes: ${totalStudents}<br>
        Porcentaje de aprobados: ${approvedPercentage}%<br>
        Porcentaje de reprobados: ${failedPercentage}%
    `;
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

    row.querySelector(".delete-btn").addEventListener("click", function () {
        borrarEstudiante(student, row);
    });

    row.querySelector(".edit-btn").addEventListener("click", function () {
        editarEstudiante(student, row);
    });

    tableBody.appendChild(row);
}

function editarEstudiante(student, row) {
    document.getElementById("name").value = student.name;
    document.getElementById("lastName").value = student.lastName;
    document.getElementById("grade").value = student.grade;
    document.getElementById("date").value = student.date;

    borrarEstudiante(student, row);
}

const formFields = document.querySelectorAll("#studentForm input");

formFields.forEach(field => {
    field.addEventListener("invalid", function (e) {
        e.preventDefault();

        if (!field.value.trim()) {
            field.setCustomValidity("Este campo es obligatorio.");
        } else if (field.id === "grade") {
            const gradeValue = parseFloat(field.value);
            if (isNaN(gradeValue) || gradeValue < 1 || gradeValue > 7) {
                field.setCustomValidity("La nota debe estar entre 1 y 7.");
            } else {
                field.setCustomValidity(""); // Restablecer si es válido
            }
        } else {
            field.setCustomValidity(""); // Restablecer si es válido
        }

        // Mostrar el mensaje personalizado
        field.reportValidity();
    });

    field.addEventListener("input", function () {
        field.setCustomValidity("");
    });
});

