require("./logger");

const { app } = require("./app_1");
const { db } = require("./config/database");

db.authenticate()
  .then(() => console.log("cycwebcob_plataforma autenticated."))
  .catch((err) => console.log(err));

db.sync()
  .then(() => console.log("Database Synced."))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 3005;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
