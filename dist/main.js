/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),
/* 2 */
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 3 */
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),
/* 4 */
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),
/* 5 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),
/* 6 */
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),
/* 7 */
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ }),
/* 8 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".testing{\n    border-style: dotted;\n    border-width: 0.2em;\n    border-color: magenta;\n}\n\nhtml{\n    height:100%;\n    width:100%;\n    margin: 0em;\n    padding: 0em;\n}\n\n.body{\n    background-color: #c8d0eb;\n    color: black;\n    min-height: 100%;\n    height: 100%;\n    width: 100%;\n    margin: 0em;\n    padding: 0em;\n\n    display:flex;\n    flex-direction: column;\n    flex-grow: 1;\n}\n\n.container-vertical{\n    display:flex;\n    justify-content:flex-start;\n    flex-direction: column;\n    align-items: left;\n}\n\n.container-horizontal{\n    display:flex;\n    justify-content: center;\n    justify-self:center;\n\n    flex-direction: row;\n    align-items: center;\n}\n\n.master{\n    display: flex;\n    flex-direction: column;\n    flex-grow: 4;\n    min-width: 22em;\n}\n\n.header{\n    width: 100%;\n    height:5em;\n    background-color: #7781a3;\n}\n\n.footer{\n    height: 1.2em;\n    background-color: #7781a3;\n    margin: 0em;\n    padding: 0em;\n    font-size: 0.8rem;\n    }\n\n.main{\n    display:flex;\n    flex-direction: row;\n    align-items: left;\n    width: 100%;\n    min-width: 22em;\n\n    flex-grow: 1;\n}\n\n.sidebar{\n    display: flex;\n\n    border-style: solid;\n    border-width: 0.2em;\n    border-right-width: 0em;\n    border-left-width: 0em;\n    border-top-width: 0em;\n    border-color: black;\n\n    width: 15%;\n    min-height: auto;\n    min-width: 10em;\n    flex-grow:1;\n}\n\n.sidebar-button{\n    width: 75%;\n    border-radius: 2em;\n}\n\n.side-menu-title{\n    text-align: center;\n    border-style: solid;\n    border-color: black;\n    border-width: 0em;\n    border-bottom-width: 0.2em;\n    border-top-width: 0.2em;\n    background-color: #748bd1;\n    margin-bottom:0.5em;\n}\n\n.side-buttons-box{\n    display: flex;\n    justify-content: center;\n    align-content: center;\n}\n\n.storage-menu {\n    display: flex;\n    flex-direction: column;\n    align-content: flex-start;\n    justify-content: left;\n\n    font-weight: bold;\n    flex-shrink: 0;\n    padding-bottom:0.5em;\n}\n\n.projects-menu {\n    display: flex;\n    flex-direction: column;\n    align-content: flex-start;\n    justify-content: left;\n\n    font-weight: bold;\n    flex-grow: 1;\n}\n\n.projects-table{\n    display: flex;\n    flex-direction: column;\n    align-content: flex-start;\n    justify-content: center;\n    margin-top: 0.5em;\n}\n\n.project-cell{\n    display: flex;\n    justify-content: center;\n}\n\n.project-select{\n    display:flex;\n    font-weight: normal;\n    word-wrap:break-word;\n    overflow-wrap: break-word;\n    word-break: break-all;\n}\n\n.project-select:hover{\n    color: midnightblue;\n    text-decoration: underline;\n    cursor: pointer;\n}\n\n.dashboard{\n    display: flex;\n    flex-direction: column;\n\n    border-style: solid;\n    border-width: 0.2em;\n    border-right-width: 0em;\n    border-color: black;\n\n    width: 85%;\n    min-height: auto;\n    min-width: 8em;\n\n    flex-grow: 1;\n}\n\n.dashboard-title{\n    min-height: auto;\n    /*min-width: auto;*/\n    font-weight:bolder;\n    font-size: 2rem;\n    text-align: center;\n\n    word-wrap:break-word;\n\n    margin:0em;\n    width: 60%;\n}\n\n#dashboardTop{\n    height: 4.5em;\n    flex-grow: 0;\n}\n\n.dashboard-top-left{\n    float:left;\n    width: 20%;\n    max-width: 8em;\n    height: auto;\n}\n\n.dashboard-top-right{\n    float:right;\n    width: 20%;\n    max-width: 8em;\n    height: auto;\n}\n\n.project-button{\n    border-radius: 2em;\n    min-width:4.5em;\n    width:auto;\n    height:auto;\n}\n\n.tasks-menu{\n    flex-grow: 1;\n    justify-content: center;\n    justify-items: center;\n    min-height: 80%;\n    min-width: 100%;\n}\n\n.tasks-menu-title{\n    height:8%;\n    width:99.5%;\n    font-weight: bold;\n    text-align: center;\n\n    border-style: solid;\n    border-width: 0.1em;\n    border-color: black;\n    border-radius: 0.5em;\n}\n\n.tasks-menu-button{\n    border-radius: 2em;\n    width:8em;\n    height:1.5em;\n    margin:0.5em;\n}\n\n.tasks-bench{\n    min-height:auto;\n    flex-grow: 1;\n\n    border-style: solid;\n    border-width: 0.1em;\n    border-color: black;\n    border-radius: 0.5em;\n}\n\n.tasks-table{\n    display: flex;\n    flex-direction:column;\n    flex-grow: 2;\n}\n\n.task-cell{\n    border-style: dotted;\n    border-width: 0.2em;\n    border-color: black;\n    border-radius: 2em;\n\n}\n\n.task-title{\n\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 9 */
/***/ ((module) => {



module.exports = function (i) {
  return i[1];
};

/***/ }),
/* 10 */
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var _i = 0; _i < this.length; _i++) {
        var id = this[_i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i2 = 0; _i2 < modules.length; _i2++) {
      var item = [].concat(modules[_i2]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createEngine": () => (/* binding */ createEngine)
/* harmony export */ });
/* harmony import */ var _project_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);



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

function createEngine() {

    let projectList = [];
    projectList.push((0,_project_js__WEBPACK_IMPORTED_MODULE_0__.createProject)('Default'));

    const getProjectList = () => {
        return projectList;
    }

    const addProject = (name) => {
        if ((typeof name !== 'string' || !(name instanceof String)) && (name.length<1 || name.length>22)){
            alert('Project name not valid (must be 1 to 22 characters)');
            return;
        };

        for(let i=0; i<projectList.length; i++){
            if(name==projectList[i].getName()){
                //console.log('Project already exists');
                alert('A project with the same name already exists');
                return;
            };
        }
        projectList.push((0,_project_js__WEBPACK_IMPORTED_MODULE_0__.createProject)(name));
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
        if ((typeof newName !== 'string' || !(newName instanceof String)) && (newName.length<1 || newName.length>22)){
            alert('Project name not valid (must be 1 to 22 characters)');
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

/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createProject": () => (/* binding */ createProject)
/* harmony export */ });
/* harmony import */ var _task_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(13);


function createProject(name){

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
        taskList.push((0,_task_js__WEBPACK_IMPORTED_MODULE_0__.createTask)(taskName,description,dueDate,priority,status));
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

/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createTask": () => (/* binding */ createTask)
/* harmony export */ });
function createTask(name,description,dueDate,priority,status){
        
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

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _engine_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11);
/* harmony import */ var _project_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(12);
/* harmony import */ var _task_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(13);





