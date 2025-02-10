const mode=document.querySelector(".mode");
let element=document.querySelectorAll("a");
let count=0;
mode.addEventListener("click",()=>{
    if(count%2==0){
        document.querySelector("body").style.backgroundColor="black";
        document.querySelector("body").style.color="white";
        element.forEach(e=> {
            e.style.color="white";
        });
    }
    else{
        document.querySelector("body").style.backgroundColor="white";
        document.querySelector("body").style.color="black";
        element.forEach(e=> {
            e.style.color="black";
        });
    }
    count++;
});
