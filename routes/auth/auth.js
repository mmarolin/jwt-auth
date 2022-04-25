const router = require("express").Router();
const jwt = require("jsonwebtoken");
const Joi = require("@hapi/joi");
const user = require("../../models/user");

const registerSchema = Joi.object({
  fname: Joi.string().min(3).required(),
  lname: Joi.string().min(2).required(),
  email: Joi.string().min(8).required().email(),
  password: Joi.string().min(8).required(),
});

router.post("/register", async (req, res) => {
  const emailExist = await user.findOne({ email: req.body.email });

  if (emailExist) {
    res.status(400).send("Email already in use.");
    return;
  }

  const User = new user({
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    const { err } = await registerSchema.validateAsync(req.body);

    if (err) {
      res.status(400).send(error.details[0].message);
      return;
    } else {
      const saveUser = await User.save();
      res.status(200).send("user created");
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
