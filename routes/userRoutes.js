import { Router } from "express";
import { userService } from "../services/userService.js";
import {
  createUserValid,
  updateUserValid,
} from "../middlewares/user.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

router.use(responseMiddleware);

// // TODO: Implement route controllers for user

// GET /api/users
router.get("/", async (req, res, next) => {
  try {
    const users = await userService.getUsers();
    if (users) {
      res.success("User list has been sent", users);
    } else {
      res.notFound("Ooops something went wrong. There is no User list");
    }
  } catch (error) {
    next();
  }
});

// GET /api/users/:id
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const existingUser = await userService.getUserById(id);

    if (existingUser) {
      res.success("User found", existingUser);
    } else {
      res.notFound(`User with id ${id} does not exist`);
    }
  } catch (error) {
    next();
  }
});

// POST /api/users;
router.post("/", createUserValid, async (req, res, next) => {
  try {
    const newUser = req.body;
    const addUser = await userService.createUser(newUser);

    if (addUser) {
      res.success("User has been added", newUser, 201);
    } else {
      res.validationError(
        "User with such email or phone number already exists"
      );
    }
  } catch (error) {
    next();
  }
});

// PATCH /api/users/:id
router.patch("/:id", updateUserValid, (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedUser = req.body;
    const updateUser = userService.updateUser(id, updatedUser);

    if (updateUser) {
      res.success("User has been updated", updateUser);
    } else {
      res.validationError(
        "User with such email or phone number already exists or no user to update was found"
      );
    }
  } catch (error) {
    next();
  }
});

// DELETE /api/users/:id
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteUser = await userService.deleteUser(id);

    if (deleteUser) {
      res.success("User has been deleted", id);
    } else {
      res.notFound(`User with id ${id} does not exist`);
    }
  } catch (error) {
    next();
  }
});

export { router };
