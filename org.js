let apii = "https://dummyjson.com/users";

let employees = [];

let selectedDepartment = "All";

function fetchEmployees() {
    document.querySelector("#message").innerText = "Loading employees...";

    fetch(apii)
    .then((c) => {
        return c.json();
    })
    .then((sci) => {
        employees = sci.users;

        employees.forEach((c) => {
            c.salary = 50000;
        });

        document.querySelector("#message").innerText = "Employee data loaded successfully.";

        displayEmployees(employees);
    })
    .catch((error) => {
        console.log(error);

        document.querySelector("#message").innerText = "Unable to load employee data. Please try again.";
    })
    .finally(() => {
        console.log("Fetch completed");
    });
}

function displayEmployees(arr) {
    let sech1 = document.querySelector("#least");

    sech1.innerHTML = "";

    arr.forEach((c) => {
        let dynn = document.createElement("div");

        dynn.innerHTML = `
            <img src="${c.image}">
            <h2>${c.firstName} ${c.lastName}</h2>
            <h4>Age: ${c.age}</h4>
            <h4>Email: ${c.email}</h4>
            <h4>Department: ${getDepartment(c)}</h4>
            <h4>Phone: ${c.phone}</h4>
            <h4>Salary: ₹${c.salary.toLocaleString("en-IN")}</h4>
            <button class="delete">Delete</button>
        `;

        let deleteButton = dynn.querySelector(".delete");

        deleteButton.addEventListener("click", () => {
            deleteEmployee(c.id);
        });

        sech1.append(dynn);
    });

    updateEmployeeCount(arr);

    calculateSalary(arr);
}

function getDepartment(c) {
    if (c.department) {
        return c.department;
    }

    if (c.company) {
        return c.company.department;
    }

    return "IT";
}

function searchEmployees() {
    let searchValue = document.querySelector("#search").value.toLowerCase();

    let result = employees.filter((c) => {
        let name = (c.firstName + " " + c.lastName).toLowerCase();

        return name.includes(searchValue);
    });

    displayEmployees(result);
}

function filterDepartment(department) {
    selectedDepartment = department;

    showCurrentEmployees();
}

function showCurrentEmployees() {
    let result = employees;

    let searchValue = document.querySelector("#search").value.toLowerCase();

    if (selectedDepartment !== "All") {
        result = result.filter((c) => {
            return getDepartment(c) === selectedDepartment;
        });
    }

    if (searchValue !== "") {
        result = result.filter((c) => {
            let name = (c.firstName + " " + c.lastName).toLowerCase();

            return name.includes(searchValue);
        });
    }

    displayEmployees(result);
}

function updateEmployeeCount(arr) {
    document.querySelector("#count").innerText = arr.length;
}

function calculateSalary(arr) {
    let total = arr.reduce((sum, c) => {
        return sum + Number(c.salary);
    }, 0);

    let average = 0;

    if (arr.length > 0) {
        average = total / arr.length;
    }

    document.querySelector("#totalSalary").innerText = "₹" + total.toLocaleString("en-IN");

    document.querySelector("#averageSalary").innerText = "₹" + Math.round(average).toLocaleString("en-IN");

    calculateHighest(arr);
}

function calculateHighest(arr) {
    if (arr.length === 0) {
        document.querySelector("#highest").innerText = "No employees";
        return;
    }

    let highest = arr.reduce((a, b) => {
        if (a.salary > b.salary) {
            return a;
        } else {
            return b;
        }
    });

    document.querySelector("#highest").innerHTML = `
        <h3>${highest.firstName} ${highest.lastName}</h3>
        <p>Salary: ₹${highest.salary.toLocaleString("en-IN")}</p>
    `;
}

function deleteEmployee(id) {
    employees = employees.filter((c) => {
        return c.id !== id;
    });

    showCurrentEmployees();
}

function validateEmployee() {
    let name = document.querySelector("#name").value.trim();

    let age = Number(document.querySelector("#age").value);

    let email = document.querySelector("#email").value.trim();

    let department = document.querySelector("#department").value;

    let valid = true;

    document.querySelector("#nameError").innerText = "";

    document.querySelector("#ageError").innerText = "";

    document.querySelector("#emailError").innerText = "";

    document.querySelector("#departmentError").innerText = "";

    if (name === "") {
        document.querySelector("#nameError").innerText = "Please enter employee name";

        valid = false;
    }

    if (age <= 18) {
        document.querySelector("#ageError").innerText = "Age must be greater than 18";

        valid = false;
    }

    if (email === "") {
        document.querySelector("#emailError").innerText = "Please enter email";

        valid = false;
    }

    if (department === "") {
        document.querySelector("#departmentError").innerText = "Please select department";

        valid = false;
    }

    return valid;
}

function addEmployee() {
    if (validateEmployee() === false) {
        return;
    }

    let name = document.querySelector("#name").value;

    let age = Number(document.querySelector("#age").value);

    let email = document.querySelector("#email").value;

    let department = document.querySelector("#department").value;

    let salary = Number(document.querySelector("#salary").value);

    let newEmployee = {
        id: Date.now(),
        firstName: name,
        lastName: "",
        age: age,
        email: email,
        phone: "Not Available",
        department: department,
        salary: salary,
        image: "https://dummyjson.com/icon/abc/128"
    };

    employees.push(newEmployee);

    showCurrentEmployees();

    clearForm();

    document.querySelector("#message").innerText = "Employee added successfully.";
}

function clearForm() {
    document.querySelector("#name").value = "";

    document.querySelector("#age").value = "";

    document.querySelector("#email").value = "";

    document.querySelector("#department").value = "";

    document.querySelector("#salary").value = "";
}

function sortEmployees() {
    let value = document.querySelector("#sort").value;

    if (value === "name") {
        employees.sort((a, b) => {
            return a.firstName.localeCompare(b.firstName);
        });
    }

    else if (value === "age") {
        employees.sort((a, b) => {
            return a.age - b.age;
        });
    }

    else if (value === "salary") {
        employees.sort((a, b) => {
            return a.salary - b.salary;
        });
    }

    showCurrentEmployees();
}

function dateTime() {
    let d = new Date();

    let year = d.getFullYear();

    let month = d.getMonth() + 1;

    let date = d.getDate();

    let hours = d.getHours();

    let minutes = d.getMinutes();

    let ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;

    if (hours === 0) {
        hours = 12;
    }

    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    document.querySelector("#date").innerText = "Today: " + date + "/" + month + "/" + year;

    document.querySelector("#time").innerText = "Time: " + hours + ":" + minutes + " " + ampm;
}

document.querySelector("#but").addEventListener("click", searchEmployees);

document.querySelector("#search").addEventListener("keyup", showCurrentEmployees);

document.querySelector("#all").addEventListener("click", () => {
    filterDepartment("All");
});

document.querySelector("#it").addEventListener("click", () => {
    filterDepartment("IT");
});

document.querySelector("#hr").addEventListener("click", () => {
    filterDepartment("HR");
});

document.querySelector("#fire").addEventListener("click", () => {
    filterDepartment("Finance");
});

document.querySelector("#mark").addEventListener("click", () => {
    filterDepartment("Marketing");
});

document.querySelector("#add").addEventListener("click", addEmployee);

document.querySelector("#sort").addEventListener("change", sortEmployees);

fetchEmployees();

dateTime();

setInterval(dateTime, 1000);