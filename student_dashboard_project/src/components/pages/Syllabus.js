import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Alert,
  Box,
  Button,
  Divider,
  FormLabel,
  Grid,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import SubHeader from "../../common/SubHeader";
import { useFormik } from "formik";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as Yup from "yup";
import InputComponent from "../../common/InputComponent";
import Sidebar from "../sidebar/Sidebar";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const Syllabus = () => {
  const navigate = useNavigate();
  const access = JSON.parse(localStorage.getItem("data")) || "";
  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [selectedYear, setSelectedYear] = useState("");
  const [records, setRecords] = useState([]);
  const [toaster, setToaster] = useState(false);
  const [toastMessage, settoastMessage] = useState("");
  const [addTopic, setAddTopic] = useState([""]);

  const boardOptions = [
    { value: "CBSE", label: "CBSE" },
    { value: "SCC", label: "SCC" },
  ];
  const handleYearChange = (date) => {
    setIsOpen(!isOpen);
    setSelectedYear(date);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setToaster(false);
  };

  const handleChange = (e) => {
    setIsOpen(!isOpen);
    setStartDate(e);
  };
  const handleClick = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (!access?.token) {
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
      description: "",
    },
    validationSchema: Yup.object({
      description: Yup.string().required("Description is required"),
    }),
    onSubmit: (values) => {
      const newRecord = {
        ...values,
        id: uuidv4(),
        year: selectedYear || "",
      };

      const updatedRecords = [...records, newRecord];
      setRecords(updatedRecords);
      navigate("/dashboard");
      localStorage.setItem("syllabusRecords", JSON.stringify(updatedRecords));
      console.log(updatedRecords);
      setToaster(true);
      settoastMessage("Record Added Successfully..");
      formik.resetForm();
      setSelectedYear("");
    },
  });
  const fieldStyles = {
    margin: "1rem 0.5rem",
  };
  const handleRemoveInput = (index) => {
    const newInputs = [...addTopic];
    newInputs.splice(index, 1);
    setAddTopic(newInputs);
  };
  const handleInputChange = (index, value) => {
    const newInputs = [...addTopic];
    newInputs[index] = value;
    setAddTopic(newInputs);
  };

  const handleAddInput = ({ handleAddInput }) => {
    setAddTopic([...addTopic, ""]);
  };
  return (
    <>
      <Grid container>
        <Grid item xs={2} sm={2} md={2}>
          <Sidebar />
        </Grid>
        <Grid item xs={10} sm={10} md={10}>
          <Header />
          <SubHeader name="ADD SYLLABUS" showButton={false} />
          <Divider sx={{ background: "white" }} />
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
                  {!formik.values.boardValue && (
                    <div className="danger">{"Please Select Board"}</div>
                  )}
                </Box>
                <Box style={fieldStyles}>
                  <Select
                    name="classValue"
                    options={classOptions}
                    onChange={(e) => formik.setFieldValue("classValue", e)}
                    value={formik.values.classValue}
                    placeholder="Select Class"
                  />
                  {!formik.values.classValue && (
                    <div className="danger">{"Please Select Class"}</div>
                  )}
                </Box>
                <Box style={fieldStyles}>
                  <Select
                    name="subjectValue"
                    options={subjectOptions}
                    onChange={(e) => formik.setFieldValue("subjectValue", e)}
                    value={formik.values.subjectValue}
                    placeholder="Select Subject"
                  />
                  {!formik.values.subjectValue && (
                    <div className="danger">{"Please Select Subject"}</div>
                  )}
                </Box>
                <Box style={fieldStyles}>
                  <InputComponent
                    addTopic={addTopic}
                    setAddTopic={setAddTopic}
                    handleRemoveInput={handleRemoveInput}
                    handleInputChange={handleInputChange}
                    handleAddInput={handleAddInput}
                  />
                </Box>
                <Box style={fieldStyles}>
                  <TextField
                    fullWidth
                    rows={2}
                    multiline
                    name="description"
                    type="text"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    style={{
                      background: "white",
                      borderRadius: "5px",
                      width: "100%",
                      color: "white",
                    }}
                    placeholder="Syllabus Description"
                  />
                  {formik.errors.description && formik.touched.description && (
                    <div className="danger">{formik.errors.description}</div>
                  )}
                </Box>
                <Box
                  // style={{
                  //   margin: "1rem 0.5rem",
                  //   display: "flex",
                  //   justifyContent: "start",
                  //   alignItems: "center",
                  // }}
                  className="syllabus__page_datepicker"
                >
                  <p
                    variant="contained"
                    onClick={handleClick}
                    // style={{
                    //   marginRight: "1rem",
                    //   background: "#232d3f",
                    //   color: "white",
                    // }}
                    className="syllabus__page_datepicker_chip"
                  >
                    Select Academic Year
                  </p>
                  <TextField
                    value={
                      selectedYear !== ""
                        ? new Date(selectedYear.toString()).getFullYear()
                        : "Please Select Year"
                    }
                    InputProps={{ readOnly: true }}
                  />

                  {isOpen && (
                    <DatePicker
                      selected={selectedYear}
                      onChange={handleYearChange}
                      showYearPicker
                      dateFormat="yyyy"
                      placeholderText="Please select a year"
                      inline
                    />
                  )}
                </Box>
                {selectedYear === "" && (
                  <div className="danger" style={fieldStyles}>
                    {"Please Select a Year"}
                  </div>
                )}
                <Button
                  variant="contained"
                  type="submit"
                  style={{
                    background: "#232d3f",
                    margin: "0 0.5rem",
                  }}
                >
                  Submit
                </Button>
              </Grid>
            </form>
          </Box>
          <Footer />
        </Grid>
      </Grid>

      <Box>
        <Snackbar
          open={toaster}
          autoHideDuration={6000}
          onClose={handleClose}
          message={toastMessage}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert severity="success" onClose={handleClose}>
            {toastMessage}
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
};

export default Syllabus;
