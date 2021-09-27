import {testP} from './project.js';
import {testT} from './task.js';

function storageAvailable(type) {
    console.log("now calling Local Storage function");
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

    
}

/*
loadedTodolist = new()

if (storageAvailable('localStorage')) {
    if(localStorage.getItem('todolist')!==null){
        loadedTodolist.setShelf(JSON.parse(localStorage.getItem('todolist')));
    }else{
        loadedTodolist=myTodolist;
    };
  }
  else {
    loadedTodolist=myTodolist;
  };
  */


  export function testEngine() {
    
    console.log("now calling testEngine() from engine.js");
    testP();
    testT();

    storageAvailable('localStorage');

    return;
}