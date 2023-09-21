
import express from "express"; 
import multer from "multer"; 
import path from "path";

const app = express(); 
const now = new Date()
const storage = multer.diskStorage({
    destination: function(req,file, cb){
        cb(null, 'public/images');
    },
    filename: function(req,file,cb){
        cb(null, Date.now() + path.extname(file.originalname));
    }
})
const upload = multer({storage:storage});
const port = 3000;
app.use(express.static("public"));
app.use("/error",(req,res)=>{
    res.send(req.body);
    // console.log(res.)
    
});
app.use("/thank-you",(req,res,next)=>{
    res.send("<h1>SUCCESS</h1>");
    next()
})

app.get("/about", (req,res)=>{
    res.render('about.ejs',{
        year: now.getFullYear(), month: now.getMonth()
    });
    console.log(req.body);
});

app.post("/about/:year/:month",upload.single("photo"), (req,res) => {
    try{
        // console.log(req.file.filename);
        console.log('received file '+ req.file.filename);
        console.log("received field "+req.file.fieldname);
        // console.log(files);
        res.redirect('/thank-you');
        // next();
    }
    catch (err){
        res.redirect(303,'/error');        
    }
})

app.listen(port, ()=>{
    console.log(`server is running on port ${port}`);
})