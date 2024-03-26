export const codes = [
  `console.log("Hello, World!");`,
  `let numbers = [1, 2, 3, 4, 5];
let sum = 0;
for (let number of numbers) {
  sum += number;
}
console.log(sum);
`,
  `function greet(name) {
  console.log("Hello, " + name + "!");
}
greet("Alice");
`,
  `let person = {
  name: "Bob",
  age: 30
};
console.log(person.name + " is " + person.age + " years old.");
`,
  `let score = 75;
if (score >= 70) {
  console.log("Passed");
} else {
  console.log("Failed");
}
`,
  `let numbers = [1, 2, 3, 4, 5];
let doubledNumbers = numbers.map(number => number * 2);
console.log(doubledNumbers);
`,
  `let people = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 28 }
];
let youngPeople = people.filter(person => person.age < 30);
console.log(youngPeople);
`,
  `let name = "Dave";
let greeting = \`Hello, \${name}! How are you?\`;
console.log(greeting);
`,
  `function asyncFunction() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Async Hello world");
    }, 1000);
  });
}
asyncFunction().then(console.log);
`,
  `class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  describe() {
    console.log(\`\${this.name} is \${this.age} years old.\`);
  }
}
const alice = new Person("Alice", 25);
alice.describe();
`,
];
