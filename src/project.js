import {createTask} from './task.js';

export function createProject(name){

    if ((typeof name !== 'string' || !(name instanceof String)) && (name.length<1 || name.length>22)){
        alert('Project name not valid (must be 1 to 22 characters)');
        return;
    };

    const getName = () => name;
    const setName = (newName) => {
        name = newName;
        return name;
    };
    let taskList = [];

    const getTaskList = () => {
        return taskList;
    };

    const addTask = (taskName,description,dueDate,priority,status) => {
        if ((typeof taskName !== 'string' || !(taskName instanceof String)) && (taskName.length<1 || taskName.length>50)){
            alert('Task name not valid (must be 1 to 50 characters)');
            return;
        };
        for(let i=0;i<taskList.length;i++){
            if(taskList[i].getName() == taskName){
                console.log('Task already exists');
                return;
            }
        }
        taskList.push(createTask(taskName,description,dueDate,priority,status));
        console.log(`Task ${taskName} has been pushed to project ${getName()}`);
        return;
        };

    const deleteTask = (taskName) => {
        
        for(let i=0;i<taskList.length;i++){
            if(taskList[i].getName() == taskName){
                taskList.splice(i,1);
                console.log('Task deleted');
                return;
            }
        }
        console.log(`Task not found`);
        return;
        };
        

    return {getName, setName, getTaskList, addTask, deleteTask}
};