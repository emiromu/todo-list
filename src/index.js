import './style.css';
import {createEngine} from './engine.js';
import {createProject} from './project.js';
import {createTask} from './task.js';

const engine = createEngine();

function userInterface() {
    const element = document.createElement('div');
    element.innerHTML = 'Hello';
    element.classList.add('hello');
    return element;
}

document.body.appendChild(userInterface());


const btnA = document.createElement('button');
btnA.innerHTML="Create Project 1";
btnA.addEventListener('click',function(e){
engine.addProject('project 1');
});

const btnB = document.createElement('button');
btnB.innerHTML="Create task 1 of project 1";
btnB.addEventListener('click',function(e){
engine.getProject('project 1').taskList[0]='this is a task';
});

const btnC = document.createElement('button');
btnC.innerHTML="log projectlist";
btnC.addEventListener('click',function(e){
console.log(engine.getProjectList());
});

const btnD = document.createElement('button');
btnD.innerHTML="Delete Project 1";
btnD.addEventListener('click',function(e){
    engine.deleteProject('project 1');
});


document.body.appendChild(btnA);
document.body.appendChild(btnB);
document.body.appendChild(btnC);
document.body.appendChild(btnD);

const btnE = document.createElement('button');
btnE.innerHTML="stuff";
btnE.addEventListener('click',function(e){
console.log("stuff");
});

const btnF = document.createElement('button');
btnF.innerHTML="stuff";
btnF.addEventListener('click',function(e){
    console.log("stuff");
});

document.body.appendChild(btnE);
document.body.appendChild(btnF);