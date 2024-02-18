import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';


function Round() {
    const { round } = useParams();
    const [questions, setQuestions] = useState([]);
    const navigate = useNavigate();
    const [info, setInfo] = useState({});
    const [answer1, setAnswer1] = useState('');
    const [answer2, setAnswer2] = useState('');
    const [answer3, setAnswer3] = useState('');
    const [answer4, setAnswer4] = useState('');
    const [answer5, setAnswer5] = useState('');
    const [answer6, setAnswer6] = useState('');
    const [answer7, setAnswer7] = useState('');
    const [answer8, setAnswer8] = useState('');
    const [answer9, setAnswer9] = useState('');
    const [answer10, setAnswer10] = useState('');
    const [team, setTeam] = useState('');
    const [double, setDouble] = useState(false);
    const doubleBool = double === 'true';

    const handleTeamChange = (event) => {
        const value = event.target.value;
        setTeam(value);
    }

    const handleDoubleChange = (event) => {
        setDouble(event.target.checked);
    }

    const handleAnswerChange = (event, questionNumber) => {
        const { value } = event.target;
        switch (questionNumber) {
            case 1:
                setAnswer1(value);
                break;
            case 2:
                setAnswer2(value);
                break;
            case 3:
                setAnswer3(value);
                break;
            case 4:
                setAnswer4(value);
                break;
            case 5:
                setAnswer5(value);
                break;
            case 6:
                setAnswer6(value);
                break;
            case 7:
                setAnswer7(value);
                break;
            case 8:
                setAnswer8(value);
                break;
            case 9:
                setAnswer9(value);
                break;
            case 10:
                setAnswer10(value);
                break;
            default:
                console.error(`Invalid question number: ${questionNumber}`);
        }
    };



    const fetchQuestions = async () => {
        const response = await fetch(`http://localhost:8000/questions/${round}`);
        if (response.ok) {
            const data = await response.json();
            setQuestions(data.questions);
            console.log(data);
        }
    };

    const fetchInfo = async () => {
        const response = await fetch(`http://localhost:8000/round/${round}`);
        if (response.ok) {
            const data = await response.json();
            setInfo(data.round[0]);
            console.log(data);
        }
    }
    const getAnswer = (questionNumber) => {
        switch (questionNumber) {
            case 1:
                return answer1;
            case 2:
                return answer2;
            case 3:
                return answer3;
            case 4:
                return answer4;
            case 5:
                return answer5;
            case 6:
                return answer6;
            case 7:
                return answer7;
            case 8:
                return answer8;
            case 9:
                return answer9;
            case 10:
                return answer10;
            default:
                return ''; // Default value if question number is invalid
        }
    };



    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {}
        data.team = team;
        data.double_or_nothing = doubleBool;
        data.answer1 = answer1;
        data.answer2 = answer2;
        data.answer3 = answer3;
        data.answer4 = answer4;
        data.answer5 = answer5;
        data.answer6 = answer6;
        data.answer7 = answer7;
        data.answer8 = answer8;
        data.answer9 = answer9;
        data.answer10 = answer10;
        data.round = round;
        const url = 'http://localhost:8000/submit';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            navigate(`/submissionreceived/${round}`)
        }
    };

    useEffect(() => {
        fetchQuestions();
        fetchInfo();
    }, []);

    return (
        <div className="row">
            {info.visible === false && (
                <p>Wait message for round {info.number}</p>
            )}
            {info.visible === true && (
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Round {info.number}: {info.title}</h1>
                    <h2>{info.prompt}</h2>
                    <form onSubmit={handleSubmit} id="submission-form">
                    <label htmlFor="team">Team Name:</label>
                        <div className="form-floating mb-3">
                            <input
                                value={team}
                                onChange={handleTeamChange}
                                placeholder=""
                                type="text"
                                name="team"
                                id="team"
                                required
                            />
                        </div>
                    {questions.map(question => {

                        return (<div key={question.number}>
                            <label htmlFor={`question${question.number}`}>{question.number}. {question.text}</label>
                            <div className="form-floating mb-3">
                                <input
                                    value={getAnswer(question.number)}
                                    onChange={(event) => handleAnswerChange(event, question.number)}
                                    placeholder=""
                                    type="text"
                                    id={`question${question.number}`}
                                    autoComplete='off'
                                />
                            </div></div>
                        )
                    }) }
                    <label htmlFor="double">Double or nothing?</label>
                        <div className="form-floating mb-3">
                            <input
                                checked={double}
                                onChange={handleDoubleChange}
                                placeholder=""
                                type="checkbox"
                                name="double"
                                id="double"
                            />
                        </div>
                    <button className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>)}
        </div>
    )
};

export default Round;