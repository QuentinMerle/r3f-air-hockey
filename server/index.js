const Pusher = require("pusher");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const pusher = new Pusher({
  appId: "1584864",
  key: "1668e528e07f01aa2f72",
  secret: "9df2427c97b6d3187909",
  cluster: "eu",
  encrypted: true,
});

// Endpoint pour recevoir les mouvements de l'objet depuis le client
app.post("/move_object", (req, res) => {
  const { deltaX, deltaY, deltaZ } = req.body;
  // Mettre à jour la position de l'objet sur le serveur si nécessaire
  // par exemple : object.x += deltaX; object.y += deltaY; object.z += deltaZ;

  // Diffuser les données mises à jour à tous les clients connectés pour synchroniser le mouvement
  pusher.trigger("my-channel", "my-event", {
    deltaX: deltaX,
    deltaY: deltaY,
    deltaZ: deltaZ,
  });

  res.json({ status: "success" });
});

// Démarrer le serveur sur un port donné
const port = 5173; // Remplacez par le port de votre choix
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
