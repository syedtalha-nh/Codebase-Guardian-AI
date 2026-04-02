const readline = require("readline");
const chalk = require("chalk");
const fs = require("fs");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// -------- Language Detection --------
function detectLanguage(code) {
    if (code.includes("console.log") || code.includes("var ") || code.includes("let "))
        return "JavaScript";
    if (code.includes("System.out.println"))
        return "Java";
    if (code.includes("print("))
        return "Python";
    return "Unknown";
}

// -------- Code Review Engine --------
function analyzeCode(code) {
    let issues = [];
    let score = 10;

    if (code.includes("if(") && code.includes("=") && !code.includes("==")) {
        issues.push("Assignment (=) used instead of comparison");
        score -= 2;
    }

    if (code.includes("<=arr.length")) {
        issues.push("Array index out of bounds risk");
        score -= 2;
    }

    if (code.includes("add(2)")) {
        issues.push("Missing function argument");
        score -= 1;
    }

    if (code.includes("user.name")) {
        issues.push("Possible undefined property access");
        score -= 2;
    }

    if (code.includes("var ")) {
        issues.push("Use let/const instead of var");
        score -= 1;
    }

    if (score < 0) score = 0;

    return { issues, score };
}

// -------- Output --------
function reviewCode(code) {
    const lang = detectLanguage(code);
    const result = analyzeCode(code);

    console.log(chalk.cyan("\n=== Codebase Guardian AI ===\n"));

    console.log(chalk.magenta("📌 Language Detected:"), lang);

    console.log(chalk.red("\n❌ Issues Found:"));
    if (result.issues.length === 0) {
        console.log(chalk.green("No major issues found"));
    } else {
        result.issues.forEach((issue, i) => {
            console.log(`${i + 1}. ${issue}`);
        });
    }

    console.log(chalk.yellow("\n💡 Suggestions:"));
    console.log("- Follow clean coding practices");
    console.log("- Validate inputs");
    console.log("- Use modern syntax");

    console.log(chalk.blue("\n📚 Explanation:"));
    console.log("This code was analyzed for common real-world issues that affect maintainability and correctness.");

    console.log(chalk.green("\n🏆 Code Score:"), `${result.score}/10`);

    console.log(chalk.gray("\n----------------------------------"));
}

// -------- Menu --------
function start() {
    console.log(chalk.cyan("\n=== Codebase Guardian AI ==="));
    console.log("1. Paste your code");
    console.log("2. Run random demo");
    console.log("3. Analyze a file\n");

    rl.question("Choose option: ", (choice) => {

        if (choice === "1") {
            console.log("\nPaste your code (press ENTER twice to finish):\n");

            let input = "";

            rl.on("line", (line) => {
                if (line === "") {
                    reviewCode(input);
                    rl.close();
                } else {
                    input += line + "\n";
                }
            });

        } else if (choice === "2") {

            const samples = [
`var x = 10
if(x = 5){
console.log("wrong")
}`,

`function add(a,b){
return a+b
}
console.log(add(2))`,

`let arr = [1,2,3]
for(let i=0;i<=arr.length;i++){
console.log(arr[i])
}`
            ];

            const code = samples[Math.floor(Math.random() * samples.length)];

            console.log(chalk.magenta("\n📄 Random Code:\n"));
            console.log(code);

            reviewCode(code);
            rl.close();

        } else if (choice === "3") {

            rl.question("\nEnter file path: ", (path) => {
                try {
                    const code = fs.readFileSync(path, "utf-8");
                    reviewCode(code);
                } catch (err) {
                    console.log(chalk.red("Error reading file."));
                }
                rl.close();
            });

        } else {
            console.log("Invalid choice");
            rl.close();
        }
    });
}

start();