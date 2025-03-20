// src/components/Welcome.js
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
    const navigate = useNavigate();

    const handleStart = () => {
        navigate('/host');
    };

    return (
        <div className="flex flex-col items-center bg-[#D680FF] bg-opacity-70 rounded-lg p-10 w-full max-w-3xl text-center space-y-8">
            <h1 className="font-august text-4xl md:text-6xl">Willkommen zum Emily Quiz!</h1>
            <h2 className="font-august text-2xl md:text-3xl">Wer kennt mich am besten?</h2>

            <div>
                <p className="text-xl md:text-2xl px-6">
                    Du sollst innerhalb der nächsten Minuten aus den folgenden Kategorien (10, 20, 50 oder 100 Punkte) insgesamt 5 Fragen beantworten. Wie oft du welche Kategorie wählst, bleibt dabei ganz dir überlassen - geh’ aufs Ganze und wähle 5x100 Punkte oder mische nach Belieben durch.
                    Ich sage nur so viel - die Preise sind es wert sie zu gewinnen!
                    Viel Spaß und gutes Gelingen - jetzt sehen wir mal, wie gut du mich wirklich kennst;-)
                </p>
                <p className="text-xl md:text-2xl px-6">
                    Deine Emily
                </p>
            </div>

            <button
                className=" bg-[#D680FF]
                            text-white
                            text-lg
                            md:text-xl
                            px-6
                            py-3
                            rounded-lg
                            opacity-80
                            hover:opacity-100
                            hover:scale-105
                            transition-all
                            duration-300
                            shadow-md
                            hover:shadow-lg"
                onClick={handleStart}
            >
                Start
            </button>
        </div>


    );
};

export default Welcome;