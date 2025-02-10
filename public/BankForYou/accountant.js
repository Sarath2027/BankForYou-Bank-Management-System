let acc_drop=document.querySelector(".acc_drop");
let transactions_btn=document.querySelector(".transactions_btn");
let count2=0;
transactions_btn.addEventListener("click",()=>{
    if(count2%2==0){
        acc_drop.classList.remove("hide");
    }
    else{
        acc_drop.classList.add("hide");
    }
    count2++;
});
let btns=document.querySelectorAll(".btn");
btns.forEach((box)=>{
    box.addEventListener("click",()=>{
        btns.forEach((box2)=>{
            if(box!=box2){
                box2.style.backgroundColor="white";
                box2.style.color="black";
            }
            if(box===box2){
                box.style.backgroundColor="blue";
                box.style.color="white";
            }
        });
    });
    
});
let debit=document.querySelector(".debit");
let credit=document.querySelector(".credit");
let acc_statement=document.querySelector(".acc_statement");
let create_acc=document.querySelector(".create_acc");
let loan=document.querySelector(".loan");
document.querySelector(".debit_btn").addEventListener("click",()=>{
    debit.classList.remove("hide");
    credit.classList.add("hide");
    acc_statement.classList.add("hide");
    create_acc.classList.add("hide");
    loan.classList.add("hide");
});
document.querySelector(".credit_btn").addEventListener("click",()=>{
    debit.classList.add("hide");
    credit.classList.remove("hide");
    acc_statement.classList.add("hide");
    create_acc.classList.add("hide");
    loan.classList.add("hide");
});
document.querySelector(".acc_statement_btn").addEventListener("click",()=>{
    debit.classList.add("hide");
    credit.classList.add("hide");
    acc_statement.classList.remove("hide");
    create_acc.classList.add("hide");
    loan.classList.add("hide");
});
document.querySelector(".create_acc_btn").addEventListener("click",()=>{
    debit.classList.add("hide");
    credit.classList.add("hide");
    acc_statement.classList.add("hide");
    create_acc.classList.remove("hide");
    loan.classList.add("hide");
});
document.querySelector(".loan_btn").addEventListener("click",()=>{
    debit.classList.add("hide");
    credit.classList.add("hide");
    acc_statement.classList.add("hide");
    create_acc.classList.add("hide");
    loan.classList.remove("hide");
});