import { useState } from "react";
import Button from "./Button";
import Editor from "@monaco-editor/react";

const CodeSandBox = () => {
  const [pseudocode, setPseudocode] = useState("");
  const [language, setLanguage] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [copied, setCopied] = useState(false); // ✅ New state to track copy status
  const [loading, setLoading] = useState(false);

  const handleCopy = () => {
    if (!generatedCode) return;

    navigator.clipboard.writeText(generatedCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // reset after 2s
    });
  };

  const handleConvert = async () => {
    if (!pseudocode || !language) {
      alert("Please enter pseudocode and select a language.");
      return;
    }

    setLoading(true); // ✅ Set loading state

    try {
      // ✅ Fixed: Use port 5000 (your server port), not 3000
      const res = await fetch("http://localhost:3000/convert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pseudocode, language }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setGeneratedCode(data.code);
    } catch (error) {
      alert("Conversion failed. Check server logs.");
      console.error(error);
    } finally {
      setLoading(false); // ✅ Reset loading state
    }
  };

  const getmonnacolang =(lang) =>{
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
  }

  return (
    <div className="min-h-[80vh] p-6 text-white bg-[#0f0a1b]">
      {/* ...other elements */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Left: pseudocode input */}
        <div>
          <textarea
            value={pseudocode}
            onChange={(e) => setPseudocode(e.target.value)}
            className="bg-[#1c1530] p-4 w-full  rounded-lg border border-gray-700 resize-none min-h-[30rem]"
            placeholder="Enter Pseudocode"
          />

          <Button onClick={handleConvert} disabled={loading}>
            {loading ? "Converting..." : "Convert"}
          </Button>
        </div>

        {/* Right: language selector and output */}
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
          {/* <textarea
            value={generatedCode}
            onChange={(e) => setGeneratedCode(e.target.value)}
            className="bg-[#1c1530] p-4 w-full h-40 rounded-lg border border-gray-700 resize-none min-h-[23rem]"
            placeholder="Generated Code"
          /> */}
          <div className="rounded-lg border border-gray-700 overflow-hidden shadow-md">
          <Editor
            height="400px"
            language={getmonnacolang(language)}
            value={generatedCode}
            theme="vs-dark"
            options={{ readOnly: true, minimap: { enabled: false } ,fontSize: 14,
          wordWrap: "on",
          scrollBeyondLastLine: false,}}
          />
          </div>
          {/* Copy & Download Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleCopy}
              className="bg-purple-600 px-4 py-2 rounded text-white hover:bg-purple-700"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
            <Button> ▶️Run</Button>
          </div>
        </div>
      </div>
      {/* ...other elements */}
    </div>
  );
};

export default CodeSandBox;
