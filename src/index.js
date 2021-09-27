import './style.css';

console.log('Hello');

function component() {
    const element = document.createElement('div');
    element.innerHTML = 'Hello';
    element.classList.add('hello');
    return element;
}

document.body.appendChild(component());