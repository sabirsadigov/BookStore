// function  makeCart(book){
//     return `<div class="card swiper-slide">
//               <div class="img">
//                 <img src="${book.imgSrc}" alt="${book.title}" />
//               </div>
//               <div class="content">
//                 <h3>${book.title}</h3>
//                 <p>${book.author}</p>
//                 <button>Read more</button>
//               </div>
//               ${book.isNew===true?"<span>New</span>": ""}
//             </div>`
// }
//
// function  showCart(book){
//     document.getElementById("cat").insertAdjacentHTML('beforeend',
//         makeCart(book))
// }
//
// class Book {
//     title;
//     author;
//     imgSrc;
//     isNew;
//     category;
//
//     constructor(title, author, imgSrc, isNew, category) {
//         this.author = author;
//         this.title = title;
//         this.imgSrc = imgSrc;
//         this.isNew = isNew;
//         this.category = category;
//     }
// }
//
//
//
// let books  = [];
// let CurrentShowedBooks = [];
// const fantasyClick = document.getElementById("fantastic");
// const allBooksSwiper = document.getElementById("cat");
//
// books.push(new Book("Order in Chaos", "Konstantin Koptelov", "./assets/img/image 4.svg", true, "Fantastic"));
// books.push(new Book("The Alchemist", "Paulo Coelho", "./assets/img/image 5.svg", true, "Self-development"));
// books.push(new Book("Love You Forever", "Robert Mansh", "./assets/img/image 6.svg", false, "Baby"));
// books.push(new Book("Konstantin Koptelov", "some Author", "./assets/img/image 3.svg", false, "Clas"));
//
//
// window.addEventListener("load", ()=>{
//     for (let book of books) {
//         showCart(book);
//     }
// });
//
//
// fantasyClick.addEventListener("click", ()=>{
//     while (allBooksSwiper.firstChild) {
//         allBooksSwiper.removeChild(allBooksSwiper.lastChild);
//     }
//
//     for (let book of books) {
//         if(book.category === "Fantastic"){
//             showCart(book)
//         }
//     }
//
// });
//
// document.getElementById("showAll").addEventListener("click", ()=>{
//     while (allBooksSwiper.firstChild) {
//         allBooksSwiper.removeChild(allBooksSwiper.lastChild);
//     }
//
//     for (let book of books) {
//         showCart(book);
//         console.log(book);
//     }
// })

import { ref, set, onValue, get } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";
import {db} from "./mainLogic/fire.js";
import  * as myClasses from "./mainLogic/classes.js";
import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.mjs'

let swiper = new Swiper(".slide_content", {
    slidesPerView: 4,
    spaceBetween: 25,
    centerSlide: true, // Remove quotes around true
    fade: true,        // Remove quotes around true
    grabCursor: true,  // Remove quotes around true
    pagination: {
        el: ".swiper-pagination",
        clickable: true
    },
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        500: {
            slidesPerView: 2,
        },
        992: {
            slidesPerView: 3,
        }
    },
    observe:true,
    freeMode: true,
    mousewheel: true,
    loop: false,
    observer: true,
    observeParents: true,
});


function showCategories(cats) {
    const parent = document.getElementById("categories");

    for (let i in cats) {
        parent.insertAdjacentHTML("beforeend",
            `<span id="myId-${cats[i]}">${cats[i]}</span>`)
    }
    addEventListenersToCategory(cats)
}

function addEventListenersToCategory(cats) {
    for (let i in cats) {
        document.getElementById(`myId-${cats[i]}`).addEventListener("click",()=>{
            changeSliders(cats[i])
        })
    }
}

function changeSliders(category) {
    get(ref(db, '/books')).then(snapshot=>{
        const books = snapshot.val();
        let trueBooks =  books.filter(x=>x.category === category);
        const parentDiv = document.getElementById("cat");

        while (parentDiv.firstChild) {
            parentDiv.removeChild(parentDiv.lastChild);
        }
        showBooks(trueBooks);
    });
}

function showBooks(books) {
    for (let i in books) {
        document.getElementById("cat").insertAdjacentHTML('beforeend',`<div class="card swiper-slide" >
              <div class="img">
                <img src="${books[i].imgUrl}" alt="${books[i].title}" />
              </div>
              <div class="content">
                <h3>${books[i].title}</h3>
                <p>${books[i].author}</p>
                <button>Read more</button>
              </div>
            </div>`)
    }

//     for (let i = 0; i < 10; i++) {
//         document.getElementById('cat').insertAdjacentHTML('beforeend',
//             `<div class="card swiper-slide" ></div>
// `)
//     }

    // mySwiper.append(`<div class="card swiper-slide" style="margin-right: 25px"></div>`)
}

window.addEventListener("load", ()=>{
    get(ref(db, '/categories')).then(snapshot=>{
        showCategories(snapshot.val());
    });

    get(ref(db, '/books')).then(snapshot=>{
        showBooks(snapshot.val());
    });
});


