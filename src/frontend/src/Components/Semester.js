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
    }

    onChangeHandler = (event) => {
        this.setState({newCourse: event.target.value});
    }

    addCourseHandler = (event) => {
        this.setState(state => ({
            courses: [...state.courses, state.newCourse]
        }));
    }

    render(){
        return (
            <div>
                <span className='course-input'>
                    <h2>{this.props.semesterName}</h2>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { ml: 20, mt: 6, mr: 0, width: '10ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField onChange={this.onChangeHandler} id="standard-basic" label="Course Name" variant="standard" />
                    </Box>
                    <button onClick={this.addCourseHandler} className='btn'>Add Course</button>
                </span>
                <ul id='courses'>
                    {this.state.courses.map(course => <li><a href={`https://www.google.com/search?q=${course}`}> {course}</a></li>)}
                </ul>
                <hr></hr>
            </div>
        );
    }
}

export default Semester;