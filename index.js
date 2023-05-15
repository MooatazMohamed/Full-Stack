//  ********************** INITIALIZE EPRESS APP ******************** 
const express = require('express');
const app = express(); 

 //  ********************** GLOBAL MIDELWARE ******************** 

 app.use(express.json());
 app.use(express.urlencoded({extended : true}));
 app.use(express.static ('upload'));
 const cors = require("cors");
 app.use(cors());


 //  ********************** Required Module ******************** 

 const auth = require("./routes/Auth");
 const library = require("./routes/library");
 const user=require("./routes/user");
 const searchHistory=require('./routes/searchHistory');
 const admin=require('./routes/admin');
 const chapter=require('./routes/chapter');
//  **********************  RUN THE APP ******************** 

app.listen(4000,'localhost',() =>{
   console.log('SERVER IS RUNNING');
})


//  **********************  API ROUTES [ ENDPOINTS ] ******************** 

app.use("/auth",auth);
app.use("/library",library);
app.use("/user",user);
app.use("/searchHistory",searchHistory);
app.use("/admin",admin);
app.use("/chapter",chapter);