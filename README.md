# ⚙️ PseudoCode2Code

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
| Frontend | React.js, TailwindCSS, React Router |
| Backend | Node.js or Flask |
| Execution API | [Judge0](https://judge0.com) |
| Optional AI | OpenAI GPT-4 / GPT-3.5 |
| Hosting (planned) | Vercel (frontend), Render (backend) |

---

### ⚙️ Pseudocode Syntax Guide

Use clean, consistent structures with keywords like:


