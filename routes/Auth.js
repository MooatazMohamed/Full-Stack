const router = require("express").Router();
const conn = require("../db/dbConnection");
const { body, validationResult } = require("express-validator");
const util = require("util");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const authorize=require("../middleware/authorize");
// LOGIN,REGESTRATION
//LOgin
router.post(
  "/login",
  //authorize,
  body("email"),
  body("password"),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const query = util.promisify(conn.query).bind(conn);
      const user = await query("select * from users where email = ?", [
        req.body.email,
      ]);
      if (user.length == 0) {
        res.status(404).json({
          errors: [
            {
              msg: "email or pass not found",
            },
          ],
        });
      } else {
        const checkpassword = await bcrypt.compare(
          req.body.password,
          user[0].password
        );
        if (checkpassword) {
          return res.json(user[0]);
        } else {
          return res.status(404).json({
            errors: [
              {
                msg: "pass is wrong",
              },
            ],
          });
        }
      }
    } catch (err) {
      console.log('here is an error \n _______________________________________');
      res.status(500).json({ err: err });
    }
  }
);


// Registration
router.post(
  "/register",
  body("email").isEmail(),
  body("password").isString(),
  body("phone"),
  body("name"),
  body("role"),
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
        if(req.body.role==null)req.body.role=0;
        const userData = {
          token: crypto.randomBytes(16).toString("hex"),  // Check if admin or user with JSON WEB TOken , CRYPTO
          email: req.body.email,
          password: await bcrypt.hash(req.body.password, 10),
          phone:req.body.phone,
          name:req.body.name,
          role:req.body.role,
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

module.exports = router;