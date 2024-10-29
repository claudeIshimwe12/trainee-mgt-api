import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
import jwt, { decode } from "jsonwebtoken";
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
    expiresIn: "2h",
  });

  res.status(200).json({
    Status: "Success",
    message: "Log In Successful",
    data: {
      user_id: user.id,
      token,
    },
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
        status: "Fail",
        statusCode: 401,
        message: "Please log in first",
      });
    }

    let decodedToken: any;
    jwt.verify(
      token,
      process.env.JWT_SECRET as string,
      function (err, decoded) {
        decodedToken = decoded;
      }
    );
    const freshUser = await User.findOne({ _id: decodedToken.id });

    next();
  } catch (error) {
    res.status(403).json({
      status: "Fail",
      statusCode: 403,
      message: "Invalid Token",
    });
  }
};

// Get Authorized User

export const getMe = async (req: Request, res: Response): Promise<any> => {
  try {
    let token: string | undefined;
    if (req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        status: "Fail",
        statusCode: 401,
        message: "Please log in first",
      });
    }
    let decodedToken: any;

    jwt.verify(
      token,
      process.env.JWT_SECRET as string,
      function (err, decoded) {
        if (err) {
          throw new Error("Invalid token");
        }
        decodedToken = decoded;
      }
    );

    const freshUser = await User.findOne({ _id: decodedToken.id });

    if (freshUser) {
      res.status(200).json({
        status: "Success",
        statusCode: 200,
        message: "Authorized user found",
        data: {
          freshUser,
        },
      });
    }
  } catch (error) {
    res.status(403).json({
      status: "Fail",
      statusCode: 403,
      message: "Invalid token",
    });
  }
};
