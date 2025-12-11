
function selectCategory(category) {
    document.getElementById("menu").classList.add("hidden");
    document.getElementById("game").classList.remove("hidden");
    startGame(category);
}

async function startGame(category) {
    const questionBox = document.getElementById("questionBox");
    const optionsBox = document.getElementById("options");

    questionBox.innerHTML = "Cargando pregunta...";
    optionsBox.innerHTML = "";

    const text = await pedirPregunta(category);

    const pregunta = text.match(/Pregunta:(.*)/i)?.[1]?.trim() || "Pregunta no detectada";

    const opciones = text
        .match(/Opciones:(.*)/i)?.[1]
        ?.trim()
        .split(/\s*[A-D]\)\s*/i)
        .filter(o => o) || [];

    const correcta = text.match(/Respuesta correcta:(.*)/i)?.[1]?.trim() || "?";


    questionBox.textContent = pregunta;

   
    opciones.forEach(op => {
        const div = document.createElement("div");
        div.className = "option";
        div.textContent = op;

        div.onclick = () => showResult(op.includes(correcta));

        optionsBox.appendChild(div);
    });
}


function showResult(isCorrect) {
    const resultBox = document.getElementById("resultBox");
    const resultText = document.getElementById("resultText");
    const game = document.getElementById("game");

    game.classList.add("hidden");
    resultBox.classList.remove("hidden");

    if (isCorrect) {
        resultBox.classList.add("correct");
        resultBox.classList.remove("incorrect");
        resultText.textContent = "✔ ¡Respuesta correcta!";
    } else {
        resultBox.classList.add("incorrect");
        resultBox.classList.remove("correct");
        resultText.textContent = "✘ Respuesta incorrecta...";
    }
}


function backToMenu() {
    document.location.reload();
}
