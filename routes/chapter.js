const router =require("express").Router();
const conn = require("../db/dbConnection");
const {body , validationResult, check} = require("express-validator")
const util = require("util");
const bcrypt = require("bcrypt");
const crypto = require("crypto")
const admin = require("../middleware/admin")


router.post("/:bookName",

body("title"),
body("description"),

async(req,res) =>{
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array() })
        }

        const query = util.promisify(conn.query).bind(conn);

        const getChapter = await query("select * from chapter where bookName = ? AND title = ? ",[req.params.bookName , req.body.title])
       
        if(getChapter.length>0){
           return res.status(404).json({
                msg:"Already exist"
            })
        } 
        

        const chapterObject = {
            bookName:req.params.bookName,
            title:req.body.title,
            description:req.body.description,
        }
        // 3) save

        await query("insert into chapter set ?",chapterObject)
        return res.status(200).json({
            msg:"Add chapter"
        })


    }catch(err){
        //console.log(err)
        res.status(500).json(err);
    }
    

}) 

router.get("/:bookName",

body("title"),
body("description"),

async(req,res) =>{
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array() })
        }

        const query = util.promisify(conn.query).bind(conn);

        const getChapter = await query("select * from chapter where bookName = ? ",[req.params.bookName])
        
        res.status(200).json(getChapter)
 

    }catch(err){
            console.log(err)
    }
    

})

router.put("/:bookName/:title",

    body("title"),
    body("description"),

    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() })
            }

            const query = util.promisify(conn.query).bind(conn);

            const getChapter = await query("select * from chapter where bookName = ? AND title = ?", [req.params.bookName, req.body.title])

            if (getChapter.length > 0 && getChapter[0].title != req.params.title) {
                return res.status(404).json({
                    msg: "Title exist"
                })
            }

            const updateChapter = await query("select * from chapter where bookName = ? AND title = ?", [req.params.bookName, req.params.title])


            const objChapter = {
                title: req.body.title,
                description: req.body.description
            }

            const Upadted = await query("update chapter set ? where title = ? AND bookName = ?", [objChapter, req.params.title, req.params.bookName])
            res.status(200).json({
                msg: "Upadted Successfully",
                "":Upadted
            })


        } catch (err) {
            console.log(err)
        }


    })

router.delete("/:bookName/:title",

async(req,res) =>{
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array() })
        }
        const query = util.promisify(conn.query).bind(conn);

        const results =await query("delete from chapter where title = ? AND bookName = ?",[req.params.title , req.params.bookName])
        //console.log(results);
        return res.status(200).json({
            msg:"Delete successfully"
        })


    }catch(err){
        console.log(err)
    }
    

})

router.get("/:bookName/:title",

async(req,res) =>{
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array() })
        }

        const query = util.promisify(conn.query).bind(conn);

        const getChapter = await query("select * from chapter where bookName = ? AND title = ? ",[req.params.bookName,req.params.title])
        
        res.status(200).json(getChapter[0])

    }catch(err){
        //console.log(err)
        return res.status(500).json(err);
    }
    

})

module.exports = router;