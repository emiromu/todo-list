import {createTask} from './task.js';

export function createProject(name){

    const getName = () => name;
    const setName = (newName) => {
        name = newName;
        return name;
    };
    let taskList = [];

    const addTask = (taskName,description,dueDate,priority,status) => {
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
        

    return {getName, setName, taskList, addTask, deleteTask}
};