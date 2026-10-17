const $ = (id) => document.getElementById(id);
let installPrompt = null;

if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
  window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js").catch(console.warn));
}
window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault(); installPrompt = event; $("installBtn").classList.remove("hidden");
});
$("installBtn").addEventListener("click", async () => {
  if (!installPrompt) return;
  installPrompt.prompt(); await installPrompt.userChoice; installPrompt = null;
  $("installBtn").classList.add("hidden");
});

function demoAnswer(subject, level, task) {
  const title = `Materia: ${subject} | Nivel: ${level}`;
  return `${title}\n\nEntendamos la consigna\n${task}\n\nCómo trabajarla:\n1. Identifica exactamente qué te piden: explicar, comparar, calcular, resumir o investigar.\n2. Divide la tarea en preguntas pequeñas y responde una por una.\n3. Anota los datos importantes y comprueba que cada respuesta conteste la consigna.\n4. Revisa ortografía, operaciones y fuentes antes de entregar.\n\nModo de demostración\nEsta versión todavía no está conectada a un modelo de inteligencia artificial, así que no inventará una solución específica. Para obtener una respuesta personalizada, conecta un backend de IA seguro siguiendo el README. Mientras tanto, puedes usar esta guía para organizar la tarea.`;
}

$("solveBtn").addEventListener("click", async () => {
  const task = $("task").value.trim();
  if (!task) { $("task").focus(); alert("Escribe o pega la consigna de tu tarea primero."); return; }
  const btn = $("solveBtn"); btn.disabled = true; btn.textContent = "Preparando ayuda…";
  try {
    // Safe default: local demo. Configure an HTTPS backend endpoint here when deployed.
    const API_ENDPOINT = "";
    if (API_ENDPOINT) {
      const response = await fetch(API_ENDPOINT, {
        method: "POST", headers: {"Content-Type":"application/json"},
        body: JSON.stringify({subject:$("subject").value, level:$("level").value, task})
      });
      if (!response.ok) throw new Error("El servidor no pudo responder.");
      const data = await response.json();
      $("answer").textContent = data.answer || "El servidor no devolvió una respuesta.";
    } else {
      $("answer").textContent = demoAnswer($("subject").value, $("level").value, task);
    }
    $("answerPanel").classList.remove("hidden");
    $("answerPanel").scrollIntoView({behavior:"smooth",block:"start"});
  } catch (error) {
    alert("No se pudo obtener una respuesta. Comprueba tu conexión o la configuración del servidor.");
  } finally {
    btn.disabled = false; btn.textContent = "Ayúdame con la tarea";
  }
});
$("clearBtn").addEventListener("click", () => {
  $("task").value = ""; $("answer").textContent = ""; $("answerPanel").classList.add("hidden");
});
$("copyBtn").addEventListener("click", async () => {
  const content = $("answer").innerText;
  try { await navigator.clipboard.writeText(content); $("copyBtn").textContent = "Copiado"; setTimeout(()=> $("copyBtn").textContent = "Copiar", 1500); }
  catch { alert("No se pudo copiar automáticamente. Mantén presionado el texto para seleccionarlo."); }
});
