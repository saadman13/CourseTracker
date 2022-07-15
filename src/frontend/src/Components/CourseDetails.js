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

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { axiosInstance } from '../axiosApi';

// function createData(name, calories, fat, carbs, protein) {
//     return { name, calories, fat, carbs};
//   }
  
// const rows = [
//     createData('Midterm 1', 20, 100, 100),
//     createData('Midterm 2', 25,100, 100),
//     createData('Assignment1', 15, 100, 100),
//     createData('Final', 40, 100, 100),
// ];

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
    const params = useParams();

    const [newComponent, setNewComponent] = useState({});
    const [components, setComponents] = useState([]);
    const [open, setOpen] = useState(false);
    const [totalWeight, setTotalWeight] = useState(0.0);
    const [totalGradeReceived, setTotalGradeReceived] = useState(0.0);
    const [totalGoalGrade, setTotalGoalGrade] = useState(0.0);

    useEffect(() => {
        const fetchCourseComponents = async () => {
            try {
                const response = await axiosInstance.get(`courses/components/${params.id}`);
                console.log(response);
                setComponents(response.data.components);
                return response;
            } catch (error) {
                alert(`Error! ${error.message}`)
                console.log(error);
                throw error;
            }
        }
        
        fetchCourseComponents();
 
    }, []);

    // useEffect(() => {
    //     console.log("Hello");
    //     console.log(components);
    //     calcTotal();
    // }, components)

    const calcWeight = () => {
        let sum = 0;
        for (let component of components){
            console.log(component);
            sum += component.weight;
        }
        return sum;
    }

    const calcGradeReceived = () => {
        let gradeReceived = 0;
        for(let component of components){
            gradeReceived += (component.weight/100) * (component.grade_received/100);
        }
        return gradeReceived * 100;
    }

    const calcGoalGrade = () => {
        let goalGrade = 0;
        for(let component of components){
            goalGrade += (component.weight/100) * (component.goal_grade/100);
        }
        return goalGrade * 100;
    }

    // const calcTotal = () => {
    //     setTotalWeight(sumWeight());
    //     setTotalGradeReceived(calcGradeReceived());
    //     setTotalGoalGrade(calcGoalGrade());
    // }

    const handleClickOpen = () => {
      setOpen(true);
      console.log("Open");
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleAddComponent = async () => {
        try {
            const response = await axiosInstance.post(`courses/components/${params.id}`, {...newComponent})
            setComponents(prevComponents => [response.data, ...prevComponents]);
            setNewComponent({});
            setOpen(false);
            return response;
        } catch (error) {
            alert(`Error! ${error.message}`)
            console.log(error);
            throw error;
        }
    }

    const componentNameHandler = (event) => {
        setNewComponent((prev) => {
            return { ...prev, name: event.target.value}
        });
    }
    const weightHandler = (event) => {
        setNewComponent((prev) => {
            return { ...prev, weight: parseInt(event.target.value)}
        });
    }
    const gradeReceivedHandler = (event) => {
        setNewComponent((prev) => {
            return { ...prev, grade_received: parseInt(event.target.value)}
        });
    }
    const expectedGradeHandler = (event) => {
        setNewComponent((prev) => {
            return { ...prev, goal_grade: parseInt(event.target.value)}
        });
    }

    console.log(params);
    return (
        <div>
            <div className="main-title">
                <h1 className="course-name-title">{location.state.courseName.toLocaleUpperCase()}</h1>
                <button className="add-comp-btn" onClick={handleClickOpen}>Add a component</button>
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
                        {components.map((component) => (
                            <StyledTableRow
                                key={component.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row" >
                                    {component.name}
                                </StyledTableCell>
                                <StyledTableCell align="right">{component.weight}</StyledTableCell>
                                <StyledTableCell align="right">{component.grade_received}</StyledTableCell>
                                <StyledTableCell align="right">{component.goal_grade}</StyledTableCell>
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
        
                        {components.length > 0 && <StyledTableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row" >
                                    Total
                                </StyledTableCell>
                                <StyledTableCell align="right">{calcWeight()}</StyledTableCell>
                                <StyledTableCell align="right">{calcGradeReceived().toFixed(2)}</StyledTableCell>
                                <StyledTableCell align="right">{calcGoalGrade().toFixed(2)}</StyledTableCell>
                        </StyledTableRow>}
                    </TableBody>
                </Table>
            </TableContainer>
            <div class="feedback-container">
                <h2>Feedback:</h2>
                <p>
                    out of <span className="feedback-total">{calcWeight()}%</span> of the course, you have received <span className="feedback-total">{calcGradeReceived().toFixed(2)}%</span>. Your goal grade at this point was to get <span className="feedback-total">{calcGoalGrade().toFixed(2)}</span>%.
                </p>
            </div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add a component</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                            Grade Received and Expected Grade could be left empty initially.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="Component Name"
                        label="Component Name"
                        placeholder='Assignment 1'
                        type="text"
                        fullWidth
                        onChange={componentNameHandler}
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="Weight"
                        label="Weight (%)"
                        type="number"
                        fullWidth
                        placeholder='15'
                        onChange={weightHandler}
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="Grade Received"
                        label="Grade Received (%)"
                        placeholder='80'
                        type="number"
                        fullWidth
                        onChange={gradeReceivedHandler}
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="Expected Grade"
                        label="Expected Grade (%)"
                        type="number"
                        placeholder='85'
                        fullWidth
                        onChange={expectedGradeHandler}
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleAddComponent}>Add</Button>
                </DialogActions>
            </Dialog>       
        </div>
    );
}

export default CourseDetails;