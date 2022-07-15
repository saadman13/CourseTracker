import React, {useState, useEffect} from 'react';
import { useLocation, useParams } from 'react-router-dom';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses }  from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './CourseDetails.css';

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs};
  }
  
const rows = [
    createData('Midterm 1', 20, 100, 100),
    createData('Midterm 2', 25,100, 100),
    createData('Assignment1', 15, 100, 100),
    createData('Final', 40, 100, 100),
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.warning.dark,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
      fontWeight: 700
    },
  }));

const CourseDetails = () => {
    const location = useLocation();
    debugger;
    const params = useParams();
    console.log(location.state.courseName);
    return (
        <div>
            <div className="main-title">
                <h1 className="course-name-title">{location.state.courseName.toLocaleUpperCase()}</h1>
                <button className="add-comp-btn">Add a component</button>
            </div>
            <TableContainer component={Paper}>
                <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Component</StyledTableCell>
                            <StyledTableCell align="right">Weight (%)</StyledTableCell>
                            <StyledTableCell align="right">Grade Received&nbsp;(%)</StyledTableCell>
                            <StyledTableCell align="right">Expected Grade&nbsp;(%)</StyledTableCell>
                            <StyledTableCell align="right">Actions</StyledTableCell>
                        </TableRow>   
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <StyledTableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row" >
                                    {row.name}
                                </StyledTableCell>
                                <StyledTableCell align="right">{row.calories}</StyledTableCell>
                                <StyledTableCell align="right">{row.fat}</StyledTableCell>
                                <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                                <StyledTableCell align="right">
                                    <EditIcon
                                        sx={{ cursor: 'pointer' }}
                                        onClick={() => alert("Hello you are editing")}
                                    /> 
                                    <DeleteIcon 
                                        sx={{ cursor: 'pointer' }}
                                    />
                                    
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
        
                        <StyledTableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row" >
                                    Total
                                </StyledTableCell>
                                <StyledTableCell align="right">100</StyledTableCell>
                                <StyledTableCell align="right">100</StyledTableCell>
                                <StyledTableCell align="right">100</StyledTableCell>
                        </StyledTableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default CourseDetails;