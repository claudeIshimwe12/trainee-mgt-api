import { Request, Response } from "express";
// import User from "../models/user.model";
import User from "../models/user.model";

// Get all users
export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await User.find();
    res.status(201).json({
      status: "Success",
      results: users.length,
      data: {
        users,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      Message: {
        Error: "could not find your req" + err,
      },
    });
  }
};

// Create a new user
export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });
    res.status(201).json({
      statusCode: 201,
      Status: "Success",
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      status: "error",
      message: "Server error",
    });
  }
};

// Get a single user
export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({
      status: "Success",
      statusCode: 200,
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: "User with this id was not found",
    });
  }
};

// Update a user (Not implemented)
export const updateUser = (req: Request, res: Response): void => {
  res.status(500).json({
    status: "error",
    message: "this route is not yet defined",
  });
};

// Delete a user (Not implemented)
export const deleteUser = (req: Request, res: Response): void => {
  res.status(500).json({
    status: "error",
    message: "this route is not yet defined",
  });
};
