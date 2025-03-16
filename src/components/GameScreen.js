// GameScreen.js
import React, { useState, useEffect } from 'react';
import questions from '../utils/questions';
import socket from '../socket'; // Use shared socket instance

const GameScreen = () => {
    const [category, setCategory] = useState(null);
    const [question, setQuestion] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const categories = Object.keys(questions);

    useEffect(() => {
        if (category) {
            const categoryQuestions = questions[category];
            const randomQuestion = categoryQuestions[Math.floor(Math.random() * categoryQuestions.length)];
            setQuestion(randomQuestion);
            setIsLoaded(true);
        }
    }, [category]);

    const handleAnswer = (answer) => {
        alert(answer === question.correct ? 'Correct!' : 'Wrong!');
        if (answer === question.correct) {
            socket.emit('finishGame', { gameCode: '12345', name: 'PlayerName', score: 10 }); // Example score
        }
    };

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
                    {isLoaded && (
                        <div>
                            <h3>{question.question}</h3>
                            {question.answers.map((ans, idx) => (
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