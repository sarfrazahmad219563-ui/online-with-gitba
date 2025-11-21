let accounts = [];
let currentUser = null;

// Show page
function showPage(id) {
    document.querySelectorAll(".page").forEach(p => p.style.display = "none");
    document.getElementById(id).style.display = "flex";
}

// Show login first
document.addEventListener("DOMContentLoaded", () => {
    showPage("loginPage");
});

// Create account
function createAccount() {
    let name = document.getElementById("newName").value;
    let pass = document.getElementById("newPass").value;

    if (!name || !pass) return alert("Please fill all fields");

    let accNo = Math.floor(Math.random() * 90000) + 10000;

    accounts.push({
        accNo,
        name,
        pass,
        balance: 0,
        history: []
    });

    alert("Account Created!\nYour Account Number: " + accNo);
    showPage("loginPage");
}

// Login
function login() {
    let acc = Number(document.getElementById("loginAcc").value);
    let pass = document.getElementById("loginPass").value;

    currentUser = accounts.find(a => a.accNo === acc && a.pass === pass);

    if (!currentUser) return alert("Invalid account or password");

    document.getElementById("welcome").innerText = "Welcome, " + currentUser.name;
    document.getElementById("balance").innerText = currentUser.balance;

    showPage("homePage");
}

// Deposit
function deposit() {
    let amount = Number(document.getElementById("depAmount").value);
    if (amount <= 0) return alert("Enter valid amount");

    currentUser.balance += amount;
    currentUser.history.push("Deposited ₹" + amount);

    document.getElementById("balance").innerText = currentUser.balance;
    alert("Deposit Successful");

    showPage("homePage");
}

// Withdraw
function withdraw() {
    let amount = Number(document.getElementById("withAmount").value);

    if (amount <= 0) return alert("Enter valid amount");
    if (amount > currentUser.balance) return alert("Insufficient funds");

    currentUser.balance -= amount;
    currentUser.history.push("Withdrew ₹" + amount);

    document.getElementById("balance").innerText = currentUser.balance;
    alert("Withdrawal Successful");

    showPage("homePage");
}

// History page
function openHistory() {
    let list = document.getElementById("historyList");
    list.innerHTML = "";

    currentUser.history.forEach(h => {
        let li = document.createElement("li");
        li.innerText = h;
        list.appendChild(li);
    });

    showPage("historyPage");
}

// Logout
function logout() {
    currentUser = null;
    showPage("loginPage");
}