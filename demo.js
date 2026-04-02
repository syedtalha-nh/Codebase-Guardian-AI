// Codebase Guardian AI Demo

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
    console.log("\n😤 Codebase Guardian AI Review:\n");

    if (code.includes("if(") && code.includes("=") && !code.includes("==")) {
        console.log("❌ Issue: You're using assignment (=) instead of comparison (== or ===). Classic bug.");
    }

    if (code.includes("<=arr.length")) {
        console.log("❌ Issue: Array index out of bounds. You're going one step too far.");
    }

    if (code.includes("toUpperCase") && code.includes("undefined")) {
        console.log("❌ Issue: You're calling a method on something that might be undefined.");
    }

    if (code.includes("add(2)")) {
        console.log("❌ Issue: Missing parameter. Function expects 2 arguments.");
    }

    console.log("\n💡 Suggestions:");
    console.log("- Always validate inputs");
    console.log("- Use strict equality (===)");
    console.log("- Follow clean coding practices");

    console.log("\n📚 Explanation:");
    console.log("This code has logical issues that could break execution. A good developer writes defensive and predictable code.");

    console.log("\n✨ Improved Version:\n");

    console.log(`// Example Fix
if (x === 5) {
    console.log("correct");
}`);
}

const code = getRandomCode();

console.log("\n📄 Random Code Given:\n");
console.log(code);

reviewCode(code);