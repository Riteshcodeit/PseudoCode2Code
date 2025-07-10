// import { useState } from "react";
// import Button from "./Button";
// import Editor from "@monaco-editor/react";
// import axios from "axios";
// import { useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// const CodeSandBox = () => {
//   const [editorCode, setEditorCode] = useState("");
//   const [pseudocode, setPseudocode] = useState("");
//   const [language, setLanguage] = useState("");
//   const [generatedCode, setGeneratedCode] = useState("");
//   const [copied, setCopied] = useState(false); // ✅ New state to track copy status
//   const [loading, setLoading] = useState(false);
//   const [input, setInput] = useState(""); //from stdin
//   const [output, setOutput] = useState("");
//   const [runloading, setRunLoading] = useState(false); //loading while running
//   const [outputType, setOutputType] = useState("success");
//   const [showInputBox, setShowInputBox] = useState(false);
//   const [showOutputBox, setShowOutputBox] = useState(false);
//   const outputRef = useRef(null);

//   const handleCopy = () => {
//     if (!generatedCode) return;

//     navigator.clipboard.writeText(generatedCode).then(() => {
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000); // reset after 2s
//     });
//   };

//   const handleConvert = async () => {
//     if (!pseudocode || !language) {
//       alert("Please enter pseudocode and select a language.");
//       return;
//     }

//     setLoading(true); // ✅ Set loading state

//     try {
//       // ✅ Fixed: Use port 5000 (your server port), not 3000
//       const res = await fetch("http://localhost:3000/convert", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ pseudocode, language }),
//       });

//       if (!res.ok) {
//         throw new Error(`HTTP error! status: ${res.status}`);
//       }

//       const data = await res.json();
//       // Safely strip only wrapping backticks if present
//       const cleanCode = data.code
//         .replace(/^```[a-zA-Z]*\n/, "")
//         .replace(/```$/, "");

//       setGeneratedCode(cleanCode);
//       setEditorCode(cleanCode);
//     } catch (error) {
//       alert("Conversion failed. Check server logs.");
//       console.error(error);
//     } finally {
//       setLoading(false); // ✅ Reset loading state
//     }
//   };

//   const codeNeedsInput = () => {
//     const lowerCode = generatedCode.toLowerCase();

//     if (language === "Python") return lowerCode.includes("input(");
//     if (language === "JavaScript") return lowerCode.includes("prompt(");
//     if (language === "Java") return lowerCode.includes("scanner");
//     if (language === "C++") return lowerCode.includes("cin");
//     if (language === "Go") return lowerCode.includes("fmt.scan");
//     if (language === "Rust") return lowerCode.includes("read_line");

//     return false;
//   };
//   const handleRun = async () => {
//     if (!editorCode || !language) {
//       alert("Please convert pseudocode to code and select a language first.");
//       return;
//     }

//     // 👇 Only show input if the code needs it
//     if (codeNeedsInput()) {
//       setShowInputBox(true);
//       if (input.trim() === "") {
//         alert("This code requires input. Please enter input first.");
//         return;
//       }
//     } else {
//       setShowInputBox(false);
//     }

//     setRunLoading(true);
//     setOutput("");
//     setShowOutputBox(false);
//     if (outputRef.current) {
//       outputRef.current.scrollIntoView({ behavior: "smooth" });
//     }

//     try {
//       const res = await axios.post("http://localhost:3000/run", {
//         code: editorCode,
//         language,
//         stdin: input,
//       });

//       const outputText = res.data.output || "No Output Received";

//       if (/error|exception|illegal|not found|undefined/i.test(outputText)) {
//         setOutputType("error");
//       } else {
//         setOutputType("success");
//       }

//       setOutput(outputText);
//     } catch (error) {
//       const message =
//         error.response?.data?.error || error.message || "Execution Failed";
//       setOutput("❌ Error: " + message);
//       setOutputType("error");
//     } finally {
//       setRunLoading(false);
//       setShowOutputBox(true);
//       if (outputRef.current) {
//         outputRef.current.scrollIntoView({ behavior: "smooth" });
//       }
//     }
//   };

