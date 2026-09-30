// // const User = require("../models/User");
// // const bcrypt = require("bcryptjs");

// // const generateToken = require(
// //   "../utils/generateToken"
// // );


// // // REGISTER
// // const registerUser = async (req, res) => {
// //   try {

// //     const {
// //       name,
// //       email,
// //       password,
// //       role
// //     } = req.body;

// //     const existingUser =
// //       await User.findOne({ email });

// //     if (existingUser) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "User already exists"
// //       });
// //     }

// //     const salt =
// //       await bcrypt.genSalt(10);

// //     const hashedPassword =
// //       await bcrypt.hash(
// //         password,
// //         salt
// //       );

// //     const user =
// //       await User.create({
// //         name,
// //         email,
// //         password: hashedPassword,
// //         role
// //       });

// //     res.status(201).json({
// //       success: true,
// //       message:
// //         "User registered successfully",
// //       token: generateToken(
// //         user._id,
// //         user.role
// //       )
// //     });

// //   } catch (error) {

// //     res.status(500).json({
// //       success: false,
// //       message: error.message
// //     });

// //   }
// // };


// // // LOGIN
// // const loginUser = async (req, res) => {
// //   const user = await User.findOne({ email });

// // console.log("LOGIN EMAIL:", email);
// // console.log("USER FOUND:", !!user);

// // if (user) {
// //   console.log("DB EMAIL:", user.email);
// // }
// //   try {

// //     const {
// //       email,
// //       password
// //     } = req.body;

// //     const user =
// //       await User.findOne({ email });

// //     if (!user) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Invalid credentials"
// //       });
// //     }

// //     const isMatch =
// //       await bcrypt.compare(
// //         password,
// //         user.password
// //       );

// //     if (!isMatch) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Invalid credentials"
// //       });
// //     }

// //     res.status(200).json({
// //       success: true,
// //       token: generateToken(
// //         user._id,
// //         user.role
// //       ),
// //       user: {
// //         id: user._id,
// //         name: user.name,
// //         email: user.email,
// //         role: user.role
// //       }
// //     });

// //   } catch (error) {

// //     res.status(500).json({
// //       success: false,
// //       message: error.message
// //     });

// //   }
// // };


// // module.exports = {
// //   registerUser,
// //   loginUser
// // };

// // LOGIN
// const loginUser = async (req, res) => {
//   try {

//     const { email, password } = req.body;

//     console.log("LOGIN EMAIL:", email);

//     const user = await User.findOne({ email });

//     console.log("USER FOUND:", !!user);

//     if (user) {
//       console.log("DB EMAIL:", user.email);
//     }

//     if (!user) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid credentials"
//       });
//     }

//     const isMatch = await bcrypt.compare(
//       password,
//       user.password
//     );

//     if (!isMatch) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid credentials"
//       });
//     }

//     res.status(200).json({
//       success: true,
//       token: generateToken(
//         user._id,
//         user.role
//       ),
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role
//       }
//     });

//   } catch (error) {

//     console.error("LOGIN ERROR:", error);

//     res.status(500).json({
//       success: false,
//       message: error.message
//     });

//   }
// };


const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

// REGISTER
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists"
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token: generateToken(user._id, user.role)
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// LOGIN
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("LOGIN EMAIL:", email);

    const user = await User.findOne({ email });

    console.log("USER FOUND:", !!user);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    res.status(200).json({
      success: true,
      token: generateToken(user._id, user.role),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  registerUser,
  loginUser
};