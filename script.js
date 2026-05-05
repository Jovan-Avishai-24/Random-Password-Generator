const btn = document.querySelector(".gen-btn");
const copyIcon = document.querySelector(".fa-copy");
const message = document.querySelector(".message");
const output = document.getElementById("output");

const lengthEl = document.getElementById("password-length");
const lowerEl = document.getElementById("include-lowercase");
const upperEl = document.getElementById("include-uppercase");
const numberEl = document.getElementById("include-numbers");
const symbolEl = document.getElementById("include-symbols");
const avoidEl = document.getElementById("avoid-similar");

const strengthBar = document.getElementById("strength-bar");
const strengthText = document.getElementById("strength-text");

// AUTO GENERATE
window.addEventListener("load", generatePassword);
btn.addEventListener("click", generatePassword);

function generatePassword() {
    let chars = "";

    if (lowerEl.checked) chars += "abcdefghijklmnopqrstuvwxyz";
    if (upperEl.checked) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numberEl.checked) chars += "0123456789";
    if (symbolEl.checked) chars += "!@#$%^&*()";

    if (!chars) {
        alert("Select at least one option!");
        return;
    }

    if (avoidEl.checked) {
        chars = chars.replace(/[l1O0]/g, "");
    }

    const length = parseInt(lengthEl.value);
    let password = "";

    for (let i = 0; i < length; i++) {
        password += chars[Math.floor(Math.random() * chars.length)];
    }

    output.value = password;
    updateStrength(password);
}

// STRENGTH LOGIC
function updateStrength(password) {
    let score = 0;

    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[!@#$%^&*()]/.test(password)) score++;

    let width = "25%", color = "red", text = "Weak";

    if (score === 2) {
        width = "50%"; color = "orange"; text = "Medium";
    } else if (score === 3) {
        width = "75%"; color = "blue"; text = "Strong";
    } else if (score === 4) {
        width = "100%"; color = "green"; text = "Very Strong 🔥";
    }

    strengthBar.style.width = width;
    strengthBar.style.background = color;
    strengthText.textContent = "Strength: " + text;
}

// COPY
copyIcon.addEventListener("click", () => {
    if (!output.value) return;

    navigator.clipboard.writeText(output.value);

    message.classList.add("active");

    // icon feedback
    copyIcon.classList.replace("fa-copy", "fa-check");

    setTimeout(() => {
        message.classList.remove("active");
        copyIcon.classList.replace("fa-check", "fa-copy");
    }, 1000);
});
