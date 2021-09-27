export function createTask(name,description,dueDate,priority,status){
        
    const getName = () => name;
    const setName = (newName) => {
        name = newName;
        return name;
    };

    const getDescription = () => description;
    const setDescription = (newDescription) => {
        description = newDescription;
        return description;
    };

    const getDueDate = () => dueDate;
    const setDueDate = (newDueDate) => {
        dueDate = newDueDate;
        return dueDate;
    };

    const getPriority = () => priority;
    const setPriority = (newPriority) => {
        priority = newPriority;
        return priority;
    };

    const getStatus = () => status;
    const setStatus = (newStatus) => {
        status = newStatus;
        return status;
    };

    return {getName, setName, getDescription, setDescription,
    getDueDate, setDueDate, getPriority, setPriority,
    getStatus, setStatus};
};