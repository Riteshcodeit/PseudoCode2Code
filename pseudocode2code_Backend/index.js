import { GoogleGenAI } from "@google/genai";
import 'dotenv/config';
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Correct API URL for Gemini
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

app.get('/', (req, res) => {
    res.send("Welcome to Server ");
});

app.post("/convert", async (req, res) => {
    const { pseudocode, language } = req.body;
     const getPrompt = (language, pseudocode) => {
  const lang = language.toLowerCase();

  switch (lang) {
    case "java":
      return `Convert the following pseudocode to modern Java (Java 17+).
Use:
- var for local variables where suitable
- Avoid unnecessary try-with-resources in short programs
- Best practices and modern syntax
- No unnecessary Scanner.close()

Return ONLY the executable Java code. No explanations or comments.

Pseudocode:
${pseudocode}

Modern Java code:`;

    case "javascript":
      return `Convert the following pseudocode to modern JavaScript (ES6+).
Use:
- const and let instead of var
- Template literals (e.g. \`Hello \${name}\`)
- Arrow functions where possible
- console.log for output

Return ONLY the executable JavaScript code. No explanations or comments.

Pseudocode:
${pseudocode}

Modern JavaScript code:`;

    case "python":
      return `Convert the following pseudocode to modern Python (3.8+).
Use:
- f-strings for string formatting
- List comprehensions and type hints where useful
- Avoid deprecated patterns

Return ONLY the executable Python code. No explanations or comments.

Pseudocode:
${pseudocode}

Modern Python code:`;

    default:
      return `Convert the following pseudocode to ${language}. Use modern syntax and best practices.

Return ONLY the executable ${language} code without any explanation and markdown formatting. No explanations or comments. Try not to use unnecessary additional code or try-catch and something that not given by useer pseudocode.

Pseudocode:
${pseudocode}

${language} code:`;
  }
};


    const content = getPrompt(language, pseudocode);
    
    try {
        // Option 1: Using the GoogleGenAI client (Recommended)
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: content,
        });
        
        const code = response.text || "No response";
        res.json({ code });
        
        // Option 2: Using axios (if you prefer the direct API approach)
        // const response = await axios.post(
        //     `${GEMINI_API_URL}?key=${process.env.GEMINI_API_KEY}`,
        //     {
        //         contents: [{
        //             parts: [{ text: content }]
        //         }]
        //     }
        // );
        // const code = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
        // res.json({ code });
        
    } catch (error) {
        console.error(error.response?.data || error.message);
        res.status(500).json({ error: "Conversion failed" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 