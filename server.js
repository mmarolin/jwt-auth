const app = require("./app");
const PORT = process.env.PORT || 8000;
const mongoose = require("mongoose");

mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("connected to db");
  }
);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
