const selector_categorie_nationala = document.querySelector(".selector_categorie_nationala");
const selector_categorie_comunitara = document.querySelector(".selector_categorie_comunitara");
const selector_marca = document.querySelector(".selector_marca");
const selector_judet = document.querySelector(".selector_judet");
const selectBtn0 = selector_judet.querySelector(".select-btn0");
const selectBtn1 = selector_categorie_nationala.querySelector(".select-btn1");
const selectBtn2 = selector_categorie_comunitara.querySelector(".select-btn2");
const selectBtn3 = selector_marca.querySelector(".select-btn3");

selectBtn1.addEventListener("click",()=>{
    selector_categorie_nationala.classList.toggle("active");
});

selectBtn2.addEventListener("click",()=>{
    selector_categorie_comunitara.classList.toggle("active");
});

selectBtn3.addEventListener("click",()=>{
    selector_marca.classList.toggle("active");
});

selectBtn0.addEventListener("click",()=>{
    selector_judet.classList.toggle("active");
});



function daclick(selectedLi, vector) {
  if (selectedLi.classList.contains("selected")) {
    selectedLi.classList.remove("selected");
    selectedLi.querySelector("i").classList.remove("fa-check-square-o");
  } else {
    vector.forEach((element) => {
      element.classList.remove("active");
      element.classList.remove("selected");
      element.querySelector("i").classList.remove("fa-check-square-o");
    });
    selectedLi.classList.add("selected");
    selectedLi.querySelector("i").classList.add("fa-check-square-o");
  }
  selectedLi.classList.add("active");
  console.log(selectedLi.innerText);
}




const options1 = selector_categorie_nationala.querySelectorAll("li");
options1.forEach(element => {
  element.addEventListener('click', ()=> daclick(element,options1));
  element.addEventListener('click', ()=> {selector_categorie_nationala.classList.toggle("active")});
});

const options0 = selector_judet.querySelectorAll("li");
options0.forEach(element => {
  element.addEventListener('click', ()=> daclick(element,options0));
  element.addEventListener('click', ()=> {selector_judet.classList.toggle("active")});
});

const options2 = selector_categorie_comunitara.querySelectorAll("li");
options2.forEach(element => {
  element.addEventListener('click', ()=> daclick(element,options2));
  element.addEventListener('click', ()=> {selector_categorie_comunitara.classList.toggle("active")});
});

const options3 = selector_marca.querySelectorAll("li");
options3.forEach(element => {
  element.addEventListener('click', ()=> daclick(element,options3));
  element.addEventListener('click', ()=> {selector_marca.classList.toggle("active")});
});


const submitBtn = document.getElementById("submitBtn");
submitBtn.addEventListener("click", function(event) {
  event.preventDefault();
  
  var judetSelected = selector_judet.querySelector(".selected");
  var categorieNationalaSelected = selector_categorie_nationala.querySelector(".selected");
  var categorieComunitaraSelected = selector_categorie_comunitara.querySelector(".selected");
  var marcaSelected = selector_marca.querySelector(".selected");

  if (judetSelected || categorieNationalaSelected || categorieComunitaraSelected || marcaSelected) {
    var judet = judetSelected ? judetSelected.innerText : "";
    var categorieNationala = categorieNationalaSelected ? categorieNationalaSelected.innerText : "";
    var categorieComunitara = categorieComunitaraSelected ? categorieComunitaraSelected.innerText : "";
    var marca = marcaSelected ? marcaSelected.innerText : "";

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "server.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var response = xhr.responseText;
        displayResponse(response);
      }
    };
    var data = "judet=" + encodeURIComponent(judet) + "&categorie_nationala=" + encodeURIComponent(categorieNationala) + "&categorie_comunitara=" + encodeURIComponent(categorieComunitara) + "&marca=" + encodeURIComponent(marca);
    xhr.send(data);
  } else {
    alert("Selectați cel puțin o opțiune!");
  }
});

 
 function displayResponse(response) {
   var resultContainer = document.getElementById("resultContainer");
   resultContainer.innerHTML = response;
 }

 document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("submitBtn").addEventListener("click", function () {
    document.querySelector(".textC").style.display = "none";
  });
});


window.addEventListener("DOMContentLoaded", function () {
  fetch("login/check_login.php")
    .then(function (response) {
      return response.text();
    })
    .then(function (data) {
      if (data === "success") {
      } else {
        window.location.href = "login/login.html";
      }
    })
    .catch(function (error) {
      console.log(error);
    });
});


