import React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import './Main.css';
import Semester from './Semester';


class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newSemester: '',
            semesters: []
        }
    }

    onChangeHandler = (event) => {
        console.log(event.target.value);
        this.setState({newSemester: event.target.value});
    }

    addSemesterHandler = (event) => {
        this.setState(state => ({
            semesters: [...state.semesters, state.newSemester]
        }));
    }

    render() {
        return (
            <React.Fragment>
                <h1>Welcome To Course Tracker</h1>
                <div className='inputStyle'>
                    <Box
                        sx={{
                            width: 300,
                            maxWidth: '100%',
                        }}
                    >
                        <Box mb={3} pt={3}>
                            <TextField onChange={this.onChangeHandler} fullWidth label="Semester Name" id="fullWidth" />
                        </Box>
                        <Button onClick={this.addSemesterHandler} className="buttonStyle" variant="contained">Add Semester</Button>
                    </Box>
                </div>
                <ul className='semester-heading'>
                    {this.state.semesters.map((semester) => <Semester semesterName={semester}/>)}
                </ul>
            </React.Fragment>
    )}
}

export default Main;