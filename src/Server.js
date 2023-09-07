// import Pusher from "pusher-js";

// export const pusherJS = new Pusher("1668e528e07f01aa2f72", {
//   cluster: "eu",
// });

// export const channel = pusherJS.subscribe("my-channel");

// // Écoutez les événements de déplacement envoyés par le serveur
// channel.bind("client-my-event", function (data) {
//   // Mettez à jour la position de l'objet 3D en fonction des données reçues
//   // par exemple : object.position.x += data.deltaX; object.position.y += data.deltaY; object.position.z += data.deltaZ;
//   console.log(data);
// });

// // Fonction pour envoyer les mouvements de l'objet au serveur
// export const sendObjectMovement = (deltaX, deltaZ) => {
//   console.log("prout");
//   channel.trigger("client-my-event", {
//     deltaX: deltaX,
//     deltaZ: deltaZ,
//   });
// };
