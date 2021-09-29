import {createProject} from './project.js';


function storageAvailable(type) {
    var storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
};

export function createEngine() {

    let projectList = [];
    projectList.push(createProject('Default'));

    const getProjectList = () => {
        return projectList;
    }

    const addProject = (name) => {
        if ((typeof name !== 'string' || !(name instanceof String)) && (name.length<1 || name.length>30)){
            alert('Project name not valid (must be 1 to 30 characters)');
            return;
        };

        for(let i=0; i<projectList.length; i++){
            if(name==projectList[i].getName()){
                //console.log('Project already exists');
                alert('A project with the same name already exists');
                return;
            };
        }
        projectList.push(createProject(name));
        return;
    }

    const getProject = (name) => {
        if ((typeof name !== 'string' || !(name instanceof String)) && (name.length<1 || name.length>30)){
            return;
        };
        
        for(let i=0; i<projectList.length; i++){
            if(name==projectList[i].getName()){
                return projectList[i];
            };
        }
        console.log('Project not found');
        return null;
    }

    const deleteProject = (name) => {
        for(let i=0; i<projectList.length; i++){
            if(name==projectList[i].getName()){
                projectList.splice(i,1);
                return;
            };
        }
        console.log('Project not found');
        return;
    }

    const renameProject = (name, newName) => {
        if ((typeof newName !== 'string' || !(newName instanceof String)) && (newName.length<1 || newName.length>30)){
            alert('Project name not valid (must be 1 to 30 characters)');
            return;
        };
        for(let i=0; i<projectList.length; i++){
            if(newName==projectList[i].getName()){
                alert('A project with that name already exists');
                return;
            };
        }
        for(let i=0; i<projectList.length; i++){
            if(name==projectList[i].getName()){
                projectList[i].setName(newName);
                return;
            };
        }
    };
    

    /*** TODO local storage : save/load using constructors */
    /*
    const loadProjectList = () => {
        if (storageAvailable('localStorage')) {
            if(localStorage.getItem('projectList')!==null){
                projectList = JSON.parse(localStorage.getItem('projectList'));
                console.log('Project List loaded');
                console.log(projectList);
            }else{
                alert('No local Todo List found on this device');
            };
        }
        else{
            alert("No local storage available with this browser");
        };
    };

    const saveProjectList = () => {
        console.log('projectList = ');
        console.log(projectList);
        console.log('projectList[0] = ');
        console.log(projectList[0]);
        let saved = JSON.stringify(projectList);
        console.log('saved = ');
        console.log(saved);

        if (storageAvailable('localStorage')) {
            localStorage.setItem('projectList', JSON.stringify(projectList));
            console.log('Todo List saved to local storage!');
            console.log(projectList);
          }
          else {
            alert("No local storage available with this browser");
          };
    };*/

    return {getProjectList,addProject,getProject,renameProject,deleteProject/*,loadProjectList,saveProjectList*/};
};