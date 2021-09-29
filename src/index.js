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

  //test function
function hello() {
    alert("Hello");
    return 'hello';
    };

function componentHeader(){
    const header = document.createElement('div');
    header.setAttribute("id", "header");
    header.classList.add('container-horizontal','header');

    header.innerHTML=`<h3>ʕっ•ᴥ•ʔっ The Amazing To-Do List</h3>&nbsp
    <h3 style="transform: scaleX(-1);">ʕっ•ᴥ•ʔっ</h3>`;

    return header;
};

function componentFooter(){
    const footer = document.createElement('div');
    footer.setAttribute("id", "footer");
    footer.classList.add('container-horizontal','footer');

    footer.innerHTML=`Web application created by Emilien Romulus :&nbsp;
    <a href="https://github.com/emiromu">https://github.com/emiromu</a>&nbsp;`;

    return footer;
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
    storageMenu.classList.add('storage-menu');

    const storageMenuTitle = document.createElement('div');
    storageMenuTitle.setAttribute('id','storageMenuTitle');
    storageMenuTitle.classList.add('side-menu-title');
    storageMenuTitle.innerHTML='Local Storage';

    const saveBtn = document.createElement('button');
    saveBtn.setAttribute('id','saveBtn');
    saveBtn.innerHTML='Save';
    saveBtn.addEventListener('click',function(e){
        if(confirm(`        Save to local storage?
        (this will replace existing saves)`)){
        alert('Save call');
        };
    });

    const loadBtn = document.createElement('button');
    loadBtn.setAttribute('id','loadBtn');
    loadBtn.innerHTML='Load';
    loadBtn.addEventListener('click',function(e){
        if(confirm(`        Load local storage?
        (this will replace the current dashboard)`)){
        alert('Load call');
        };
    });

    storageMenu.appendChild(storageMenuTitle);
    storageMenu.appendChild(saveBtn);
    storageMenu.appendChild(loadBtn);

    return storageMenu;
};

function componentProjectCell(projectName){
    const projectCell = document.createElement('div');
    projectCell.setAttribute('id','projectCell'+projectName.hashCode());
    projectCell.classList.add('project-cell');

    const projectSelect = document.createElement('a');
    projectSelect.setAttribute('id',`select${projectName}`);
    projectSelect.classList.add('project-select');
    projectSelect.innerHTML=`${projectName}`;
    projectSelect.addEventListener('click',function(e){
        document.querySelector('#dashboard').remove();
        document.querySelector('#mainPannel').appendChild(componentDashboard(projectName));
    });
    
    /**TODO ; NOTE : probably will replace these with interface in dashboard */
    const editProject = document.createElement('button');
    editProject.setAttribute('id',`edit${projectName}`);
    editProject.classList.add('project-cell-button');
    editProject.innerHTML=`Edit`;
    editProject.addEventListener('click',function(e){
        var newProjectName = window.prompt('Enter new name for the project','');
        engine.renameProject(projectName,newProjectName);
        if ((typeof newProjectName !== 'string' || !(newProjectName instanceof String)) && (newProjectName.length<1 || newProjectName.length>30)){
            return;
        };
        //Refresh the Projects Menu
        document.querySelector('#projectsMenu').remove();
        document.querySelector('#sidebar').appendChild(componentProjectsMenu());
        //Refresh the Dashboard
        document.querySelector(`#dashboard`).remove();
        document.querySelector('#mainPannel').appendChild(componentDashboard(newProjectName));
        return;
    });

    const deleteProject = document.createElement('button');
    deleteProject.setAttribute('id',`delete${projectName}`);
    deleteProject.classList.add('project-cell-button');
    deleteProject.innerHTML=`Delete`;
    deleteProject.addEventListener('click',function(e){
        if(confirm(`Delete project "${projectName}" ?`)){
            engine.deleteProject(projectName);

            //Refresh the Projects Menu
            document.querySelector('#projectsMenu').remove();
            document.querySelector('#sidebar').appendChild(componentProjectsMenu());

            if(engine.getProjectList().length<1){
                //Refresh the Dashboard (no projects left)
                document.querySelector(`#dashboard`).remove();
                document.querySelector('#mainPannel').appendChild(componentDashboardEmpty());
            }
            else{
                //Refresh the Dashboard (use first project)
                document.querySelector(`#dashboard`).remove();
                document.querySelector('#mainPannel').appendChild(componentDashboard(engine.getProjectList()[0].getName()));
            };
            return;
        };
    });


    projectCell.appendChild(projectSelect);
    projectCell.appendChild(editProject);
    projectCell.appendChild(deleteProject);

    return projectCell;
};

