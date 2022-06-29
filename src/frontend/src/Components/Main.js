import React, {useState, useEffect} from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import './Main.css';
import Semester from './Semester';
import {semesterData} from '../Data/semesterData'
import { useLocation } from 'react-router-dom';

const Main = () => {
    const [newSemester, setNewSemester] = useState('');
    const [semesters, setSemesters] = useState([]);
    const location = useLocation();
    
    useEffect(() => {
        setSemesters(semesterData);
    }, [])

    console.log(location.state.user_id)


    const onChangeHandler = (event) => {
        console.log(event.target.value);
        setNewSemester(event.target.value);
    }

    const addSemesterHandler = (event) => {
        setSemesters(prevSemesters => [newSemester, ...prevSemesters, ]);
        setNewSemester('');
    }

    const deleteSemesterHandler = (semesterName) => {
        setSemesters((prevSemesters) => {
            return prevSemesters.filter(semester => semester !== semesterName);
        });
    }

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
                        <TextField onChange={onChangeHandler} value={newSemester} fullWidth label="Semester Name" id="fullWidth" />
                    </Box>
                    <Button onClick={addSemesterHandler} className="buttonStyle" variant="contained">Add Semester</Button>
                </Box>
            </div>
            <ul className='semester-heading'>
                {semesters.map((semester, idx) => <Semester key={semester} deleteSemesterHandler={deleteSemesterHandler} semesterName={semester}/>)}
            </ul>
        </React.Fragment>
    )
}

export default Main;