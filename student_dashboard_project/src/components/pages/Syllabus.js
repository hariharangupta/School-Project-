import React, { useState, useEffect } from "react";
import {
  Alert,
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  Snackbar,
} from "@mui/material";
import SubHeader from "../../common/SubHeader";
import { useFormik } from "formik";
import Select from "react-select";
import Sidebar from "../sidebar/Sidebar";
import Header from "../Header/Header";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Footer from "../Footer/Footer";

const Syllabus = () => {
  const navigate = useNavigate();
  const access = JSON.parse(localStorage.getItem("data"));

  const [selectedYear, setSelectedYear] = useState(null);
  const [records, setRecords] = useState([]);
  const [toaster, setToaster] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");
  const boardOptions = [
    { value: "CBSE", label: "CBSE" },
    { value: "SCC", label: "SCC" },
  ];
  const handleYearChange = (date) => {
    const selectedYear = date.getFullYear();
    setSelectedYear(new Date(selectedYear, 1, 1));
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setToaster(false);
  };

  useEffect(() => {
    if (!access.token) {
      navigate("/login");
    }
  }, []);

  const classOptions = [
    { value: "1st", label: "1st" },
    { value: "2nd", label: "2nd" },
    { value: "3rd", label: "3rd" },
    { value: "4th", label: "4th" },
    { value: "5th", label: "5th" },
    { value: "6th", label: "6th" },
    { value: "7th", label: "7th" },
    { value: "8th", label: "8th" },
    { value: "9th", label: "9th" },
    { value: "10th", label: "10th" },
  ];

  const subjectOptions = [
    { value: "English", label: "English" },
    { value: "Hindi", label: "Hindi" },
    { value: "Maths", label: "Maths" },
    { value: "Science", label: "Science" },
    { value: "Social", label: "Social" },
  ];
  console.log(selectedYear);
  const formik = useFormik({
    initialValues: {
      boardValue: "",
      classValue: "",
      subjectValue: "",
    },
    onSubmit: (values) => {
      const newRecord = {
        ...values,
        year: selectedYear || "",
      };

      const updatedRecords = [...records, newRecord];

      setRecords(updatedRecords);

      localStorage.setItem("syllabusRecords", JSON.stringify(updatedRecords));
      setToaster(true);
      setLoginMessage("Record Added Successfully..");
      formik.resetForm();
      setSelectedYear(null);
    },
  });
  const fieldStyles = {
    margin: "1rem 0.5rem",
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
            <Paper elevation={2} className="syllabus__page">
              <SubHeader name="Syllabus" />
              <Divider />
              <Box className="syllabus__page_container">
                <form
                  onSubmit={formik.handleSubmit}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    paddingTop: "1rem",
                  }}
                >
                  <Grid item xs={12} sm={12} md={8}>
                    <Box style={fieldStyles}>
                      <Select
                        name="boardValue"
                        options={boardOptions}
                        onChange={(e) => formik.setFieldValue("boardValue", e)}
                        value={formik.values.boardValue}
                        placeholder="Select Board"
                      />
                    </Box>
                    <Box style={fieldStyles}>
                      <Select
                        name="classValue"
                        options={classOptions}
                        onChange={(e) => formik.setFieldValue("classValue", e)}
                        value={formik.values.classValue}
                        placeholder="Select Class"
                      />
                    </Box>
                    <Box style={fieldStyles}>
                      <Select
                        name="subjectValue"
                        options={subjectOptions}
                        onChange={(e) =>
                          formik.setFieldValue("subjectValue", e)
                        }
                        value={formik.values.subjectValue}
                        placeholder="Select Subject"
                      />
                    </Box>
                    <Box style={fieldStyles}>
                      <DatePicker
                        selected={selectedYear}
                        onChange={handleYearChange}
                        dateFormat="yyyy"
                        showYearPicker
                        styles={{
                          width: "150px",
                          padding: "8px",
                          fontSize: "16px",
                        }}
                      />
                    </Box>

                    <Button
                      variant="contained"
                      type="submit"
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

export default Syllabus;
