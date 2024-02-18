import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

function Received() {
    const navigate = useNavigate();
    const { round } = useParams();




    const nextRound = parseInt(round) + 1;

    const goToNextRound = async () => {
        navigate(`/round/${nextRound}`);
    };

    return (
        <div>
            <p>Submission received</p>

            <button onClick={goToNextRound}>Next round</button>
        </div>
    );
}

export default Received;
