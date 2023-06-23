const mongoose =  require('mongoose');
const dotenv = require("dotenv");
const express = require ("express");
const bodyParser  = require("body-parser")
const {createAccount} = require("./validation")

const app = express ();
app.use(bodyParser.json())

const PORT = process.env.PORT || 4000;
const randAcctNo= Math.floor(1000000000 + Math.random() * 9000000000);

dotenv.config({path: "./config.env"})


mongoose.connect("mongodb://127.0.0.1:27017/Bank", {
    useNewUrlParser : true,
})

 const bankSchema= new mongoose.Schema({
         accountNumber:Number,
         balance: Number,
         createAt: String
 })
const balanceCollection= mongoose.model("balance", bankSchema);


app.post ("/create-account", (req, res) => {
    const {error, value}=createAccount(req.body)
    try {
        const balance= new balanceCollection({

            accountNumber:randAcctNo,
            balance:value.balance,
            createAt:Date()
        })
        balance.save()
            res.status(200).send("Account created successfully!!!")
    
        
    } catch (error) {
        console.error(error);
        
    }
    console.log(process.env)
    res.send ("create-account");
})

app.get("/balance/:account", async (req, res)=>{
    try {
        const acct= await balanceCollection.findOne({accountNumber: req.body.accountNumber}, ('accountNumber balance'))
        res.send(acct)
    } catch (error) {
        console.error(error);
    }

})

app.get ("/balance", async (req, res) => {
    try {
        const balances= await balanceCollection.find({})
        res.json (balances);
    } catch (error) {
        console.error(error);
    }
})

app.post ("/transfer", (req, res) => {
    res.send ("transfer");
})


app.listen(4000, console.log("Server running"))