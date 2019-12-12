'use static';
let localStorage = window.localStorage;

function load(){
  pageInit();

}

/*Events Called*/

function testFile(e){
  console.log("file button pushed");
}
function testTools(e){
  console.log("Tools button pushed");
}
function testOptions(e){
  console.log("Options button pushed");
}
function testHelp(e){
  console.log("help buttons pushed");
}



function ctrlAltWPressed(e){
  if (e.ctrlKey == true && e.altKey == true && e.key == "w"){
    createListElement()
    console.log("ctrlAltQPressed");
  }
}

function ctrlaltArrow(e){
  if (e.ctrlKey == true && e.altKey == true && e.key == "ArrowLeft" || e.ctrlKey == true && e.altKey == true && e.key == 'ArrowRight' || e.ctrlKey == true && e.altKey == true && e.key == "ArrowDown"){
    let currentElement = null;
    switch(e.key){
      case 'ArrowLeft':
        currentElement = document.activeElement.parentElement.parentElement.parentElement.parentElement;
        createHeading(currentElement);
        break;

      case 'ArrowRight':
        currentElement = document.activeElement;
        createHeading(currentElement);
        break;

      case 'ArrowDown':
        let parent = document.activeElement.parentElement.parentElement;
        createListElement(parent);

    }
  }
}

function ctrlaltBackspace(e){
  if (e.ctrlKey == true && e.altKey == true && e.key == "Backspace"){
    console.log('delete');
    deleteHeading();
  }
}

function enterPressed(e){
   if(e.key == "Enter"){

   }
 }

 function savePrompt(){
   let savePrompt = window.prompt("Do you want to save?", "enter file name");
   if (savePrompt !== null){
     savePage(savePrompt.toLowerCase());
   }
 }

 function loadPrompt(){
   let loadPrompt = window.prompt("What file would you like to load?", "enter file name");
   if (savePrompt !== null){
     loadPage(loadPrompt.toLowerCase());
   }
 }

 function newPrompt(){
   let newPrompt = window.confirm("Do you want to clear the page?")
   if (newPrompt == true){
     newPage();
   }
 }




/*functions called */

async function uploadDocument(pageName){
  let obj = {};
  const elemDOM = document.getElementById("1");
  inputValues();
  const stringDOM = elemDOM.innerHTML;
  obj.pageName = pageName;
  obj.pageData = stringDOM;
  console.log(obj);
  await fetch("/api/page", {method: 'POST', body: JSON.stringify(obj), headers: {'Content-Type': 'application/json'}});
}

async function getDoc(pageName){
  let responseDoc = await fetch("/api/page/" + "?pageName=" + pageName,{method: 'GET', headers: {'Content-Type': 'application/json'}})
  .then(function (obj) {
      return obj.json();
  })


  let page = document.getElementById("1");
  page.innerHTML = "";
  page.innerHTML = responseDoc.pageData;
}

function deleteHeading(){
  let parent = document.activeElement;
  if(parent.getAttribute("class") == "heading"){
      parent = document.activeElement.parentElement.parentElement;
    }else{
      parent = document.activeElement.parentElement;
    }
  parent.remove()
  updatePageList();
}

function createListElement(parent){
  let li = document.createElement('li');
  let input = document.createElement('input');
  if(parent.tagName = "ul"){
        parent.appendChild(li);
      }else{
        parent.parentElement.appendChild(li);
      }
  li.appendChild(input);
  input.setAttribute("value", "Please enter text");
  input.focus();
  updatePageList();
}

function createHeading(currentElement){
  let li = document.createElement("li");
  let ul = document.createElement("ul");
  let h = document.createElement("input");
  if(currentElement.tagName == "UL"){
    currentElement.appendChild(ul);
  }
  else if(currentElement.tagName == "INPUT"){
    currentElement.parentElement.parentElement.appendChild(ul);
  }
  ul.appendChild(li);
  li.appendChild(h);
  h.setAttribute("class", "heading")
  h.setAttribute("value", "Please enter heading");
  h.focus();
  updatePageList();
}


function updatePageList(){
  let pageList = document.getElementById("page").querySelectorAll(":not(li)");
  for(let i = 1; i < pageList.length; i++){
    let currentElement = pageList[i - 1];
    if(currentElement.tagName !== "UL"){
      pageList[i - 1].setAttribute("tabindex", i);
      pageList[i - 1].setAttribute("id", i);
    }else{
      pageList[i - 1].setAttribute("id", i);
    }
  }
}


function pageInit(){
  parent = document.getElementById('page');
  let ul = document.createElement('ul');
  ul.setAttribute("id", "1");
  ul.setAttribute("tabindex", "1");
  parent.appendChild(ul);
  document.getElementById("1").focus();
}

function savePage(pageName){
  const elemDOM = document.getElementById("1");
  inputValues()
  const stringDOM = elemDOM.innerHTML;
  localStorage.setItem(pageName, JSON.stringify(stringDOM));
  uploadDocument(pageName);
}

function loadPage(pageName){
  let stringDOM = "";
  if(localStorage.getItem(pageName) === null){
    getDoc(pageName);
    return 0;

  }else{
    stringDOM = localStorage.getItem(pageName);
    stringDOM = JSON.parse(stringDOM);
  }
  console.log(stringDOM);
  let page = document.getElementById("1");
  page.innerHTML = "";
  page.innerHTML = stringDOM;


}

function inputValues(){
  let inputs = document.getElementsByTagName("input");
  for(i = 0; i < inputs.length; i++){
    let value = inputs[i].value;
    inputs[i].setAttribute("value", value);

  }
}

function newPage(){
  page = document.getElementById("1");
  page.innerHTML = "";
}

function clearLocalStorage(){
  localStorage.clear();
}

//Event Listeners
window.addEventListener('load', load);
document.addEventListener("keydown", ctrlAltWPressed)
document.addEventListener("Keydown",  enterPressed);
document.addEventListener("keydown", ctrlaltBackspace);
document.addEventListener("keydown", ctrlaltArrow);
document.getElementById("new").addEventListener("click", newPrompt)
document.getElementById("save").addEventListener("click", savePrompt)
document.getElementById("load").addEventListener("click", loadPrompt)
document.getElementById("file").addEventListener("click", testFile);
document.getElementById("tools").addEventListener("click", testTools);
document.getElementById("options").addEventListener("click",testOptions);
document.getElementById("help").addEventListener("click",testHelp);
