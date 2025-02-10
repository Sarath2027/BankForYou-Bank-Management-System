const mongoose=require("mongoose");
//CONNECTION TO DATABASE
main().then((res)=>{console.log("s");}).catch((err)=>{console.log(err);});

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/BankForU");
}
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
let banks=[{
    B_Id:"BFY001",
    Branch_Name:"Ongole",
    Phone:"7873848938",
    Email:"bank001@bfy.co.in",
    Password:"BFY001XX",
    Loker:"1200000",
    Gold:"15kg",
    Other:"1000000"
    },
    {
        B_Id:"BFY002",
        Branch_Name:"Guntur",
        Phone:"6579393884",
        Email:"bank002@bgy.co.in",
        Password:"BFY002XX",
        Loker:"18759944",
        Gold:"29kg",
        Other:"10688399"
    }
];
bank.insertMany(banks).then((res)=>{
    console.log(res); 
});