const engine = (0,_engine_js__WEBPACK_IMPORTED_MODULE_1__.createEngine)();

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

    const storageMenuButtons = document.createElement('div');
    storageMenuButtons.setAttribute('id','storageMenuButtons');
    storageMenuButtons.classList.add('side-buttons-box');

    const saveBtn = document.createElement('button');
    saveBtn.setAttribute('id','saveBtn');
    saveBtn.classList.add('sidebar-button');
    saveBtn.innerHTML='Save';
    saveBtn.addEventListener('click',function(e){
        if(confirm(`        Save to local storage?
        (this will replace existing saves)`)){
        alert('Save call');
        };
    });

    const loadBtn = document.createElement('button');
    loadBtn.setAttribute('id','loadBtn');
    loadBtn.classList.add('sidebar-button');
    loadBtn.innerHTML='Load';
    loadBtn.addEventListener('click',function(e){
        if(confirm(`        Load local storage?
        (this will replace the current dashboard)`)){
        alert('Load call');
        };
    });

    
    storageMenu.appendChild(storageMenuTitle);
    storageMenuButtons.appendChild(saveBtn);
    storageMenuButtons.appendChild(loadBtn);
    storageMenu.appendChild(storageMenuButtons);

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
    
    projectCell.appendChild(projectSelect);

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

    const projectsMenuButtons = document.createElement('div');
    projectsMenuButtons.setAttribute('id','projectsMenuButtons');
    projectsMenuButtons.classList.add('side-buttons-box');
    
    const newProjectBtn = document.createElement('button');
    newProjectBtn.setAttribute('id','newProjectBtn');
    newProjectBtn.classList.add('sidebar-button');
    newProjectBtn.innerHTML=`New Project`;
    newProjectBtn.addEventListener('click',function(e){
        let newProjectName=window.prompt('Enter new project name','');
        engine.addProject(newProjectName);
        if ((typeof newProjectName !== 'string' || !(newProjectName instanceof String)) && (newProjectName.length<1 || newProjectName.length>22)){
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
    projectsMenuButtons.appendChild(newProjectBtn);
    projectsMenu.appendChild(projectsMenuButtons);

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
    tasksMenu.classList.add('container-vertical','tasks-menu');

    const tasksMenuTitle = document.createElement('div');
    tasksMenuTitle.setAttribute('id','tasksMenuTitle');
    tasksMenuTitle.classList.add('tasks-menu-title');
    tasksMenuTitle.innerHTML='Tasks';

    tasksMenu.appendChild(tasksMenuTitle);

    const newTaskBtn = document.createElement('button');
    newTaskBtn.setAttribute('id','newTaskBtn');
    newTaskBtn.classList.add('tasks-menu-button');
    newTaskBtn.innerHTML=`New Task`;
    newTaskBtn.addEventListener('click',function(e){
        engine.getProject(projectName).addTask(window.prompt('Enter new task name',''),'','','','');
        //Refresh the Dashboard
        document.querySelector(`#dashboard`).remove();
        document.querySelector('#mainPannel').appendChild(componentDashboard(projectName));
    });

    const tasksBench = document.createElement('div');
    tasksBench.setAttribute('id','tasksBench');
    tasksBench.classList.add('container-vertical','tasks-bench');

    /*tasks table div containing tasks cells*/
    const tasksTable = document.createElement('div');
    tasksTable.setAttribute('id','tasksTable');
    tasksTable.classList.add('tasks-table');

    tasksBench.appendChild(newTaskBtn);
    tasksBench.appendChild(tasksTable);

    let taskSelection = [];
    for(let i=0; i<engine.getProject(projectName).getTaskList().length;i++){
        taskSelection[i]=document.createElement('div');
        taskSelection[i].innerHTML=`${engine.getProject(projectName).getTaskList()[i].getName()}`;
        tasksTable.appendChild(componentTaskCell(projectName,engine.getProject(projectName).getTaskList()[i].getName()));
    }
    tasksMenu.appendChild(tasksBench);
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

    const dashboardTop = document.createElement('div');
    dashboardTop.setAttribute('id','dashboardTop');
    dashboardTop.classList.add('container-horizontal');

    const dashboardTitle = document.createElement('div');
    dashboardTitle.setAttribute("id", "dashboardTitle");
    dashboardTitle.classList.add('container-vertical','dashboard-title');
    dashboardTitle.innerHTML=`<br>${renderSelection}<br><br>`;

    const dashboardTopRight = document.createElement('div');
    dashboardTopRight.setAttribute('id','dashboardTopRight');
    dashboardTopRight.classList.add('container-vertical','dashboard-top-right');

    const dashboardTopLeft = document.createElement('div');
    dashboardTopLeft.setAttribute('id','dashboardTopLeft');
    dashboardTopLeft.classList.add('container-vertical','dashboard-top-left');

    const editProject = document.createElement('button');
    editProject.setAttribute('id',`edit${renderSelection}`);
    editProject.classList.add('project-button');
    editProject.innerHTML=`Rename`;
    editProject.addEventListener('click',function(e){
        var newProjectName = window.prompt('Enter new name for the project','');
        engine.renameProject(renderSelection,newProjectName);
        if ((typeof newProjectName !== 'string' || !(newProjectName instanceof String)) && (newProjectName.length<1 || newProjectName.length>22)){
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
    deleteProject.setAttribute('id',`delete${renderSelection}`);
    deleteProject.classList.add('project-button');
    deleteProject.innerHTML=`Delete`;
    deleteProject.addEventListener('click',function(e){
        if(confirm(`Delete project "${renderSelection}" ?`)){
            engine.deleteProject(renderSelection);

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

    dashboardTop.appendChild(dashboardTopLeft);
    dashboardTop.appendChild(dashboardTitle);
    dashboardTopLeft.appendChild(editProject);
    dashboardTopRight.appendChild(deleteProject);
    dashboardTop.appendChild(dashboardTopRight);
    

    dashboard.appendChild(dashboardTop);
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




})();

/******/ })()
;