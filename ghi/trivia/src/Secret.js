import React, { useState, useEffect } from 'react';

function Secret() {
    const [submissions, setSubmissions] = useState([]);
    const [teams, setTeams] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [round, setRound] = useState(1);
    const [newTeam, setNewTeam] = useState();

    const handleRoundChange = (event) => {
        const value = parseInt(event.target.value);
        setRound(value);
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
                <label htmlFor="round">Round:</label>
                <select onChange={handleRoundChange} id="round">
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                                    </select>
                                    <button className="btn btn-primary">Go</button>
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
        </div>
    )
}

export default Secret;