//   const getmonnacolang = (lang) => {
//     switch (lang.toLowerCase()) {
//       case "javascript":
//         return "javascript";
//       case "python":
//         return "python";
//       case "java":
//         return "java";
//       case "c++":
//         return "cpp";
//       case "rust":
//         return "rust";
//       case "go":
//         return "go";
//       default:
//         return "plaintext";
//     }
//   };

//   return (
//     <div className="min-h-[80vh] p-6 text-white bg-[#0f0a1b]">
//       {/* ...other elements */}
//       <div className="grid md:grid-cols-2 gap-6">
//         {/* Left: pseudocode input */}
//         <div>
//           <textarea
//             value={pseudocode}
//             onChange={(e) => setPseudocode(e.target.value)}
//             className="bg-[#1c1530] p-4 w-full  rounded-lg border border-gray-700 resize-none min-h-[30rem]"
//             placeholder="Enter Pseudocode"
//           />

//           <Button onClick={handleConvert} disabled={loading}>
//             {loading ? "Converting..." : "Convert"}
//           </Button>
//         </div>

//         {/* Right: language selector and output */}
//         <div className="flex flex-col gap-4">
//           <select
//             value={language}
//             onChange={(e) => setLanguage(e.target.value)}
//             className="bg-[#1c1530] p-3 rounded-lg border border-gray-700 text-white"
//           >
//             <option value="">Select Language</option>
//             <option value="Python">Python</option>
//             <option value="JavaScript">JavaScript</option>
//             <option value="Java">Java</option>
//             <option value="C++">C++</option>
//             <option value="Rust">Rust</option>
//             <option value="Go">Go</option>
//           </select>
//           <AnimatePresence>
//             {showInputBox && (
//               <motion.textarea
//                 initial={{ opacity: 0, y: -10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -10 }}
//                 transition={{ duration: 0.3 }}
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 className="bg-[#1c1530] p-3 w-full rounded-lg border border-gray-700 resize-none min-h-[6rem] text-white"
//                 placeholder="Enter input for your code (stdin)"
//               />
//             )}
//           </AnimatePresence>
//           <div className="rounded ">
//             <AnimatePresence>
//               {generatedCode && (
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: 20 }}
//                   transition={{ duration: 0.4 }}
//                 >
//                   <Editor
//                     height="400px"
//                     language={getmonnacolang(language)}
//                     value={editorCode}
//                     onChange={(value) => setEditorCode(value)}
//                     theme="vs-dark"
//                     options={{
//                       readOnly: false,
//                       minimap: { enabled: false },
//                       fontSize: 14,
//                       wordWrap: "on",
//                       scrollBeyondLastLine: false,
//                     }}
//                   />
//                 </motion.div>
//               )}
//             </AnimatePresence>

