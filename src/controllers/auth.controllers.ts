import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Login function
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const email: string = req.body.email;
  const password: string = req.body.password;

  if (!email || !password) {
    res.status(400).json({
      statusCode: 400,
      Status: "Failed",
      message: "Please provide email and password",
    });
    return next();
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    res.status(400).json({
      Status: "Failed",
      message: "Incorrect Username and Password",
    });
    return next();
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
    expiresIn: "2m",
  });

  res.status(200).json({
    Status: "Success",
    user_id: user.email,
    token,
  });
};

// Protect middleware
export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    let token: string | undefined;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        Status: "Login First",
      });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
    const freshUser = await User.findOne({ _id: decoded.id });
    // req.user = freshUser;
    next();
  } catch (error) {
    res.status(403).json({
      Status: "Invalid Token",
    });
  }
};
