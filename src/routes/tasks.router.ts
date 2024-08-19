import { Request, Response, Router } from "express";
import { TaskModel } from "../models/Task";
import { CustomError } from "../errors/custom-error";

export const tasksRouter = Router({ mergeParams: true });

tasksRouter.post('/', async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const createdTask = await TaskModel.create({ ...req.body, user_id: userId });

    res.status(201).json(createdTask);
});

tasksRouter.get('/', async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const tasks = await TaskModel.find({ user_id: userId });

    res.status(200).json(tasks);
});

tasksRouter.get('/:taskId', async (req: Request, res: Response) => {
    const { taskId } = req.params;
    const task = await TaskModel.findById( taskId );

    if (!task) {
        throw new CustomError(`Task with id ${taskId} does not exists`, 404);
    }
    res.status(200).json(task);
});

tasksRouter.put('/:taskId', async (req: Request, res: Response) => {
    const task = await TaskModel.findByIdAndUpdate(
      { _id: req.params.taskId, user_id: req.params.userId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(task);
 
});

// Delete a task
tasksRouter.delete('/:taskId', async (req: Request, res: Response) => {
    const task = await TaskModel.findOneAndDelete({ _id: req.params.taskId, user_id: req.params.userId });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted' });
 
});