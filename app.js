let attendenceTittle = document.querySelector(".formTittle");
let attendencePercentage = document.querySelector(".formPercentage");
let formSubjects = document.querySelector(".formSubjects");
let formSaveButton = document.querySelector(".formSaveButton");
let subjectForm = document.querySelector(".subjectForm");
let dataForStorage;
let dataAttendences = [];
let uid;

let displayScreen = document.querySelector(".changableText");
let startingText = displayScreen.innerHTML;
let listItem = document.createElement("li");
let row = document.createElement("div");
let col1 = document.createElement("div");
let col2 = document.createElement("div");

//Creating varibale(Class) of Attendence

class attendence {
  constructor(
    tittle,
    maxPercentage,
    noOfSubjects,
    totalClasses,
    cpercentege,
    aclasses
  ) {
    this.tittle = tittle;
    this.maxPercentage = maxPercentage;
    this.noOfSubjects = noOfSubjects;
    this.subjectList = [];
    this.totalClasses = totalClasses;
    this.currnetPercentege = cpercentege;
    this.attendedClasses = aclasses;
  }
}
function saveDataToStorage(attendence) {
  localStorage.setItem("Attendence", JSON.stringify(attendence));
}
//addEventListeners

formSaveButton.addEventListener("click", addElement);

function addElement(e) {
  let tittle = attendenceTittle.value;
  let percentage = attendencePercentage.value;
  let subjects = formSubjects.value;
  e.preventDefault();
  console.log("added" + attendenceTittle);
  //taking Values

  let dataAttendence = new attendence(tittle, percentage, subjects, 0, 0, 0);
  dataAttendences.push(dataAttendence);

  saveDataToStorage(dataAttendences);
  display();
}

function display() {
  console.log("dsipaly call hua");
  if (localStorage.getItem("Attendence") == null) {
    console.log("Working");
    displayScreen.innerHTML = `${startingText}`;
  } else if (
    localStorage.getItem("Attendence") != null &&
    dataAttendences.length == 0
  ) {
    dataAttendences = JSON.parse(localStorage.getItem("Attendence"));
    display();
  } else {
    //Making parts that have to display on screen

    deleteButton = document.createElement("button");

    //Append Child
    displayScreen.innerHTML = "";

    displayScreen.appendChild(listItem);
    listItem.appendChild(row);
    row.appendChild(col1);
    row.appendChild(col2);
    //col1.appendChild(deleteButton);

    //Adding Bootstrap Classes
    displayScreen.classList = "p-2 mx-3";
    listItem.classList = "list-group-item p-4 text-white container ";
    row.classList = "row container";
    col1.classList = "col-lg-4 mb-3 text-center ";
    col2.classList = "col-lg-8 container";
    deleteButton.classList = "btn btn-danger";
    col1.id = dataAttendences.length - 1;

    //styling

    listItem.style.backgroundColor = "transparent";
    displayScreen.parentElement.style.height = "auto";
    displayScreen.parentElement.style.backgroundColor = "rgb(0,0,0,0.5)";
    displayScreen.parentElement.classList.remove("text-center");
    //
    let tittle = dataAttendences[0].tittle;
    let percentage = dataAttendences[0].maxPercentage;
    let subjects = dataAttendences[0].noOfSubjects;
    let totalClasses = dataAttendences[0].totalClasses;
    let currnetPercentege = dataAttendences[0].currnetPercentege;
    let attendedClasses = dataAttendences[0].attendedClasses;

    //Changing or Updating the text of the elements
    deleteButton.innerHTML = "X";
    col1.innerHTML = `<div class="card mt-4 bg-warning" style="background-image:url('images/backgroun.jpeg');border-bottom:10px solid black"><div style="background-rgb()">
    <h1 class="  p-3 border border-white text-capitalize mb-3 bg-dark card-tittle bg-dark" style="font-size:35px;font-weight:bold;font-family: 'Orbitron', sans-serif;">${tittle}</h1>
  
  <br>
 <div class="mt-4">
 
      
      
      <label htmlFor="text" class=" p-2 bg-success mr-2 display-4 rounded-cirlce">
      <h5 class="bg-light text-dark p-2">Maximum Percentage</h5>
        ${percentage}%
      </label><label htmlFor="text" class=" p-2 bg-danger mr-2 display-4"> 
      <h5 class="bg-light text-dark p-2">Current Percentege</h5>
        ${currnetPercentege}%
      </label>
      <br><br>
      <label htmlFor="text" class=" p-2 bg-primary mr-2 display-4"> 
      <h5 class="bg-light text-dark p-2">Total Subjects</h5>
        ${subjects}
      </label>
      
      
      <br><br>
      <br>
      <label htmlFor="text" class=" p-2 bg-secondary mr-2 display-4"> 

      <h5 class="bg-light text-dark p-2">Attended Classes</h5>
        ${attendedClasses}
      </label><br>
    </div></div></div>`;
    if (dataAttendences[0].subjectList == 0) {
      col2.innerHTML = `<div class="container card bg-dark text-white d-inline-block pb-4 " style="margin-top:20%;">
      <h1 class="display-4 ">Add your subjects </h1>
      <button class="fas fa-plus bg-secondary p-2 rounded-circle btn text-white addSubButton text-center" data-toggle="modal"
      data-target="#exampleModal2"  ></button>
      
    </div>
    
    `;
      if (dataAttendences[0].subjectList.length == 0) addSubjectsInputToForm();
    } else displaySubjects();

    col1.appendChild(deleteButton);
    deleteButton.addEventListener("click", deleteAttendence);
    function deleteAttendence(e) {
      let id = Number(e.target.parentElement.id);
      dataAttendences.splice(id, 1);
      localStorage.clear();
      display();
    }

    //addSubject=document.querySelector(".addSubButon");
    //Function For Add Subject Form.
  }
}