//             <AnimatePresence>
//               {showOutputBox && output && (
//                 <motion.div
//                   ref={outputRef}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: 20 }}
//                   transition={{ duration: 0.4 }}
//                   className={`mt-4 p-4 rounded-lg border ${
//                     outputType === "success"
//                       ? "border-green-600 text-green-400"
//                       : "border-red-600 text-red-400"
//                   } bg-[#1c1530]`}
//                 >
//                   <h2 className="text-lg font-semibold mb-2">▶ Output:</h2>
//                   <pre className="whitespace-pre-wrap">{output}</pre>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//             <AnimatePresence>
//               {outputType === "success" && showOutputBox && (
//                 <motion.div
//                   initial={{ opacity: 0, scale: 0.5 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   exit={{ opacity: 0, scale: 0.5 }}
//                   transition={{ duration: 0.4 }}
//                   className="text-green-400 text-xl font-bold mt-2 flex items-center gap-2"
//                 >
//                   <span>✅ Code executed successfully!</span>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>
//           {/* Copy & Download Buttons */}
//           <div className="flex gap-4">
//             <button
//               onClick={handleCopy}
//               className="bg-purple-600 px-4 py-2 rounded text-white hover:bg-purple-700"
//             >
//               {copied ? "Copied!" : "Copy"}
//             </button>
//             <Button onClick={handleRun} disabled={runloading}>
//               {runloading ? "Running...." : " ▶️Run"}
//             </Button>
//             <Button
//               onClick={() => {
//                 setPseudocode("");
//                 setLanguage("");
//                 setGeneratedCode("");
//                 setInput("");
//                 setOutput("");
//                 setShowInputBox(false);
//                 setShowOutputBox(false);
//                 setCopied(false);
//               }}
//               className=" text-white"
//             >
//               🔄 Reset All
//             </Button>
//           </div>
//         </div>
//       </div>
//       {/* ...other elements */}
//     </div>
//   );
// };

// export default CodeSandBox;












// ----------------------------------------------------------------------------------------------------------------------------

import { useState, useRef } from "react";
import Button from "./Button";
import Editor from "@monaco-editor/react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { validateCode, fixJava, wrapGo } from "./LanguageValidator";

