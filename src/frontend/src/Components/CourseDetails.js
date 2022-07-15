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
    const [options, setOptions] = useState([]);
    const [hasFinishedCourse, setHasFinishedCourse] = useState(false);
    // const [totalWeight, setTotalWeight] = useState(0.0);
    // const [totalGradeReceived, setTotalGradeReceived] = useState(0.0);
    // const [totalGoalGrade, setTotalGoalGrade] = useState(0.0);

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
        updateOptions();
 
    }, []);

    useEffect(() => {
        updateOptions();
    }, [components]);
    useEffect(() => {
        console.log("OPtions updated");
        console.log(options);
    }, [options]);

    const calcWeight = () => {
        let sum = 0;
        for (let component of components){
            sum += component.weight;
        }
        return sum;
    }

    const calcTotalWeightCompleted = () => {
        let sum = 0;
        for (let component of components){
            if (component.grade_received < 0)
                continue;
            sum += component.weight;
        }
        return sum;
    }

    const calcTotalGoalGradeTillNow = () => {
        let goalGrade = 0;
        for(let component of components){
            if (component.goal_grade < 0 || component.grade_received < 0)
                continue;
            goalGrade += (component.weight/100) * (component.goal_grade/100);
        }
        return goalGrade * 100;
    }

    const calcGradeReceived = () => {
        let gradeReceived = 0;
        for(let component of components){
            if (component.grade_received < 0)
                continue;
            gradeReceived += (component.weight/100) * (component.grade_received/100);
        }
        return gradeReceived * 100;
    }

    const calcGoalGrade = () => {
        let goalGrade = 0;
        for(let component of components){
            if (component.goal_grade < 0)
                continue;
            goalGrade += (component.weight/100) * (component.goal_grade/100);
        }
        return goalGrade * 100;
    }

    // const setMessageWhenNoneLeft = () => {
    //     let remainingWeight = calcWeight() - calcTotalWeightCompleted();
    //     let neededGrade = (calcGoalGrade() - (calcWeight() - remainingWeight) * calcGradeReceived())/ remainingWeight;
    //     setOptions([{name: `on the remaining ${remainingWeight}% of the course`, neededGrade: neededGrade}])
    // }

    const hasCompWithoutGrade = () => {
        for (let component of components){
            if(component.grade_received < 0 && component.goal_grade > 0)
                return true;
        }
        //setMessageWhenNoneLeft();
        return false; 
    }

    if(calcTotalWeightCompleted() === 100){
        setHasFinishedCourse(true);
    }


    const updateOptions = () => {
        let neededGrade = -1;
        let totalGradeReceivedSoFar = 0;
        let totalGoalGradeSoFar = 0;

        let doneComponents =  components.filter(component => component.grade_received >= 0 && component.goal_grade >= 0);
        for (let doneComponent of doneComponents){
            totalGradeReceivedSoFar += doneComponent.weight * doneComponent.grade_received;
            totalGoalGradeSoFar += doneComponent.weight * doneComponent.goal_grade;
        }

        let toDoComponents = components.filter(component => component.grade_received < 0 && component.goal_grade > 0);
        // debugger;
        for (let i = 0; i < toDoComponents.length; i++){
            let component = toDoComponents[i];
            if(component.grade_received < 0 && component.goal_grade > 0){
                totalGoalGradeSoFar += component.weight * component.goal_grade;
                neededGrade = (totalGoalGradeSoFar/100 - totalGradeReceivedSoFar/100)/component.weight;
                if (neededGrade <= 1 && neededGrade > 0){
                
                    setOptions((prev) => {
                        return [...prev,{name: component.name, neededGrade: neededGrade}]
                    })
                    return;
                
                }else if (neededGrade > 1){
                    // if(i === toDoComponents.length - 1){
                    //     setOptions([]);
                    //     return;
                    // }
                    setOptions((prev) => {
                        return [...prev, {name: component.name, neededGrade: 100}]
                    });
                    totalGoalGradeSoFar += 100 * component.weight;
                }
            }
        }
    }

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleAddComponent = async () => {
        try {
            if (!('grade_received' in newComponent) || newComponent.grade_received === ''){
                console.log("grade_received is blank");
                newComponent.grade_received = -1;
            }
            if (!('goal_grade' in newComponent) || newComponent.goal_grade === ''){
                console.log("goal_grade is blank");
                newComponent.goal_grade = -1;
            }

            
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

    const deleteComponentHandler = async (comp) => {
        try {
            const response = await axiosInstance.delete(`courses/components/${comp.id}`);
            setComponents((prevComponents) => {
                return prevComponents.filter(component => component.id !== comp.id);
            });
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

    let list = options.map((option) => <li key={option.name}>Atleast score <span className='option-needed-grade'>{(option.neededGrade*100).toFixed(2)}%</span> on <span className='option-name'>{option.name}</span></li>);
            
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
                                <StyledTableCell align="right">{component.grade_received === -1 ? '-' : component.grade_received}</StyledTableCell>
                                <StyledTableCell align="right">{component.goal_grade === -1 ? '-' : component.goal_grade}</StyledTableCell>
                                <StyledTableCell align="right">
                                    <EditIcon
                                        sx={{ cursor: 'pointer' }}
                                        onClick={() => alert("Hello you are editing")}
                                    /> 
                                    <DeleteIcon 
                                        sx={{ cursor: 'pointer' }}
                                        onClick={ () => deleteComponentHandler(component)}
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
            <div className="feedback-container">
                <h2>Feedback:</h2>
                <p>
                    You have scored <span className="feedback-total">{calcGradeReceived().toFixed(2)}%</span> of the <span className="feedback-total">{calcTotalWeightCompleted()}%</span> of the course that you received a grade for. Your goal grade at this point was to get <span className="feedback-total">{calcTotalGoalGradeTillNow().toFixed(2)}</span>%.
                </p>

                {!hasFinishedCourse &&
                    <div>
                        {calcGradeReceived() < calcTotalGoalGradeTillNow() &&
                            <div>
                                <h3 className='fallen-behind-goal-txt'> Looks like you have fallen behind</h3>
                                <p> To be back on track with your goal, you need to: </p>
                                {hasCompWithoutGrade() && options.length > 0 && <ul>{list} </ul>}
                            </div>

                        }
                    </div>}

                {!hasFinishedCourse &&
                    <div>
                        {calcGradeReceived() === calcTotalGoalGradeTillNow() &&
                            <div>
                                <h3 className='on-track-with-goal-txt'>You are on track with your goal, keep up the great!!</h3>
                            </div>

                        }
                    </div>}

                {!hasFinishedCourse &&
                    <div>
                        {calcGradeReceived() > calcTotalGoalGradeTillNow() &&
                            <div>
                                <h3 className='better-than-goal-txt'>Congratulations! You have exceeded your goals so far!</h3>
                            </div>

                        }
                    </div>}

                {hasFinishedCourse && <p> Congratulations you are done with the course!</p>}

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