let balance_one=document.querySelector(".bal_one");
const mode=document.querySelector(".mode");
let bal_head=document.querySelector(".bal_head");
let count=0;
mode.addEventListener("click",()=>{
    if(count%2==0){
        document.querySelector("body").style.backgroundColor="black";
        document.querySelector("body").style.color="white";
        bal_head.style.color="white";
    }
    else{
        document.querySelector("body").style.backgroundColor="white";
        document.querySelector("body").style.color="black";
        bal_head.style.color="black";
    }
    count++;
});
let customer=document.querySelector(".customer");
let bank=document.querySelector(".bank");
let loan=document.querySelector(".loan");
let bal_cus=document.querySelector(".two_cus");
let bal_bank=document.querySelector(".two_bank");
let bal_loan=document.querySelector(".two_loan");
customer.addEventListener("click",()=>{
    bal_cus.classList.remove("hide");
    bal_bank.classList.add("hide");
    bal_loan.classList.add("hide");
});
bank.addEventListener("click",()=>{
    bal_cus.classList.add("hide");
    bal_bank.classList.remove("hide");
    bal_loan.classList.add("hide");
});
loan.addEventListener("click",()=>{
    bal_cus.classList.add("hide");
    bal_bank.classList.add("hide");
    bal_loan.classList.remove("hide");
});