import React, {useState, useEffect} from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { green } from '@mui/material/colors';
import Icon from '@mui/material/Icon';
import { loadCSS } from 'fg-loadcss';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import {useHistory} from 'react-router-dom';
import DialogTitle from '@mui/material/DialogTitle';
import './Semester.css';
import { axiosInstance } from '../axiosApi';


const Semester = (props) => {
    const [newCourse, setNewCourse] = useState('');
    const [courses, setCourses] = useState([]);
    const [open, setOpen] = useState(false);

    const history = useHistory();

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axiosInstance.get(`courses/${props.semester.id}`);
                console.log(response);
                setCourses(response.data.courses);
                return response;
            } catch (error) {
                alert(`Error! ${error.message}`)
                console.log(error);
                throw error;
            }
        }
        
        fetchCourses();
 
       const node = loadCSS(
        'https://use.fontawesome.com/releases/v5.14.0/css/all.css',
        // Inject before JSS
        document.querySelector('#font-awesome-css') || document.head.firstChild,
      );
      return () => {
        node.parentNode.removeChild(node);
      };
    }, [])


    const handleClickOpen = () => {
        setOpen(true);
      };
    
    const handleAgreeToDeleteSem = async (deleteSemesterHandler, semester) => {
        await deleteSemesterHandler(semester);
        setOpen(false);
    };

    const handleDisagreeToDeleteSem = () => {
        setOpen(false);
    }

    const onChangeHandler = (event) => {
        setNewCourse(event.target.value);
    }

    const addCourseHandler = async (event) => {
        try {
            const response = await axiosInstance.post(`courses/${props.semester.id}`,{name : newCourse});
            setCourses(prevCourses => [...prevCourses, response.data]);
            setNewCourse('');
            return response;
        } catch (error) {
            alert(`Error! ${error.message}`)
            console.log(error);
            throw error;
        }
    }

    const deleteCourse = async (toBeDeletedCourse) => {
        try {
            const response = await axiosInstance.delete(`courses/${toBeDeletedCourse.id}`);
            setCourses(prevCourses => {
                return prevCourses.filter(course => course.id !== toBeDeletedCourse.id);
            });
            return response;
        } catch (error) {
            alert(`Error! ${error.message}`)
            console.log(error);
            throw error;
        }
    }

    const viewDetailsHandler = (courseId, courseName) => {
        history.push(`courseDetails/${courseId}`, {courseName: courseName});
    }


    return (
        <div className="sem-course-block">
            <span className='course-span'>
                <h2>{props.semester.name}</h2>
                <input onChange={onChangeHandler} value={newCourse} className='course-input' type="text" placeholder='Course name'></input>
                {/* <button onClick={addCourseHandler} className='btn'>Add Course</button> */}
                <Icon
                    baseClassName="fas"
                    className="fa-plus-circle"
                    sx={{ cursor: 'pointer', marginX: '0.5em', color: green[500] }}
                    onClick={addCourseHandler}
                />
                {/* <button onClick={() => {
                    return props.deleteSemesterHandler(props.semester);
                }} className='del-sem-btn'>Delete Semester</button> */}
            </span>
            <div className='trash-can'>
                <DeleteOutlinedIcon  onClick={handleClickOpen} sx={{ cursor: 'pointer' } }/>
            </div>
            <Dialog
                open={open}
                onClose={handleDisagreeToDeleteSem}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure you want to delete the semester?"}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleDisagreeToDeleteSem}>Disagree</Button>
                    <Button onClick={() => handleAgreeToDeleteSem(props.deleteSemesterHandler, props.semester)} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
            {courses.length !== 0 && <ul id='courses'>
                {courses.map((course) => (
                    <div className='course'>
                        <li key={courses.id}>
                            <a href={`https://www.google.com/search?q=${course}`}>{course.name}</a>
                            <button onClick={() => {
                                    deleteCourse(course);
                                }} className='delete-course-btn'> 
                                Delete
                            </button>
                            <button onClick={() => {
                                viewDetailsHandler(course.id, course.name)
                            }}>View Details</button>
                        </li>
                    </div>
                ))}
            </ul>}
            {courses.length === 0 && <p>No courses added.</p>}
            <hr></hr>
        </div>
    );
}

export default Semester;