const user = require("../../models/users");
const verify = require("./authVerify");
const router = require("express").Router();

router.get("/allusers", verify, async (req, res) => {
  try {
    const results = await user.find().exec();
    res.send(results);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
