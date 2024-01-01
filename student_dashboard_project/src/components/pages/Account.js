import React, { useState, useEffect } from "react";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  Input,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import SubHeader from "../../common/SubHeader";
import { useFormik } from "formik";
import Profile from "../../images/profile.jpg";
import * as Yup from "yup";
import Header from "../Header/Header";
import Sidebar from "../sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";

const Account = () => {
  const navigate = useNavigate();
  const access = JSON.parse(localStorage.getItem("data"));

  const [selectImage, setSelectImage] = useState(null);
  const [toaster, setToaster] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      // name: access?.formData.name || "",
      // email: access?.formData.email || "",
      // mobile: access?.formData.mobile || "",
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
      setLoginMessage("Account Update Successfully..");
    },
  });
  const fieldStyles = {
    marginBottom: "0.5rem",
  };
  useEffect(() => {
    if (!access.token) {
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
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setToaster(false);
  };
  return (
    <>
      <Grid container>
        <Grid md={2} sx={2} className="side__page">
          <Sidebar />
        </Grid>
        <Grid md={10} sx={10}>
          <>
            <Header />
            <Paper elevation={2} className="account__page">
              <SubHeader name="Account" />
              <Divider />
              <Box className="account__page_container">
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "2rem",
                    flexDirection: "column",
                  }}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                    id="imageInput"
                  />
                  <label htmlFor="imageInput">
                    <img
                      src={
                        selectImage ||
                        access.defaultProfile ||
                        (access.defaultProfile === null && Profile)
                      }
                      initial
                      width="100"
                      height="100"
                      value
                      style={{
                        borderRadius: "50%",
                      }}
                    />
                  </label>
                </Box>
                <form
                  onSubmit={formik.handleSubmit}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    paddingTop: "1rem",
                  }}
                >
                  <Grid item xs={12} sm={12} md={8}>
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
                      type="submit"
                      size="small"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: "1rem",
                        background: "aliceblue",
                        color: "black",
                        fontWeight: "bold",
                      }}
                    >
                      Submit
                    </Button>
                  </Grid>
                </form>
              </Box>
            </Paper>
            <Footer />
          </>
        </Grid>
      </Grid>
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
    </>
  );
};

export default Account;
