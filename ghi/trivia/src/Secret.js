import React, { useState, useEffect } from 'react';

function Secret() {
    const [submissions, setSubmissions] = useState([]);
    const [teams, setTeams] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [round, setRound] = useState(1);
    const [newTeam, setNewTeam] = useState();
    const [teamToEdit, setTeamToEdit] = useState('');
    const [points, setPoints] = useState('');

    const handleRoundChange = (event) => {
        const value = parseInt(event.target.value);
        setRound(value);
    }


    const handlePointsChange = event => {
        setPoints(event.target.value);
    }


    const handleTeamToEditChange = event => {
        setTeamToEdit(event.target.value);
    }

    const handleNewTeamChange = (event) => {
        setNewTeam(event.target.value);
    }
    const fetchSubmissions = async () => {
        const response = await fetch(`http://localhost:8000/submissions/${round}`);
        if (response.ok) {
            const data = await response.json();
            setSubmissions(data.submissions);

        }
    }

    const updateScores = async event => {
        event.preventDefault();
        const data = {}
        if (round === 1) {
            data.round_one_points = points;
        }
        if (round === 2) {
            data.round_two_points = points;
        }
        if (round === 3) {
            data.round_three_points = points;
        }
        if (round === 4) {
            data.round_four_points = points;
        }
        const url = `http://localhost:8000/teams/edit/${teamToEdit}`;
        const fetchConfig = {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(url, fetchConfig);
        if(response.ok){
            setPoints('');
            setTeamToEdit('');
            fetchTeams();

        }
    }

    const handleRoundChangeSubmit = async event => {
        event.preventDefault();
        fetchAnswers();
        fetchSubmissions();
    }
    const fetchTeams = async () => {
        const url = 'http://localhost:8000/teams';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setTeams(data.teams);
        }
    }

    const releaseRoundOne = async event => {
        event.preventDefault();
        const confirmed = window.confirm("Are you sure it's time to release Round 1?");

        if (confirmed) {
        const url = 'http://localhost:8000/visible/1';
        const fetchConfig = {
            method: "PUT",

            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(url, fetchConfig);
        if(response.ok){window.alert("Round 1 has been released!")}}
    }

    const releaseRoundTwo = async event => {
        event.preventDefault();
        const confirmed = window.confirm("Are you sure it's time to release Round 2?");

        if (confirmed) {
        const url = 'http://localhost:8000/visible/2';
        const fetchConfig = {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(url, fetchConfig);
        if(response.ok){window.alert("Round 2 has been released!")}}
    }

    const releaseRoundThree = async event => {
        event.preventDefault();
        const confirmed = window.confirm("Are you sure it's time to release Round 3?");

        if (confirmed) {
        const url = 'http://localhost:8000/visible/3';
        const fetchConfig = {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(url, fetchConfig);
        if(response.ok){window.alert("Round 3 has been released!")}}
    }

    const releaseRoundFour = async event => {
        event.preventDefault();
        const confirmed = window.confirm("Are you sure it's time to release Round 4?");

        if (confirmed) {
        const url = 'http://localhost:8000/visible/4';
        const fetchConfig = {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(url, fetchConfig);
        if(response.ok){window.alert("Round 4 has been released!")}}
    }

    const fetchAnswers = async() => {


        const response = await fetch(`http://localhost:8000/round/${round}`);

        if (response.ok) {
            const data = await response.json();
            setAnswers(JSON.parse(data.round.answers));

        };
    }

    const handleSubmitNewTeam = async (event) => {
        event.preventDefault();
        const data = {}
        data.team_name = newTeam;
        const url = 'http://localhost:8000/teams';
            const fetchConfig = {
                method: "post",
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const response = await fetch(url, fetchConfig);
            if (response.ok) {
                setNewTeam('');
                fetchTeams();
            }
    }
    // eslint-disable-next-line
    useEffect(() => {fetchSubmissions(); fetchTeams(); fetchAnswers()}, []);
    return (
        <div>
        <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <form onSubmit={handleRoundChangeSubmit} id="round-change-form">
                <label htmlFor="round">Round: </label>

                <select onChange={handleRoundChange} id="round">
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                                    </select>
                                    <button className="btn btn-primary">Go</button>
                                    </form>
                <form onSubmit={updateScores} id='scores-form'>
                    <label htmlFor="teamId">Team: </label>
                    <select onChange={handleTeamToEditChange} id="teamId" value={teamToEdit}>
                        <option value=''></option>
                        {teams.map(team => {
                            return(
                                <option key={team.id} value={team.id}>{team.team_name}</option>
                            )
                        })}
                    </select>
                    <label htmlFor='points'>Points: </label>
                    <input value={points} onChange={handlePointsChange} type="number" id='points' />
                    <button className='btn btn-primary'>Add</button>
                </form>
                </div></div>
            <div className="offset-0 col-14">
                <div className="shadow p-4 mt-4">
            <table className='table'>
                <thead>
                    <tr>
                        <th>Round</th>
                        <th>Team</th>
                        {answers.map(answer => {
                            return(
                                <td key={answer}>
                                    {answer}
                                </td>
                            )
                        })}
                    </tr>
                </thead>
                <tbody>
                    {submissions
                    .map(submission => {
                        return(
                            <tr key={submission.id}>
                                <td>{submission.round}</td>
                                <td>{submission.team}</td>
                                <td>{submission.answer1}</td>
                                <td>{submission.answer2}</td>
                                <td>{submission.answer3}</td>
                                <td>{submission.answer4}</td>
                                <td>{submission.answer5}</td>
                                <td>{submission.answer6}</td>
                                <td>{submission.answer7}</td>
                                <td>{submission.answer8}</td>
                                <td>{submission.answer9}</td>
                                <td>{submission.answer10}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            </div>
            </div>
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">

                    <form onSubmit={handleSubmitNewTeam} id="new-team-form">
                    <label htmlFor="new-team"></label>
                        <div className="form-floating mb-3">
                            <input
                                value={newTeam}
                                onChange={handleNewTeamChange}
                                placeholder="Team Name"
                                type="text"
                                name="new-team"
                                id="new-team"
                                required
                            /></div>
                            <button className="btn btn-primary">Add</button>
                        </form></div></div>
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
            <table className='table'>
            <thead>
                    <tr>

                        <th>Team</th>
                        <th>Round 1 Points</th>
                        <th>Round 2 Points</th>
                        <th>Round 3 Points</th>
                        <th>Round 4 Points</th>
                        <th>Total Points</th>
                    </tr>
                </thead>
                <tbody>
                    {teams.map(team => {
                        return(
                            <tr key={team.id}>
                                <td>{team.team_name}</td>
                                <td>{team.round_one_points}</td>
                                <td>{team.round_two_points}</td>
                                <td>{team.round_three_points}</td>
                                <td>{team.round_four_points}</td>
                                <td>{team.total_points}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            </div></div>
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">

                    <button className='btn btn-primary' onClick={releaseRoundOne}>Release Round 1</button>

                    <button className='btn btn-primary' onClick={releaseRoundTwo}>Release Round 2</button>

                    <button className='btn btn-primary' onClick={releaseRoundThree}>Release Round 3</button>

                    <button className='btn btn-primary' onClick={releaseRoundFour}>Release Round 4</button>
                    </div>
                </div>
        </div>
    )
}

export default Secret;
