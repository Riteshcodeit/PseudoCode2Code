import { GoogleGenAI } from "@google/genai";
import "dotenv/config";
import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Correct API URL for Gemini
// const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

const languageId = {
  "C++": 52,
  "Java": 62,
  "Python": 71,
  "JavaScript": 102,
  "Go": 107,
  "Rust": 108,
};

const code = `function test(){
    console.log("Hey Api is working......");
}
test();
test();  
for (let i = 0; i < 4; i++) {
    console.log("Hey Working");
}
 
`;

// const options = {
//   method: "POST",
//   url: "https://judge0-ce.p.rapidapi.com/submissions",
//   params: {
//     base64_encoded: "true",
//     wait: "false",
//     fields: "*",
//   },
//   headers: {
//     "x-rapidapi-key": process.env.RAPIDAPI_KEY,
//     "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
//     "Content-Type": "application/json",
//   },
//   data: {
//     language_id: 102,
//     source_code: Buffer.from(code).toString("base64"),
//     // stdin: 'SnVkZ2Uw'
//   },
// };
// token id = 34dd3343-d894-43ff-9c45-6966ff90a774
// async function fetchData() {
//   try {
//     const response = await axios.request(options);
//     // console.log(response.data);
//     console.log({ response });
//     console.log(response.data.token);
//     const tokenId = response.data.token;
//     // staus 1=> queue 2=> processing 3=> accepted
//     let statusCode = 2;
//     while (statusCode === 2 || statusCode === 1) {
//       let result = await fetchData1(tokenId);
//       console.log(result);
//       statusCode = result.status; //
//       console.log(result.status); //{ id: message:""}

//       if (statusCode === 3) {
//         // ✅ Execution completed
//         const output = Buffer.from(result.stdout, "base64").toString();
//         console.log("✅ Output:\n", output);
//         break;
//       }
//       console.log("⏳ Still Processing...");
//       await new Promise((r) => setTimeout(r, 1000));
//     }
//   } catch (error) {
//     console.error({ error });
//   }
// }

// fetchData();

// async function fetchData1(tokenId) {
//   const options1 = {
//     method: "GET",
//     url: `https://judge0-ce.p.rapidapi.com/submissions/${tokenId}`,
//     params: {
//       base64_encoded: "true",
//       fields: "*",
//     },
//     headers: {
//       "x-rapidapi-key": process.env.RAPIDAPI_KEY,
//       "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
//     },
//   };
//   try {
//     const response = await axios.request(options1);
//     console.log(response.data);
//     console.log(response);
//     return response.data;
//   } catch (error) {
//     console.error(error);
//   }
// }
// fetchData1("8ca42db8-f4bc-403c-a2fa-846363d22650");


// async function fetchData() {
//   try {
//     const response = await axios.request(options);
//     const tokenId = response.data.token;
//     console.log("🆗 Submitted. Token:", tokenId);

//     let statusCode = 1;

//     while (statusCode === 1 || statusCode === 2) {
//       console.log("⏳ Still processing...");
//       await new Promise((res) => setTimeout(res, 2000)); // <-- Important delay

//       const result = await fetchData1(tokenId);
//       statusCode = result.status.id;

//       if (statusCode === 3) {
//         const output = Buffer.from(result.stdout || "", "base64").toString();
//         console.log("✅ Output:\n" + output);
//         break;
//       } else if (statusCode >= 6) {
//         const err = Buffer.from(result.stderr || result.compile_output || "", "base64").toString();
//         console.error("❌ Error:\n" + err);
//         break;
//       }
//     }
//   } catch (error) {
//     console.error("❌ Submission error:", error.response?.data || error.message);
//   }
// }

async function fetchData1(tokenId) {
  const options1 = {
    method: 'GET',
    url: `https://judge0-ce.p.rapidapi.com/submissions/${tokenId}`,
    params: {
      base64_encoded: 'true',
      fields: '*'
    },
    headers: {
      'x-rapidapi-key': process.env.RAPIDAPI_KEY,
      'x-rapidapi-host': 'judge0-ce.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options1);
    return response.data;
  } catch (error) {
    console.error("❌ Polling error:", error.response?.data || error.message);
    return {};
  }
}

// fetchData();

app.post("/run", async(req, res) => {
  const { code, language,stdin = "" } = req.body;

  const encodedCode = Buffer.from(code).toString("base64");
  const encodedInput = Buffer.from(stdin).toString("base64")
  const language_id = languageId[language];
  if (!language_id) {
    return res.status(400).json({ error: "Unsupported language" });
  }

  try {
    const submissionRes = await axios.post("https://judge0-ce.p.rapidapi.com/submissions",{
      language_id:language_id,
      source_code:encodedCode,
      stdin:encodedInput,
    },{
      headers:{
        "x-rapidapi-key": process.env.RAPIDAPI_KEY,
          "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
          "Content-Type": "application/json",
      },
      params:{
        base64_encoded:true,
        wait:false,
        fields:"*",
      }
    }) 

    const tokenId = submissionRes.data.token;
    let statusCode = 1;
    let result =null;
    const maxtries=10;
    let tries=0;
    while ((statusCode === 1 || statusCode === 2) && tries < maxtries) {
      await new Promise((res) => setTimeout(res,1500));
      result = await fetchData1(tokenId)
      statusCode = result?.status?.id || 0;
      tries++;
    }

    // Decode Output or error
    let output = ""
    if (statusCode === 3) {
      output = Buffer.from(result.stdout || "","base64").toString()
    } else {
      output = Buffer.from(result.stderr || result.compile_output || "Unkown Error", "base64").toString();
    }
    res.json({output})
  } catch (error) {
    console.error("Run error:", error.response?.data || error.message);
    res.status(500).json({ error: "Code execution failed" });
  }

});

app.get("/", (req, res) => {
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

Return ONLY the executable ${language} code without any explanation and markdown formatting. No explanations or comments. Try not to use unnecessary additional code or try-catch and something that not given by useer pseudocode.Only send the actual code without the backticks

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
