const router = require("express").Router();
const conn = require("../db/dbConnection");
const { body, validationResult } = require("express-validator");
const util = require("util");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const authorize=require("../middleware/authorize");

//accept request
router.put("",
    body("email"),
    body("bookName"),
    body("bookState"),
    async(req,res) =>{
        try{
            const query = util.promisify(conn.query).bind(conn);
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({errors: errors.array() })
            }
            const updateObject={
                bookState:req.body.bookState,
            }
            await query("update interactivebook	 set ? where userEmail= ? and bookName=?",[updateObject,req.body.email,req.body.bookName]);
            res.status(200).json({msg:"updated"});
        }catch(err){
            console.log(err);
        }    
    }
)

//deny request
router.delete("/:email/:bookName",
    async(req,res) =>{
        try{
            const query = util.promisify(conn.query).bind(conn);
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({errors: errors.array() })
            }
            const result=await query("delete from interactivebook where userEmail= ? and bookName=?",[req.params.email,req.params.bookName]);
            //console.log('the req params -->',req.params);
            //console.log('the req headers-->',req.headers);
            //console.log(result);
            return res.status(200).json([req.params.email,req.params.bookName]);
        }catch(err){
            // console.log(err);
            return res.status(500).json(err);
        }    
    }
)

//get all requests
router.get("",
    async(req,res) =>{
        try{
            const query = util.promisify(conn.query).bind(conn);
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({errors: errors.array() })
            }
            const results=await query("select * from interactivebook where bookState=0");
            return res.status(200).json(results);
            
        }catch(err){
            console.log(err);
        }    
    }
)

//accept request

router.put("/:email/:bookName",
    async(req,res) =>{
        try{
            const query = util.promisify(conn.query).bind(conn);
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({errors: errors.array() })
            }
            const updateObject={
                userEmail:req.params.email,
                bookName:req.params.bookName
            }
            const results=await query("UPDATE `interactivebook` SET `bookState`=1 WHERE userEmail=? AND bookName=?",[updateObject.userEmail,updateObject.bookName]);
            return res.status(200).json(results);
            
        }catch(err){
            console.log(err);
        }    
    }
)

router.get("/showAllHistory",
    async(req,res)=>{
        try{
            const query = util.promisify(conn.query).bind(conn);
            const results=await query("select * from readershistory ORDER BY date DESC");
            console.log('results-->',results);
            return res.status(200).json(results);
        }
        catch(err){
            console.log('err-->',err);
        }
    }
)

module.exports = router;