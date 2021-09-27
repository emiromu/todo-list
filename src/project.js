export function createProject(name){

    const getName = () => name;
    const setName = (newName) => {
        name = newName;
        return name;
    };
    let taskList = [];

    return {getName, setName, taskList}
};