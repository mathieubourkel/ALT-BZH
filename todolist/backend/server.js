const path = require('path');
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3001;
const app = express();
const cors = require("cors");
require('dotenv').config();
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const URL = "http://localhost:3000";

// CONNEXION à MONGOOSE

const MONGODBURL = process.env.MONGODBURL;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

mongoose.connect(MONGODBURL,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// SCHEMAS

const usersSchema = new mongoose.Schema({
  value: Number,
  label: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minlength: 6,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean
  }
});

const categoriesSchema = new mongoose.Schema({
  label: String,
  value: Number
});

const statusSchema = new mongoose.Schema({
  label: String,
  value: Number
});

const prioritesSchema = new mongoose.Schema({
  label: String,
  value: Number
});

const tasksSchema = new mongoose.Schema({
    label: String,
    value: Number,
    description: String,
    categorie: Number,
    status: Number,
    priorite: Number,
    userCrea: String,
    usersAffected: [Number],
    dateMax: Date,
    dateCrea: Date,
    dateUpdate: Date
});

// MODELS

const Categories = mongoose.model("Categories", categoriesSchema);
const Status = mongoose.model("Status", statusSchema);
const Priorites = mongoose.model("Priorites", prioritesSchema);
const Tasks = mongoose.model("Tasks", tasksSchema);
const Users = mongoose.model("Users", usersSchema);


// POST

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cors()); 

app.post("/create-user", async (req, resp) => {

  const { label, password, email, isAdmin } = req.body
  const allUsers = await Users.find({});
  if (password.length < 6 ){
    return resp.status(400).json({message : "Veuillez entrer un mot de passe de + 6 charactères"})
  }
  

  let crypt = await bcrypt.hash(password, 10);

  try {
      if (isAdmin) {
        await Users.create({
          value: (await allUsers).length + 1,
          label,
          password: crypt,
          email,
          isAdmin: isAdmin     
        })} else {
          await Users.create({
            value: (await allUsers).length + 1,
            label,
            password: crypt,
            email,
            isAdmin: false
        })
      }  
      resp.redirect(URL);
  } catch (err) {
    resp.status(401).json({
      message: "L'utilisateur n'a pas été créé",
      error: err.message
    })
  }
  });

app.post("/login", async (req, res) => {
  const {email, password} = req.body;

  if (!email || !password) {
    return res.status(401).json({
      message: "Veuillez entrer un login et un mdp"
    })
  }

  try {
    const user = await Users.findOne({email})
    if (!user) {
      res.status(400).json({
        message: "L'utilisateur n'existe pas",
      })
    } else {
      bcrypt.compare(password, user.password).then(function(result) {
        result ? res.status(200).json({
          message: "Vous avez réussi à vous logger",
          user,
        }) : res.status(400).json({ message: "Mot de passe incorrect"})
      })
    }
  } catch (error) {
    res.status(400).json({
      message: "Il y a eu une erreur de code",
      error: error.message
    })
  }

});


app.post("/create-categorie", async (req, resp) => {
  const allCategories = Categories.find({});
  try {
    const categorie = new Categories({
      label: req.body.name,
      value: (await allCategories).length + 1
  })

  await categorie.save();
  resp.redirect(URL);

  } catch (e) {
      resp.send("Probleme lors de la création de la catégorie");
  }
  
});

app.post("/create-priorite", async (req, resp) => {
  const allPriorites = Priorites.find({});
  try {
    const priorite = new Priorites({
      label: req.body.name,
      value: (await allPriorites).length + 1
  })

  await priorite.save();
  resp.redirect(URL);

  } catch (e) {
      resp.send("Probleme lors de la création de la prioritée");
  }
  
});

app.post("/create-status", async (req, resp) => {
  const allStatus = Status.find({});
  try {
    const statut = new Status({
      label: req.body.name,
      value: (await allStatus).length + 1
  })

  await statut.save();
  resp.redirect(URL);

  } catch (e) {
      resp.send("Probleme lors de la création du statut");
  }
  
});

app

app.post("/create-task", async (req, resp) => {
  const allTasks = await Tasks.find({});
  try {
    await Tasks.create({
      value: (await allTasks).length + 1,
      label: req.body.name,
      description: req.body.description,
      categorie: req.body.categorie,
      status: req.body.status,
      priorite: req.body.priorite,
      dateMax: req.body.dateMax,
      userCrea: req.body.userCrea,
      usersAffected: req.body.users,
      dateCrea: Date.now()
    })
    resp.redirect(URL);
} catch (err) {
  resp.status(401).json({
    message: "L'utilisateur n'a pas été créé",
    error: err.message
  })
}
});

app.post("/modify-task", async (req, resp) => {
  const {value} = req.body;
  try {
      Tasks.findOneAndUpdateupdate({value}, {
      label: req.body.name,
      description: req.body.description,
      categorie: req.body.categorie,
      status: req.body.status,
      priorite: req.body.priorite})
    resp.redirect(URL);
} catch (err) {
  resp.status(401).json({
    message: "pas réussi a modifier",
    error: err.message
  })
}
});

// GET 

app.get("/dashboard", async (req, resp) => {
  const allTasks = await Tasks.find({});
  try {
    resp.send(allTasks);
  } catch (error) {
    resp.status(500).send(error);
  }
});

app.get("/categories", async (req, resp) => {
  const allCategories = await Categories.find({});
  try {
    resp.send(allCategories);
  } catch (error) {
    resp.status(500).send(error);
  }
});

app.get("/priorites", async (req, resp) => {
  const allPriorites = await Priorites.find({});
  try {
    resp.send(allPriorites);
  } catch (error) {
    resp.status(500).send(error);
  }
});

app.get("/users", async (req, resp) => {
  const allUsers = await Users.find({});
  try {
    resp.send(allUsers);
  } catch (error) {
    resp.status(500).send(error);
  }
});

app.get("/status", async (req, resp) => {
  const allStatus = await Status.find({});
  try {
    resp.send(allStatus);
  } catch (error) {
    resp.status(500).send(error);
  }
});

app.get('*', function (req, res) {
  res.redirect(URL);
});


// PORT
  
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });


// EXPORT

module.exports = Users, Tasks, Categories, Status, Priorites;
