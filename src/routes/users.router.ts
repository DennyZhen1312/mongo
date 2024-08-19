import { Request, Response, Router } from "express";
import { UserModel } from "../models/User";
import { CustomError } from "../errors/custom-error";
import { tasksRouter } from "./tasks.router";

export const usersRouter = Router();

usersRouter.use('/:userId/tasks', tasksRouter);


usersRouter.post("/", async (req: Request, res: Response) => {
  const createdUser = await UserModel.create(req.body);

  res.status(201).json(createdUser);
});

usersRouter.get("/", async (req: Request, res: Response) => {
  const users = await UserModel.find();

  res.status(200).json(users);
});

usersRouter.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await UserModel.findById(id);

  if (!user) {
    throw new CustomError(`User with id ${id} does not exists`, 404);
  }

  res.status(200).json(user);
});

usersRouter.put("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedUser = await UserModel.findByIdAndUpdate(
    id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!updatedUser) {
    throw new CustomError(`User with id ${id} does not exist`, 404);
  }
  res.status(200).json(updatedUser);
});

usersRouter.delete("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const deletedUser = await UserModel.findByIdAndDelete(id);
  if (!deletedUser) {
    throw new CustomError(`User with id ${id} does not exist`, 404);
  }
  res.status(200).json({ deletedUser });
});
