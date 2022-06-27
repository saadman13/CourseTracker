import React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import './Main.css';
import Semester from './Semester';
import {semesterData} from '../Data/semesterData'

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newSemester: '',
            semesters: []
        }
    }

    componentDidMount = () => {
        this.setState({semesters: semesterData});
    }

    onChangeHandler = (event) => {
        console.log(event.target.value);
        this.setState({newSemester: event.target.value});
    }

    addSemesterHandler = (event) => {
        this.setState(state => {
           return {
            semesters: [ state.newSemester, ...state.semesters],
            newSemester: ''
           }
    });
    }

    deleteSemesterHandler = (semesterName) => {
        console.log("Sem being deleted");
        this.setState((state) => {
            return {semesters: state.semesters.filter(semester => semester !== semesterName)};
        });
    }

    render() {
        return (
            <React.Fragment>
                <h1 className='title'>Welcome To Course Tracker</h1>
                <div className='inputStyle'>
                    <Box
                        sx={{
                            width: 300,
                            maxWidth: '100%',
                        }}
                    >
                        <Box mb={3} pt={3}>
                            <TextField onChange={this.onChangeHandler} value={this.state.newSemester} fullWidth label="Semester Name" id="fullWidth" />
                        </Box>
                        <Button onClick={this.addSemesterHandler} className="buttonStyle" variant="contained">Add Semester</Button>
                    </Box>
                </div>
                <ul className='semester-heading'>
                    {this.state.semesters.map((semester, idx) => <Semester key={semester} deleteSemesterHandler={this.deleteSemesterHandler} semesterName={semester}/>)}
                </ul>
            </React.Fragment>
    )}
}

export default Main;