import { Box, Button, Grid, TextField } from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import Select from "react-select";
import { v4 as uuidv4 } from "uuid";
import DeleteIcon from "@mui/icons-material/Delete";

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
    // validationSchema: Yup.object({
    //   description: Yup.string().required("Description is required"),
    // }),
    onSubmit: (values) => {
      console.log(addTopic);
    },
  });
  const handleTopicChange = (index, value) => {
    console.log(index, value);
    handleInputChange(index, { ...addTopic[index], topic: value });
  };

  const handleSubTopicChange = (index, value) => {
    handleInputChange(index, { ...addTopic[index], subTopic: value });
  };

  const handleChapterChange = (index, value) => {
    handleInputChange(index, { ...addTopic[index], chapter: value });
  };

  const renderInputs = () => {
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
              name="topic"
              type="text"
              value={input.topic}
              onChange={(e) => handleTopicChange(index, e.target.value)}
              style={{
                background: "white",
                borderRadius: "5px",
                width: "100%",
                color: "white",
              }}
              placeholder="Topic"
              margin="normal"
            />
          </Grid>
          <Grid item xs={10} sm={10} md={3}>
            <TextField
              name="subTopic"
              type="text"
              value={input.subTopic}
              onChange={(e) => handleSubTopicChange(index, e.target.value)}
              style={{
                background: "white",
                borderRadius: "5px",
                width: "100%",
                color: "white",
              }}
              placeholder="subTopic"
              margin="normal"
            />
          </Grid>
          <Grid item xs={10} sm={10} md={3}>
            <Select
              name="boardValue"
              options={chapterOptions}
              onChange={(e) => handleChapterChange(index, e)}
              placeholder="Select Board"
              value={input.chapter}
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
              <DeleteIcon />
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
        Add Topic
      </Button>
    </div>
  );
};

export default InputComponent;
