const router = require("express").Router();
const jwt = require("jsonwebtoken");
const Joi = require("@hapi/joi");
const users = require("../../models/users");
const bcrypt = require("bcryptjs");

const registerSchema = Joi.object({
  fname: Joi.string().min(3).required(),
  lname: Joi.string().min(2).required(),
  email: Joi.string().min(8).required().email(),
  password: Joi.string().min(8).required(),
});

//REGISTER

router.post("/register", async (req, res) => {
  const emailExist = await users.findOne({ email: req.body.email });

  if (emailExist) {
    res.status(400).send("Email already in use.");
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(req.body.password, salt);

  const user = new users({
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    password: hashedPass,
  });

  try {
    const { err } = await registerSchema.validateAsync(req.body);

    if (err) {
      res.status(400).send(error.details[0].message);
      return;
    } else {
      const saveUser = await user.save();
      res.status(200).send("user created");
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

const loginSchema = Joi.object({
  email: Joi.string().min(8).required().email(),
  password: Joi.string().min(6).required(),
});

//LOGIN

router.post("/login", async (req, res) => {
  const user = await users.findOne({ email: req.body.email });

  if (!user) return res.status(400).send("Incorrect Email");

  const validPass = await bcrypt.compare(req.body.password, user.password);

  if (!validPass) return res.status(400).send("Incorrect Password");

  try {
    const { err } = await loginSchema.validateAsync(req.body);
    if (err) return res.status(400).send(err.details[0].message);
    else {
      const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
      res.header("auth-token", token).send(token);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
