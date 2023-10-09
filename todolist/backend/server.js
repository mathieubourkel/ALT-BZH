const path = require('path');
const express = require("express");
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
    name: String,
    email: String,
});
const tasksSchema = new mongoose.Schema({
    name: String,
    description: String,
    categorie: String,
    status: Number,
    priorite: Number,
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
app.use(cors());
app.get("/", (req, resp) => {
    resp.send("BACKEND is Working");
});

  app.post("/post", (req, res) => { 
    res.json({ message: "Hello from server!" });
    res.redirect("/"); 
  }); 

  app.post("/create-user", async (req, resp) => {
    try {
        const user = new Users(req.body);
        let result = await user.save();
        result = result.toObject();
        if (result) {
            delete result.password;
            resp.send(req.body);
            console.log(result);
        } else {
            console.log("User already register");
        }
 
    } catch (e) {
        resp.send("Something Went Wrong");
    }
});
  
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });
