import User from "../models/user.model.js";
import { hashPassword } from "../utility/auth.js";

export const signup = async (req, res) => {
  try {console.log(req.body);
    const { fullName, email, password } = req.body;

    if (password.length < 6) {
      return res.status(400).send({
        message: "Password must be at least 6 character"
      });
    }

    const user = await User.findOne({ email });
    if (email) {
      return res.status(400).send({
        message: "Email already exists"
      });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).send({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic
      });
    } else {
      res.status(400).send({
        message: "Invalid user data"
      });
    }
  } catch (error) {
    console.log(`Error in signup controller: ${error}`);
    res.status(500).send({
      message: "Internal server error"
    });
  }
};

export const login = (req, res) => {
  res.send("login route");
};

export const logout = (req, res) => {
  res.send("logout route");
};