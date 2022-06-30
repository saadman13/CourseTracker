import React, {useState, useEffect} from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import './Main.css';
import Semester from './Semester';
import {semesterData} from '../Data/semesterData'
import { useLocation } from 'react-router-dom';
import { axiosInstance } from '../axiosApi';

const Main = () => {
    const [newSemester, setNewSemester] = useState('');
    const [semesters, setSemesters] = useState([]);
    const location = useLocation();
    
    useEffect(() => {
        // let res = await fetchSemesters();
        const fetchSemesters = async () => {
            try {
                console.log(`user id = ${getUserId()}`);
                const response = await axiosInstance.get(`semesters/${getUserId()}`, {user_id : getUserId});
                setSemesters(response.data.semesters);
                console.log(response);
                return response;
            } catch (error) {
                alert(`Error! ${error.message}`)
                console.log(error);
                throw error;
            }
        } 
        fetchSemesters();
    }, [])

    const getUserId = () => location.state.user_id;

    // const fetchSemesters = async () => {
    //     try {
    //         console.log(`user id = ${getUserId()}`);
    //         const response = await axiosInstance.get(`semesters/${getUserId()}`, {user_id : getUserId});
    //         console.log(response);
    //         return response;
    //     } catch (error) {
    //         alert(`Error! ${error.message}`)
    //         console.log(error);
    //         throw error;
    //     }
    // } 

    const onChangeHandler = (event) => {
        console.log(event.target.value);
        setNewSemester(event.target.value);
    }

    const addSemesterHandler = async (event) => {
        try {
            console.log(`user id = ${getUserId()}`);
            const response = await axiosInstance.post(`semesters/${getUserId()}`, {name : newSemester});
            setSemesters(prevSemesters => [response.data, ...prevSemesters, ]);
            setNewSemester('');
            return response;
        } catch (error) {
            alert(`Error! ${error.message}`)
            console.log(error);
            throw error;
        }
        
    }

    const deleteSemesterHandler = async (semester) => {
        try {
            const response = await axiosInstance.delete(`semesters/${semester.id}`);
            setSemesters((prevSemesters) => {
                return prevSemesters.filter(sem => sem.id !== semester.id);
            });
            return response;
        } catch (error) {
            alert(`Error! ${error.message}`)
            console.log(error);
            throw error;
        }
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
                {semesters.map((semester, idx) => <li key={semester.id}><Semester deleteSemesterHandler={deleteSemesterHandler} semester={semester}/></li>)}
            </ul>
        </React.Fragment>
    )
}

export default Main;