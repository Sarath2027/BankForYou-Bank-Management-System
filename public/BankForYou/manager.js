const mode=document.querySelector(".mode");
let element=document.querySelectorAll("a");
let td=document.querySelector("td");
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
let body_acc_create=document.querySelector(".body_acc_create");
let body_loan_sanc=document.querySelector(".body_loan_sanc");
let acc_create=document.querySelector(".acc_create");
let loan_sanc=document.querySelector(".loan_sanc");
acc_create.addEventListener("click",()=>{
    body_acc_create.classList.remove("hide");
    body_loan_sanc.classList.add("hide");
    body_complaint.classList.add("hide");
});
loan_sanc.addEventListener("click",()=>{
    body_acc_create.classList.add("hide");
    body_loan_sanc.classList.remove("hide");
    body_complaint.classList.add("hide");
});

let sec2=document.querySelectorAll(".sec2");
let sec3=document.querySelectorAll(".sec3");
let sec4=document.querySelectorAll(".sec4");
let sec5=document.querySelectorAll(".sec5");
let btns=document.querySelectorAll(".show");
let c2=[]
for(let x=0;x<btns.length;x++){
    c2[x]=0;
}
let iterate=0;
btns.forEach((i,ele)=>{
    i.addEventListener("click",()=>{
        if(c2[iterate]%2==0){
            sec2[ele].classList.remove("hide");
            sec3[ele].classList.remove("hide");
            sec4[ele].classList.remove("hide");
            sec5[ele].classList.remove("hide");
            i.textContent="<";
        }
        else{
            sec2[ele].classList.add("hide");
            sec3[ele].classList.add("hide");
            sec4[ele].classList.add("hide");
            sec5[ele].classList.add("hide");
            i.textContent="^";
        }
        c2[iterate]++;
        iterate=0;
    });
    iterate++;
});
