const STOP = 'STOP';
const ADD = 'ADD';
const SUB = 'SUB';
const MUL = 'MUL';
const DIV = 'DIV';
const PUSH = 'PUSH';

class Interpreter {
  constructor() {
    this.state = {
      programCounter: 0,
      stack: [],
      code: []
    };
  }

  runCode(code) {
    this.state.code = code;

    while (this.state.programCounter < this.state.code.length) {
      const opCode = this.state.code[this.state.programCounter];

      try {
        switch (opCode) {
          case STOP:
            throw new Error('Execution complete');
          case PUSH:
            this.state.programCounter++;
            const value = this.state.code[this.state.programCounter];
            this.state.stack.push(value);
            break;
          case ADD:
          case SUB:
          case MUL:
          case DIV:
            const a = this.state.stack.pop();
            const b = this.state.stack.pop();

            let result = (opCode === ADD) ? a + b :
                         (opCode === SUB) ? a - b :
                         (opCode === MUL) ? a * b :
                         (opCode === DIV) ? a / b : null

            this.state.stack.push(result);
            break;
          default:
            break;
        }
      } catch (error) {
        return this.state.stack[this.state.stack.length-1];
      }

      this.state.programCounter++;
    }
  }
}

let code = [PUSH, 2, PUSH, 3, ADD, STOP];
let result = new Interpreter().runCode(code);
console.log(result);

code = [PUSH, 15, PUSH, 7, SUB, STOP];
result = new Interpreter().runCode(code);
console.log(result);

code = [PUSH, 8, PUSH, 4, MUL, STOP];
result = new Interpreter().runCode(code);
console.log(result);

code = [PUSH, 80, PUSH, 4, DIV, STOP];
result = new Interpreter().runCode(code);
console.log(result);