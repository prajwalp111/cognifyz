document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("user-form");
  const usernameInput = document.getElementById("username");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirm-password");

  const usernameError = document.getElementById("username-error");
  const emailError = document.getElementById("email-error");
  const passwordError = document.getElementById("password-error");
  const confirmPasswordError = document.getElementById("confirm-password-error");

  // Validation functions
  function validatePassword(value) {
    if (value.length < 8) return 'Password must be at least 8 characters';
    if (!/[A-Z]/.test(value)) return 'Password must contain an uppercase letter';
    if (!/[0-9]/.test(value)) return 'Password must contain a number';
    if (!/[!@#$%^&*]/.test(value)) return 'Password must contain a special character';
    return true;
  }

  function validateEmail(value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  }

  function validateConfirmPassword(value) {
    return value === passwordInput.value || 'Passwords do not match';
  }

  // Input blur validations
  usernameInput.addEventListener("blur", () => {
    if (!usernameInput.value.trim()) {
      usernameError.style.display = "block";
    } else {
      usernameError.style.display = "none";
    }
  });

  emailInput.addEventListener("blur", () => {
    if (!validateEmail(emailInput.value)) {
      emailError.style.display = "block";
    } else {
      emailError.style.display = "none";
    }
  });

  passwordInput.addEventListener("blur", () => {
    const validation = validatePassword(passwordInput.value);
    if (validation !== true) {
      alert(validation);
      passwordError.textContent = validation;
      passwordError.style.display = "block";
    } else {
      passwordError.style.display = "none";
    }
  });

  confirmPasswordInput.addEventListener("blur", () => {
    const validation = validateConfirmPassword(confirmPasswordInput.value);
    if (validation !== true) {
      confirmPasswordError.textContent = validation;
      confirmPasswordError.style.display = "block";
    } else {
      confirmPasswordError.style.display = "none";
    }
  });

  // Form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Final validations
    const passwordValidation = validatePassword(passwordInput.value);
    const confirmPasswordValidation = validateConfirmPassword(confirmPasswordInput.value);

    if (!usernameInput.value.trim()) {
      usernameError.style.display = "block";
      alert("Please enter a valid username.");
    }

    if (!validateEmail(emailInput.value)) {
      emailError.style.display = "block";
      alert("Please enter a valid email.");
    }

    if (passwordValidation !== true) {
      alert(passwordValidation);
      return;
    }

    if (confirmPasswordValidation !== true) {
      alert(confirmPasswordValidation);
      return;
    }

    alert("Account Created successfully!");
  });
});
