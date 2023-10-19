import React, { useState } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import avatar from "../assets/profile.png";
import styles from "../styles/register.module.css";
import { useFormik } from "formik";
import { Toaster, toast } from "react-hot-toast";
import convertToBase64 from "../helper/base64Conveter.js";
import { updateProfile } from "../helper/helper";
import { useSelector } from "react-redux";

function EditUser({ setInfoEdit }) {
  const [file, setFile] = useState();
  const user = useSelector((state) => state.auth.user);

  const { values, handleBlur, handleSubmit, handleChange } = useFormik({
    initialValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      picturePath: user?.picturePath || "",
      occupation: user?.occupation || "",
      location: user?.location || "",
    },
    enableReinitialize: true,
    // validate: registerValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values, action) => {
      values = await Object.assign(values, { picturePath: file || "" });
      let updatePromise = updateProfile(values);
      toast.promise(updatePromise, {
        loading: "Updating User info...",
        success: "Updated Successfully!",
        error: "Couldn't Update!",
      });
    },
  });

  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };

  const handleRemovePhoto = async () => {
    setFile("");
  };

  return (
    <div className="absolute top-[25%] left-[25%] w-[50%] bg-gray-50 dark:bg-slate-800 p-5 rounded-xl shadow-lg z-20 md:w-full md:left-0 md:top-[13%]">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <CloseRoundedIcon
        className="float-right cursor-pointer"
        fontSize="medium"
        onClick={() => setInfoEdit(false)}
      />

      <form
        onSubmit={handleSubmit}
        className="flex items-center flex-col gap-3"
      >
        <label
          htmlFor="profile"
          className="flex max-w-fit justify-center items-center"
        >
          <img
            src={file || user?.picturePath || avatar}
            className={`${styles.profile_img} flex-1 shrink-0`}
            alt="avatar"
          />
        </label>
        <input
          onChange={onUpload}
          type="file"
          name="picturePath"
          id="profile"
          style={{ display: "none" }}
        />
        <button
          type="button"
          className="p-2 dark:text-white rounded-lg dark:`hover:bg-slate-700"
          onClick={handleRemovePhoto}
        >
          Remove Photo
        </button>
        <div className="flex flex-wrap gap-4 justify-center">
          <input
            className="p-2 dark:bg-slate-700 bg-gray-200"
            placeholder="First Name"
            value={values.firstName}
            name="firstName"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <input
            className="p-2 dark:bg-slate-700 bg-gray-200"
            placeholder="Last Name"
            value={values.lastName}
            name="lastName"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <input
            className="p-2 dark:bg-slate-700 bg-gray-200"
            placeholder="Occupation"
            value={values.occupation}
            name="occupation"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <input
            className="p-2 dark:bg-slate-700 bg-gray-200"
            placeholder="Address"
            value={values.location}
            name="location"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {/* <Tooltip title="Email cannot be changed"> */}
          <input
            className="p-2 dark:bg-slate-700 bg-gray-200"
            placeholder="Email"
            value={values.email}
            name="email"
            disabled
          />
          {/* </Tooltip> */}
        </div>
        <button type="submit" className="bg-green-500 rounded-lg p-2">
          Update
        </button>
      </form>
    </div>
  );
}

export default EditUser;
