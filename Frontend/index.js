const code = `
  function add(a, b) {
    console.log('Adding numbers:', a, b);
    return a + b;
  }
  
  const result = add(2, 3);
  console.log(result);
`;

function executeCode(code) {
  let output = "";

  // Override console.log to capture output
  const originalConsoleLog = console.log;
  console.log = function (...args) {
    output += args.join(" ") + "\n";
  };

  // Execute user code
  try {
    eval(code);
  } catch (error) {
    output += error.toString() + "\n";
  }

  console.log = originalConsoleLog; // Restore original console.log

  return output;
}

const result = executeCode(code);
console.log(result);

// function executeCode(code) {
//   let output = "";

//   // Override console.log to capture output
//   const originalConsoleLog = console.log;
//   console.log = function (...args) {
//     output += args.join(" ") + "\n";
//   };

//   // Execute user code
//   try {
//     eval(code);
//   } catch (error) {
//     output += error.toString() + "\n";
//   }

//   console.log = originalConsoleLog; // Restore original console.log

//   return output;
// }

// const handleExecute = () => {
//   const result = executeCode(code);
//   setOutput(result);
// };
