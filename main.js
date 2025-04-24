const form = document.querySelector("#form");
const fullname = document.querySelector("#fullname_input");
const email = document.querySelector("#email_input");
const password = document.querySelector("#password_input");
const confirmPassword = document.querySelector("#confirm_password_input");
const showMsg = document.querySelector("#error_message");

// add styling to error message
showMsg.style.color = "hsl(354, 100%, 56%)";
const space = /\s+/g;

///* form submit
form.addEventListener("submit", (evt) => {
  // call functions with errors
  let errors = [];
  
  if (fullname) {
    errors = getSignupFormError(fullname, email, password, confirmPassword);
  } else {
    errors = getLoginFormError(email, password);
  }
  
  if (errors.length > 0 || !isValidPass(password.value)) {
    evt.preventDefault();
    showMsg.textContent = errors.join(". ");
  }
  else {
    // show success message after validation
    showMsg.textContent = "You registration was successful";
    showMsg.style.color = "hsl(325, 100%, 53%)";
  }

  // console.log(fullname.value);
  // console.log(email.value);
  // console.log(password.value);
});

///* form errors check
function getSignupFormError(fullname, email, password, confirmPassword) {
  // trim, remove space & make email lower case
  fullname.value = fullname.value.trim().replace(space, "");
  email.value = email.value.trim().replace(space, "").toLowerCase();
  password.value = password.value.trim().replace(space, "");
  confirmPassword.value = confirmPassword.value.trim().replace(space, "");
  
  let errors = [];

  // check on fullname
  if (
    fullname.value === "" ||
    fullname.value == null ||
    fullnameCheck(fullname.value)
  ) {
    errors.push("Fullname is required");
    fullname.parentElement.classList.add("error");
  }

  // check on email
  if (email.value === "" || email.value == null || emailCheck(email.value)) {
    errors.push("Enter a valid email");
    email.parentElement.classList.add("error");
  }

  // check on password
  if (password.value === "" || password.value == null) {
    errors.push("Password is required");
    password.parentElement.classList.add("error");
  }
  else if (password.value.length < 8) {
    errors.push("Password should be at least 8 characters");
    password.parentElement.classList.add("error");
  }
  if (!isValidPass(password.value)) {
    errors.push("Password must contain letters, numbers, and symbols");
    password.parentElement.classList.add("error");
  }

  // check on confirm password
  if (password.value !== confirmPassword.value) {
    errors.push("Confirm password doesn't match");
    password.parentElement.classList.add("error");
    confirmPassword.parentElement.classList.add("error");
  }

  return errors;
}

///* login form errors check
function getLoginFormError(email, password) {
  let errors = [];

  // check on email
  if (email.value === "" || email.value == null || emailCheck(email.value)) {
    errors.push("Enter a valid email");
    email.parentElement.classList.add("error");
  }

  // check on password
  if (password.value === "" || password.value == null) {
    errors.push("Password is required");
    password.parentElement.classList.add("error");
  }
  else if (password.value.length < 8) {
    errors.push("Password should be at least 8 characters");
    password.parentElement.classList.add("error");
  }
  if (!isValidPass(password.value)) {
    errors.push("Password must contain letters, numbers, and symbols");
    password.parentElement.classList.add("error");
  }

  return errors;
}

///* remove error styling
const inputs = [fullname, email, password, confirmPassword].filter(
  (input) => input != null
);

inputs.forEach((input) => {
  input.addEventListener("input", () => {
    if (input.parentElement.classList.contains("error")) {
      input.parentElement.classList.remove("error");
      showMsg.textContent = "";
    }
  });
});

///* show password with icon change
const togglePassword = document.querySelectorAll(".icon");

togglePassword.forEach((item) => {
  item.addEventListener("click", () => {
    const parent = item.parentElement;
    const itemPass = parent.querySelector(".password_input");
    const eyeIcon = parent.querySelector(".eye");
    const eyeSlashIcon = parent.querySelector(".eye_slash");

    // get and set attribute type
    const attrType = itemPass.getAttribute("type");
    if (attrType === "password") {
      itemPass.setAttribute("type", "text");
      eyeSlashIcon.style.display = "block";
      eyeIcon.style.display = "none";
    } else {
      itemPass.setAttribute("type", "password");
      eyeSlashIcon.style.display = "none";
      eyeIcon.style.display = "block";
    }
  });
});

///* fullname value check with regex
const fullnameCheck = (fullname) => {
  const fullnamePattern = /[123456789~`!@#$%^&*(){[}[;='"<>/:]/;
  return fullnamePattern.test(fullname);
};

///* email value check with regex
const emailCheck = (email) => {
  const emailPattern = /[~`!#$%^&*(){[}[;'"<>/:]/;
  return emailPattern.test(email);
};

///* password strength check with regex
const isValidPass = (password) => {
  let letters = /[a-zA-Z]/.test(password);
  let digits = /[\d]/.test(password); //all the digits from 0 to 9
  let symbols = /[^a-zA-Z0-9]/.test(password);

  return letters && digits && symbols;
}

