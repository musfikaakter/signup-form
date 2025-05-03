///* form errors check
function getFormError(
  email,
  password,
  fullname = null,
  confirmPassword = null
) {
  const space = /\s+/g;
  let errors = [];

  if (fullname) {
    fullname.value = fullname.value?.trim().replace(space, "");
    if (fullname.value === "" || fullname.value == null || !fullname.value) {
      errors.push("Fullname is required");
    }
    if (fullnameCheck(fullname.value)) {
      errors.push("Fullname should not contain numbers or special characters");
    }
    fullname.parentElement.classList.add("error");
  }

  if (email) {
    email.value = email.value.trim().replace(space, "").toLowerCase();
    // check on email
    if (
      email.value === "" ||
      email.value == null ||
      !email.value ||
      !emailCheck(email.value)
    ) {
      errors.push("Enter a valid email");
      email.parentElement.classList.add("error");
    }
  }

  if (password) {
    password.value = password.value.trim().replace(space, "");

    // check on password
    if (password.value === "" || password.value == null || !password.value) {
      errors.push("Password is required");
      password.parentElement.classList.add("error");
    } else if (password.value.length < 8) {
      errors.push("Password should be at least 8 characters");
      password.parentElement.classList.add("error");
    } else if (!isValidPass(password.value)) {
      errors.push("Password must contain letters, numbers, and symbols");
      password.parentElement.classList.add("error");
    }
  }

  if (confirmPassword) {
    confirmPassword.value = confirmPassword.value.trim().replace(space, "");
    // check on confirm password
    if (password.value !== confirmPassword.value) {
      errors.push("Confirm password doesn't match");
      password.parentElement.classList.add("error");
      confirmPassword.parentElement.classList.add("error");
    }
  }

  return errors;
}

///* fullname value check with regex
const fullnameCheck = (fullname) => {
  const fullnamePattern = /[123456789~`!@#$%^&*(){[}[;='"<>/:]/;
  return fullnamePattern.test(fullname);
};

///* email value check with regex
const emailCheck = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // const emailPattern = /[~`!#$%^&*(){[}[;'"<>/:]/;
  return emailPattern.test(email);
};

///* password strength check with regex
const isValidPass = (password) => {
  let letters = /[a-zA-Z]/.test(password);
  let digits = /[\d]/.test(password); //all the digits from 0 to 9
  let symbols = /[^a-zA-Z0-9]/.test(password);

  return letters && digits && symbols;
};

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#form");
  const fullname = document.querySelector("#fullname_input");
  const email = document.querySelector("#email_input");
  const password = document.querySelector("#password_input");
  const confirmPassword = document.querySelector("#confirm_password_input");
  const showMsg = document.querySelector("#error_message");
  const togglePassword = document.querySelectorAll(".icon");

  // add styling to error message
  showMsg.style.color = "hsl(354, 100%, 56%)";

  ///* form submit
  form.addEventListener("submit", (evt) => {
    evt.preventDefault();
    // call functions with errors
    let errors = [];

    if (form.classList.contains("signup")) {
      errors = getFormError(email, password, fullname, confirmPassword);
    } else {
      errors = getFormError(email, password);
    }

    if (errors.length > 0) {
      showMsg.textContent = errors.join(". ");
      return;
    }

    // show success message after validation
    showMsg.textContent = "You registration was successful";
    showMsg.style.color = "hsl(325, 100%, 53%)";

    // console.log(fullname.value);
    // console.log(email.value);
    // console.log(password.value);
  });

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
});
