import React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import './Semester.css';

class Semester extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newCourse: '',
            courses: []
        }
        this.deleteCourse = this.deleteCourse.bind(this);
        this.addCourseHandler=this.addCourseHandler.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
    }

    onChangeHandler = (event) => {
        this.setState({newCourse: event.target.value});
    }

    addCourseHandler = (event) => {
        this.setState(state => ({
            courses: [...state.courses, state.newCourse],
            newCourse: ''
        }));
    }

    deleteCourse = (toBeDeletedCourse) => {
        console.log(toBeDeletedCourse);
        console.log(this.state.courses);
        this.setState(state => {
            return {courses: state.courses.filter(course => course !== toBeDeletedCourse)}
        });
    }


    render(){
        return (
            <div className="sem-course-block">
                <span className='course-span'>
                    <h2>{this.props.semesterName}</h2>
                    <input onChange={this.onChangeHandler} value={this.state.newCourse} className='course-input' type="text" placeholder='Course name'></input>
                    <button onClick={this.addCourseHandler} className='btn'>Add Course</button>
                    <button onClick={() => {
                       return this.props.deleteSemesterHandler(this.props.semesterName);
                    }} className='del-sem-btn'>Delete Semester</button>
                </span>
                {this.state.courses.length !== 0 && <ul id='courses'>
                    {this.state.courses.map((course,idx) => (
                        <div key={idx} className='course'>
                            <li>
                                <a href={`https://www.google.com/search?q=${course}`}> {course}</a>
                                <button onClick={() => {
                                        this.deleteCourse(course);
                                    }} className='delete-course-btn'> 
                                    Delete
                                </button>
                            </li>
                        </div>
                    ))}
                </ul>}
                {this.state.courses.length === 0 && <p>No courses added.</p>}
                <hr></hr>
            </div>
        );
    }
}

export default Semester;