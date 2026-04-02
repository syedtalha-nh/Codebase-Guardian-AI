const readline = require("readline");
const chalk = require("chalk");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

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
}`,

`const user = {}
console.log(user.name.toUpperCase())`
];

function getRandomCode() {
    return samples[Math.floor(Math.random() * samples.length)];
}

function reviewCode(code) {
    console.log(chalk.red("\n😤 Codebase Guardian AI Review:\n"));

    if (code.includes("if(") && code.includes("=") && !code.includes("==")) {
        console.log(chalk.red("❌ Issue: Assignment (=) used instead of comparison (== or ===)"));
    }

    if (code.includes("<=arr.length")) {
        console.log(chalk.red("❌ Issue: Array index out of bounds"));
    }

    if (code.includes("add(2)")) {
        console.log(chalk.red("❌ Issue: Missing function argument"));
    }

    if (code.includes("user.name")) {
        console.log(chalk.red("❌ Issue: Possible undefined access (user.name)"));
    }

    console.log(chalk.yellow("\n💡 Suggestions:"));
    console.log("- Use === instead of =");
    console.log("- Validate inputs");
    console.log("- Avoid out-of-bound loops");

    console.log(chalk.blue("\n📚 Explanation:"));
    console.log("This code contains common mistakes that can break real-world applications.");

    console.log(chalk.green("\n✨ Improved Example:\n"));
    console.log(`if (x === 5) {
    console.log("correct");
}`);
}

function start() {
    console.log(chalk.cyan("\n=== Codebase Guardian AI 😤 ==="));
    console.log("1. Paste your code");
    console.log("2. Run random demo\n");

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
            const code = getRandomCode();

            console.log(chalk.magenta("\n📄 Random Code:\n"));
            console.log(code);

            reviewCode(code);
            rl.close();

        } else {
            console.log("Invalid choice");
            rl.close();
        }
    });
}

start();