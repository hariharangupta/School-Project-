import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import SubHeader from "../../common/SubHeader";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const access = JSON.parse(localStorage.getItem("data"));
  const syllabusRecords =
    JSON.parse(localStorage.getItem("syllabusRecords")) || [];
  console.log(syllabusRecords);
  useEffect(() => {
    if (!access.token) {
      navigate("/login");
    }
  }, []);

  const columns = [
    {
      name: "BOARD",
      selector: (row) => row.boardValue?.value,
      sortable: true,
      text: "center",
      grow: 2,
    },
    {
      name: "CLASS",
      selector: (row) => row.classValue?.value,
      sortable: true,
      grow: 2,
    },
    {
      name: "SUBJECT",
      selector: (row) => row.subjectValue?.value,
      sortable: true,
      grow: 2,
    },
    {
      name: "ACADEMIC YEAR",
      selector: (row) => row.year,
      sortable: true,
      grow: 2,
    },
    {
      name: "DESCRIPTION",
      selector: (row) => row.description,
      sortable: true,
      grow: 2,
    },

    {
      name: "ACTION",
      cell: (value) => (
        <Button
          variant="contained"
          size="small"
          onClick={(e) => deleteRecord(value)}
          style={{
            background: "aliceblue",
            color: "black",
            fontWeight: "bold",
          }}
        >
          Delete
        </Button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const [records, setRecords] = useState(syllabusRecords);

  const deleteRecord = (index) => {
    const updatedRecords = [...records];
    updatedRecords.splice(index, 1);
    setRecords(updatedRecords);
    localStorage.setItem("syllabusRecords", JSON.stringify(updatedRecords));
  };

  const data = [
    {
      board: "CBSE",
      class: "10th",
      subject: "Maths",
      academicYear: "2020",
      description: "About Maths",
      subTopic: "Maths is my fav subject",
    },
    {
      board: "SCC",
      class: "10th",
      subject: "Maths",
      academicYear: "2020",
      description: "About Maths",
      subTopic: "Maths is my fav subject",
    },
    {
      board: "CBSE",
      class: "10th",
      subject: "Maths",
      academicYear: "2020",
      description: "About Maths",
      subTopic: "Maths is my fav subject",
    },
    {
      board: "CBSE",
      class: "10th",
      subject: "Maths",
      academicYear: "2020",
      description: "About Maths",
      subTopic: "Maths is my fav subject",
    },
    {
      board: "CBSE",
      class: "10th",
      subject: "Maths",
      academicYear: "2020",
      description: "About Maths",
      subTopic: "Maths is my fav subject",
    },
  ];

  const AddComponent = ({}) => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Box>
          <TextField
            fullWidth
            name="searchValue"
            type="text"
            margin="normal"
            value={searchValue}
            placeholder="Search"
            onInput={(e) => setSearchValue(e.target.value)}
          />
        </Box>
        <Box style={{ margin: "1rem" }}>
          <Button
            variant="contained"
            color="inherit"
            onClick={() => navigate("/syllabus")}
            style={{
              background: "aliceblue",
              color: "black",
              fontWeight: "bold",
            }}
          >
            Add Syllabus
          </Button>
        </Box>
      </div>
    );
  };

  const customStyles = {
    rows: {
      style: {
        minHeight: "50px",
      },
    },
    headCells: {
      style: {
        backgroundColor: "aliceblue",
        fontWeight: "bold",
        fontSize: "14px",
      },
    },
    cells: {
      style: {
        fontWeight: "500",
      },
    },
    pagination: {
      style: {
        backgroundColor: "aliceblue",
      },
      pageButtonsStyle: {
        borderColor: "#d6d6d6",
      },
    },
    noData: {
      style: {
        fontSize: "18px",
        color: "#555",
      },
    },
  };
  return (
    <>
      <Grid container>
        <Grid item xs={2} sm={2} md={2} className="side__page">
          <Sidebar />
        </Grid>
        <Grid item xs={10} sm={10} md={10}>
          <>
            <Header />
            <Paper elevation={2} className="dashboard__page">
              <SubHeader name="Dashboard" />
              <Divider />
              <Box className="dashboard__page_container">
                <DataTable
                  columns={columns}
                  customStyles={customStyles}
                  data={syllabusRecords}
                  // data={
                  //   syllabusRecords?.length > 0
                  //     ? syllabusRecords.filter(
                  //         (value) =>
                  //           value?.boardValue?.value
                  //             .toLowerCase()
                  //             .includes(String(searchValue).toLowerCase()) ||
                  //           value?.description
                  //             .toLowerCase()
                  //             .includes(String(searchValue).toLowerCase()) ||
                  //           value?.classValue?.value
                  //             .toLowerCase()
                  //             .includes(
                  //               String(searchValue).toLowerCase() ||
                  //                 value.subjectValue?.value
                  //                   ?.toLowerCase()
                  //                   ?.includes(
                  //                     String(searchValue).toLowerCase()
                  //                   )
                  //             )
                  //       )
                  //     : syllabusRecords
                  // }
                  pagination
                  subHeader={true}
                  subHeaderComponent={<AddComponent />}
                />
              </Box>
            </Paper>
            <Footer />
          </>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
