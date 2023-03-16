import Users from '../models/userModel.js'
import validation from "../utils/validation.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export const userRegister = async (req, res) => {
  try {
    const { name, email, password, phone, gender, address } = req.body;
    const profileImage = req.files?.[0]

    if (!name || !email || !password || !phone || !gender || !address) {
      return res.status(400).json({ status: false, msg: 'All fields are required' })
    };

    const isUserExits = await Users.findOne({ email });
    if (isUserExits) return res.status(400).json({ status: false, msg: 'Email already is use' });

    if (profileImage && !validation.isValidImageType(profileImage.mimetype)) return res.status(400).json({ status: false, msg: 'Invalid image type. Only jpeg/jpg/png images can be uploaded' });

    if (!validation.isValidOnlyCharacters(name)) return res.status(400).json({ status: false, msg: "Name should contain only English letters and spaces" })

    if (!validation.isValidEmail(email)) return res.status(400).json({ status: false, msg: "Invalid email address" })

    if (!validation.isValidPassword(password)) return res.status(400).json({ status: false, msg: 'Password should be between 8 and 15 characters' });


    const newPass = await bcrypt.hash(password, 10)
    const result = await Users.create({ name, email, password: newPass, gender, address, phone, profileImage })
    return res.status(201).json({ status: true, data: result })

  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};




export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body
    const validUser = await Users.findOne({ email });

    if (!validUser) {
      return res.status(400).json({ status: false, msg: "Email is not valid" })
    }
    let hashPass = await bcrypt.compare(password, validUser.password)
    if (!hashPass) {
      return res.status(400).json({ status: false, msg: "email or password is incorrect" })
    }

    const payload = {
      email: email,
      id: validUser._id
    };

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '3d' });

    res.header("Authorization", `Bearer ${accessToken}`);

    res.cookie("token", accessToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      signed: true,
    });

    res.status(200).json({ status: true, token: accessToken })

  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};



export const findUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await Users.findById(userId).select("-password")
    if (!user) {
      return res.status(400).json({ status: false, msg: "User Does not exist" })
    }
    return res.status(200).json({ status: true, data: user })

  }
  catch (err) {
    return res.status(400).json({ status: false, msg: err.message })
  }
}



export const updateUser = async (req, res) => {
  const { userId } = req.params;
  const { name, email, profileImage, phone, gender, address } = req.body;

  const validUser = await Users.findById(userId);

  if (!validUser) return res.status(400).json({ status: false, msg: "user is not valid" })

  if (!phone || !gender || !address) return res.status(400).json({ status: false, msg: 'All fields are required' });

  if (name && !validation.isValidOnlyCharacters(name)) return res.status(400).json({ status: false, msg: "Name should contain only English letters and spaces" });

  if (email && !validation.isValidEmail(email)) return res.status(400).json({ status: false, msg: "Invalid email address" });

  const result = await Users.findOneAndUpdate({ _id: userId }, { ...req.body }, { new: true });
  res.status(201).json({ status: true, data: result });

}


export const updatePass = async (req, res) => {
  try {
    const { userId } = req.params;
    const { oldPass, newPass } = req.body;

    const validUser = await Users.findById(userId);
    if (!validUser) {
      res.status(400).json({ status: false, msg: 'User not valid' })
    };

    if (!validation.isValidPassword(newPass)) return res.status(400).json({ status: false, msg: "Password should be between 8 and 15 characters" });

    const match = await bcrypt.compare(oldPass, validUser.password)
    if (!match) {
      return res.status(400).json({ status: false, msg: "Old password does not match" })
    };


    const pass = await bcrypt.hash(newPass, 10);
    const result = await Users.findOneAndUpdate({ _id: userId }, { password: pass });
    if (result) {
      res.status(200).json({ status: true, msg: "Password updated", result });
    } else {
      res.status(400).json({ status: false, msg: "something is wrong" });
    }
  } catch (error) {
    return res.status(400).json({ status: false, msg: error.message })
  }
}


export const userLogOut = (req, res) => {
  res.clearCookie('token');
  res.status(200).json("logout successful");
}


// export const vendorRigister = async (req, res) => {
//   try {
//     res.status(200).json({ msg: "VENDOR REGISTER" });
//   } catch (error) {
//     res.status(404).json({ error: error.message });
//   }
// };


// export const vendorLogin = async (req, res) => {
//   try {
//     res.status(200).json({ msg: "VENDOR LOGIN" });
//   } catch (error) {
//     res.status(404).json({ error: error.message });
//   }
// };
