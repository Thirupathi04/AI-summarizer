/**
 * AI Summarizer - Frontend Only (Gemini API)
 * ------------------------------------------
 * This script takes user input text, sends it to
 * Google Gemini, and displays a concise summary.
 */

// 🔑 Replace with your actual Gemini API key
const GEMINI_API_KEY = "AIzaSyCbZs5nVCzRh3wxK86OCyPTKWFPku5TzF4";

// DOM elements
const summarizeBtn = document.getElementById("summarizeBtn");
const inputText = document.getElementById("inputText");
const output = document.getElementById("output");
const status = document.getElementById("status");

// Main button action
summarizeBtn.addEventListener("click", async () => {
  const text = inputText.value.trim();

  if (!text) {
    alert("Please paste some text to summarize.");
    return;
  }

  // Update UI
  status.textContent = "✨ Summarizing...";
  output.textContent = "";

  try {
    // Send request to Gemini API
    const res = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + GEMINI_API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: `Summarize the following text into clear bullet points:\n\n${text}` }]
          }]
        })
      }
    );

    const data = await res.json();

    // Check if API returned a summary
    if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
      output.textContent = data.candidates[0].content.parts[0].text;
      status.textContent = "✅ Done!";
    } else {
      output.textContent = "⚠️ No summary generated.";
      status.textContent = "Error";
    }
  } catch (err) {
    console.error("Gemini API error:", err);
    status.textContent = "❌ Error: " + err.message;
  }
});
