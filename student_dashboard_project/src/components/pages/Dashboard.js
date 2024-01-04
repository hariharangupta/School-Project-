import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import SubHeader from "../../common/SubHeader";
import DataTable from "react-data-table-component";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Sidebar from "../sidebar/Sidebar";

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const access = JSON.parse(localStorage.getItem("data")) || "";
  const [records, setRecords] = useState([]);

  useEffect(() => {
    if (!access?.token) {
      navigate("/login");
    }
    const syllabusRecords =
      JSON.parse(localStorage.getItem("syllabusRecords")) || [];
    if (syllabusRecords) {
      setRecords(syllabusRecords);
    }
  }, []);

  const columns = [
    {
      name: "BOARD",
      selector: (row) => row.boardValue?.value,
      sortable: true,
      style: {
        textAlign: "center",
      },
    },
    {
      name: "CLASS",
      selector: (row) => row.classValue?.value,
      sortable: true,
      style: {
        textAlign: "center",
      },
    },
    {
      name: "SUBJECT",
      selector: (row) => row.subjectValue?.value,
      sortable: true,
    },
    {
      name: "ACADEMIC YEAR",
      selector: (row) => String(row.year).substring(0, 10),
      sortable: true,
    },
    {
      name: "DESCRIPTION",
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: "Topics",
      cell: (row) => (
        <Box className="listItems">
          {row.topicsData?.map((item, i) => (
            <>
              <Box key={i} className="items">
                {item.topic && (
                  <p
                    style={{
                      margin: "5px",
                      background: "#232d3f",
                      padding: "5px",
                      borderRadius: "5px",
                      color: "white",
                    }}
                  >
                    {item?.topic}
                  </p>
                )}
                {item.subTopic && (
                  <p
                    style={{
                      margin: "5px",
                      background: "#232d3f",
                      padding: "5px",
                      borderRadius: "5px",
                      color: "white",
                    }}
                  >
                    {item?.subTopic}
                  </p>
                )}
                {item.chapter && (
                  <p
                    style={{
                      margin: "5px",
                      background: "#232d3f",
                      padding: "5px",
                      borderRadius: "5px",
                      color: "white",
                    }}
                  >
                    {item?.chapter?.label}
                  </p>
                )}
              </Box>
            </>
          ))}
        </Box>
      ),
      sortable: false,
      grow: 3,
    },
    {
      name: "ACTION",
      cell: (value) => (
        <Box onClick={(e) => deleteRecord(value)} style={{ cursor: "pointer" }}>
          <DeleteIcon />
        </Box>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const deleteRecord = (value) => {
    console.log(value);
    const filteredData = records.filter((item) => item.id !== value.id);
    setRecords(filteredData);
    localStorage.setItem("syllabusRecords", JSON.stringify(filteredData));
  };

  const customStyles = {
    rows: {
      style: {
        minHeight: "50px",
        maxWidth: "100%",
      },
    },
    headCells: {
      style: {
        backgroundColor: "#232d3f",
        color: "white",
        fontSize: "14px",
        textAlign: "center",
      },
    },
    cells: {
      style: {
        fontWeight: "500",
        textAlign: "center",
      },
      cell: {
        textAlign: "center",
      },
    },
    pagination: {
      style: {
        backgroundColor: "#232d3f",
        color: "white",
      },
      pageButtonsStyle: {
        borderColor: "#d6d6d6",
        color: "white",
      },
    },
    noData: {
      style: {
        fontSize: "18px",
        color: "#555",
      },
    },
  };
  const searchData =
    records &&
    records.filter(
      (value) =>
        value?.boardValue?.value
          ?.toLowerCase()
          .includes(String(searchValue).toLowerCase()) ||
        value.subjectValue?.value
          ?.toLowerCase()
          ?.includes(String(searchValue).toLowerCase()) ||
        value?.classValue?.value
          ?.toLowerCase()
          .includes(String(searchValue).toLowerCase()) ||
        value?.description
          ?.toLowerCase()
          .includes(String(searchValue).toLowerCase())
    );

  const btnHandler = () => {
    navigate("/syllabus");
  };
  return (
    <>
      <Grid container>
        <Grid item xs={2} sm={2} md={2}>
          <Sidebar />
        </Grid>
        <Grid item xs={10} sm={10} md={10}>
          <Header />
          <SubHeader
            name="DASHBOARD"
            btnText={"ADD SYLLABUS"}
            btnHandler={btnHandler}
            showButton={true}
          />
          <Divider sx={{ background: "white" }} />
          <Box className="dashboard__page_container">
            <DataTable
              columns={columns}
              customStyles={customStyles}
              data={searchData}
              pagination
              fixedHeader={true}
              subHeader={true}
              striped={true}
              subHeaderComponent={
                <Box style={{ margin: "0 1rem" }}>
                  <TextField
                    fullWidth
                    name="searchValue"
                    type="text"
                    margin="normal"
                    value={searchValue}
                    placeholder="Search"
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                </Box>
              }
            />
          </Box>
          <Footer />
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
