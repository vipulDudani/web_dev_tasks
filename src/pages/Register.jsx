import { useState } from "react";
import { useFormik } from "formik";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Toaster, toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

import avatar from "../assets/profile.png";
import { registerUser } from "../helper/helper";
import styles from "../styles/register.module.css";
import { registerValidation } from "../helper/validation.js";
import convertToBase64 from "../helper/base64Conveter.js";

function Register() {
  const [file, setFile] = useState();
  const navigate = useNavigate();

  const { values, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      firstName: "Punit",
      lastName: "Mudgal",
      email: "punitmudgal@gmail.com",
      password: "@password",
      picturePath: "",
      occupation: "Fullstack Developer",
      address: "Gurugram",
    },

    validate: registerValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values, action) => {
      values = await Object.assign(values, { picturePath: file || "" });
      let registerPromise = registerUser(values);

      toast.promise(registerPromise, {
        loading: "Creating Account...",
        success: "Registered!",
        error: "Couldn't Register!",
      });
      registerPromise.then(function () {
        navigate("/");
      });
    },
  });

  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };

  return (
    <div
      className={`${styles.full_registration} container flex flex-col h-full bg-gray-200`}
    >
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex flex-col items-center mt-[1em]">
        <h2 className="text-center text-4xl font-semibold mb-2 md:text-2xl text-gray-200">
          REGISTER NOW!
        </h2>
        <div className={styles.form_div}>
          <Box
            onSubmit={handleSubmit}
            className={styles.register_form}
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "40ch" },
            }}
            noValidate
            autoComplete="on"
          >
            <label
              htmlFor="profile"
              className="flex max-w-fit justify-center items-center"
            >
              <img
                src={file || avatar}
                className={styles.profile_img}
                alt="avatar"
              />
            </label>
            <input
              // value={values.picturePath}
              onChange={onUpload}
              onBlur={handleBlur}
              type="file"
              name="picturePath"
              id="profile"
              style={{ display: "none" }}
            />{" "}
            <div className="flex gap-4 w-full md:flex-col">
              <TextField
                label="Firstname"
                value={values.firstName}
                name="firstName"
                onChange={handleChange}
                onBlur={handleBlur}
                variant="outlined"
                required
              />
              <TextField
                label="Lastname"
                value={values.lastName}
                name="lastName"
                onChange={handleChange}
                onBlur={handleBlur}
                variant="outlined"
              />
            </div>
            <TextField
              label="Email"
              value={values.email}
              name="email"
              className="lowercase"
              onChange={handleChange}
              onBlur={handleBlur}
              variant="outlined"
              required
            />
            <TextField
              label="Password"
              value={values.password}
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              variant="outlined"
              type="password"
              required
            />
            <TextField
              label="Occupation"
              value={values.occupation}
              name="occupation"
              onChange={handleChange}
              onBlur={handleBlur}
              variant="outlined"
            />
            <TextField
              label="Address"
              value={values.address}
              name="address"
              onChange={handleChange}
              onBlur={handleBlur}
              variant="outlined"
            />
            <button
              type="submit"
              variant="outlined"
              className={styles.form_btn}
            >
              Submit
            </button>
          </Box>
          {/* </form> */}
          <div className="text-center py-4 md:py-2">
            <span className="text-teal-800">
              Already have an account?{" "}
              <Link className="text-red-500 font-semibold underline" to="/">
                Login
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
