# ⚙️ PseudoCode2Code


<img width="1342" height="455" alt="Image" src="https://github.com/user-attachments/assets/a79259ef-8b8a-4602-a8a2-2276fa5d0ac7" />

Convert your pseudocode into real, executable code — effortlessly.  
Supports multiple programming languages, optional AI-powered translation, and live code execution using the Judge0 API.

---

## 🚀 How to Use

### 🌐 1. Visit the Platform

- Open the app in your browser.
- Paste your **pseudocode** in the editor.
- Select your **target programming language** (e.g., Python, JavaScript, Java, etc.)

### ✍️ 2. Write or Paste Pseudocode

Use keywords like:
```text
START
INPUT n
IF n > 0 THEN
    PRINT "Positive"
ELSE
    PRINT "Non-positive"
END IF
END
```

### 🔁 3. Click “Convert”
Instantly generates equivalent real code in the chosen language.

Optionally, use the AI Assist toggle to get smarter translations (if GPT integration is enabled).

### ▶️ 4. Run the Code
Add optional standard input (stdin) if needed.

Hit "Run", and view output or errors live via Judge0 API.

Output is styled with success/error indicators.

### 💾 5. Copy or Save
Copy output code to clipboard.

Save code or pseudocode for future use (Pro version – coming soon!).







## 📚 Documentation

> This section provides a technical overview of PseudoCode2Code’s architecture, features, and developer setup.

![Screenshot 2025-07-09 165955](https://github.com/user-attachments/assets/9c54fb0f-f5a0-4918-ba06-86dcc8389514)

---

### 🧩 Overview

**PseudoCode2Code** is a full-stack platform that:
- Converts user-friendly **pseudocode** into real, runnable code.
- Supports **multi-language code generation** (rule-based + AI-assisted).
- Runs and evaluates the output using **Judge0’s code execution API**.
- Designed to reduce syntax barriers and help beginners focus on logic.

---

| Pseudocode                  | Output (Python)                        |
| --------------------------- | -------------------------------------- |
| `INPUT a` <br> `PRINT a+5`  | `a = int(input())` <br> `print(a + 5)` |
| `IF x > 10 THEN PRINT "OK"` | `if x > 10:\n    print("OK")`          |


### 🔗 Features

| Feature | Description |
|--------|-------------|
| 🧠 Pseudocode Parsing | Converts structured pseudocode into selected programming language |
| 🧪 Code Execution | Runs generated code and captures output/errors |
| 🌍 Language Selection | Supports Python, JavaScript, Java, C++, C#, Go, etc. |
| 🔁 Input Support | Allows user-provided standard input (stdin) |
| 🎨 Themed UI | React + Tailwind UI with light/dark modes |
| 🔍 AI Assist (optional) | Uses GPT API to enhance code suggestions |
| 🗃 Local Storage | Remembers user preferences and last input |
| 🚀 Instant Preview | Live output, error handling, and feedback |
| 🔒 Secure | Input/output sandboxed through Judge0 |

---

### 🧑‍💻 Developer Stack

| Layer | Tech |
|-------|------|
| Frontend | React.js, TailwindCSS, React Router, Clerk |
| Backend | Node.js  |
| Execution API | [Judge0](https://judge0.com) |
| LLM Model |GeminiAPI  (gemini-2.0-flash)  (Currently)|
| Optional AI | OpenAI GPT-4 / GPT-3.5  (soon)|
| Hosting (planned) | Vercel (frontend), Render (backend) |

---

### ⚙️ Pseudocode Syntax Guide

Use clean, consistent structures with keywords like:


#### ✅ Supported Keywords:
- `START`, `END`
- `INPUT`, `OUTPUT`, `PRINT`
- `SET`, `=`, `+`, `-`, etc.
- `IF`, `ELSE`, `ENDIF`
- `FOR`, `WHILE`, `LOOP`, `BREAK`

#### ❌ Unsupported (for now):
- Non-standard math symbols
- GOTO-style logic
- Complex nested structures without indentation

> Tip: Use **indentation and clear structure** for best results, especially without AI assist.

---

### 📥 Judge0 API Integration

- Converts code into Base64
- Sends it to Judge0 via `POST /submissions`
- Polls submission result via `GET /submissions/{token}`
- Displays:
  - ✅ Standard Output (green)
  - ❌ Errors (red)
  - ⏱ Execution Time

---

### 📁 Project Structure

```
pseudocode2code/
│
├── frontend/        # React App
│   ├── App.jsx
│   ├── components/
│   └── ...
│
├── backend/         # Node.js 
│   ├── index.js 
│   
└── README.md
```


---

### 🛠 Setup Instructions

#### Frontend:
```bash
cd frontend
npm install
npm run dev
```
#### Backend:
```
cd backend
npm install   
npm run start
```


#### 💻 Supported Languages
Languages tested with conversion + execution:

 Python

 JavaScript

 C++

 Java

 Rust

 Go

![Screenshot 2025-07-09 170029](https://github.com/user-attachments/assets/27ff6a1f-67f6-4910-805e-c5c82ba039c7)


---

## 📃 License

This project is licensed under the **MIT License**.

> Permission is hereby granted, free of charge, to any person obtaining a copy  
> of this software and associated documentation files (the "Software"), to deal  
> in the Software without restriction, including without limitation the rights  
> to use, copy, modify, merge, publish, distribute, sublicense, and/or sell  
> copies of the Software, and to permit persons to whom the Software is  
> furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all  
copies or substantial portions of the Software.

**THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND**, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and noninfringement. In no event shall the authors or copyright holders be liable for any claim, damages or other liability.

---

## 🔗 Quick Access

- 🚀 [How to Use](#-how-to-use)
- 📚 [Documentation](#-documentation)
- 🧪 [Judge0 API](https://docs.judge0.com)
- 🤖 [Gemini API (Google AI)](https://ai.google.dev/)
- 🛠 [Live Demo](https://pseudo-code2-code-qx5x-k3dxqx6q3-riteshs-projects-a4505b82.vercel.app/)
- 🧑‍💻 [Contribute](https://github.com/your-username/pseudocode2code/blob/main/CONTRIBUTING.md)
- ⭐ [Star This Project](https://github.com/your-username/pseudocode2code)


#### 📦 Future Roadmap
 🔺Export converted code as .zip or .txt

 🔺Auth (save history, settings)

 🔺VS Code Extension
