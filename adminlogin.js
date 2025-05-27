document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("loginForm");
  const errorMsg = document.getElementById("errorMsg");
  const togglePassword = document.getElementById("togglePassword");
  const passwordInput = document.getElementById("password");

  togglePassword.addEventListener("click", function () {
    const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);

    this.classList.toggle("fa-eye");
    this.classList.toggle("fa-eye-slash");
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = passwordInput.value.trim();

    if (username === "admin" && password === "adminPassword1") {
      window.location.href = "admin.html";
    } else {
      errorMsg.textContent = "Invalid username or password.";
    }
  });
});

