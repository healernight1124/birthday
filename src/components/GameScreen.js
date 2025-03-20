import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import questions from '../utils/questions';
import socket from '../socket';

const GameScreen = () => {
    const { gameCode, playerName } = useParams();
    const [category, setCategory] = useState(null);
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [usedQuestions, setUsedQuestions] = useState(new Set());
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const [quizOver, setQuizOver] = useState(false);
    const [totalScore, setTotalScore] = useState(0);
    const [answerStatus, setAnswerStatus] = useState(null); // Track if the answer was correct or incorrect
    const [correctAnswer, setCorrectAnswer] = useState(null); // Track the correct answer
    const [playersFinished, setPlayersFinished] = useState(0);
    const navigate = useNavigate();

    const categories = [
        {name: '10', points: 10},
        {name: '20', points: 20},
        {name: '50', points: 50},
        {name: '100', points: 100}
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
        setCorrectAnswer(currentQuestion.correct); // Set correct answer
        const isCorrect = answer === currentQuestion.correct;

        if (isCorrect) {
            setTotalScore(prevScore => prevScore + category.points);
            console.log(`Correct! You earned ${category.points} points. Total score: ${totalScore + category.points}`);
            socket.emit('finishGame', { gameCode, name: playerName, score: totalScore + category.points });
        } else {
            console.log('Wrong!');
        }

        setAnswerStatus(isCorrect ? 'correct' : 'incorrect'); // Set answer status

        setTimeout(() => {
            if (currentQuestionIndex < 4) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setCategory(null);
                setIsLoaded(false);
                setAnswerStatus(null);
                setCorrectAnswer(null);
            } else {
                setQuizOver(true);
            }
        }, 1500); // Timeout for showing the correct answer before moving to the next question
    };

    useEffect(() => {
        if (quizOver) {
            socket.emit('playerFinished', {gameCode, name: playerName, score: totalScore});
            navigate('/thank-you');
        }
    }, [quizOver, navigate, gameCode, totalScore, playerName]);

    useEffect(() => {
        socket.on('updatePlayersFinished', ({count}) => {
            setPlayersFinished(playersFinished + count);
        });

        return () => {
            socket.off('updatePlayersFinished');
        };
    }, []);

    return (
        <div className="flex flex-col items-center bg-[#D680FF] bg-opacity-70 rounded-lg p-6 w-full max-w-md min-h-[300px]">
            {!category ? (
                categories.map((cat) => (
                    <button
                        className="bg-[#D9D9D9] text-[#30193A] text-lg font-semibold px-8 py-4 rounded-lg opacity-80 hover:opacity-100 hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg m-3 w-full max-w-md"
                        key={cat.name}
                        onClick={() => setCategory(cat)}
                    >
                        {cat.name} ({cat.points} points)
                    </button>
                ))
            ) : (
                <>
                    {isLoaded && currentQuestionIndex < 5 && (
                        <div className="flex flex-col items-center w-full max-w-md min-h-[300px]">
                            <h3 className="text-2xl font-bold mb-4">{selectedQuestions[currentQuestionIndex].question}</h3>
                            {selectedQuestions[currentQuestionIndex].answers.map((ans, idx) => {
                                const isCorrect = ans === correctAnswer;
                                const isSelected = answerStatus !== null;
                                return (
                                    <button
                                        key={idx}
                                        className={`bg-[#D9D9D9] text-[#30193A] text-lg font-semibold px-8 py-4 rounded-lg opacity-80 hover:opacity-100 hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg m-3 w-full max-w-md
                                            ${isSelected && (ans === correctAnswer ? 'bg-green-600 text-white' : 'bg-red-900 text-white')}
                                        `}
                                        onClick={() => handleAnswer(ans)}
                                        disabled={isSelected}
                                    >
                                        {ans}
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default GameScreen;
