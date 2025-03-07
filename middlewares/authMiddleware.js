import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password'); // Fetch user details

      if (!req.user.role) {
        throw new Error('Role is not defined for the user');
      }

      next();
    } catch (err) {
      res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
  } else {
    res.status(401).json({ message: 'Unauthorized: No token provided' });
  }
};
