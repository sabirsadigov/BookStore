const title = document.getElementById("sTitle");
const author = document.getElementById("sAuthor");
const desc = document.getElementById("sDesc");
const img = document.getElementById("sImg");
const leftArrow = document.getElementById("leftArrow");
const rightArrow = document.getElementById("rightArrow");

let books;
let counter = 0;

async function makeARequest(word) {
    return (await fetch(`https://www.googleapis.com/books/v1/volumes?q=${word}`)).json()
}

function showArrows(){
    if(counter<books.length-1){
        rightArrow.style.display = 'block';
    }else{
        rightArrow.style.display = 'none';
    }

    if(counter!==0){
        leftArrow.style.display = 'block';
    }else{
        leftArrow.style.display = 'none';
    }
}

function showBooks() {
    title.innerText = String(books[counter]['volumeInfo']['title']);
    author.innerText =  books[counter]['volumeInfo']['authors'].join(" ");
    desc.innerText = books[counter]['volumeInfo']['description'];
    img.setAttribute("src", books[counter]['volumeInfo']['imageLinks']['thumbnail']);
}


document.getElementById("search").addEventListener("submit", e=>{
    e.preventDefault()
    let input = document.getElementById("searchText");


    makeARequest(input.value ).then(answer=>{
        counter=0;
        books = answer['items'];
        showArrows()
        showBooks();
    });

});

rightArrow.addEventListener("click", ()=>{
    counter++;
    showArrows();
    showBooks();
});


leftArrow.addEventListener("click", ()=>{
    counter--;
    showArrows();
    showBooks();
});