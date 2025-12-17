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

// Pedir pregunta a OpenTDB
async function pedirPregunta(categoria) {
    const categoryId = categoryMap[categoria];

    const url = `https://opentdb.com/api.php?amount=1&type=multiple&category=${categoryId}`;

    const res = await fetch(url);
    const data = await res.json();

    return data.results[0];
}
