import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import './Semester.css';

const Semester = (props) => {
    const [newCourse, setNewCourse] = useState('');
    const [courses, setCourses] = useState([]);

    const onChangeHandler = (event) => {
        setNewCourse(event.target.value);
    }

    const addCourseHandler = (event) => {
        setCourses(prevCourses => [...prevCourses, newCourse]);
    }

    const deleteCourse = (toBeDeletedCourse) => {
        setCourses(prevCourses => {
            return prevCourses.filter(course => course !== toBeDeletedCourse);
        });
    }


    return (
        <div className="sem-course-block">
            <span className='course-span'>
                <h2>{props.semesterName}</h2>
                <input onChange={onChangeHandler} value={newCourse} className='course-input' type="text" placeholder='Course name'></input>
                <button onClick={addCourseHandler} className='btn'>Add Course</button>
                <button onClick={() => {
                    return props.deleteSemesterHandler(props.semesterName);
                }} className='del-sem-btn'>Delete Semester</button>
            </span>
            {courses.length !== 0 && <ul id='courses'>
                {courses.map((course,idx) => (
                    <div key={idx} className='course'>
                        <li>
                            <a href={`https://www.google.com/search?q=${course}`}> {course}</a>
                            <button onClick={() => {
                                    deleteCourse(course);
                                }} className='delete-course-btn'> 
                                Delete
                            </button>
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