import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import questions from '../utils/questions';
import socket from '../socket';

const GameScreen = () => {
    const { gameCode } = useParams();
    const [category, setCategory] = useState(null);
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [usedQuestions, setUsedQuestions] = useState(new Set());
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const [quizOver, setQuizOver] = useState(false);
    const [playersFinished, setPlayersFinished] = useState(0);
    const [totalScore, setTotalScore] = useState(0);
    const navigate = useNavigate();
    const playerName = localStorage.getItem('playerName'); // Retrieve player name from local storage

    const categories = [
        { name: '10', points: 10 },
        { name: '20', points: 20 },
        { name: '50', points: 50 },
        { name: '100', points: 100 }
    ];

    useEffect(() => {
        if (category) {
            const availableQuestions = questions[category.name].filter(q => !usedQuestions.has(q.question));

            if (availableQuestions.length === 0) {
                alert('No more questions in this category!');
                setCategory(null);
                return;
            }

            const randomQuestion = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];

            setUsedQuestions(prev => new Set([...prev, randomQuestion.question]));
            setSelectedQuestions(prevQuestions => [...prevQuestions, randomQuestion]);
            setIsLoaded(true);
        }
    }, [category]);

    const handleAnswer = (answer) => {
        const currentQuestion = selectedQuestions[currentQuestionIndex];
        if (answer === currentQuestion.correct) {
            setTotalScore(prevScore => prevScore + category.points);
            console.log(`Correct! You earned ${category.points} points. Total score: ${totalScore + category.points}`);
            socket.emit('finishGame', { gameCode, name: playerName, score: totalScore + category.points });
        } else {
            console.log('Wrong!');
        }

        if (currentQuestionIndex < 4) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setCategory(null);
            setIsLoaded(false);
        } else {
            setQuizOver(true);
        }
    };

    useEffect(() => {
        if (quizOver) {
            socket.emit('playerFinished', { gameCode, name: playerName, score: totalScore });
            navigate('/thank-you');
        }
    }, [quizOver, navigate, gameCode, totalScore, playerName]);

    useEffect(() => {
        socket.on('updatePlayersFinished', ({ count }) => {
            setPlayersFinished(playersFinished + count);
        });

        return () => {
            socket.off('updatePlayersFinished');
        };
    }, []);

    return (
        <div>
            <h2>Game Screen</h2>
            {!category ? (
                categories.map((cat) => (
                    <button key={cat.name} onClick={() => setCategory(cat)}>
                        {cat.name} ({cat.points} points)
                    </button>
                ))
            ) : (
                <>
                    {isLoaded && currentQuestionIndex < 5 && (
                        <div>
                            <h3>{selectedQuestions[currentQuestionIndex].question}</h3>
                            {selectedQuestions[currentQuestionIndex].answers.map((ans, idx) => (
                                <button key={idx} onClick={() => handleAnswer(ans)}>
                                    {ans}
                                </button>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default GameScreen;