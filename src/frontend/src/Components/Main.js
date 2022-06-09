import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import './Main.css';

const Main = () => {
    const [newSemester, setNewSemester] = useState('');
    const [semesters, setSemesters] = useState([]);

    const onChangeHandler = (event) => {
        console.log(event.target.value);
        setNewSemester(event.target.value);
    }

    const addSemesterHandler = (event) => {
        setSemesters( prev => [...prev, newSemester])
    }
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
                        <TextField onChange={onChangeHandler} fullWidth label="Semester Name" id="fullWidth" />
                    </Box>
                    <Button onClick={addSemesterHandler} className="buttonStyle" variant="contained">Add Semester</Button>
                </Box>
            </div>
           <ul>
                {semesters.map((semester) => <li>{semester.toUpperCase()}</li>)}
            </ul>
        </React.Fragment>
    );
}

export default Main;