// src/components/Welcome.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
    const [showInstructions, setShowInstructions] = useState(false);
    const navigate = useNavigate();

    const handleStart = () => {
        navigate('/host');
    };

    return (
        <div>
            <h1>Willkommen zum Emily Quiz!</h1>
            <h2>Wer kennt mich am besten?</h2>
                <div>
                    <p>Du sollst innerhalb der nächsten Minuten aus den folgenden Kategorien (10, 20, 50 oder 100 Punkte) insgesamt 5 Fragen beantworten. Wie oft du welche Kategorie wählst, bleibt dabei ganz dir überlassen - geh’ aufs Ganze und wähle 5x100 Punkte oder mische nach Belieben durch.
                        Ich sage nur so viel - die Preise sind es wert sie zu gewinnen!
                        Viel Spaß und gutes Gelingen - jetzt sehen wir mal, wie gut du mich wirklich kennst;-)
                        Deine Emily</p>
                </div>
            <button onClick={handleStart}>Start</button>
        </div>
    );
};

export default Welcome;