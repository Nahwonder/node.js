import { Router } from "express";
import { fighterService } from "../services/fighterService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import {
  createFighterValid,
  updateFighterValid,
} from "../middlewares/fighter.validation.middleware.js";

const router = Router();

router.use(responseMiddleware);

// TODO: Implement route controllers for fighter

// GET /api/fighters
router.get("/", async (req, res, next) => {
  try {
    const fighters = await fighterService.getFighters();
    if (fighters) {
      res.success("Fighter list has been sent", fighters);
    } else {
      res.notFound("Ooops something went wrong. There is no Fighter list");
    }
  } catch (error) {
    next();
  }
});

// GET /api/fighters/:id
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const existingFighter = await fighterService.getFighterById(id);

    if (existingFighter) {
      res.success("Fighter found", existingFighter);
    } else {
      res.notFound(`Fighter with id ${id} does not exist`);
    }
  } catch (error) {
    next();
  }
});

// POST /api/fighters
router.post("/", createFighterValid, async (req, res, next) => {
  try {
    const newFighter = req.body;
    const addFighter = await fighterService.createFighter(newFighter);

    if (addFighter) {
      res.success("Fighter has been added", newFighter, 201);
    } else {
      res.validationError("Fighter with such a name already exists");
    }
  } catch (error) {
    next();
  }
});

// PATCH /api/fighters/:id
router.patch("/:id", updateFighterValid, async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedFighter = req.body;
    const updateFighter = await fighterService.updateFighter(
      id,
      updatedFighter
    );

    if (updateFighter) {
      res.success("Fighter has been updated", updateFighter);
    } else {
      res.validationError(
        "Fighter with such a name already exists or no fighter to update was found"
      );
    }
  } catch (error) {
    next();
  }
});

// DELETE /api/fighters/:id
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteFighter = await fighterService.deleteFighter(id);

    if (deleteFighter) {
      res.success("Fighter has been deleted", id);
    } else {
      res.notFound(`Fighter with id ${id} does not exist`);
    }
  } catch (error) {
    next();
  }
});

export { router };
