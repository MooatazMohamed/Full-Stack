const router = require("express").Router();
const conn = require("../db/dbConnection");
const { body, validationResult, check } = require("express-validator")
const util = require("util");
const bcrypt = require("bcrypt");
const crypto = require("crypto")
const admin = require("../middleware/admin")

//UPDATE USER
router.put("/:email",
    body("name"),//.isString().withMessage("Please enter a valid name"),
    //body("password").isString().withMessage("Please enter a valid password"),
    body("email"),//.isEmail().withMessage("Please enter a valid Email"),
    body("phone"),

    async (req, res) => {
        try {
            const query = util.promisify(conn.query).bind(conn);
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() })
            }
            const user = await query("select * from users where email = ?", [req.params.email]);

            const checkEmail = await query("select * from users where email = ?", [req.body.email]);
            if (checkEmail.length > 0&&req.body.email!=req.params.email&&req.body.email!="") {
                res.status(400).json({
                    errors: [
                        {
                            msg: "email already exist",
                        },
                    ],
                });
            }


            const userObj = {
                name: req.body.name,
                email: req.body.email,
                //password: await bcrypt.hash(req.body.password,10)  ,
                phone:req.body.phone,
            }
            if(userObj.name=="")userObj.name=user[0].name;
            if(userObj.email=="")userObj.email=user[0].email;
            if(userObj.phone=="")userObj.phone=user[0].phone;

            // UPDATE
            console.log(userObj);

            await query("update users set ? where email= ?", [userObj, user[0].email]);

            return res.status(200).json({
                msg: "Edit successfully",
            })

        } catch (err) {
            //console.log(err)
            return res.status(500).json(err);
        }

    })


//DELETE USER
router.delete("/:email",

    async (req, res) => {

        try {
            const query = util.promisify(conn.query).bind(conn);
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() })
            }

            await query("delete from users where email = ?", [req.params.email])
            res.status(200).json({
                msg: "DElete email successefully by admin",
            })

        } catch (err) {
            console.log(err);
        }

    })


//GET ALL USERS
router.get("",
    async (req, res) => {
        try {
            const query = util.promisify(conn.query).bind(conn);
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() })
            }

            const show = await query("select * from users where role=0");

            show.map((user) => {
                delete user.password
                delete user.token
                delete user.role
                delete user.status
            })


            res.status(200).json(show);


        } catch {

        }

    })

//ADD USER
router.post(
    "",
    body("email").isEmail(),
    body("password").isString(),
    body("phone"),
    body("name"),
    //body("role"),
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const query = util.promisify(conn.query).bind(conn);
            const checkEmail = await query("select * from users where email = ?", [
                req.body.email,
            ]);
            if (checkEmail.length > 0) {
                res.status(400).json({
                    message: "email already exist",
                });
            } else {
                if (req.body.role == null) req.body.role = 0;
                const userData = {
                    token: crypto.randomBytes(16).toString("hex"),  // Check if admin or user with JSON WEB TOken , CRYPTO
                    email: req.body.email,
                    password: await bcrypt.hash(req.body.password, 10),
                    phone: req.body.phone,
                    name: req.body.name,
                };
                await query("insert into users set ? ", userData);
                delete userData.password;
                res.status(200).json(userData);
            }
        } catch (err) {
            console.log(err);
            res.status(500).json({ err: err });
        }
    }
);


router.post("/sendRequest",
    body("email"),
    body("bookName"),
    async (req, res) => {
        try {
            const query = util.promisify(conn.query).bind(conn);
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() })
            }
            let dt = new Date();

            let dtStr = dt.toISOString().split('T');

            const reqObject = {
                userEmail: req.body.email,
                bookName: req.body.bookName,
                dateTime: dtStr.toString(),
            }

            await query("insert into interactivebook set ?", reqObject);
            res.status(200).json("request sent successfully");
        } catch (err) {
            //console.log(err);
            return res.status(404).json(err);
        }
    }
)

router.get("/searchRequest/:email/:bookName",
    async (req, res) => {
        try {
            const query = util.promisify(conn.query).bind(conn);
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() })
            }
            const searchObject = {
                userEmail: req.params.email,
                bookName: req.params.bookName,
            }

            // const results=await query(`
            //     SELECT * FROM interactivebook JOIN users ON interactivebook.userEmail=users.email JOIN book ON interactivebook.bookName=book.name WHERE interactivebook.userEmail='${searchObject.userEmail}' AND interactivebook.bookName='${searchObject.bookName}'`
            // )
            const results = await query('select * from interactivebook where userEmail=? and bookName=?', [searchObject.userEmail, searchObject.bookName]);
            return res.status(200).json(results);

        } catch (err) {
            console.log(err);
        }
    }
)

router.get("/:email",
    async (req,res)=>{
        try{
            const query = util.promisify(conn.query).bind(conn);
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() })
            }
            const results=await query("select * from users where email =?",req.params.email);
            return res.status(200).json(results[0]);
        }catch(err){
            return res.status(500).json(err);
        }
    }
)
module.exports = router;