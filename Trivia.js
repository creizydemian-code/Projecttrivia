async function startGame(category) {
    document.getElementById("menu").style.display = "none";
    document.getElementById("game").style.display = "block";

    const questionBox = document.getElementById("questionBox");
    const optionsBox = document.getElementById("options");

    questionBox.innerHTML = "Cargando pregunta...";
    optionsBox.innerHTML = "";

    // Obtener texto generado por IA
    const text = await pedirPregunta(category);

    // Extraer partes del texto
    const pregunta = text.match(/Pregunta:(.*)/i)?.[1]?.trim() || "Pregunta no detectada";
    const opciones = text.match(/Opciones:(.*)/i)?.[1]?.trim().split(/\s*[A-D]\)\s*/i).filter(o => o) || [];
    const correcta = text.match(/Respuesta correcta:(.*)/i)?.[1]?.trim() || "?";

    // Mostrar pregunta
    questionBox.textContent = pregunta;
    questionBox.classList.add("fadeIn");

    // Opciones estilo Majotori
    opciones.forEach(op => {
        const div = document.createElement("div");
        div.className = "option";
        div.textContent = op;
        div.onclick = () => verificarRespuesta(op, correcta);
        optionsBox.appendChild(div);
    });

    window.correctAnswer = correcta;
}

function verificarRespuesta(opcion, correcta) {
    if (opcion.includes(correcta)) {
        alert("✔ ¡Correcto!");
    } else {
        alert("✘ Incorrecto… La respuesta era: " + correcta);
    }

    location.reload(); // Reiniciar estilo Majotori
}
