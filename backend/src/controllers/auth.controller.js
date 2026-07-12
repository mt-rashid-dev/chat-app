import User from "../models/user.model.js";
import { generateToken, hashPassword } from "../utility/auth.js";

export const signup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).send({
        message: "All fields are required"
      });
    }

    if (password.length < 6) {
      return res.status(400).send({
        message: "Password must be at least 6 character"
      });
    }

    const user = await User.findOne({ email });
    if (user) {
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

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("Invalid email or password");
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).send("Invalid email or password");
    }

    generateToken(user._id, res);

    res.status(200).send({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic
    });
  } catch (error) {
    console.log(`Error in login controller: ${error}`);
    res.status(500).send({
      message: "Internal server error"
    });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).send({ 
      message: "Logged out successfully"
    });
  } catch (error) {
    console.log(`Error in logout controller: ${error}`);
    res.status(500).send({
      message: "Internal server error"
    });
  }
};