document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registrationForm");
    const userList = document.getElementById("userList");

    // Load data from local storage and display it
    let users = JSON.parse(localStorage.getItem("users")) || [];
    displayUsers(users);

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        // Collect form data
        const user = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value
        };

        // Push data to array and save to local storage
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));

        // Send data with AJAX POST request
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:3000/register", true); // Replace with your server URL
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log("User registered successfully!");
            }
        };
        xhr.send(JSON.stringify(user));

        // Update displayed user list
        displayUsers(users);

        // Clear form fields
        form.reset();
    });

    function displayUsers(users) {
        userList.innerHTML = ""; // Clear list
        users.forEach((user, index) => {
            const listItem = document.createElement("li");
            listItem.textContent = `${index + 1}. Name: ${user.name}, Email: ${user.email}`;
            userList.appendChild(listItem);
        });
    }
});
