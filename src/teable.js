import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';
import GetPosts from './AllPosts';


function createData(id, name, email, companyName) {
    return { id, name, email, companyName };
}

export default function BasicTable() {

    const [allUsers, setAllUsers] = useState([]);
    const [rows, setRows] = useState([]);


    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((response) => {
                if (response.ok && response.status == 200) {
                    return response.json()
                }
            })
            .then(data => {
                setAllUsers(data);
            }).catch((error) => { console.log(error); alert(error) });

    }, [])

    useEffect(() => {
        setRows(
            allUsers.map((row) => (
                createData(row.id, row.name, row.email, row.company.name)
            ))
        )
    }, [allUsers])

    function search() {

        let nameToSearch = document.getElementById("name").value;
        let emailToSearch = document.getElementById("email").value;
        setRows(
            allUsers.filter(user => user.name == nameToSearch && user.email == emailToSearch)
                .map(row => (
                    createData(row.id, row.name, row.email, row.company.name)
                )))
    }

    function getAllPosts() {
        let checkboxes = document.querySelectorAll('input[name="postsUser"]:checked');
        let IdPosts = [];
        checkboxes.forEach((checkbox) => {
            IdPosts.push(checkbox.value);
        });
       return <div><GetPosts idChecked={IdPosts} /></div>
    }
    
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <button onClick={search}>search</button>
                    <input type="text" id="name"></input>name
                    <input type="text" id="email"></input>email
                    <br/>
                    <button onClick={getAllPosts} >Get all posts by the selected person</button>
                    <TableRow>
                        <TableCell align='left'>Name&nbsp;</TableCell>
                        <TableCell align='left'>Email&nbsp;</TableCell>
                        <TableCell align='left'>Company Name&nbsp;</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows ? <div>
                        {rows.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <input type="checkbox" id={row.id} name="postsUser" value={row.id}></input>
                                <TableCell >{row.name} </TableCell>
                                <TableCell >{row.email}</TableCell>
                                <TableCell >{row.companyName}</TableCell>

                            </TableRow>
                        ))}</div> : <div>null</div>}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
