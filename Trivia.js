const TOTAL_PREGUNTAS = 10;
let preguntasCorrectas = 0;
let vidas = 3;
let respuestaCorrectaActual = "";

const categorias = [
    "Cine","Videojuegos","Música","Ciencia","Historia",
    "Geografía","Deportes","Literatura","Anime","Tecnología"
];

function startNewGame() {
    preguntasCorrectas = 0;
    vidas = 3;

    document.getElementById("menu").classList.add("hidden");
    document.getElementById("hud").classList.remove("hidden");

    actualizarHUD();
    elegirCategorias();
}

function actualizarHUD() {
    document.getElementById("vidas").textContent = "❤️".repeat(vidas);
    document.getElementById("contador").textContent =
        `${preguntasCorrectas} / ${TOTAL_PREGUNTAS}`;
}

function elegirCategorias() {
    document.getElementById("game").classList.add("hidden");
    document.getElementById("resultBox").classList.remove("hidden");

    const box = document.getElementById("resultBox");
    box.innerHTML = "<h2>Elige una categoría</h2>";

    categorias
        .sort(() => 0.5 - Math.random())
        .slice(0, 4)
        .forEach(cat => {
            const btn = document.createElement("div");
            btn.className = "btn";
            btn.textContent = cat;
            btn.onclick = () => cargarPregunta(cat);
            box.appendChild(btn);
        });
}

async function cargarPregunta(categoria) {
    document.getElementById("resultBox").classList.add("hidden");
    document.getElementById("game").classList.remove("hidden");
    document.getElementById("feedback").classList.add("hidden");

    const qBox = document.getElementById("questionBox");
    const optionsBox = document.getElementById("options");

    qBox.textContent = "Cargando pregunta...";
    optionsBox.innerHTML = "";

    const data = await pedirPregunta(categoria);

    respuestaCorrectaActual = data.correct_answer;

    const opciones = [...data.incorrect_answers, data.correct_answer]
        .sort(() => Math.random() - 0.5);

    qBox.textContent = data.question;

    opciones.forEach(op => {
        const div = document.createElement("div");
        div.className = "option";
        div.textContent = op;
        div.onclick = () => responder(op === respuestaCorrectaActual, div);
        optionsBox.appendChild(div);
    });
}

function responder(acierto, elemento) {
    document.querySelectorAll(".option").forEach(op => {
        op.style.pointerEvents = "none";
    });

    const feedback = document.getElementById("feedback");
    const feedbackText = document.getElementById("feedbackText");
    const correctText = document.getElementById("correctAnswerText");

    feedback.classList.remove("hidden", "correct", "incorrect");

    if (acierto) {
        preguntasCorrectas++;
        elemento.classList.add("correct");
        feedback.classList.add("correct");
        feedbackText.textContent = "✔ Respuesta correcta";
        correctText.textContent = "";
    } else {
        vidas--;
        elemento.classList.add("incorrect");
        feedback.classList.add("incorrect");
        feedbackText.textContent = "✘ Respuesta incorrecta";
        correctText.textContent =
            `La respuesta correcta era: ${respuestaCorrectaActual}`;
    }

    actualizarHUD();
}

function continuar() {
    if (vidas <= 0) {
        finDelJuego("💀 GAME OVER");
        return;
    }

    if (preguntasCorrectas >= TOTAL_PREGUNTAS) {
        finDelJuego("🏆 ¡GANASTE!");
        return;
    }

    elegirCategorias();
}

function finDelJuego(texto) {
    document.getElementById("game").classList.add("hidden");
    const box = document.getElementById("resultBox");
    box.classList.remove("hidden");
    box.innerHTML = `
        <h2>${texto}</h2>
        <div class="btn" onclick="location.reload()">Volver al menú</div>
    `;
}
