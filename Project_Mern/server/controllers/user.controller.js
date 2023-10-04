const User = require("../models/user.model"); // Model
const bcrypt = require("bcrypt"); // Encryption
const jwt = require("jsonwebtoken"); // Token
const upload = require("../config/multer.config");

const SECRET = process.env.SECRET;

module.exports = {
  register: async (req, res) => {
    // Register With Async
    //test Email Exists
    const userFromDB = await User.findOne({ email: req.body.email });
    if (userFromDB) {
      // If a user with the same email exists, return an error.
      return res.status(400).json({ error: "Email Already Used" });
    }

    try {
      //save img and get path

      const user = new User(req.body);
      //user =
      const newUser = await user.save();
      const userToken = jwt.sign({ id: newUser._id }, SECRET); // Declaring Token
      // console.log(`User ID: ${newUser._id}\nUser Token:${userToken}`);
      res
        .status(201)
        .cookie("userToken", userToken, { httpOnly: true }) // SENDING COOKIE
        .json(newUser);
    } catch (error) {
      res.status(400).json(error);
    }
  },

  login: async (req, res) => {
    // FUN WITH LOGIN!
    const userFromDB = await User.findOne({ email: req.body.email });
    console.log(userFromDB.email, "❌❌❌❌❌❌");
    if (!userFromDB) {
      res.status(400).json({ error: "User Not Found" });
    } else {
      try {
        const isPasswordValid = await bcrypt.compare(
          req.body.password,
          userFromDB.password
        );
        if (isPasswordValid) {
          const userToken = jwt.sign({ id: userFromDB._id }, SECRET); // Declaring Token
          console.log(
            `User ID ${userFromDB._id}\nUser Token:-----${userToken}-----`
          );
          res
            .status(200)
            .cookie("userToken", userToken, { httpOnly: true }) // SENDING COOKIE
            .json({ message: "User Logged IN successfully !" });
        } else {
          console.log("Password incorrect for user:", email);
          res.status(400).json({ message: "Password incorrect!" });
        }
      } catch (error) {
        res.status(400).json({ message: "Email / Password incorrect!", error });
      }
    }
  },

  logout: async (req, res) => {
    try {
      console.log("********", req.cookies);
      res.clearCookie("userToken");
      res.status(200).json({ message: "User Logged out Successfully" });
    } catch {
      res.status(500).json({ message: "Something went wrong", error });
    }
  },

  getLoggedUser: async (req, res) => {
    try {
      const userToken = req.cookies.userToken;
      const loggedUserId = jwt.verify(userToken, SECRET);
      // console.log(`userToken: ${userToken}\nUser Id: ${loggedUserId}`);

      const user = await User.findOne({ _id: loggedUserId.id });
      res.status(200).json({ message: "User Found", user });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "No Token Provided" });
    }
  },

  addPicture: async (req, res) => {
    try {
      const userToken = req.cookies.userToken;
      if (!userToken) {
        return res.status(401).json({ error: 'JWT token missing' });
      }
  
      const loggedUserId = jwt.verify(userToken, SECRET);
      // console.log(loggedUserId.id); Best Helper Ever
      const updatePicture = await User.findByIdAndUpdate(
        loggedUserId.id,
        { image: req.file.filename },
        { new: true }
      );
  
      if (!updatePicture) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      return res.status(200).json(updatePicture);
    } catch (error) {
      console.error('Error uploading profile picture:', error.message);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  getAllUsers: (req, res) => {
    User.find()
        .then((dbRes) => res.status(200).json(dbRes))
        .catch((dbErr) => res.status(400).json(dbErr)); 
  }
  
  
};
