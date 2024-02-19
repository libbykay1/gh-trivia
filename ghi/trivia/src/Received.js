import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';


function Received() {
    const navigate = useNavigate();
    const { round } = useParams();
    const [teams, setTeams] = useState([]);
    const [answers, setAnswers] = useState([]);

    const fetchTeams = async () => {
        const url = 'http://localhost:8000/teams';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setTeams(data.teams);
        }
    }

    const roundAsInt = parseInt(round);
    const nextRound = roundAsInt + 1;

    const fetchAnswers = async() => {
        if (roundAsInt > 1) {
            const lastRound = roundAsInt - 1;

        const response = await fetch(`http://localhost:8000/round/${lastRound}`);

        if (response.ok) {
            const data = await response.json();
            setAnswers(JSON.parse(data.round.answers));

        }};
    }



    const goToNextRound = async () => {
        navigate(`/round/${nextRound}`);
    };

    // eslint-disable-next-line
    useEffect(() => {fetchTeams(); fetchAnswers()}, []);

    return (
        <div>
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h3>Your Round {round} answers have been received!</h3>
                    <p>Scores will be updated shortly.</p>
                    <p>Here are the current standings:</p>
                    <div>
                        <table className='table'>
                            <thead>
                                <tr>
                                <th>Team</th>
                                <th>Points</th>
                                </tr>
                            </thead>
                            <tbody>
                                {teams.map(team =>{
                                    return(
                                        <tr key={team.id}>
                                            <td>{team.team_name}</td>
                                            <td>{team.total_points}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    {round !== '1' && (
                    <div>
                        <p> And in case you missed them, here are the answers to the previous round:</p>
                        <ol>
                        {answers.map(answer => {
                            return(
                                <li key={answer}>{answer}</li>
                            )
                        })}
                        </ol>
                    </div> )}
                    {round !== '4' && (
                    <button className="btn btn-primary" onClick={goToNextRound}>Next round</button>)}
                </div></div>


        </div>
    );
}

export default Received;
