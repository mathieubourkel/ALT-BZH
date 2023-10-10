const path = require('path');
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3001;
const app = express();
const cors = require("cors");

mongoose.connect('mongodb+srv://mathieu:bourkel@cluster0.yovid.mongodb.net/todolist?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


const usersSchema = new mongoose.Schema({
  //  id: Number,
    name: String,
    email: String,
});
const tasksSchema = new mongoose.Schema({
  //  id: Number,
    name: String,
    description: String,
    categorie: String,
    status: Number,
    priority: Number,
    userWhoCreate: usersSchema,
    usersAffected: [usersSchema],
    dateMaximum: Date,
    dateCreation: Date,
    dateUpdate: Date
});

const Tasks = mongoose.model("Tasks", tasksSchema);
const Users = mongoose.model("Users", usersSchema);
// const tache1 = new Tasks ({
//     name: "tache1",
//     description: "cest la tache1",
//     categorie: "cest la categorie",
//     status: 1,
//     priorite: 1,
// });
// tache1.save();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cors()); 

app.post("/create-user", async (req, resp) => {
try {
    const user = new Users({
      name: req.body.name,
      email: req.body.email
    });

    await user.save();
    resp.send("L'utilisateur a été créé");

} catch (e) {
    resp.send("Problème lors de la création de l'utilisateur");
}
});

app.get("/dashboard", async (req, resp) => {
  const allTasks = await Tasks.find({});
  try {
    resp.send(allTasks);
  } catch (error) {
    resp.status(500).send(error);
  }
});


app.post("/create-task", async (req, resp) => {
  try {
    const task = new Tasks({
      name: req.body.name,
      description: req.body.description,
      categorie: req.body.categorie,
      status: req.body.status,
      priority: req.body.priority,
      dateMaximum: req.body.dateMax,
      dateCreation: Date.now()
  })
  await task.save();
  resp.send("La tâche a été crée avec succès")

  } catch (e) {
      resp.send("Probleme lors de la création de la tâche");
  }
  
});
  
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });
