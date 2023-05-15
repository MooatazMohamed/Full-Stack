const router = require("express").Router();
const conn = require("../db/dbConnection");
const authorized = require("../middleware/authorize");
const admin = require('../middleware/admin');
const { body , validationResult} = require("express-validator");
const upload = require("../middleware/uploadimages");
const { query } = require("express");
const util = require("util");
const fs = require("fs");

router.post("/:search",
    body("email"),
    async(req,res)=>{
        try{
            const query=util.promisify(conn.query).bind(conn);
            
            let dt=new Date();
            
            //console.log(dt.toISOString().split('T'))
            //let dtStr=dt.getDate()+'/'+dt.getMonth()+'/'+dt.getYear()+'||'+dt.getHours()+':'+dt.getMinutes()+':'+dt.getSeconds();
            
            let dtStr=dt.toISOString().split('T')
            //console.log(dtStr.toString())

            const searchHistory={
              userEmail:req.body.email,
              bookName:req.params.search,
              date:dtStr.toString()
            }
            //console.log('this is search histroy ',searchHistory);

            await query("INSERT INTO readershistory set ?",searchHistory);
            return res.status(200).json(searchHistory);
        }catch(e){
            console.log(e);
            console.log("------------------------");
        }
    }
)


//search in history
router.get("/:email/:role",
    //body("email"),
    async(req,res)=>{
        try{
            const query=util.promisify(conn.query).bind(conn);
            
            //const results=await query("SELECT * FROM readershistory where userEmail=?",req.params.email);
            if(req.params.role==1){
                const results=await query("SELECT * FROM readershistory");
                return res.status(200).json(results);
            }
            else{
                const results=await query("SELECT * FROM readershistory where userEmail=?",req.params.email);
                return res.status(200).json(results);
            }
        }catch(e){
            console.log(e);
            console.log("------------------------");
        }
    }
)

router.post(
    "", 
    //admin,
    upload.array("pdfImage",2),
    async (req, res) => {
      try{
      const errors = validationResult(req);
          if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
          }
          //console.log(req.files[0].filename,'--',req.files[1].filename);
          res.status(200).json({'files':req.files});
      }catch(err){
          console.log(err)
          //res.json(500).json(err)
        }
  });
  
module.exports = router;