function componentProjectsMenu(){
    /**Menu containing New Project button and Projects table div */
    
    const projectsMenu = document.createElement('div');
    projectsMenu.setAttribute('id','projectsMenu');
    projectsMenu.classList.add('projects-menu');

    const projectsMenuTitle = document.createElement('div');
    projectsMenuTitle.setAttribute('id','projectsMenuTitle');
    projectsMenuTitle.classList.add('side-menu-title');
    projectsMenuTitle.innerHTML='Projects';
    
    const newProjectBtn = document.createElement('button');
    newProjectBtn.setAttribute('id','newProjectBtn');
    newProjectBtn.innerHTML=`New Project`;
    newProjectBtn.addEventListener('click',function(e){
        let newProjectName=window.prompt('Enter new project name','');
        engine.addProject(newProjectName);
        if ((typeof newProjectName !== 'string' || !(newProjectName instanceof String)) && (newProjectName.length<1 || newProjectName.length>30)){
            return;
        };
        //Refresh the Projects Menu
        document.querySelector('#projectsMenu').remove();
        document.querySelector('#sidebar').appendChild(componentProjectsMenu());
        //Refresh the Dashboard
        document.querySelector(`#dashboard`).remove();
        document.querySelector('#mainPannel').appendChild(componentDashboard(newProjectName));
        return;
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

function componentSidebar(engine){

    const sidebar = document.createElement('div');
    sidebar.setAttribute('id','sidebar');
    sidebar.classList.add('container-vertical','sidebar')
    
    sidebar.appendChild(componentStorageMenu());
    sidebar.appendChild(componentProjectsMenu());
    return sidebar;
};

function componentTaskCell(projectName,taskName){
    const taskCell = document.createElement('div');
    taskCell.setAttribute('id','taskCell'+taskName.hashCode());
    taskCell.classList.add('task-cell');

    const taskTitle = document.createElement('div');
    taskTitle.setAttribute('id',`select${taskName.hashCode()}`);
    taskTitle.classList.add('task-title');
    taskTitle.innerHTML=`${taskName}`;

    taskCell.appendChild(taskTitle);

    return taskCell;
};

function componentTasksMenu(projectName){
    /**Menu containing tasks of the active project */
    const tasksMenu = document.createElement('div');
    tasksMenu.setAttribute('id','tasksMenu');
    tasksMenu.classList.add('tasks-menu');

    const tasksMenuTitle = document.createElement('div');
    tasksMenuTitle.setAttribute('id','tasksMenuTitle');
    tasksMenuTitle.classList.add('tasks-menu-title');
    tasksMenuTitle.innerHTML='Tasks';

    tasksMenu.appendChild(tasksMenuTitle);

    const newTaskBtn = document.createElement('button');
    newTaskBtn.setAttribute('id','newTaskBtn');
    newTaskBtn.innerHTML=`New Task`;
    newTaskBtn.addEventListener('click',function(e){
        engine.getProject(projectName).addTask(window.prompt('Enter new task name',''),'','','','');
        //Refresh the Dashboard
        document.querySelector(`#dashboard`).remove();
        document.querySelector('#mainPannel').appendChild(componentDashboard(projectName));
    });

    tasksMenu.appendChild(newTaskBtn);

    /*tasks table div containing tasks cells*/
    const tasksTable = document.createElement('div');
    tasksTable.setAttribute('id','tasksTable');
    tasksTable.classList.add('tasks-table');

    let taskSelection = [];
    for(let i=0; i<engine.getProject(projectName).getTaskList().length;i++){
        taskSelection[i]=document.createElement('div');
        taskSelection[i].innerHTML=`${engine.getProject(projectName).getTaskList()[i].getName()}`;
        tasksTable.appendChild(componentTaskCell(projectName,engine.getProject(projectName).getTaskList()[i].getName()));
    }
    tasksMenu.appendChild(tasksTable);
    return tasksMenu;
};

function componentDashboardEmpty(){

    const dashboard = document.createElement('div');
    dashboard.setAttribute("id", "dashboard");
    dashboard.classList.add('container-vertical','dashboard');

    const dashboardTitle = document.createElement('div');
    dashboardTitle.setAttribute("id", "dashboardTitleEmpty");
    dashboardTitle.classList.add('container-vertical','dashboard-title');
    dashboardTitle.innerHTML=`<br>You don't have any projects!<br><br>`;

    dashboard.appendChild(dashboardTitle);
    return dashboard;
};

function componentDashboard(activeSelection){

    let renderSelection;

    if(activeSelection===undefined){
        if(engine.getProjectList().length>0){
            renderSelection = engine.getProjectList()[0].getName();
        }
        else{
            renderSelection = null;
        };
    }
    else{
        renderSelection = activeSelection;
    };

    const dashboard = document.createElement('div');
    dashboard.setAttribute("id", "dashboard");
    dashboard.classList.add('container-vertical','dashboard');

    const dashboardTitle = document.createElement('div');
    dashboardTitle.setAttribute("id", "dashboardTitle");
    dashboardTitle.classList.add('container-vertical','dashboard-title');
    dashboardTitle.innerHTML=`<br>${renderSelection}<br><br>`;

    dashboard.appendChild(dashboardTitle);
    dashboard.appendChild(componentTasksMenu(renderSelection));
    return dashboard;
};



function userInterface() {

    const userInterface = document.createElement('div');
    userInterface.setAttribute('id','master');
    userInterface.classList.add('master');
    
    userInterface.appendChild(componentHeader());
    const main = userInterface.appendChild(componentMainPannel());
    main.appendChild(componentSidebar(engine));
    main.appendChild(componentDashboard());


    userInterface.appendChild(componentFooter());

    return userInterface;
};

document.body.classList.add('body');
document.body.appendChild(userInterface());



