import './style.css';
import {createEngine} from './engine.js';
import {createProject} from './project.js';
import {createTask} from './task.js';

const engine = createEngine();

String.prototype.hashCode = function() {
    var hash = 0, i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
      chr   = this.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  };

function componentHeader(){
    const header = document.createElement('div');
    header.setAttribute("id", "header");
    header.classList.add('container-horizontal','header');

    return header;
};

function componentMainPannel(){
    const mainPannel = document.createElement('div');
    mainPannel.setAttribute("id", "mainPannel");
    mainPannel.classList.add('main');

    return mainPannel;
};

function componentStorageMenu(){

    /**Local Storage */
    const storageMenu = document.createElement('div');
    storageMenu.setAttribute('id','storageMenu');
    storageMenu.classList.add('storage-menu','testing');

    const storageMenuTitle = document.createElement('div');
    storageMenuTitle.setAttribute('id','storageMenuTitle');
    storageMenuTitle.classList.add('side-menu-title');
    storageMenuTitle.innerHTML='Local Storage';

    const saveBtn = document.createElement('button');
    saveBtn.setAttribute('id','saveBtn');
    saveBtn.innerHTML='Save';
    saveBtn.addEventListener('click',function(e){
        alert('Save call');
    });

    const loadBtn = document.createElement('button');
    loadBtn.setAttribute('id','loadBtn');
    loadBtn.innerHTML='Load';
    loadBtn.addEventListener('click',function(e){
        alert('Load call');
    });

    storageMenu.appendChild(storageMenuTitle);
    storageMenu.appendChild(saveBtn);
    storageMenu.appendChild(loadBtn);

    return storageMenu;
};

function componentProjectCell(projectName){
    const projectCell = document.createElement('div');
    projectCell.setAttribute('id','projectCell'+projectName.hashCode());
    projectCell.innerHTML=`${projectName}`;

    return projectCell;
};

function componentProjectsMenu(){
    /**Menu containing New Project button and Projects table div */
    const projectsMenu = document.createElement('div');
    projectsMenu.setAttribute('id','projectsMenu');
    projectsMenu.classList.add('projects-menu','testing');

    const projectsMenuTitle = document.createElement('div');
    projectsMenuTitle.setAttribute('id','projectsMenuTitle');
    projectsMenuTitle.classList.add('side-menu-title');
    projectsMenuTitle.innerHTML='Projects';
    
    const newProjectBtn = document.createElement('button');
    newProjectBtn.setAttribute('id','newProjectBtn');
    newProjectBtn.innerHTML=`New Project`;
    newProjectBtn.addEventListener('click',function(e){
        alert('New Project call');
        //Refresh the Projects Menu
        document.querySelector('#projectsMenu').remove();
        document.querySelector('#sidebar').appendChild(componentProjectsMenu());
    });

    projectsMenu.appendChild(projectsMenuTitle);
    projectsMenu.appendChild(newProjectBtn);

    /*Projects table div containing Project cells*/
    const projectsTable = document.createElement('div');
    projectsTable.setAttribute('id','projectsTable');
    projectsTable.classList.add('projects-table');

    let projectSelection = [];
    for(let i=0; i<engine.getProjectList().length;i++){
        projectSelection[i]=document.createElement('div');
        projectSelection[i].innerHTML=`${engine.getProjectList()[i].getName()}`;
        projectsTable.appendChild(componentProjectCell(engine.getProjectList()[i].getName()));
    }
    projectsMenu.appendChild(projectsTable);
    return projectsMenu;
};

function componentSidebar(){
    const sidebar = document.createElement('div');
    sidebar.setAttribute('id','sidebar');
    sidebar.classList.add('container-vertical','sidebar')
    
    sidebar.appendChild(componentStorageMenu());
    sidebar.appendChild(componentProjectsMenu());
    return sidebar;
};

function componentDashboard(){
    const dashboard = document.createElement('div');
    dashboard.setAttribute("id", "dashboard");
    dashboard.classList.add('container-vertical','dashboard');

    return dashboard;
};

function userInterface() {

    const userInterface = document.createElement('div');
    userInterface.setAttribute('id','master');
    userInterface.classList.add('master');
    
    userInterface.appendChild(componentHeader());
    const main = userInterface.appendChild(componentMainPannel());
    main.appendChild(componentSidebar());
    main.appendChild(componentDashboard());



    return userInterface;
};

document.body.classList.add('body');
document.body.appendChild(userInterface());



/*** TMP TESTING */
const btnA = document.createElement('button');
btnA.innerHTML="Create Project 1";
btnA.addEventListener('click',function(e){
engine.addProject('project 1');
});

const btnB = document.createElement('button');
btnB.innerHTML="Create task 1 of project 1";
btnB.addEventListener('click',function(e){
engine.getProject('project 1').addTask('this is a task');
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

const btnE = document.createElement('button');
btnE.innerHTML="delete task this is a task of project 1";
btnE.addEventListener('click',function(e){
engine.getProject('project 1').deleteTask('this is a task');
});

const btnF = document.createElement('button');
btnF.innerHTML="stuff";
btnF.addEventListener('click',function(e){
    console.log("stuff");
});

/*
document.body.appendChild(btnA);
document.body.appendChild(btnB);
document.body.appendChild(btnC);
document.body.appendChild(btnD);

document.body.appendChild(btnE);
document.body.appendChild(btnF);
*/