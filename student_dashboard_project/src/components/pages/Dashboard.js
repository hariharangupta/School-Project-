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
      selector: (row) => String(row.year).substring(0, 10),
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
        <Box onClick={(e) => deleteRecord(value)}>
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

  // const data = [
  //   {
  //     board: "CBSE",
  //     class: "10th",
  //     subject: "Maths",
  //     academicYear: "2020",
  //     description: "About Maths",
  //     subTopic: "Maths is my fav subject",
  //   },
  //   {
  //     board: "SCC",
  //     class: "10th",
  //     subject: "Maths",
  //     academicYear: "2020",
  //     description: "About Maths",
  //     subTopic: "Maths is my fav subject",
  //   },
  //   {
  //     board: "CBSE",
  //     class: "10th",
  //     subject: "Maths",
  //     academicYear: "2020",
  //     description: "About Maths",
  //     subTopic: "Maths is my fav subject",
  //   },
  //   {
  //     board: "CBSE",
  //     class: "10th",
  //     subject: "Maths",
  //     academicYear: "2020",
  //     description: "About Maths",
  //     subTopic: "Maths is my fav subject",
  //   },
  //   {
  //     board: "CBSE",
  //     class: "10th",
  //     subject: "Maths",
  //     academicYear: "2020",
  //     description: "About Maths",
  //     subTopic: "Maths is my fav subject",
  //   },
  // ];

  // const AddComponent = ({ searchValue, setSearchValue }) => {
  //   const handleSearch = (e) => {
  //     setSearchValue(e.target.value);
  //   };
  //   return (
  //     <div
  //       style={{
  //         display: "flex",
  //         justifyContent: "flex-end",
  //         alignItems: "center",
  //       }}
  //     >
  //       <Box>
  //         <TextField
  //           fullWidth
  //           name="searchValue"
  //           type="text"
  //           margin="normal"
  //           value={searchValue}
  //           placeholder="Search"
  //           onChange={(e) => setSearchValue(e.target.value)}
  //         />
  //       </Box>
  //       <Box style={{ margin: "1rem" }}>
  //         <Button
  //           variant="contained"
  //           color="inherit"
  //           onClick={() => navigate("/syllabus")}
  //           style={{
  //             background: "aliceblue",
  //             color: "black",
  //             fontWeight: "bold",
  //             height: "55px",
  //           }}
  //         >
  //           Add Syllabus
  //         </Button>
  //       </Box>
  //     </div>
  //   );
  // };

  const customStyles = {
    rows: {
      style: {
        minHeight: "50px",
      },
    },
    headCells: {
      style: {
        backgroundColor: "#cbcccf",
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
        backgroundColor: "#cbcccf",
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
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
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
