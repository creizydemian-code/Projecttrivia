function selectCategory(category) {
    document.getElementById("menu").classList.add("hidden");
    document.getElementById("game").classList.remove("hidden");
    startGame(category);
}

async function startGame(category) {
    const questionBox = document.getElementById("questionBox");
    const optionsBox = document.getElementById("options");

    questionBox.textContent = "Cargando pregunta...";
    optionsBox.innerHTML = "";

    const data = await pedirPregunta(category);

    // Decodificar HTML entities
    const decode = text => {
        const txt = document.createElement("textarea");
        txt.innerHTML = text;
        return txt.value;
    };

    const pregunta = decode(data.question);
    const correcta = decode(data.correct_answer);
    const opciones = [...data.incorrect_answers.map(decode), correcta];

    // Mezclar opciones
    opciones.sort(() => Math.random() - 0.5);

    questionBox.textContent = pregunta;

    opciones.forEach(op => {
        const div = document.createElement("div");
        div.className = "option";
        div.textContent = op;
        div.onclick = () => showResult(op === correcta);
        optionsBox.appendChild(div);
    });
}

function showResult(isCorrect) {
    const resultBox = document.getElementById("resultBox");
    const resultText = document.getElementById("resultText");
    const game = document.getElementById("game");

    game.classList.add("hidden");
    resultBox.classList.remove("hidden");

    resultBox.classList.remove("correct", "incorrect");

    if (isCorrect) {
        resultBox.classList.add("correct");
        resultText.textContent = "✔ ¡Respuesta correcta!";
    } else {
        resultBox.classList.add("incorrect");
        resultText.textContent = "✘ Respuesta incorrecta";
    }
}

function backToMenu() {
    document.location.reload();
}
