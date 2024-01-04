import { Box, Button, Grid, TextField } from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import Select from "react-select";
import { v4 as uuidv4 } from "uuid";

const InputComponent = ({
  addTopic,
  setAddTopic,
  handleRemoveInput,
  handleInputChange,
  handleAddInput,
}) => {
  const chapterOptions = [
    { label: "CHAPTER 1", value: "1" },
    { label: "CHAPTER 2", value: "1" },
    { label: "CHAPTER 3", value: "1" },
    { label: "CHAPTER 4", value: "1" },
    { label: "CHAPTER 5", value: "1" },
  ];

  const formik = useFormik({
    initialValues: {
      topic: "",
      subTopic: "",
      chapter: "",
    },

    onSubmit: (values) => {
      console.log(values, uuidv4());
    },
  });
  const renderInputs = () => {
    console.log(formik);
    return addTopic.map((input, index) => (
      <form onBlur={formik.handleSubmit}>
        <Grid
          container
          key={index}
          spacing={2}
          style={{ display: "flex", alignItems: "center" }}
        >
          <Grid item xs={10} sm={10} md={3}>
            <TextField
              type="text"
              value={formik.values.topic}
              // onBlur={formik.values.topic}
              onChange={formik.handleChange}
              placeholder="Topic"
              margin="normal"
              style={{
                background: "white",
                borderRadius: "5px",
                width: "100%",
                color: "white",
              }}
            />
          </Grid>
          <Grid item xs={10} sm={10} md={3}>
            <TextField
              type="text"
              value={formik.values.subTopic}
              // onBlur={formik.values.subTopic}
              onChange={formik.handleChange}
              placeholder="subTopic"
              margin="normal"
              style={{
                background: "white",
                borderRadius: "5px",
                width: "100%",
                color: "white",
              }}
            />
          </Grid>
          <Grid item xs={10} sm={10} md={3}>
            <Select
              name="boardValue"
              options={chapterOptions}
              onChange={(e) => formik.setFieldValue("chapter", e)}
              placeholder="Select Board"
              value={formik.values.chapter}
              // onBlur={formik.values.chapter}
            />
          </Grid>
          <Grid item xs={10} sm={10} md={3}>
            <Button
              variant="contained"
              style={{
                background: "#232d3f",
                margin: "0.5rem",
                padding: "0.5rem",
              }}
              type="button"
              onClick={() => handleRemoveInput(index)}
            >
              Remove
            </Button>
          </Grid>
        </Grid>
      </form>
    ));
  };
  return (
    <div>
      <div>{renderInputs()}</div>
      <Button
        variant="contained"
        style={{
          background: "#232d3f",
          margin: "0.5rem",
          padding: "0.5rem",
        }}
        type="button"
        onClick={handleAddInput}
      >
        Add Input
      </Button>
    </div>
  );
};

export default InputComponent;
