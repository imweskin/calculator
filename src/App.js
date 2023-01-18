import './App.css';
import { useState } from 'react';

function App() {

    const [calc, setCalc] = useState("");
    const [result, setResult] = useState("");

    const operators = ['/', '*', '+', '-', '.'];

    const createDigits = () => {
        const digits = [];

        for(let i = 1; i < 10; i++) {
            digits.push(
                <button onClick={() => updateCalc(i.toString())} key={i}>{i}</button>
            );
        }

        return digits;
    };

    const updateCalc = (btnValue) => {
        if(
            (operators.includes(btnValue) && calc === '') || //if we start by an operator without having any value
            (operators.includes(btnValue) && operators.includes(calc.slice(-1))) //if last thing we typed is an operator and we wanna type an other operator
        ) {
            return;
        }

        setCalc((prevState) => prevState + btnValue);

        if(!operators.includes(btnValue)) { //if the last button is not an operator
            setResult(eval(calc + btnValue).toString());
        }
    };

    const calculate = () => {
        setCalc(eval(calc).toString());
    };

    const deleteLast = () => {
        if(calc === '') {
            return;
        }

        const newCalc = calc.slice(0, -1);

        setCalc(newCalc); 
    };

    const reset = () => {
        setCalc("");
        setResult("");
    };

    return (
        <div className="App">
            <div className="calculator">
                <div className="display">
                    {result ? <span>({result})</span> : ''} { calc || "0"}
                </div>

                <div className="operators">
                    <button onClick={() => updateCalc('/')}>/</button>
                    <button onClick={() => updateCalc('*')}>*</button>
                    <button onClick={() => updateCalc('+')}>+</button>
                    <button onClick={() => updateCalc('-')}>-</button>

                    <button onClick={deleteLast}>DEL</button>
                    <button onClick={reset}>RES</button>
                </div>

                <div className="digits">
                    { createDigits() }
                    <button onClick={() => updateCalc('0')}>0</button>
                    <button onClick={() => updateCalc('.')}>.</button>

                    <button onClick={calculate}>=</button>
                </div>
            </div>
        </div>
    );
}

export default App;
