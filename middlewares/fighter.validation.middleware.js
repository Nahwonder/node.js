import { FIGHTER } from "../models/fighter.js";

const isValidNumber = (value, min, max) => {
  const valueInt = Number(value);
  return valueInt >= min && valueInt <= max;
};

const createFighterValid = (req, res, next) => {
  const { id, name, health, power, defense } = req.body;
  const validationErrors = [];

  if (!name || !power || !health || !defense) {
    return res.status(400).json({ message: "Required fields are missing" });
  }

  if (id) {
    return res
      .status(400)
      .json({ message: "Id should not be included in the request body" });
  }

  const allowedFields = Object.keys(FIGHTER).filter((field) => field !== "id");
  const requestFields = Object.keys(req.body);
  const hasForbiddenFields = requestFields.some(
    (field) => !allowedFields.includes(field)
  );
  if (hasForbiddenFields) {
    return res
      .status(400)
      .json({ message: "Request body contains invalid fields" });
  }

  if (!isValidNumber(power, 1, 100)) {
    validationErrors.push("Power value is out of range");
  }

  if (!isValidNumber(defense, 1, 10)) {
    validationErrors.push("Defense value is out of range");
  }

  if (health && !isValidNumber(health, 80, 120)) {
    validationErrors.push("Health value is out of range");
  }

  if (validationErrors.length > 0) {
    return res.status(400).json({ message: validationErrors.join(", ") });
  }

  next();
};

const updateFighterValid = (req, res, next) => {
  const { id, health, power, defense } = req.body;
  const validationErrors = [];

  if (id) {
    return res
      .status(400)
      .json({ message: "Id should not be included in the request body" });
  }

  const allowedFields = Object.keys(FIGHTER).filter((field) => field !== "id");
  const requestFields = Object.keys(req.body);
  const hasValidField = requestFields.some((field) =>
    allowedFields.includes(field)
  );
  if (!hasValidField) {
    validationErrors.push("At least one valid field must be included");
  }

  const hasForbiddenFields = requestFields.some(
    (field) => !allowedFields.includes(field)
  );
  if (hasForbiddenFields) {
    validationErrors.push("Request body contains invalid fields");
  }

  if (power && !isValidNumber(power, 1, 100)) {
    validationErrors.push("Power value is out of range");
  }

  if (defense && !isValidNumber(defense, 1, 10)) {
    validationErrors.push("Defense value is out of range");
  }

  if (health && !isValidNumber(health, 80, 120)) {
    validationErrors.push("Health value is out of range");
  }

  if (validationErrors.length > 0) {
    return res.status(400).json({ message: validationErrors.join(", ") });
  }

  next();
};

export { createFighterValid, updateFighterValid };
