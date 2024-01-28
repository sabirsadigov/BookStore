import { ref, set, get } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";
import {db} from "./fire.js";
import  * as myClasses from "./classes.js";




document.getElementById("formContact").addEventListener("submit", (e)=>{
    e.preventDefault()
    const  contact = new myClasses.ContactUs(
    document.getElementById("name").value,
    document.getElementById("address").value,
    document.getElementById("email").value,
    document.getElementById("number").value,
    document.getElementById("note").value
);
    get(ref(db, '/contactus')).then(snapshot=>{
        const answer = snapshot.val();

        if(answer !==null){
            answer.push(contact);
            set(ref(db, '/contactus'), answer);
        }else{
            set(ref(db, '/contactus'), [contact]);
        }
        document.getElementById("successAlert").style.display= "block";
        delaySuccess()

        document.getElementById("name").value = '';
        document.getElementById("address").value = '';
        document.getElementById("email").value = '';
        document.getElementById("number").value = '';
        document.getElementById("note").value = '';
    })
});



