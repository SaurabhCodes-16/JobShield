import { useState } from "react";
import './index.css';
import jsPDF from "jspdf";

import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;


function downloadPDF(jobText, riskLevel, flags) {
  const doc = new jsPDF();

  // Title
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("🛡️ JobShield - Job Risk Report", 20, 20);

  // Date
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text(`Generated on: ${new Date().toLocaleString()}`, 20, 30);

  // Divider
  doc.setDrawColor(0);
  doc.line(20, 35, 190, 35);

  // Job Description
  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.text("Job Description:", 20, 45);
  doc.setFont("helvetica", "normal");
  const lines = doc.splitTextToSize(jobText, 170);
  doc.text(lines, 20, 55);

  let y = 55 + lines.length * 6;

  // Risk Level
  doc.setFont("helvetica", "bold");
  doc.text("Risk Level:", 20, y);
  doc.setFont("helvetica", "normal");
  doc.text(`${riskLevel}`, 60, y);
  y += 10;

  // Red Flags
  doc.setFont("helvetica", "bold");
  doc.text("Detected Red Flags:", 20, y);
  doc.setFont("helvetica", "normal");
  y += 8;

  if (flags.length === 0) {
    doc.text("✅ No red flags detected. Looks safe.", 20, y);
  } else {
    flags.forEach((flag, i) => {
      doc.text(`⚠️ ${flag}`, 20, y + i * 8);
    });
  }

  // Save PDF
  doc.save("JobShield_Report.pdf");
}


// function scoreJob(jobText) {
//   const redFlags = [
//   { phrase: "crypto", score: 30 },
//   { phrase: "no contract", score: 25 },
//   { phrase: "send your ID", score: 20 },
//   { phrase: "WhatsApp", score: 10 },
//   { phrase: "urgent hiring", score: 10 },
//   { phrase: "Aadhaar", score: 10 },
//   { phrase: "transfer funds", score: 15 },
//   { phrase: "get rich", score: 20 },
// ];

// const regexFlags = [
//   { test: /₹\d{4,5}/.test(jobText), label: "Very high salary", score: 25 },
//   { test: /work\s*from\s*home/i.test(jobText), label: "Work from home", score: 5 },
// ];


//   const lowerText = jobText.toLowerCase();
//   let totalScore = 0;
//   let triggeredFlags = [];

//   redFlags.forEach(({ phrase, score }) => {
//     if (lowerText.includes(phrase)) {
//       totalScore += score;
//       triggeredFlags.push(phrase);
//     }
//   });

//   regexFlags.forEach(({ test, label, score }) => {
//     if (test) {
//       totalScore += score;
//       triggeredFlags.push(label);
//     }
//   });

//   const risk = totalScore === 0 ? "Low" : totalScore <= 30 ? "Medium" : "High";

//   return {
//     score: Math.min(totalScore, 100),
//     riskLevel: risk,
//     flags: triggeredFlags,
//   };
// }

export default function App() {
  const [jobText, setJobText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

const handleAnalyze = async () => {
  setLoading(true);
  try {
    const res = await fetch("http://localhost:5000/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: jobText }),
    });

    const data = await res.json();

    if (!data.model_label) {
      console.error("Invalid API response:", data);
      alert("⚠️ Invalid response from backend.");
      return;
    }

    const parsedResult = {
      riskLevel:
        data.model_label === "fraudulent"
          ? data.fraud_probability > 0.85
            ? "High"
            : "Medium"
          : "Low",
      score: Math.round(data.fraud_probability * 100),
      flags: data.fraud_score >= 20 ? ["⚠️ Heuristic red flags detected"] : [],
    };

    setResult(parsedResult);
  } catch (error) {
    console.error("Error calling backend:", error);
    alert("❌ Backend error. Is Flask running?");
  } finally {
    setLoading(false);
  }
};




  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || file.type !== "application/pdf") return alert("Only PDF files allowed!");

    const reader = new FileReader();
    reader.onload = async () => {
      const typedArray = new Uint8Array(reader.result);
      const pdf = await pdfjsLib.getDocument(typedArray).promise;
      let extracted = "";

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const strings = content.items.map((item) => item.str);
        extracted += strings.join(" ") + "\n";
      }

      setJobText(extracted);
    };
    reader.readAsArrayBuffer(file);
  };


return (
  <div className="min-h-screen bg-animated text-white p-6">
    <div className="backdrop-blur-md bg-black/60 rounded-lg shadow-xl max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-center text-blue-400 mb-6">
        🛡️ JobShield: Fraud Score Analyzer
      </h1>

      <label className="block mb-2 font-semibold text-white">
        Paste Job Description:
      </label>
      <textarea
        className="w-full border border-gray-700 bg-gray-900 text-white rounded-md p-4 h-40 resize-none 
               focus:outline-none focus:ring-2 focus:ring-blue-500 
               hover:ring-2 hover:ring-purple-500 hover:shadow-md 
               hover:scale-[1.02] transition-all duration-300"
        placeholder="Paste the job description here..."
        value={jobText}
        onChange={(e) => setJobText(e.target.value)}
      ></textarea>

      <input
        type="file"
        accept=".pdf"
        onChange={handleFileUpload}
        className="block w-full text-sm text-gray-300 cursor-pointer 
               file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 
               file:text-sm file:font-semibold 
               file:bg-blue-500 file:text-white 
               hover:file:bg-blue-600 hover:scale-[1.02] 
               transition-transform duration-300"
      />

      <button
        onClick={handleAnalyze}
        disabled={loading}
        className={`mt-6 w-full font-semibold py-2 px-4 rounded transition-all duration-200 ${
          loading
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
      >
        {loading ? "Analyzing..." : "🔍 Analyze"}
      </button>

      {/* ✅ Loading Indicator */}
      {loading && (
        <div className="mt-6 text-center text-blue-300 font-semibold animate-pulse">
          🔄 Analyzing job description, please wait...
        </div>
      )}

      {/* ✅ Results Display */}
      {result && !loading && (
        <div className="mt-6">
          <h2
            className={`text-xl font-semibold text-center ${
              result.riskLevel === "High"
                ? "text-red-500"
                : result.riskLevel === "Medium"
                ? "text-yellow-400"
                : "text-green-400"
            }`}
          >
            Risk Level: {result.riskLevel}
          </h2>

          {/* Score Bar */}
          <div className="mt-4">
            <label className="text-sm text-white font-semibold block text-center mb-1">
              Fraud Confidence Score
            </label>
            <progress
              value={result.score || 50}
              max="100"
              className="w-full h-4 rounded-lg overflow-hidden"
              style={{
                accentColor:
                  result.riskLevel === "High"
                    ? "#ef4444"
                    : result.riskLevel === "Medium"
                    ? "#facc15"
                    : "#22c55e",
              }}
            ></progress>
          </div>

          {/* Red Flags List */}
          {result.flags.length > 0 ? (
            <ul className="mt-4 space-y-2">
              {result.flags.map((flag, i) => (
                <li key={i} className="text-sm text-red-400 flex items-center">
                  ⚠️ <span className="ml-2">{flag}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-green-400 text-sm mt-4 text-center">
              ✅ No red flags found. Looks safe.
            </p>
          )}

          <button
            onClick={() => downloadPDF(jobText, result.riskLevel, result.flags)}
            className="mt-6 w-full bg-white text-gray-900 font-semibold py-2 px-4 rounded hover:bg-gray-200"
          >
            📄 Download Report as PDF
          </button>
        </div>
      )}
    </div>
  </div>
);

}
