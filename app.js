const form = document.querySelector("form");
form.addEventListener("submit", handleFormSubmit);

const cardContainer = document.getElementById("card-container");

function handleFormSubmit(e) {
    e.preventDefault();

    // Get the input values
    const amount = e.target.amount.value;
    const category = e.target.category.value;
    const desc = e.target.desc.value;

    // Simple form validation
    if (!form.checkValidity()) {
        form.classList.add("was-validated");
        return;
    }

    // Create an object with the data
    const data = { amount, category, desc };

    // Create a unique key for each expense entry based on amount and description
    const key = `${amount}-${desc}`;

    // Save the data to localStorage
    localStorage.setItem(key, JSON.stringify(data));

    // Reset the form
    form.reset();

    // Re-fetch and display updated data from localStorage
    getDataFromLocalStorage();
}

// Function to display expense data as cards
function display(data) {
    data.forEach(item => {
        // Create a new card element
        const card = document.createElement("div");
        card.classList.add("card", "col-md-5", "border-top-0", "border-end-0", "border-bottom-0", "border-5", "border-primary");

        // Create a card header with the category
        const header = document.createElement("h2");
        header.classList.add("card-header");
        header.textContent = item.val.category;

        // Create the card body
        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        // Add subtitle with the amount
        const cardSubtitle = document.createElement("h3");
        cardSubtitle.classList.add("card-subtitle", "text-body-secondary");
        cardSubtitle.textContent = item.val.amount;

        // Add text with the description
        const cardText = document.createElement("div");
        cardText.classList.add("card-text");
        cardText.textContent = item.val.desc;

        // Button container
        const btnContainer = document.createElement("div");
        btnContainer.classList.add("mt-3", "d-flex", "gap-2");

        // Create Edit Button
        const editBtn = document.createElement("button");
        editBtn.classList.add("btn", "btn-outline-dark", "flex-fill");
        editBtn.textContent = "Edit";
        editBtn.addEventListener("click", editExpense);

        // Create Delete Button
        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("btn", "btn-dark", "flex-fill");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", deleteExpense);

        // Add buttons to the button container
        btnContainer.append(editBtn, deleteBtn);

        // Add subtitle, description, and buttons to the card body
        cardBody.append(cardSubtitle, cardText, btnContainer);

        // Add the header and body to the card
        card.append(header, cardBody);

        // Add the card to the card container
        cardContainer.appendChild(card);

        // Edit function: populate form with current item data
        function editExpense() {
            document.getElementById("amount").value = item.val.amount;
            document.getElementById("category").value = item.val.category;
            document.getElementById("desc").value = item.val.desc;

            // After editing, remove the old item from localStorage
            deleteExpense();
        }

        // Delete function: remove item from localStorage and update UI
        function deleteExpense() {
            localStorage.removeItem(item.key);
            cardContainer.removeChild(card);
            getDataFromLocalStorage();
        }
    });
}

// Function to get data from localStorage and update the UI
function getDataFromLocalStorage() {
    const data = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const val = JSON.parse(localStorage.getItem(key));
        data.push({ key, val });
    }

    // If there is data, display it; otherwise, show a placeholder
    if (data.length > 0) {
        cardContainer.innerHTML = "";
        display(data);
    } else {
        cardContainer.innerHTML = "<h3>Add New Expense..</h3>";
    }
}

// Call the function to display data when the page loads
getDataFromLocalStorage();
