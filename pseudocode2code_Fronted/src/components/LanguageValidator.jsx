// LanguageCodeValidator.jsx

export const validateCode = (language, code) => {
  const lowerCode = code.toLowerCase();

  switch (language) {
    case "Java": {
      const match = code.match(/public\s+class\s+(\w+)/);
      if (match && match[1] !== "Main") {
        return `⚠️ In Java, public class must be named 'Main' or not be public. Found: '${match[1]}'`;
      }
      break;
    }
    case "C++": {
      if (!lowerCode.includes("main()")) {
        return "⚠️ C++ code must include a 'main()' function.";
      }
      break;
    }
    case "Go": {
      if (!code.includes("package main") || !code.includes("func main()")) {
        return "⚠️ Go code must start with 'package main' and contain 'func main()'.";
      }
      break;
    }
    case "Rust": {
      if (!code.includes("fn main()")) {
        return "⚠️ Rust code must contain 'fn main()'.";
      }
      break;
    }
    case "Python": {
      if (!code.includes(":") && code.match(/\b(if|for|while|def|class)\b/)) {
        return "⚠️ Python may be missing required colons or correct indentation.";
      }
      break;
    }
    case "JavaScript": {
      if (lowerCode.includes("prompt(")) {
        return "⚠️ 'prompt()' is not supported in server-side environments like Judge0. Consider using 'readline' or provide input via stdin.";
      }
      break;
    }
    default:
      return null;
  }

  return null;
};

export const fixJava = (code) =>
  code.replace(/public\s+class\s+\w+/, "public class Main");

export const wrapGo = (code) => {
  if (!code.includes("package main")) {
    return `package main\n\nimport \"fmt\"\n\nfunc main() {\n${code}\n}`;
  }
  return code;
};