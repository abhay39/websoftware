import express from 'express';
import mongoose from 'mongoose';
import Admin from './models/admin.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import cors from 'cors'
import Sales from './models/sales.js';
import Users from './models/users.js';

const app = express();
app.use(express.json())
app.use(cors());

const MONGO_URL="mongodb+srv://abhaytechhub:abhaytechhub@cluster0.uer98j3.mongodb.net/websoftware?retryWrites=true&w=majority";
const JWT_SEC="356d0b7a7926090a4e6768342b3da7f7810f194c4ee3b757d1e517fcaf59085d" ;

const connect=async()=>{
    try{
        await mongoose.connect(MONGO_URL)
        console.log("Connected to MongoDB")
    }catch(err){
        console.log(err)
    }
}

connect();

app.get("/", (req, res) => {
    res.send("Hello World");
})

app.post("/api/addAdmin",async(req,res)=>{
    const {email,password}=req.body;
    try{
        const checkAdmin=await Admin.findOne({
            email: email
        });
        if(checkAdmin){
            res.status(400).send("Admin already exists")
        }else{
            const salt=await bcrypt.genSalt(10);
            const hashedPassword=await bcrypt.hash(password,salt);
            const newAdmin=new Admin({
                email:email,
                password:hashedPassword
            })
            await newAdmin.save();
            res.status(200).send("Admin added")
        }
    }catch(err){
        console.log(err)
    }
})

app.post("/api/checkAdminLogin",async(req,res)=>{
    const {email,password}=req.body;
    try{
        const checkAdmin=await Users.findOne({
            email: email
        });
        if(checkAdmin){
            const matchPassword =await bcrypt.compare(password,checkAdmin.password);
            if(matchPassword){
                const token=jwt.sign({id:checkAdmin._id},JWT_SEC,{
                    expiresIn:"720h"
                })
                res.status(200).json({
                    "message":`${checkAdmin.role} logged in successfully`,
                    token:token
                })
            }else{
                res.status(400).json({
                    "message":"Invalid password",
                    token:token
                })
                res.status(400).send("")
            } 
        }else{
            res.status(404).json({
                "message":"Admin doesn't exist",
                token:token
            })
        }
    }catch(err){
        console.log(err)
    }
})

app.get("/api/getAdminDetails/:token",async(req,res)=>{
    const token=req.params.token;
    try{
        const decoded=jwt.verify(token,JWT_SEC);
        const admin=await Users.findOne({
            _id:decoded.id
        })
        if(admin){
            res.status(200).json({
                "message":"Admin details",
                admin:admin
            })
        }else{
            res.status(404).json({
                "message":"Admin not found",
            })
        }
    }catch(err){
        console.log(err)
    }
})

app.post("/api/updatePassword", async (req, res) => {
    const { email, password, newPassword } = req.body;
    console.log(email, password, newPassword)

    try {
        const checkAdmin = await Users.findOne({ email: email });

        if (!checkAdmin) {
            // Handle the case where the email doesn't match any user
            return res.status(404).json({ message: "User not found" });
        }

        const matchPassword = await bcrypt.compare(password, checkAdmin.password);
       

        if (matchPassword) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);

            const UpdatePassword = await Users.findOneAndUpdate(
                { email: email },
                { password: hashedPassword }
            );

            res.status(200).json({
                message: "Password updated successfully",
            });
            
        } else {
            
            res.status(401).json({ message: "Invalid password" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


app.post("/api/createSales",async(req,res)=>{
    const data=req.body;
    const {boxType,date,forWho,place,ribbonText1,ribbonText2,roomNumber,size1,time,wantRibbon,addedBy}=data;

    try{
        const checkAdmin=await Sales.findOne({
            forWho: forWho
        });
        if(checkAdmin){
            res.status(400).json({
                "message":"Sale Already created",
            })
        }else{
            const newSales=new Sales({
                boxType:boxType,
                date:date,
                forWho:forWho,
                place:place,
                ribbonText1:ribbonText1,
                ribbonText2:ribbonText2,
                roomNumber:roomNumber,
                size1:size1,
                time:time,
                wantRibbon:wantRibbon,
                addedBy:addedBy
            })
            await newSales.save();
            res.status(200).json({
                "message":"Sale created successfully",
            })
        }
    }catch(err){
        console.log(err)
    }
})

app.post("/api/addUsers",async(req,res)=>{
    const data=req.body;
    const {city,comissions,country,email,firstName,lastName,password,phone,username,zip,address,role}=data;

    try{
        const checkUser=await Users.findOne({
            email: email
        });
        if(checkUser){
            res.status(400).json({
                "message":"User Already created",
            })
        }else{
            const salt=await bcrypt.genSalt(10);
            const hashedPassword=await bcrypt.hash(password,salt);
            const newUser=new Users({
                city:city,
                comissions:comissions,
                country:country,
                email:email,
                firstName:firstName,
                lastName:lastName,
                password:hashedPassword,
                phone:phone,
                username:username,
                zip:zip,
                address:address,
                role:role
            })
            await newUser.save();
            res.status(200).json({
                "message":"User created successfully",
            })
        }
    }catch(err){
        console.log(err)
    }
})

app.get("/api/totalUsers",async(req,res)=>{
    try{
        const totalUsers = await Users.find();
        res.status(200).json({
            totalUsers:totalUsers
        })
    }catch(err){
        console.log(err)
    }
})

app.get("/api/totalSales",async(req,res)=>{
    try{
        const totalSales = await Sales.find();
        res.status(200).json({
            totalSales:totalSales
        })
    }catch(err){
        console.log(err)
    }
})


app.listen(5000,()=>{
    console.log("Server is running on port 5000");
})