export const codes = [
  `console.log("Hello, World!");
`,

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

  `const fruits = ['apple', 'banana', 'cherry'];
fruits.forEach(fruit => {
  console.log(fruit);
});
`,

  `const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' }
];
const user = users.find(user => user.id === 2);
console.log(user.name); // "Bob"
`,

  `class Counter {
  constructor() {
    this.count = 0;
  }
  increment() {
    this.count += 1;
    console.log(this.count);
  }
}
const counter = new Counter();
counter.increment(); // 1
counter.increment(); // 2
`,

  `console.log('Start');
setTimeout(() => {
  console.log('This runs after 2 seconds');
}, 2000);
console.log('End');
`,

  `const first = [1, 2, 3];
const second = [4, 5, 6];
const combined = [...first, ...second];
console.log(combined);
`,

  `const person = {
  name: 'Dave',
  age: 34
};
const { name, age } = person;
console.log(name); // "Dave"
console.log(age); // 34
`,

  `const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
console.log(sum); // 15
`,

  `const greeting = \`Hello,
This is a multi-line string!
Goodbye!\`;
console.log(greeting);
`,

  `const key = "color";
const value = "blue";
const dynamicObject = {
  [key]: value
};
console.log(dynamicObject.color); // "blue"
`,

  `function doubleAfter2Seconds(x) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(x * 2);
    }, 2000);
  });
}

doubleAfter2Seconds(10).then((result) => {
  console.log(result);  // 20
  return doubleAfter2Seconds(20);
}).then((result) => {
  console.log(result);  // 40
  return doubleAfter2Seconds(30);
}).then(result => {
  console.log(result);  // 60
});
`,

  `const str = 'hello';
const letters = Array.from(str);
console.log(letters); // ['h', 'e', 'l', 'l', 'o']
`,

  `const fruits = new Map([
  ['apples', 5],
  ['bananas', 10],
  ['oranges', 3]
]);

fruits.set('cherries', 7);
console.log(fruits.get('bananas')); // 10
`,

  `const numbers = new Set([1, 2, 3, 4, 4, 2]);
console.log(numbers); // Set {1, 2, 3, 4}
`,

  `const [first, second, , fourth] = [1, 2, 3, 4];
console.log(first); // 1
console.log(second); // 2
console.log(fourth); // 4
`,

  `fetch('https://api.example.com/data')
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
`,

  `const add = (a, b) => a + b;
console.log(add(5, 3)); // 8
`,

  `async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
}

fetchData();
`,

  `const name = 'Alice';
const age = 25;

const person = { name, age };
console.log(person); // { name: 'Alice', age: 25 }
`,

  `const person = { name: 'Bob', age: 30, city: 'New York' };
for (const key in person) {
  console.log(\`\${key}: \${person[key]}\`);
}
`,

  `const colors = ['red', 'green', 'blue'];
for (const color of colors) {
  console.log(color);
}
`,
];

interface FetchOptions {
  offset?: number;
  limit?: number;
}

export const fetchCodes = async ({
  offset,
  limit,
}: FetchOptions | undefined = {}) => {
  return codes.slice(offset ?? 0, limit ? (offset ?? 0) + limit : undefined);
};
