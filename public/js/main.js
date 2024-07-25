function redirectToHome() {
  window.location.href = "/";
}

function hideSubmitButton() {
  const submitButton = document.getElementById("submitButton");
  submitButton.style.display = "none"; // Hide the button
}

// Check if we are on the /submit page and hide the button if necessary
document.addEventListener("DOMContentLoaded", function () {
  const submitButton = document.getElementById("submitButton");
  if (window.location.pathname === "/submit") {
    submitButton.style.display = "none"; // Hide the button
  }
});
