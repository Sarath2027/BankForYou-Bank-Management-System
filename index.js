const express=require("express");
const app=express();
const port=3000;
const fs=require("fs");
const path=require("path");
const methodOverride=require("method-override");
const mongoose=require("mongoose");
const multer=require("multer");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));

app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));
app.use(methodOverride('_method'));

//CONNECTION TO DATABASE
main().then((res)=>{console.log("s");}).catch((err)=>{console.log(err);});

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/BankForU");
}

//Image Storage
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"./uploads");
    },
    filename:function(req,file,cb){
        cb(null,file.fieldname+"_"+Date.now());
    }
});

var upload=multer({
    storage:storage,
});

//SCHEMAS AND MODELS
const bankSchema=new mongoose.Schema({
    B_Id:String,
    Branch_Name:String,
    Phone:String,
    Email:String,
    Password:String,
    Loker:String,
    Gold:String,
    Other:String
});
const bank=new mongoose.model("bank",bankSchema);
const accountSchema=new mongoose.Schema({
    acc_no:String,
    acc_name:String,
    sodowo:String,
    aadhar:String,
    dob:String,
    Phone:String,
    email:String,
    nominee_name:String,
    nominee_ph:String,
    type:{type:String,default:"saving"},
    balance:{type:String,default:1000},
    address:String,
    B_Id:String,
    img:{
        data:Buffer,
        contentType:String
    },
    created_date:String,
});
const account=new mongoose.model("account",accountSchema);
const loanSchema=new mongoose.Schema({
    acc_no:String,
    acc_name:String,
    occupation:String,
    purpose:String,
    amount:String,
    return_type:String
});
const loan=new mongoose.model("loan",loanSchema);
const complaintSchema=new mongoose.Schema({
    name:String,
    B_Id:String,
    role:String,
    complaint:String,
    phone:String,
    email:String,
});
const complaint=new mongoose.model("complaint",complaintSchema);
const transactionSchema=new mongoose.Schema({
    date:String,
    acc_no:String,
    acc_name:String,
    type:String,
    amount:String,

});
const transaction=new mongoose.model("transactions",transactionSchema);