function addSubjectsInputToForm() {
  console.log(Number(formSubjects.value));
  subjectForm.innerHTML = " ";
  for (let i = 0; i < Number(dataAttendences[0].noOfSubjects); i++) {
    let inputField = document.createElement("input");

    //appendingChilds
    subjectForm.appendChild(inputField);
    //adding bootstrap classes
    inputField.classList = "form-control mb-2 sub";
    //Properties
    inputField.placeholder = `Subject ${i + 1}`;
    inputField.id = `s${i + 1}`;

    //add Subjects to localStorage;
  }
}

saveSubjectButton = document.querySelector(".formSaveButtonSubject");
saveSubjectButton.addEventListener("click", showSubjects);

class Subject {
  constructor(n, p, ta, ca) {
    this.name = n;
    this.percentage = p;
    this.totalAttendence = ta;
    this.currentAttendence = ca;
  }
}

function takeMySubjectsFromForm() {
  //let subjects = [];

  document.querySelectorAll(".sub").forEach(element => {
    subject = new Subject(element.value, 0, 0, 0);
    dataAttendences[0].subjectList.push(subject);

    //adding subjects to storage
  });

  // document.querySelectorAll(".sub").classList.remove("sub");

  //console.log("ee" + subjects);

  saveDataToStorage(dataAttendences);
}

function showSubjects(e) {
  console.log("showSubject call hua");
  e.preventDefault();
  takeMySubjectsFromForm();
  displaySubjects();
  console.log(dataAttendences);
}

function addExtraSubject() {
  document
    .querySelector(".addInputExtraSubjects")
    .addEventListener("click", addSubjects);

  function addSubjects(e) {
    e.preventDefault();
    inputValue = Number(e.target.previousElementSibling.value);
    console.log(inputValue);
    let form = document.querySelector(".subjectForm2");
    let saveButton = document.querySelector(".formSaveSubjectProperties2");
    //saveButton.classList = "btn btn-primary";
    let defaultValue = form.innerHTML;

    form.innerHTML = defaultValue;
    for (let i = 0; i < inputValue; i++) {
      console.log(i);
      input = document.createElement("input");
      form.appendChild(input);
      input.classList = "form-control subupdated";
      input.placeholder = `Subject ${i + 1}`;
    }
    saveButton.addEventListener("click", showUpdatesSubjects);
  }
}

