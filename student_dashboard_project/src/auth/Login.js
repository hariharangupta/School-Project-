import React, { useState } from "react";
import { auth } from "./FireBase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Alert, CircularProgress, Paper, Snackbar } from "@mui/material";
import login_bg from "../images/login_bg.jpg";
import "../App.css";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import defaultProfile from "../images/default.jpg";
import { useFormik } from "formik";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [toaster, setToaster] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .max(15, "Password must be at most 15 characters")
        .required("Password is required"),
    }),
    onSubmit: (values) => {
      console.log(values);
      setLoading(true);
      signInWithEmailAndPassword(auth, values.email, values.password)
        .then((response) => {
          console.log("response", response);
          setToaster(true);
          setLoginMessage("login successfully...");
          setLoading(false);
          navigate("/");

          localStorage.setItem(
            "data",
            JSON.stringify({
              token: response.user.accessToken,
              defaultProfile: defaultProfile,
            })
          );
        })
        .catch((error) => {
          setToaster(true);
          setLoading(false);
          setLoginMessage("login error...");
          console.log(error);
        });
    },
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setToaster(false);
  };
  return (
    <>
      <Grid container className="login__page_container">
        <Grid
          item
          xs={false}
          sm={false}
          md={7}
          sx={{
            backgroundImage: `url(${login_bg})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.5,
          }}
        />

        <Grid item xs={12} sm={12} md={5} component={Paper} elevation={3}>
          <Box className="login__page_form">
            <Typography
              component="h1"
              variant="h5"
              sx={{ textAlign: "center", fontWeight: "bold" }}
            >
              LOGIN
            </Typography>
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
                  label="Email"
                  name="email"
                  type="email"
                  margin="normal"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  style={{
                    background: "white",
                    border: "none",
                    borderRadius: "5px",
                  }}
                />
                {formik.errors.email && formik.touched.email && (
                  <div className="danger">{formik.errors.email}</div>
                )}
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  margin="normal"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  style={{
                    background: "white",
                    border: "none",
                    borderRadius: "5px",
                  }}
                />
                {formik.errors.password && formik.touched.password && (
                  <div className="danger">{formik.errors.password}</div>
                )}
                <Button
                  variant="contained"
                  color="inherit"
                  type="submit"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "1rem",
                    fontWeight: "bold",
                    color: "white",
                    background: "black",
                  }}
                >
                  {loading ? <CircularProgress /> : "Login"}
                </Button>
              </Grid>
            </form>
          </Box>
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
          {toaster ? (
            <Alert severity="success" onClose={handleClose}>
              {loginMessage}
            </Alert>
          ) : (
            <Alert severity="error" onClose={handleClose}>
              {loginMessage}
            </Alert>
          )}
        </Snackbar>
      </Box>
    </>
  );
};

export default Login;
