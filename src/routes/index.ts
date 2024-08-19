import { Router } from "express";
import { usersRouter } from "./users.router";
import { categoriesRouter } from "./categories.router";

export const apiRouter = Router();

// /api/v1/users
apiRouter.use('/users', usersRouter);

// /api/v1/categories
apiRouter.use('/categories', categoriesRouter);
