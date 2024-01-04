import React, { useState, useEffect, useRef } from "react";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  Snackbar,
  TextField,
} from "@mui/material";
import SubHeader from "../../common/SubHeader";
import { useFormik } from "formik";
import Profile from "../../images/profile.jpg";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

const Account = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const access = JSON.parse(localStorage.getItem("data")) || "";
  const [selectImage, setSelectImage] = useState(null);
  const [toaster, setToaster] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      // name: "",
      // email: "",
      // mobile: "",
      name: access?.formData?.name || "",
      email: access?.formData?.email || "",
      mobile: access?.formData?.mobile || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      mobile: Yup.string()
        .matches(
          /^[0-9]{0,10}$/,
          "Mobile must be a number with up to 10 digits"
        )
        .required("Mobile is required"),
    }),
    onSubmit: (values) => {
      localStorage.setItem(
        "data",
        JSON.stringify({
          defaultProfile: selectImage,
          token: access.token,
          formData: values,
        })
      );
      setToaster(true);
      navigate("/dashboard");

      setLoginMessage("Account Update Successfully..");
    },
  });
  const fieldStyles = {
    margin: "1rem 0",
  };
  useEffect(() => {
    if (!access?.token) {
      navigate("/login");
    }
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageData = reader.result;
        localStorage.setItem(
          "data",
          JSON.stringify({
            defaultProfile: imageData,
            token: access.token,
          })
        );
        setSelectImage(imageData);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleClose = (value) => {
    if (value === "clickaway") {
      return;
    }
    setToaster(false);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <Grid container>
        <Grid item xs={2} sm={2} md={2}>
          <Sidebar />
        </Grid>
        <Grid item xs={10} sm={10} md={10}>
          <Header />

          <SubHeader name="ACCOUNT" showButton={false} />
          <Divider sx={{ background: "white" }} />
          <Box className="account__page_container">
            <Box
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                paddingTop: "0.5rem 0",
              }}
            >
              <label htmlFor="imageInput">
                <img
                  src={
                    selectImage ||
                    access.defaultProfile ||
                    (access.defaultProfile === null && Profile)
                  }
                  className="account__page_logo"
                  value
                  style={{
                    borderRadius: "50%",
                  }}
                />
              </label>

              <Button
                variant="contained"
                style={{
                  background: "#232d3f",
                }}
                type="button"
                onClick={handleButtonClick}
              >
                Change Profile Picture
              </Button>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
                ref={fileInputRef}
                id="imageInput"
              />
            </Box>
            <form
              onSubmit={formik.handleSubmit}
              style={{
                display: "flex",
                justifyContent: "center",
                paddingTop: "1rem",
              }}
            >
              <Grid item xs={10} sm={10} md={10}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  type="text"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  style={fieldStyles}
                />
                {formik.errors.name && formik.touched.name && (
                  <div className="danger">{formik.errors.name}</div>
                )}
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  margin="normal"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  style={fieldStyles}
                />
                {formik.errors.email && formik.touched.email && (
                  <div className="danger">{formik.errors.email}</div>
                )}
                <TextField
                  fullWidth
                  label="mobile"
                  name="mobile"
                  type="text"
                  margin="normal"
                  value={formik.values.mobile}
                  onChange={formik.handleChange}
                  style={fieldStyles}
                />
                {formik.errors.mobile && formik.touched.mobile && (
                  <div className="danger">{formik.errors.mobile}</div>
                )}
                <Button
                  variant="contained"
                  style={{
                    background: "#232d3f",
                    margin: "0.5rem 0",
                  }}
                  type="submit"
                >
                  {!access?.formData ? "Create Profile" : "Edit Profile"}
                </Button>
              </Grid>
            </form>
          </Box>
          <Footer />
          <Box>
            <Snackbar
              open={toaster}
              autoHideDuration={6000}
              onClose={handleClose}
              message={loginMessage}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <Alert severity="success" onClose={handleClose}>
                {loginMessage}
              </Alert>
            </Snackbar>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Account;
