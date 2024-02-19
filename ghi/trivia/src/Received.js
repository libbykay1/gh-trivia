import { useNavigate, useParams } from 'react-router-dom';


function Received() {
    const navigate = useNavigate();
    const { round } = useParams();




    const nextRound = parseInt(round) + 1;

    const goToNextRound = async () => {
        navigate(`/round/${nextRound}`);
    };

    return (
        <div>
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h3>Your Round {round} answers have been received!</h3>
                    <p>Scores and answers will be released shortly.</p>
                    <button className="btn btn-primary" onClick={goToNextRound}>Next round</button>
                </div></div>


        </div>
    );
}

export default Received;
