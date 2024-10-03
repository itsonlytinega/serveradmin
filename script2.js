const form = document.querySelector("form"),
  emailField = form.querySelector(".email-field"),
  emailInput = emailField.querySelector(".email"),
  passField = form.querySelector(".password-field"), // Changed class to reflect password field
  passInput = passField.querySelector(".password");

// Email Validation
function checkEmail() {
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!emailInput.value.match(emailPattern)) {
    return emailField.classList.add("invalid"); // Adding invalid class if email value doesn't match
  }
  emailField.classList.remove("invalid"); // Removing invalid class if email value matches
}

// Hide and show password
const eyeIcons = document.querySelectorAll(".show-hide");

eyeIcons.forEach((eyeIcon) => {
  eyeIcon.addEventListener("click", () => {
    const pInput = eyeIcon.parentElement.querySelector("input"); // Getting parent element of eye icon and selecting the password input
    if (pInput.type === "password") {
      eyeIcon.classList.replace("bx-hide", "bx-show");
      return (pInput.type = "text");
    }
    eyeIcon.classList.replace("bx-show", "bx-hide");
    pInput.type = "password";
  });
});

// Calling Function on Form Submit
form.addEventListener("submit", (e) => {
  e.preventDefault(); // Preventing form submission
  checkEmail();

  // Calling function on key up
  emailInput.addEventListener("keyup", checkEmail);

  if (!emailField.classList.contains("invalid")) {
    // If the email is valid, proceed to send a request to the server
    const formData = new FormData(form); // Create a FormData object from the form

    fetch("login.php", { // Specify your PHP login script here
      method: "POST",
      body: formData,
    })
      .then((response) => response.json()) // Expect a JSON response
      .then((data) => {
        if (data.success) {
          alert('Login successful!'); // Show success message
          // Optionally, redirect to another page
          window.location.href = "welcome.php"; // Change to your desired page
        } else {
          alert('Login failed: ' + data.message); // Show error message
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
      });
  }
});

