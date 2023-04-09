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


const options1 = selector_categorie_nationala.querySelectorAll("li");
options1.forEach(element => {
   element.addEventListener('click', ()=> daclick(element,options1));
   element.addEventListener('click', ()=> {selector_categorie_nationala.classList.toggle("active")});
   
});


function daclick(selectedLi,vector)
{
    vector.forEach(element => {element.classList.remove("active")
        
    });
    selectedLi.classList.add("active");
    
    console.log(selectedLi.innerText);

}

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

