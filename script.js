const btnEl = document.querySelector(".gen-btn");
const copyEl = document.querySelector(".fa-copy");
const messageEl = document.querySelector(".message");

btnEl.addEventListener("click", () => {
    createpassword();
})

function createpassword() {
    const chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const passwordLength = document.getElementById("password-length").value;
    let password = ""; 
    for (let i = 0; i < passwordLength; i++) {
        const randomNumber = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNumber, randomNumber + 1);
    }
    document.getElementById("output").value = password;
}

copyEl.addEventListener("click", () => {
    const outputEl = document.getElementById("output");
    outputEl.select(); 
    document.execCommand("copy");
    messageEl.style.display = "block";
    setTimeout(() => {
        messageEl.style.display = "none";
    }, 2000);
});