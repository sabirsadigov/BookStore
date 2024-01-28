import { ref, set, get } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";
import {db} from "./mainLogic/fire.js";
import  * as myClasses from "./mainLogic/classes.js";


let hamburger= document.querySelector(".hamburger");
let mobMenu = document.querySelector(".mobile_menu");
let navLink= document.querySelectorAll(".mobile_menu ul a") 

hamburger.addEventListener("click", ()=>{
    mobMenu.classList.toggle("active")
    hamburger.classList.toggle("active")
})

navLink.forEach((item)=>{
    item.addEventListener("click", ()=>{
        hamburger.classList.remove("active")
        mobMenu.classList.remove("active")
    })
})

// !popup

let userBtn = document.querySelector(".user_account");
let popUp = document.querySelector(".popup");
let form = document.querySelector(".popup form");

userBtn.addEventListener("click", function(event) {
  popUp.style.display = "block";
  event.stopPropagation();
});

form.addEventListener("click", function(event) {
  event.stopPropagation();
});

document.addEventListener("click", function() {
  popUp.style.display = "none";
});


window.addEventListener("load",()=>{
   get(ref(db, '/aboutUs')).then(snapshot=>{
       const currentAbout = snapshot.val();
       if(currentAbout!==null){
           document.getElementById("title").innerText = currentAbout.title;
           document.getElementById("desc").innerText = currentAbout.description;
           document.getElementById("imgsrc").setAttribute("src",
               currentAbout.imgSrc);
       }
   });
});