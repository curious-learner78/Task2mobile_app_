const registerForm = document.getElementById("registerForm");
const nameInput = document.getElementById("fullName");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmInput = document.getElementById("confirmPassword");
const agreeTerms = document.getElementById("agreeTerms");

const togglePasswordBtn = document.getElementById("togglePassword");
const toggleConfirmBtn = document.getElementById("toggleConfirm");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const confirmError = document.getElementById("confirmError");
const termsError = document.getElementById("termsError");

const statusMessage = document.getElementById("statusMessage");
const registerBtn = document.getElementById("registerBtn");

function setupPasswordToggle(button, input) {
  button.addEventListener("click", () => {
    const isHidden = input.type === "password";
    input.type = isHidden ? "text" : "password";
    button.textContent = isHidden ? "Hide" : "Show";
  });
}

setupPasswordToggle(togglePasswordBtn, passwordInput);
setupPasswordToggle(toggleConfirmBtn, confirmInput);

function showStatus(message, type) {
  statusMessage.textContent = message;
  statusMessage.className = `status-msg ${type}`;
  statusMessage.hidden = false;
}

function clearErrors() {
  [nameError, emailError, passwordError, confirmError, termsError].forEach(
    (el) => (el.textContent = "")
  );
  [nameInput, emailInput, passwordInput, confirmInput].forEach((input) =>
    input.classList.remove("invalid")
  );
}

function validateRegistration() {
  clearErrors();
  let isValid = true;

  const fullName = nameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value;
  const confirmPassword = confirmInput.value;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!fullName || fullName.length < 2) {
    nameError.textContent = "Please enter your full name (at least 2 characters).";
    nameInput.classList.add("invalid");
    isValid = false;
  }

  if (!email) {
    emailError.textContent = "Email address is required.";
    emailInput.classList.add("invalid");
    isValid = false;
  } else if (!emailPattern.test(email)) {
    emailError.textContent = "Please enter a valid email address.";
    emailInput.classList.add("invalid");
    isValid = false;
  }

  if (!password) {
    passwordError.textContent = "Password is required.";
    passwordInput.classList.add("invalid");
    isValid = false;
  } else if (password.length < 6) {
    passwordError.textContent = "Password must be at least 6 characters.";
    passwordInput.classList.add("invalid");
    isValid = false;
  }

  if (!confirmPassword) {
    confirmError.textContent = "Please confirm your password.";
    confirmInput.classList.add("invalid");
    isValid = false;
  } else if (password !== confirmPassword) {
    confirmError.textContent = "Passwords do not match.";
    confirmInput.classList.add("invalid");
    isValid = false;
  }

  if (!agreeTerms.checked) {
    termsError.textContent = "You must accept the terms to register.";
    isValid = false;
  }

  return isValid;
}

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  statusMessage.hidden = true;

  if (!validateRegistration()) {
    showStatus("Please fix the errors highlighted below.", "error");
    return;
  }

  registerBtn.disabled = true;
  registerBtn.textContent = "Creating account...";

  setTimeout(() => {
    const newUser = {
      fullName: nameInput.value.trim(),
      email: emailInput.value.trim().toLowerCase(),
      createdAt: new Date().toISOString()
    };

    const existingUsers = JSON.parse(localStorage.getItem("vinix_users") || "[]");
    existingUsers.push(newUser);
    localStorage.setItem("vinix_users", JSON.stringify(existingUsers));
    localStorage.setItem("vinix_current_user", JSON.stringify(newUser));

    showStatus(
      `Account created for ${newUser.fullName}! Saved to local storage.`,
      "success"
    );
    registerForm.reset();
    registerBtn.disabled = false;
    registerBtn.textContent = "Create Account";
  }, 600);
});
  
