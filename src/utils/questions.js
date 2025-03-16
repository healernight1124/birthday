const questions = {
    10: [
        {
            question: "Welche Augenfarbe hat Emily?",
            answers: ["Blau", "Grün", "Braun", "Violet"],
            correct: "Blau",
        },
        {
            question: "Welche natürliche Haarfarbe hat Emily?",
            answers: ["Rot", "Braun", "Schwarz", "Blond"],
            correct: "Rot",
        },
        {
            question: "Welchen Mittelnamen hat Emily?",
            answers: ["Ingeborg", "Marie", "Therese", "Luise"],
            correct: "Marie",
        },
        {
            question: "Wie groß ist Emily?",
            answers: ["164cm", "178cm", "180cm", "175cm"],
            correct: "178cm",
        },
        {
            question: "Was ist Emilys Standardgetränk beim Ausgehen?",
            answers: ["Weißer Spritzer", "Kaltes Bier", "Champagner", "Prosecco"],
            correct: "Weißer Spritzer",
        },
        {
            question: "In welchem Jahr hat Emily maturiert?",
            answers: ["2009", "2013", "2014", "2021"],
            correct: "2013",
        },
        {
            question: "Was ist Emilys Lieblingsfarbe?",
            answers: ["Türkis", "Violett", "Grau", "Grün"],
            correct: "Grau",
        },
        {
            question: "Emily ist vom Sternzeichen...?",
            answers: ["Stier", "Fisch", "Jungfrau", "Zwilling"],
            correct: "Fisch",
        },
        {
            question: "An welcher Universität hat Emily Medizin studiert?",
            answers: [
                "Medizinische Universität Wien",
                "Paracelsus Universität",
                "Sigmund Freud Universität",
                "Karl Landsteiner Universität",
            ],
            correct: "Sigmund Freud Universität",
        },
        {
            question: "Welche Schuhgröße hat Emily?",
            answers: ["38 ½", "41", "40", "39 ½"],
            correct: "41",
        },
        {
            question: "Welches Gericht würde sich Emily niemals bestellen?",
            answers: ["Voralberger Kasspatzen", "Loup de mer mit Zitronensauce", "Salonbeuscherl", "Maultaschen in Brühe mit Kartoffelsalat"],
            correct: "Loup de mer mit Zitronensauce",
        },
        {
            question: "Welche Sprachen spircht Emily fließend?",
            answers: ["Deutsch und Englisch", "Deutsch, Englisch und Afrikaans", "Deutsch, Englisch und Französisch", "Deutsch, Englisch und Spanisch"],
            correct: "Deutsch und Englisch",
        },
        {
            question: "Welches Auto fährt Emily?",
            answers: ["Suzuki Swift", "Audi RS3", "Range Rover E Vogue", "Mercedes S Klasse"],
            correct: "Audi RS3",
        },
        {
            question: "An welchem See ist Emily aufgewachsen?",
            answers: ["Wörthersee", "Traunsee", "Weißensee", "Millstättersee"],
            correct: "Millstättersee",
        },
        {
            question: "Welches war Emilys Lieblingsfach in der Schule?",
            answers: ["Sport und Pause", "Biologie", "Latein", "Französisch"],
            correct: "Biologie",
        },
    ],
    20: [
        {
            question: "Was war Emilys Lieblingsclub in Wien während der Studienzeit?",
            answers: ["Grelle Forelle", "Volksgarten", "Pratersauna", "Flex"],
            correct: "Volksgarten",
        },
        {
            question: "Was war Emilys Lieblingsshot im Volksgarten?",
            answers: [
                "Espresso Martini",
                "Basilikumshot",
                "Maracujashort",
                "Erdbeer Lime Shot",
            ],
            correct: "Basilikumshot",
        },
        {
            question: "Welche Führerscheine besitzt Emily?",
            answers: ["Auto und Boot", "Auto, Boot und Motorrad", "Auto und LKW", "Auto und Motorrad"],
            correct: "Auto und Boot",
        },
        {
            question: "In welcher Schule in Spittal an der Drau hat Emily maturiert?",
            answers: [
                "Bundesoberstufenrealgymnasium (BORG)",
                "Bundesgymnasium (BG)",
                "Bundesrealgymnasium (BRG)",
                "Höhere Anstalt für Forstwirtschaft",
            ],
            correct: "Bundesgymnasium (BG)",
        },
        {
            question: "Welche Gürtelfarbe trägt Emily im Judo?",
            answers: ["Grün", "Gelb", "Schwarz", "Keine der oben genannten"],
            correct: "Keine der oben genannten",
        },
        {
            question: "Emily ist Assistenzärztin für ...?",
            answers: [
                "Hals-, Nasen- und Ohrenheilkunde",
                "Hand-, Plastische, Rekonstruktive und Verbrennungschirurgie",
                "Ornitologie und Verbrennungschirurgie",
                "Rekonstruktive Dermatologie und Verbrennungschirurgie",
            ],
            correct: "Hand-, Plastische, Rekonstruktive und Verbrennungschirurgie",
        },
        {
            question: "Was ist Emilys Lieblingsessen?",
            answers: [
                "Selchroller, Sauerkraut und Erdäpfelpüree",
                "Polardorsch mit Grünkohl",
                "Kaiserschmarren",
                "Kärntnernudeln",
            ],
            correct: "Selchroller, Sauerkraut und Erdäpfelpüree",
        },
        {
            question: "Welche Torte backt Emily für Freunde zum Geburtstag?",
            answers: [
                "Sachertorte",
                "Mohn Himbeer Topfentorte",
                "Panamatorte",
                "Cheesecake",
            ],
            correct: "Mohn Himbeer Topfentorte",
        },
        {
            question: "Was ist Emilys Lieblingseissorte?",
            answers: ["Haselnuss", "Schlumpf", "Dunkle Schokolade", "Himbeere"],
            correct: "Haselnuss",
        },
        {
            question: "Welche Allergie hat Emily?",
            answers: ["Chrom und Nickel", "Hundehaare", "Erdbeeren", "Keine"],
            correct: "Keine",
        },
        {
            question: "Welchen Padi Diver hat Emily?",
            answers: ["Goldenes Seepferdchen", "Open Water Diver", "Advanced Open Water Diver", "Rescue Diver"],
            correct: "Advanced Open Water Diver",
        },
        {
            question: "Was sind Emilys Signature Dishes?",
            answers: ["Gebackene Champignons mit Sauce Tartare + Gegrillter Lachs auf Zitronenrisotto", "Rote Rüben Salat mit Rucola und Feta + Tiramisu", "Burrito Wraps + Pfirsich/Bananencurry", "Bouillabaisse + Kartoffelpuffer mit Schnittlauchsauce"],
            correct: "Burrito Wraps + Pfirsich/Bananencurry",
        },
        {
            question: "Was ist Emilys Lieblingscocktail?",
            answers: ["Mojito", "Negroni", "Pina Colada", "Dark&Stormy"],
            correct: "Negroni",
        },
        {
            question: "Wo wurde Emily geboren?",
            answers: ["Klagenfurt", "Wien", "Kapstadt", "Vöcklabruck"],
            correct: "Wien",
        },
        {
            question: "Was ist Emilys Lieblingsjahreszeit?",
            answers: ["Sommer", "Herbst", "Winter", "Frühling"],
            correct: "Herbst",
        },
        {
            question: "Was ist Emilys Lieblings Disney Film?",
            answers: ["Tarzan", "Susi und Strolchi", "Aristocats", "Mulan"],
            correct: "Aristocats",
        },
        {
            question: "Welchen der unten angeführten Kaffees würde sich Emily bestellen?",
            answers: ["Bullet Proof Coffee", "Soja Matcha Latte", "Cappuccino mit Karamellsirup und laktosefreier Milch", "Oat Milk Cappuccino"],
            correct: "Cappuccino mit Karamellsirup und laktosefreier Milch",
        },
    ],
    50: [
        {
            question: "In welchem Jahr hat Emily den Opernball eröffnet?",
            answers: ["2016", "2018", "2014", "2021"],
            correct: "2014",
        },
        {
            question: "Wie hießen die 3 Jack Russel Terrier von Emily?",
            answers: [
                "Herzi, Punkti und Edgar",
                "Strolchi, Herzi und Charlie",
                "Edgar, Puppi und Hilde",
                "Mariechen, Herzi und Punkti",
            ],
            correct: "Herzi, Punkti und Edgar",
        },
        {
            question: "Welches ist Emilys Lieblingsbuch?",
            answers: [
                "Magic Cleaning - wie richtig aufräumen Ihr Leben verändert (Marie Kondo)",
                "Der Schatten des Windes (Carlos Ruiz Zafón)",
                "Harry Potter und der Gefangene von Askaban (J.K. Rowling)",
                "What they don’t teach you at Harvard Business School (Mark McCormack)",
            ],
            correct: "Der Schatten des Windes (Carlos Ruiz Zafón)",
        },
        {
            question: "In welcher europäischen Großstadt war Emily außer Wien am häufigsten?",
            answers: ["Venedig", "Paris", "London", "Madrid"],
            correct: "Paris",
        },
        {
            question: "Was hat Emily vor Medizin studiert?",
            answers: ["Kunstgeschichte", "Biologie und Chemie", "Sportwissenschaften", "Transkulturelle Kommunikation"],
            correct: "Biologie und Chemie",
        },
        {
            question: "Welches Autokennzeichen hat Emily?",
            answers: ["SP - EML 1", "TÜ - EL 203", "W - EL 1", "SP - EL 1"],
            correct: "SP - EML 1",
        },
        {
            question: "Was war Emilys erster Berufswunsch?",
            answers: ["Tierärztin", "Nonne", "Polizistin", "Stewardess"],
            correct: "Nonne",
        },
        {
            question: "Welches Hobby hat Emily seit einiger Zeit für sich entdeckt?",
            answers: ["Briefmarken sammeln", "Ornitologie", "Bouldern", "Bikram Yoga"],
            correct: "Ornitologie",
        },
        {
            question: "Welche Schönheitsoperation hat Emily bereits durchführen lassen?",
            answers: ["Otoplastik", "Hasenschartenkorrektur", "Rhinoplastik", "Mammareduktionsplastik"],
            correct: "Rhinoplastik",
        },
        {
            question: "Welchen Spruch sagt Emily sehr gerne?",
            answers: ["Schau ich aus wie die Caritas?", "Entscheiden heißt verzichten", "Das Gegenteil von gut ist gut gemeint", "Paint me green and call me a pickle"],
            correct: "Schau ich aus wie die Caritas?",
        },
        {
            question: "Was ist Emilys Lieblingslokal in Tübingen?",
            answers: ["1821", "Freistil", "Anan Asian Cuisine", "Mauganetschle"],
            correct: "Freistil",
        },
        {
            question: "Was hat Emily an ihrem 18. Geburtstag gemacht?",
            answers: ["Day Trip nach Paris", "24h Ring Wagner in Erl", "Aufgrund eines verspäteten Fluges fast ihr eigenes Geburtstagsfest verpasst", "Giraffenimpfen in Afrika"],
            correct: "Day Trip nach Paris",
        },
        {
            question: "Was ist Emilys Lieblingslied?",
            answers: ["Da ya think I'm sexy - Rod Stewart", "Big in Japan - Alphaville", "Danny Carlifornia - Red Hot Chilli Peppers", "Flamenco Turistico - Stafanie Werger"],
            correct: "Danny Carlifornia - Red Hot Chilli Peppers",
        },
        {
            question: "Welche Kleidungsstücke sind aus Emilys Garderobe nicht wegzudenken?",
            answers: ["Grauer Pulli und grauer Schal", "Langer grüner Bademantel und schwarze Sneaker", "Graue Jeans und weißer Blazer", "Blauer Trenchcoat und graue Sneaker"],
            correct: "Grauer Pulli und grauer Schal",
        },
        {
            question: "Welche Schuhgröße hat Emily?",
            answers: ["38 ½", "41", "40", "39 ½"],
            correct: "41",
        },
    ],
    100: [
        {
            question: "Wie lautet Emilys Adresse in Kärnten?",
            answers: [
                "Dellach 24, 9872 Millstatt",
                "Döbriach 78, 9873 Millstadt",
                "Dellach 12, 9800 Spittal an der Drau",
                "Seeboden 11, 9872 Millstatt",
            ],
            correct: "Dellach 24, 9872 Millstatt",
        },
        {
            question: "Wie lautete Emilys Adresse in Wien?",
            answers: [
                "Jasomirgottstrasse 3a/17, 1010 Wien",
                "Mariahilfer Strasse 64/6, 1070 Wien",
                "Barnabitengasse 16/6, 1060 Wien",
                "Volksgartenstrasse 15/9, 1070 Wien",
            ],
            correct: "Mariahilfer Strasse 64/6, 1070 Wien",
        },
        {
            question: "Welches der folgenden Länder im südlichen Afrika hat Emily noch nicht bereist?",
            answers: ["Angola", "Südafrika", "Lesotho", "Botswana"],
            correct: "Lesotho",
        },
        {
            question: "Wie lautet die korrekte Wohnadresse von Emily in Tübingen?",
            answers: [
                "Friedrich Dannenmann Strasse 15, 72070 Tübingen",
                "Schnarrenbergstrasse 96, 72076 Tübingen",
                "Wöhrdstrasse 25, 72072 Tübingen",
                "Freiackerstrasse 9, 72070 Tübingen",
            ],
            correct: "Friedrich Dannenmann Strasse 15, 72070 Tübingen",
        },
        {
            question: "Wie war der Name des ersten Hundes von Emily?",
            answers: ["Kilian", "Herzi", "Punkti", "Loisi"],
            correct: "Loisi",
        },
        {
            question: "Wie lautet der Name des Bootes von Emily in Kärnten?",
            answers: ["Mimi", "Toni", "Ina", "Sputnik"],
            correct: "Mimi",
        },
        {
            question: "Welcher ist Emilys Lieblingsvogel?",
            answers: ["Pinguin", "Malachite Kingfisher", "Fish Eagle", "Kohlmeise"],
            correct: "Malachite Kingfisher",
        },
        {
            question: "Was war Emilys erstes Wort?",
            answers: ["Mama", "Impala", "Nein", "Sonne"],
            correct: "Impala",
        },
        {
            question: "Wie alt war Emily bei ihrem ersten Flug?",
            answers: ["10 Jahre", "5 Jahre", "9 Tage", "8 Stunden"],
            correct: "9 Tage",
        },
        {
            question: "Wie wurde Emily von ihrer Mama als Kind genannt?",
            answers: ["Rödi Knödi", "Hasenpupsi", "Herzilein", "Emimaus"],
            correct: "Rödi Knödi",
        },
        {
            question: "Mit welchem Celebrity ist Emily in einer Ausgabe der Bunte auf derselben Seite zu sehen?",
            answers: ["Britney Spears", "Kate Middleton", "Kim Kardashian", "Jude Law"],
            correct: "Kim Kardashian",
        },
        {
            question: "Für welche Fachrichtung hätte sich Emily entschieden, wenn Plastische Chirurgie nicht geklappt hätte?",
            answers: ["Gynäkologie", "Humangenetik", "Kinderchirurgie", "Gastroenterologie"],
            correct: "Kinderchirurgie",
        },
        {
            question: "Wer ist Emilys ultimativer Lieblingsschauspieler?",
            answers: ["Sir Roger Moore", "Elyas M’Barek", "Henry Cavill", "Josh Hartnett"],
            correct: "Josh Hartnett",
        },
        {
            question: "Wenn Emily morgen international umziehen müsste, welche der unten angeführten Städte würde sie sofort wählen?",
            answers: ["Kapstadt", "Vancouver", "Kopenhagen", "Sydney"],
            correct: "Sydney",
        },
        {
            question: "Emily mag viele Dinge nicht, eine Sache hasst sie jedoch besonders. Dies wäre:",
            answers: [
                "Wenn es sich zu viele Lebensmittelkomponenten auf ihrem Teller berühren",
                "Wenn unpassende Kleidung zu gesellschaftlichen Anlässen getragen wird",
                "Schiefe Bilder oder Kunstwerke an Wänden",
                "Wenn Personen mit offenen Schnürsenkeln herumlaufen",
            ],
            correct: "Wenn es sich zu viele Lebensmittelkomponenten auf ihrem Teller berühren",
        },
    ],
};

module.exports = questions;