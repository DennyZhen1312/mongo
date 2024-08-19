import { Request, Response, Router } from "express";
import { CategoryModel } from "../models/Category";
import { CustomError } from "../errors/custom-error";

export const categoriesRouter = Router();

categoriesRouter.post("/", async (req: Request, res: Response) => {
  const createdCategory = await CategoryModel.create(req.body);

  res.status(201).json(createdCategory);
});

categoriesRouter.get("/", async (req: Request, res: Response) => {
  const categories = await CategoryModel.find();

  res.status(200).json(categories);
});

categoriesRouter.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const category = await CategoryModel.findById(id);

  if (!category) {
    throw new CustomError(`Category with id ${id} does not exists`, 404);
  }
  res.status(200).json(category);
});

categoriesRouter.put("/:id", async (req: Request, res: Response) => {
  const category = await CategoryModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }
  res.status(200).json(category);
});

categoriesRouter.delete("/:id", async (req: Request, res: Response) => {
  const category = await CategoryModel.findByIdAndDelete(req.params.id);
  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }
  res.status(200).json({ message: "Category deleted" });
});
