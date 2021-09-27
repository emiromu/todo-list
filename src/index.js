import './style.css';
import {testEngine} from './engine.js';
import {testP} from './project.js';
import {testT} from './task.js';

testEngine();

function userInterface() {
    const element = document.createElement('div');
    element.innerHTML = 'Hello';
    element.classList.add('hello');
    return element;
}

document.body.appendChild(userInterface());