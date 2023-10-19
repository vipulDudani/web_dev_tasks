import toast from "react-hot-toast";

/** validate register form */
export async function registerValidation(values) {
  const errors = firstNameVerify({}, values);
  passwordVerify(errors, values);
  emailVerify(errors, values);

  return errors;
}

export async function loginVerify(values) {
  const errors = passwordVerify({}, values);
  emailVerify(errors, values);
  return errors;
}

//? -------------------------------------------

function usernameVerify(error = {}, values) {
  if (!values.username) {
    error.username = toast.error("Username Required!");
  } else if (values.username.includes(" ")) {
    error.username = toast.error("Username cannot contain space");
  }
  return error;
}

function firstNameVerify(error = {}, values) {
  if (!values.firstName) {
    error.firstName = toast.error("Name Required!");
  } else if (values.firstName.length < 2) {
    error.firstName = toast.error("Name Too Small!");
  } else if (values.firstName.length > 10) {
    error.firstName = toast.error("Name Too Big!");
  }
  return error;
}

function passwordVerify(error = {}, values) {
  // const specialCharacter = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  if (!values.password) {
    error.password = toast.error("Password Required!");
  } else if (values.password.includes(" ")) {
    error.password = toast.error("Password cannot contain space!");
  } else if (values.password.length < 4) {
    error.password = toast.error("Password too Small!");
  }
  return error;
}

function emailVerify(error = {}, values) {
  if (!values.email) {
    error.email = toast.error("Email Required!");
  } else if (values.email.includes(" ")) {
    error.email = toast.error("Wrong Email!");
  }
  return error;
}
