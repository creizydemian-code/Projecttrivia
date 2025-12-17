// Mapeo categorías OpenTDB
const categoryMap = {
    "Cine": 11,
    "Videojuegos": 15,
    "Música": 12,
    "Ciencia": 17,
    "Historia": 23,
    "Geografía": 22,
    "Deportes": 21,
    "Literatura": 10,
    "Anime": 31,
    "Tecnología": 18
};

// Traducir texto a español
async function traducir(texto) {
    const res = await fetch("https://libretranslate.de/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            q: texto,
            source: "en",
            target: "es",
            format: "text"
        })
    });

    const data = await res.json();
    return data.translatedText;
}

// Pedir pregunta + traducir
async function pedirPregunta(categoria) {
    const categoryId = categoryMap[categoria];
    const url = `https://opentdb.com/api.php?amount=1&type=multiple&category=${categoryId}`;

    const res = await fetch(url);
    const data = await res.json();

    const pregunta = data.results[0];

    // Traducir pregunta y respuestas
    pregunta.question = await traducir(pregunta.question);
    pregunta.correct_answer = await traducir(pregunta.correct_answer);

    for (let i = 0; i < pregunta.incorrect_answers.length; i++) {
        pregunta.incorrect_answers[i] = await traducir(pregunta.incorrect_answers[i]);
    }

    return pregunta;
}
