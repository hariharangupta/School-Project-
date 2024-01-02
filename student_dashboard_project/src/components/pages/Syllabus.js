import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Alert,
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  Snackbar,
  Typography,
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
    const storedRecords = JSON.parse(localStorage.getItem("syllabusRecords"));
    if (storedRecords) {
      setRecords(storedRecords);
    }
  }, []);

  const classOptions = [
    { value: "1", label: "1 CLASS" },
    { value: "2", label: "2 CLASS" },
    { value: "3", label: "3 CLASS" },
    { value: "4", label: "4 CLASS" },
    { value: "5", label: "5 CLASS" },
    { value: "6", label: "6 CLASS" },
    { value: "7", label: "7 CLASS" },
    { value: "8", label: "8 CLASS" },
    { value: "9", label: "9 CLASS" },
    { value: "10", label: "10 CLASS" },
  ];

  const subjectOptions = [
    { value: "ENGLISH", label: "ENGLISH" },
    { value: "HINDI", label: "HINDI" },
    { value: "MATHS", label: "MATHS" },
    { value: "SCIENCE", label: "Science" },
    { value: "SOCIAL", label: "Social" },
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
        id: uuidv4(),
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
                <Box className="syllabus__page_container_header">
                  <Typography variant="h6">ADD STUDENT</Typography>
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
                        wrapperClassName="datePicker"
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
