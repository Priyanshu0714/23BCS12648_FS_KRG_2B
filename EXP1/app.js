const express=require("express")
const path=require("path")
const fs=require("fs")
const mongoose=require("mongoose")
const app=express()

mongoose.connect('mongodb+srv://priyanshu:Ppriyanshu%401407@priyanshucluster.kzr7x.mongodb.net/?retryWrites=true&w=majority&appName=PriyanshuCluster', { useNewUrlParser: true, useUnifiedTopology: true,serverSelectionTimeoutMS: 20000,})
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

const employeeSchema= new mongoose.Schema({name:String,email:String,message:String})
const Employee=mongoose.model("Employee",employeeSchema,)

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
    res.render('index');    
})
app.get('/pdfview', (req, res) => {
  res.render('pdfview');    
})

app.get("/projects",(req,res)=>{
    const projectDir = path.join(__dirname, 'public', 'projects');
    fs.readdir(projectDir, (err, folders) => {
      if (err) {
        return res.status(500).send('Error reading project directory');
      }
      res.json(folders);
    });
  })

app.get("/GetInTouch",async(req,res)=>{
  const name=req.query.name
  const email=req.query.email
  const message=req.query.message
  const employee = new Employee({ name, email, message });
  await employee.save();
  res.redirect("/")
})
  app.listen(3001, () => {
    console.log(`app listening on port ${3001}`)
  })
  