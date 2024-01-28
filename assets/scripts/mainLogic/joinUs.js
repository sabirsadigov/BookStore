import { ref, set, get } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";
import {db} from "./fire.js";
import  * as myClasses from "./classes.js";

function showSucces(){
    document.getElementById("joinUs").style.height ='400px';
    document.querySelector(".alert-success").style.width = '80%';
    document.querySelector(".alert-success").style.display = "block";

    function delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }

    delay(5000).then(() => {
        document.getElementById("scAl").style.display = 'none';
        document.getElementById("joinUs").style.height ='250px';
        document.getElementById('nameJoinUsInput').value = '';
        document.getElementById('emailJoinUsInput').value = '';

    });

}

document.getElementById("joinUs").addEventListener("submit", (e)=>{
    e.preventDefault()
    let joinUses = [];
    const joinNameTag = document.getElementById("nameJoinUsInput");
    const joinEmailTag = document.getElementById("emailJoinUsInput");


    get(ref(db, '/joinUs')).then(snapshot=>{
       const oldJoin = snapshot.val();

       if(oldJoin===null){
           joinUses.push(new myClasses.JoinUs(joinNameTag.value, joinEmailTag.value));

           set(ref(db, '/joinUs'), joinUses);
           showSucces();
       }else{
           oldJoin.push(new myClasses.JoinUs(joinNameTag.value, joinEmailTag.value));

           set(ref(db, '/joinUs'), oldJoin);
           showSucces();

       }

    });

})