function showUpdatesSubjects(e) {
  document.querySelectorAll(".subupdated").forEach(element => {
    subject = new Subject(element.value, 0, 0, 0);
    dataAttendences[0].subjectList.push(subject);
    console.log(dataAttendences);
    dataAttendences[0].noOfSubjects++;
    console.log(dataAttendences);

    display();
  });
  saveDataToStorage(dataAttendences);
}

function displaySubjects() {
  console.log("displaySubjects call hua");
  col2.innerHTML = "";
  let colors = ["pink", "cyan", "dodgerblue", "tomato"];
  let i = 0;
  let c = 0;
  subjects = dataAttendences[0].subjectList;
  div = document.createElement("div");
  col2.appendChild(div);

  div.innerHTML = `<h3 class="display-3 p-2 text-light" style="font-family: 'Orbitron', sans-serif;
  font-family: 'Fredoka One', cursive;">Subjects <span> <button class="btn btn-success fas fa-plus rounded-circle extraSubButton " data-toggle="modal" data-target="#exampleModal4"></button>  </span> </h3>
    <br>`;
  subjects.forEach(e => {
    label = document.createElement("label");

    col2.appendChild(label);
    label.id = `${i}`;

    label.classList =
      "btn btn-light  p-4 mr-2 border border-tomato  text-black";
    if (c > 3) {
      c = 0;
      colors = ["dodgerblue", "tomato", "pink", "cyan"];
    }
    label.style.backgroundColor = colors[c];
    label.style.border = "0";
    label.innerHTML = `<h4 class="text-capitalize">${
      e.name
    } </h4> <hr class="bg-white"> <p class="details"> ${e.currentAttendence}/ ${
      e.totalAttendence
    } </p><label class="bg-success p-1 rounded-circle mt-3"><strong>${
      e.percentage
    }%</strong>
    
    </label><br/>
    <button class="subFromDisplay btn btn-primary p-2">Edit</button>`;
    i++;
    c++;
  });
  let editButton = document.querySelectorAll(".subFromDisplay");
  editButton.forEach(elem => elem.addEventListener("click", giveId));
  document
    .querySelector(".extraSubButton")
    .addEventListener("click", addExtraSubject);
}

function giveId(e) {
  console.log("giveId call hua");
  e.preventDefault();
  console.log(e.target.parentElement);
  uid = Number(e.target.parentElement.id);
  e.preventDefault();
  e.target.parentElement.setAttribute("data-target", "#exampleModal3");
  e.target.parentElement.setAttribute("data-toggle", "modal");

  console.log("uid dene vaala " + uid);
  setInitialValueToEditForm(uid);
}

function setInitialValueToEditForm(id, d) {
 if( d || 1) {
    document.querySelector("#ac").value =
      dataAttendences[0].subjectList[id].currentAttendence;
    document.querySelector("#tc").value =
      dataAttendences[0].subjectList[id].totalAttendence;
  }
}

let formSaveSubjectProperties = document.querySelector(
  ".formSaveSubjectProperties"
);
formSaveSubjectProperties.addEventListener("click", editProperties);
function editProperties(e) {
  e.preventDefault();
  console.log("meri " + uid);
  let id = uid;

  let ca = Number(document.querySelector("#ac").value);
  dataAttendences[0].subjectList[id].currentAttendence = ca;

  let ta = Number(document.querySelector("#tc").value);
  dataAttendences[0].subjectList[id].totalAttendence = ta;
  dataAttendences[0].subjectList[id].percentage = Math.round((ca / ta) * 100);
  function sumAttendedClasses() {
    let i = 0;
    dataAttendences[0].subjectList.forEach(element => {
      i = i + Number(element.currentAttendence);
    });
    return i;
  }
  dataAttendences[0].attendedClasses = sumAttendedClasses();

  function totalClasses() {
    let i = 0;
    dataAttendences[0].subjectList.forEach(element => {
      i = i + Number(element.totalAttendence);
    });
    return i;
  }
  dataAttendences[0].totalClasses = totalClasses();
  dataAttendences[0].currnetPercentege = Math.round(
    (sumAttendedClasses() / totalClasses()) * 100
  );

  saveDataToStorage(dataAttendences);
  console.log("id is calling " + id);

  display();
}

display();
for (let i = 0; i < dataAttendences[0].noOfSubjects; i++)
  setInitialValueToEditForm(i, 1);
