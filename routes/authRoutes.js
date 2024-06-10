import { Router } from "express";
import { authService } from "../services/authService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

router.use(responseMiddleware);

router.post(
  "/login",
  (req, res, next) => {
    try {
      // TODO: Implement login action (get the user if it exist with entered credentials)
      const { email, password } = req.body;
      const checkUser = authService.login(email, password);
      checkUser
        ? (res.data = checkUser)
        : res.validationError("Email or password is incorrect");
    } catch (err) {
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);

export { router };
