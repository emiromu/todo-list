import './style.css';
import {testEngine} from './engine.js';

testEngine();



function component() {
    const element = document.createElement('div');
    element.innerHTML = 'Hello';
    element.classList.add('hello');
    return element;
}

document.body.appendChild(component());