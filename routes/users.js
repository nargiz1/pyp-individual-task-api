const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { body, validationResult } = require("express-validator");

router.get("/", (req, res) => {
  let columns = req.query.columns;
  let limit = req.query.limit;
  let skip = req.query.skip;

  let select = "";

  if (columns) {
    let columnsArray = columns.split(",");

    columnsArray.forEach((element) => {
      select = element + " " + select;
    });
  }

  User.find()
    .select(select)
    .populate("category")
    .skip(skip)
    .limit(limit)
    .exec((err, docs) => {
      if (!err) return res.json(docs);
      return res.status(500).json(err);
    });
});

router.get("/:id", async (req, res) => {
  let id = req.params.id;

  User.findById(id, (err, doc) => {
    if (!err) {
      if (doc) res.json(doc);
      else res.status(404).json({ message: "Not found!" });
    } else {
      res.status(500).json(err);
    }
  });
});

router.delete("/:id", async (req, res) => {
  let id = req.params.id;

  User.findByIdAndDelete(id, (err) => {
    if (!err) res.json({ messagae: "Success!" });
    else res.status(500).json(err);
  });
});

router.post(
  "/",
  body("firstName")
    .notEmpty()
    .isLength({ min: 3 })
    .withMessage("firstName is required"),
  body("lastName")
    .notEmpty()
    .isLength({ min: 3 })
    .withMessage("lastName is required"),
  body("birthDate")
    .notEmpty()
    .isISO8601()
    .toDate()
    .withMessage("birthDate is required"),
  body("email")
    .notEmpty()
    .isEmail()
    .isLength({ min: 3 })
    .withMessage("email is required"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      birthDate: req.body.birthDate,
      email: req.body.email,
    });

    try {
      user.save();
      res.status(201).send("User added successfully!");
    } catch (err) {
      res.status(500).send("Error!");
    }
  }
);

router.put(
  "/:id",
  body("firstName")
    .notEmpty()
    .isLength({ min: 3 })
    .withMessage("firstName is required"),
  body("lastName")
    .notEmpty()
    .isLength({ min: 3 })
    .withMessage("lastName is required"),
  body("birthDate")
    .notEmpty()
    .isISO8601()
    .toDate()
    .withMessage("birthDate is required"),
  body("email")
    .notEmpty()
    .isEmail()
    .isLength({ min: 3 })
    .withMessage("email is required"),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let id = req.params.id;

    User.findByIdAndUpdate(id, req.body, (err, doc) => {
      if (!err) {
        res.json({ message: "success" });
      } else {
        res.status(500).json(err);
      }
    });
  }
);

module.exports = router;
