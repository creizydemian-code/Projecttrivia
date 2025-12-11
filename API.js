async function pedirPregunta(categoria) {
    const res = await fetch("http://localhost:3000/pregunta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categoria })
    });

    const data = await res.json();
    return data.pregunta;
}
