import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import questions from '../utils/questions';
import socket from '../socket';

const GameScreen = () => {
    const { gameCode } = useParams();  // Get gameCode from URL params
    const [category, setCategory] = useState(null);
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [usedQuestions, setUsedQuestions] = useState(new Set());
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const [quizOver, setQuizOver] = useState(false);
    const [playersFinished, setPlayersFinished] = useState(0);
    const navigate = useNavigate();

    const categories = Object.keys(questions);

    useEffect(() => {
        if (category) {
            const availableQuestions = questions[category].filter(q => !usedQuestions.has(q.question));

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
        alert(answer === selectedQuestions[currentQuestionIndex].correct ? 'Correct!' : 'Wrong!');
        if (answer === selectedQuestions[currentQuestionIndex].correct) {
            socket.emit('finishGame', { gameCode, name: 'PlayerName', score: 10 });  // Use dynamic gameCode
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
            socket.emit('playerFinished', { gameCode });  // Emit event after quiz is over
            navigate('/thank-you');
        }
    }, [quizOver, navigate, gameCode]);

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
                    <button key={cat} onClick={() => setCategory(cat)}>
                        {cat}
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
