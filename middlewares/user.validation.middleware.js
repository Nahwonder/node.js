import { USER } from "../models/user.js";

const isValidPhoneNumber = (phoneNumber) => {
  return (
    phoneNumber.startsWith("+380") &&
    phoneNumber.length === 13 &&
    typeof phoneNumber === "string"
  );
};

const isValidEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return (
    emailPattern.test(email) &&
    email.endsWith("@gmail.com") &&
    typeof email === "string"
  );
};

const isValidPassword = (password) => {
  return typeof password === "string" && password.length >= 3;
};

const createUserValid = (req, res, next) => {
  const newUser = req.body;
  const requiredFields = [
    "firstName",
    "lastName",
    "email",
    "phoneNumber",
    "password",
  ];
  const validationErrors = [];

  for (const field of requiredFields) {
    if (!newUser[field]) {
      validationErrors.push(`Missing field: ${field}`);
    }
  }

  if (newUser.email && !isValidEmail(newUser.email)) {
    validationErrors.push("Email format is incorrect");
  }

  if (newUser.phoneNumber && !isValidPhoneNumber(newUser.phoneNumber)) {
    validationErrors.push("Phone number format is incorrect");
  }

  if (!isValidPassword(newUser.password)) {
    validationErrors.push("Password format is incorrect " + newUser.pass);
  }

  if (validationErrors.length > 0) {
    return res.status(400).json({ message: validationErrors.join(", ") });
  }
  next();
};

const updateUserValid = (req, res, next) => {
  const { id, email, phoneNumber, password } = req.body;
  const validationErrors = [];

  if (id) {
    return res
      .status(400)
      .json({ message: "Request body should not include id" });
  }

  const allowedFields = Object.keys(USER).filter((field) => field !== "id");
  const requestFields = Object.keys(req.body);

  const hasAllowedField = requestFields.some((field) =>
    allowedFields.includes(field)
  );
  if (!hasAllowedField) {
    validationErrors.push("Must include at least one updatable field");
  }

  const hasForbiddenFields = requestFields.some(
    (field) => !allowedFields.includes(field)
  );
  if (hasForbiddenFields) {
    validationErrors.push("Request body contains invalid fields");
  }

  if (email && !isValidEmail(email)) {
    validationErrors.push("Email format is incorrect");
  }

  if (phoneNumber && !isValidPhoneNumber(phoneNumber)) {
    validationErrors.push("Phone number format is incorrect");
  }

  if (password && !isValidPassword(password)) {
    validationErrors.push("Password format is incorrect");
  }

  if (validationErrors.length > 0) {
    return res.status(400).json({ message: validationErrors.join(", ") });
  }

  next();
};

export { createUserValid, updateUserValid };