//ROUTING
app.get("/BankForYou",(req,res)=>{
    res.render("home.ejs");
});
app.get("/BankForYou/Home",(req,res)=>{
    res.render("home.ejs");
});
app.get("/BankForYou/Balance",(req,res)=>{
    let data={};
    res.render("balance.ejs",{data});
});
app.post("/BankForYou/Balance",(req,res)=>{
    let acc_no=req.body.acc_no;
    account.findOne({acc_no:acc_no}).then((data)=>{
        res.render("balance.ejs",{data});
    })
})
app.get("/BankForYou/Accountant",(req,res)=>{
    res.render("accountant.ejs");
});
app.post("/BankForYou/Accountant/Debit",(req,res)=>{
    let acc_no=req.body.acc_no;
    account.findOne({acc_no:acc_no}).then((data)=>{
        let bank_id=data.B_Id;
        bank.findOne({B_Id:bank_id}).then((bank)=>{
            res.render("debit.ejs",{data:data,bank:bank});
        });
    });
});
app.post("/BankForYou/Account/debit_on",async(req,res)=>{
    let acc_no=req.body.acc_no;
    let bal="";
    await account.findOne({acc_no:acc_no}).then((data)=>{
        bal=data.balance;
    });
    bal=parseInt(bal)-parseInt(req.body.debit_amount);
    await account.updateOne({acc_no:acc_no},{balance:bal});
    let transaction1=new transaction({
        date:req.body.date,
        acc_no:req.body.acc_no,
        acc_name:req.body.acc_name,
        type:"Debit",
        amount:req.body.debit_amount,
    });
    transaction1.save();
    res.redirect("/BankForYou/Accountant");
});
app.post("/BankForYou/Accountant/Credit",(req,res)=>{
    let acc_no=req.body.acc_no;
    account.findOne({acc_no:acc_no}).then((data)=>{
        let bank_id=data.B_Id;
        bank.findOne({B_Id:bank_id}).then((bank)=>{
            res.render("credit.ejs",{data:data,bank:bank});
        });
    });
});
app.post("/BankForYou/Account/credit_on",async(req,res)=>{
    let acc_no=req.body.acc_no;
    let bal="";
    await account.findOne({acc_no:acc_no}).then(async(data)=>{
        bal=data.balance;
        bal=parseInt(bal)+parseInt(req.body.credit_amount);
        await account.updateOne({acc_no:acc_no},{balance:bal},{new:true});
    });
    let transaction1=new transaction({
        date:req.body.date,
        acc_no:req.body.acc_no,
        acc_name:req.body.acc_name,
        type:"Credit",
        amount:req.body.credit_amount,
    });
    transaction1.save();
    res.redirect("/BankForYou/Accountant");
});
app.post("/BankForYou/Accountant/new",upload.single('image'),async (req,res)=>{
    let send="";
    await account.find().then((data)=>{
        let len=data.length;
        send=parseInt(data[len-1].acc_no)+1;
    });
    //Date :-
    let d=new Date();
    let date=("0"+d.getDate()).slice(-2);
    let month=("0"+(d.getMonth()+1)).slice(-2);
    let=year=d.getFullYear();

    let new_acc=new account({
    acc_no:`${send}`,
    acc_name:req.body.f_name+" "+req.body.m_name+" "+req.body.l_name,
    sodowo:req.body.sdw,
    aadhar:req.body.aadhar,
    dob:req.body.dob,
    Phone:req.body.phone,
    email:req.body.email,
    nominee_name:req.body.nominee_name,
    nominee_ph:req.body.nominee_ph,
    address:req.body.address,
    B_Id:req.body.b_id,
    img:{
        data:fs.readFileSync(path.join(__dirname+'/uploads/'+req.file.filename)),
        contentType:'image/png'
    },
    created_date:year+"-"+month+"-"+date,
    });
    await new_acc.save();
    res.redirect("/BankForYou/Accountant");
});
app.post("/BankForYou/Accountant/Account_statement",(req,res)=>{
    let acc_no=req.body.acc_no;
    account.findOne({acc_no:acc_no}).then((data)=>{
        if(data!=null){
        let bank_id=data.B_Id;
        bank.findOne({B_Id:bank_id}).then((bank)=>{
            res.render("acc_statement.ejs",{data:data,bank:bank});
        });}
        else{
            res.redirect("/BankForYou/Accountant");
        }
    });
});
app.post("/BankForYou/Accountant/Loan",(req,res)=>{
    let acc_no=req.body.acc_no;
    account.findOne({acc_no:acc_no}).then((data)=>{
        res.render("loan_initiation.ejs",{acc_no:data.acc_no,acc_name:data.acc_name});
    });
});
app.post("/BankForYou/Accountant/LoanInitiation",(req,res)=>{
    let loan1=new loan({
        acc_no:req.body.acc_no,
        acc_name:req.body.acc_name,
        occupation:req.body.occupation,
        purpose:req.body.purpose,
        amount:req.body.amount,
        return_type:req.body.return_type
    });
    loan1.save().then((data)=>{
        console.log(data);
    }); 
    res.redirect("/BankForYou/Accountant");
});
app.get("/BankForYou/Transactions",(req,res)=>{
    let val=[];
    res.render("transactions.ejs",{val});
});
app.post("/BankForYou/Transactionsacc_no",async(req,res)=>{
    let val=[];
    if(req.body.acc_no){
        await transaction.find({acc_no:req.body.acc_no}).then((data)=>{
            val=data;
        });
    }
    res.render("transactions.ejs",{val});
});
app.post("/BankForYou/Transactionsdate",async(req,res)=>{
    let val=[];
    if(req.body.date){
        await transaction.find({date:req.body.date}).then((data)=>{
            val=data;
        });
    }
    res.render("transactions.ejs",{val});
});
app.get("/BankForYou/Complaint",(req,res)=>{
    res.render("complaint.ejs");
});
app.post("/BankForYou/Complaintadd",(req,res)=>{
    let complaint1=new complaint({
        name:req.body.name,
        B_Id:req.body.branch_id,
        role:req.body.role,
        complaint:req.body.complaint,
        phone:req.body.ph_no,
        email:req.body.email,
    })
    complaint1.save();
    res.redirect("/BankForYou/Complaint");
});
app.get("/BankForYou/Manager",(req,res)=>{
    let val=[];
    res.render("manager.ejs",{val:val});
});
app.post("/BankForYou/managerdate",(req,res)=>{
    let date=req.body.date;
    account.find({created_date:date}).then((val)=>{
        res.render("manager.ejs",{val:val});
    }); 
});
app.post("/BankForYou/managername",(req,res)=>{
    let acc_name=req.body.acc_name;
    account.find({acc_name:acc_name}).then((val)=>{
        res.render("manager.ejs",{val:val});
    }); 
});
app.post("/BankForYou/managerupdate",(req,res)=>{
    let acc_no=req.body.acc_no;
    account.findOne({acc_no:acc_no}).then((data)=>{
        bank.findOne({B_Id:data.B_Id}).then((bank)=>{
            res.render("update.ejs",{data:data,bank:bank});
        });
    });
});
app.post("/BankForYou/managerupdatedone",(req,res)=>{
    let acc_no=req.body.acc_no;
    let up={
    acc_name:req.body.acc_name,
    sodowo:req.body.sdw,
    aadhar:req.body.aadhar,
    dob:req.body.dob,
    Phone:req.body.phone,
    email:req.body.email,
    nominee_name:req.body.nominee_name,
    nominee_ph:req.body.nominee_ph,
    address:req.body.address,
    B_Id:req.body.b_id,
    };
    account.updateOne({acc_no:acc_no},up,{new:true}).then((data)=>{console.log(data);});
    res.redirect("/BankForYou/Manager");
});
app.post("/BankForYou/managerdelete",async(req,res)=>{
    let acc_no=req.body.acc_no;
    await account.deleteOne({acc_no:acc_no});
    await transaction.deleteMany({acc_no:acc_no});
    res.redirect("/BankForYou/Manager");
});
app.post("/BankForYou/managerloan",(req,res)=>{
    let acc_no=req.body.acc_no;
    loan.findOne({acc_no:acc_no}).then((data)=>{
        if(data!=null){
            res.render("loan_view.ejs",{data});}
        else{
            res.redirect("/BankForYou/Manager");
        }
    });
});
app.post("/BankForYou/managerclearloan",(req,res)=>{
    let acc_no=req.body.acc_no;
    loan.deleteOne({acc_no:acc_no}).then((data)=>{console.log(data);});
    res.redirect("/BankForYou/Manager");
});
app.listen(port,(req,res)=>{
    console.log("App is Listening..");
});