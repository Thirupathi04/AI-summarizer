const summarizeBtn = document.getElementById("summarizeBtn");
const inputText = document.getElementById("inputText");
const output = document.getElementById("output");
const status = document.getElementById("status");

summarizeBtn.addEventListener("click", async () => {
  const text = inputText.value.trim();

  if (!text) {
    alert("Please paste some text to summarize.");
    return;
  }

  status.textContent = "✨ Summarizing...";
  output.textContent = "";

  try {
    const res = await fetch("/api/summarize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });

    const data = await res.json();

    if (data.summary) {
      output.textContent = data.summary;
      status.textContent = "✅ Done!";
    } else {
      output.textContent = "⚠️ No summary generated.";
      status.textContent = "Error";
    }
  } catch (err) {
    status.textContent = "❌ Error occurred";
    console.error(err);
  }
});
