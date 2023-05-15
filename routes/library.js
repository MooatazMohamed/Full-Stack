const router = require("express").Router();
const conn = require("../db/dbConnection");
const authorized = require("../middleware/authorize");
const admin = require('../middleware/admin');
const { body , validationResult} = require("express-validator");
const upload = require("../middleware/uploadimages");
const { query } = require("express");
const util = require("util");
const fs = require("fs");
// Admin  [Create,UPDATE,DELETE]
router.post(
  "", 
  //admin,
  //upload.single("pdfFileUrl"),
  //upload.single("image_url"),
  upload.array("pdfImage",2),
  body("name")
   .isString()
   .withMessage("PLEASE ENTER A VALID NAME"),
  body("description")
   .isString()
   .withMessage("PLEASE ENTER A VALID DESCRIPTION"),
   body("auther")
   .isString()
   .withMessage("PLEASE ENTER A VALID AUTHER"),
   body("field")
   .isString()
   .withMessage("PLEASE ENTER A VALID FIELD"),
   body("publicationDate")
   .isString()
   .withMessage("PLEASE ENTER A VALID DATE"),
   
  async (req, res) => {
    try{
      const errors = validationResult(req);
      const query = util.promisify(conn.query).bind(conn);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        const checkBook=await query(`select * from book where name = '${req.body.name}'`);
        //console.log('check book---->',checkBook);
        if(checkBook[0]){
          return res.status(404).json({msg:"book is already here"});
        }
        const book = {
          name : req.body.name,
          description : req.body.description,
          auther:req.body.auther,
          field:req.body.field,
          publicationDate:req.body.publicationDate,
          //pdfFileUrl:req.files[0].filename,
          //imageUrl:req.files[1].filename
        }
        
        
        req.files.map(file=>{
          if(file.mimetype=="application/pdf"){
            book.pdfFileUrl=file.filename;
          }
          else{
            book.imageUrl=file.filename;
          }
        })

        //console.log(book);
        await query("insert into book set ? ",book);
        
        res.status(200).json({
          msg : "Library created SuccessFULLy",
        })
    }catch(err){
        //console.log(err)
        return res.status(500).json({msg:err})
      }
});

router.put(
  "/:bookName", 
  admin,
  upload.array("pdfImage",2),
  body("name"),
  //  .isString()
  //  .withMessage("PLEASE ENTER A VALID NAME")
  //  .isLength({min:10 })
  //  .withMessage("bOOK NAME MUST BE MORE THAN 9"),
  body("description"),
  //  .isString()
  //  .withMessage("PLEASE ENTER A VALID DESCRIPTION")
  //  .isLength({min:20 })
  //  .withMessage("bOOK NAME MUST BE MORE THAN 19") ,
  body("auther"),
  body("field"),
  body("publicationDate"),
  async (req, res) => {
    try{
    const query = util.promisify(conn.query).bind(conn);
    const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //   console.log("here");
        //   return res.status(400).json({ errors: errors.array() });
        // }
        

        const library = await query("select * from book where name = ?",[
          req.body.name
        ])
        
        if(library.length>0&&req.params.bookName!=req.body.name&&req.body.name!=""){
          return res.status(404).json({
            msg : "book already here"
          })
        }

        const oldBook=await query("select * from book where name = ?",req.params.bookName);
        //console.log(oldBook);

        const book = {
          name : req.body.name,
          description : req.body.description,
          auther:req.body.auther,
          field:req.body.field,
          publicationDate:req.body.publicationDate
        }
        if(book.name=='')book.name=oldBook[0].name
        if(book.description=='')book.description=oldBook[0].description
        if(book.auther=='')book.auther=oldBook[0].auther
        if(book.field=='')book.field=oldBook[0].field
        if(book.publicationDate=='')book.publicationDate=oldBook[0].publicationDate

        req.files.map(file=>{
          if(file.mimetype=="application/pdf"){
            fs.unlinkSync("upload/"+library[0].pdfFileUrl);
            book.pdfFileUrl=file.filename;
          }
          else{
            fs.unlinkSync("upload/"+library[0].imageUrl);
            book.imageUrl=file.filename;
          }
        })

        const updated=await query("update book set ? where name = ?",[
          book,
          req.params.bookName
        ])


        return res.status(200).json({
          msg : "Updated successfully",
        })
    }catch(err){
        //console.log(err)
        res.status(500).json(err)
      }
});

router.delete(
  "/:name", 
  admin,
  async (req, res) => {
    try{
        const query = util.promisify(conn.query).bind(conn);
        // const library = await query("select * from book where name = ?",[
        //   req.params.name
        // ])
        // if(!library[0]){
        //   res.status(404).json({
        //     msg : "Not Found"
        //   })
        // }
        const book=await query("select * from book where name =?",req.params.name);

        fs.unlinkSync("upload/"+book[0].pdfFileUrl,(err)=>{
          console.log("-------------------------");
          console.log(err);
        });
        fs.unlinkSync("upload/"+book[0].imageUrl,(err)=>{
          console.log("-------------------------");
          console.log(err);
        });
        
  
        const result =await query("delete from book where name = ?",req.params.name);
        return res.status(200).json({
          msg : "DELETED successfully",
          "":result
        })
    }catch(err){
        console.log(err)
        res.status(500).json(err)
      }
});

router.get("",authorized, async(req,res) =>{
   
  const query = util.promisify(conn.query).bind(conn);
  let search = "";
  if(req.query.search){
      search = `where name LIKE '%${req.query.search}%'`;
  }
  const books = await query(`select * from book ${search}`);
  books.map((book) => {
      book.imageUrl	= "http://" + req.hostname + ":4000/" + book.imageUrl	;
      book.pdfFileUrl= "http://" + req.hostname + ":4000/" + book.pdfFileUrl;

  })  
   
  return res.status(200).json(books)
})
// User [get,review]
router.get("/getBook/:name",admin,async(req,res)=>{
  const query = util.promisify(conn.query).bind(conn);
  const results=await query("select * from book where name=?",req.params.name);
  return res.status(200).json(results[0]);
})

module.exports = router;