import { useActionData } from "react-router-dom";

export function validateSignupOrLoginData(actionData, isSignup = false) {
  if (!actionData) {
    return { valid: false, errors: { general: "No data provided." } };
  }

  const { displayName, email, password, confirmPassword } = actionData;
  const errors = {};

  // Signup-specific validation
  if (isSignup) {
    if (!displayName || displayName.trim().length < 3) {
      errors.displayName = "Display name must be at least 3 characters long.";
    }

    if (!confirmPassword || password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.email = "Invalid email address.";
  }

  // Password validation
  if (!password || password.length < 6) {
    errors.password = "Password must be at least 6 characters long.";
  }

  if (Object.keys(errors).length === 0) {
    return { valid: true };
  }

  return { valid: false, errors };
}

export function validateCreateData(actionData) {
  if (!actionData) {
    return { valid: false, errors: { general: "No data provided." } };
  }

  const { name, description, dueTo, assignedUsers, projectType } = actionData;
  const errors = {};

  // Name validation
  if (!name || name.trim().length < 3) {
    errors.name = "Project name must be at least 3 characters long.";
  }

  // Description validation
  if (!description || description.trim().length < 5) {
    errors.description =
      "Project description must be at least 5 characters long.";
  }

  // Due Date validation
  if (!dueTo || isNaN(new Date(dueTo).getTime())) {
    errors.dueTo = "A valid due date is required.";
  }

  // Assigned Users validation
  if (!assignedUsers || assignedUsers.length === 0) {
    errors.assignedUsers = "Please assign at least one user.";
  }

  // Project Type validation
  if (!projectType || projectType.length === 0) {
    errors.projectType = "Please select at least one project type.";
  }

  return Object.keys(errors).length === 0
    ? { valid: true }
    : { valid: false, errors };
}
