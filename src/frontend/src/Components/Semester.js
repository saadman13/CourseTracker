import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import './Semester.css';

const Semester = props => {
    const [newCourse, setNewCourse] = useState('');
    const [courses, setCourses] = useState([]);

    const onChangeHandler = (event) => {
        setNewCourse(event.target.value);
    }

    const addCourseHandler = (event) => {
        setCourses( prev => [...prev, newCourse])
    }

    return (
        <div>
            <span className='course-input'>
                <h2>{props.semesterName}</h2>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { ml: 20, mt: 6, mr: 0, width: '10ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField onChange={onChangeHandler} id="standard-basic" label="Course Name" variant="standard" />
                </Box>
                <button onClick={addCourseHandler} className='btn'>Add Course</button>
            </span>
            <ul id='courses'>
                {courses.map(course => <li><a href={`https://www.google.com/search?q=${course}`}> {course}</a></li>)}
            </ul>
            <hr></hr>
        </div>
    );
}

export default Semester;