const CodeSandBox = () => {
  const [pseudocode, setPseudocode] = useState("");
  const [language, setLanguage] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [editorCode, setEditorCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [runloading, setRunLoading] = useState(false);
  const [outputType, setOutputType] = useState("success");
  const [showInputBox, setShowInputBox] = useState(false);
  const [showOutputBox, setShowOutputBox] = useState(false);
  const [autoFix, setAutoFix] = useState({ Java: true, Go: true, Rust: false });

  const outputRef = useRef(null);

  const handleConvert = async () => {
    if (!pseudocode || !language) {
      alert("Please enter pseudocode and select a language.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/convert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pseudocode, language }),
      });

      const data = await res.json();
      const cleanCode = data.code
        .replace(/^```[a-zA-Z]*\n/, "")
        .replace(/```$/, "");
      setGeneratedCode(cleanCode);
      setEditorCode(cleanCode);
    } catch (error) {
      alert("Conversion failed. Check server logs.");
    } finally {
      setLoading(false);
    }
  };

  const codeNeedsInput = () => {
    const lowerCode = editorCode.toLowerCase();
    if (language === "Python") return lowerCode.includes("input(");
    if (language === "JavaScript") return lowerCode.includes("prompt(");
    if (language === "Java") return lowerCode.includes("scanner");
    if (language === "C++") return lowerCode.includes("cin");
    if (language === "Go") return lowerCode.includes("fmt.scan");
    if (language === "Rust") return lowerCode.includes("read_line");
    return false;
  };

  const handleRun = async () => {
    if (!editorCode || !language) {
      alert("Please enter code or convert from pseudocode first.");
      return;
    }

    let finalCode = editorCode;
    const warning = validateCode(language, editorCode);

    if (warning) {
      if (language === "Java" && autoFix.Java) {
        finalCode = fixJava(editorCode);
      } else if (language === "Go" && autoFix.Go) {
        finalCode = wrapGo(editorCode);
      } else {
        alert(warning);
        return;
      }
    }

    if (codeNeedsInput()) {
      setShowInputBox(true);
      if (!input.trim()) {
        alert("This code requires input. Please provide input first.");
        return;
      }
    } else {
      setShowInputBox(false);
    }

    setRunLoading(true);
    setOutput("");
    setShowOutputBox(false);

    try {
      const res = await axios.post("http://localhost:3000/run", {
        code: finalCode,
        language,
        stdin: input,
      });

      const result = res.data.output || "No Output Received";
      setOutput(result);
      setOutputType(
        /error|exception|illegal|undefined/i.test(result) ? "error" : "success"
      );
    } catch (err) {
      setOutput("❌ Error: " + err.message);
      setOutputType("error");
    } finally {
      setRunLoading(false);
      setShowOutputBox(true);
      outputRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getMonacoLang = (lang) => {
    switch (lang.toLowerCase()) {
      case "javascript":
        return "javascript";
      case "python":
        return "python";
      case "java":
        return "java";
      case "c++":
        return "cpp";
      case "rust":
        return "rust";
      case "go":
        return "go";
      default:
        return "plaintext";
    }
  };

  return (
    <div className="min-h-[80vh] p-6 text-white bg-[#0f0a1b]">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <textarea
            value={pseudocode}
            onChange={(e) => setPseudocode(e.target.value)}
            className="bg-[#1c1530] p-4 w-full rounded-lg border border-gray-700 resize-none min-h-[30rem]"
            placeholder="Enter Pseudocode"
          />
          <Button onClick={handleConvert} disabled={loading}>
            {loading ? "Converting..." : "Convert"}
          </Button>
        </div>

        <div className="flex flex-col gap-4">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-[#1c1530] p-3 rounded-lg border border-gray-700 text-white"
          >
            <option value="">Select Language</option>
            <option value="Python">Python</option>
            <option value="JavaScript">JavaScript</option>
            <option value="Java">Java</option>
            <option value="C++">C++</option>
            <option value="Rust">Rust</option>
            <option value="Go">Go</option>
          </select>

          {["Java", "Go"].includes(language) && (
            <label className="text-sm text-gray-300 flex items-center gap-2">
              <input
                type="checkbox"
                checked={autoFix[language]}
                onChange={(e) =>
                  setAutoFix((prev) => ({
                    ...prev,
                    [language]: e.target.checked,
                  }))
                }
              />
              Auto-fix common {language} issues
            </label>
          )}

          <AnimatePresence>
            {showInputBox && (
              <motion.textarea
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="bg-[#1c1530] p-3 w-full rounded-lg border border-gray-700 resize-none min-h-[6rem] text-white"
                placeholder="Enter input for your code (stdin)"
              />
            )}
          </AnimatePresence>

          <Editor
            height="400px"
            language={getMonacoLang(language)}
            value={editorCode}
            onChange={(val) => setEditorCode(val)}
            theme="vs-dark"
            options={{
              readOnly: false,
              minimap: { enabled: false },
              fontSize: 14,
              wordWrap: "on",
              scrollBeyondLastLine: false,
            }}
          />

          <AnimatePresence>
            {showOutputBox && output && (
              <motion.div
                ref={outputRef}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4 }}
                className={`mt-4 p-4 rounded-lg border ${
                  outputType === "success"
                    ? "border-green-600 text-green-400"
                    : "border-red-600 text-red-400"
                } bg-[#1c1530]`}
              >
                <h2 className="text-lg font-semibold mb-2">▶ Output:</h2>
                <pre className="whitespace-pre-wrap">{output}</pre>
              </motion.div>
            )}
          </AnimatePresence>

          {outputType === "success" && showOutputBox && (
            <div className="text-green-400 text-xl font-bold mt-2">
              ✅ Code executed successfully!
            </div>
          )}

          <div className="flex gap-4">
            <button
              onClick={() => {
                if (!editorCode) return;
                navigator.clipboard.writeText(editorCode);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="bg-purple-600 px-4 py-2 rounded text-white hover:bg-purple-700"
            >
              {copied ? "Copied!" : "Copy"}
            </button>

            <Button onClick={handleRun} disabled={runloading}>
              {runloading ? "Running..." : "▶️ Run"}
            </Button>

            <Button
              onClick={() => {
                setPseudocode("");
                setLanguage("");
                setGeneratedCode("");
                setEditorCode("");
                setInput("");
                setOutput("");
                setShowInputBox(false);
                setShowOutputBox(false);
                setCopied(false);
              }}
              className="text-white"
            >
              🔄 Reset All
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeSandBox;
