import { v1 as uuid } from "uuid";
import { Op } from "sequelize";
import bcrypt from "bcrypt";

// Import classes
import { Endpoints } from "src/classes/Endpoints";

// Import models
import identity from "src/databases/identity";

// Import services
import { authService } from "src/services/auth";

// Import validators
import {
  UserDataSignInValidator,
  UserDataSignUpValidator,
} from "src/services/validators/user";

const authEndpoints = new Endpoints("auth");
const IdentityModels = identity();
const salt = 5;

// Add your handlers here
authEndpoints.createHandler("sign-up").post(async (req, res, o) => {
  const data = req.body;

  // Validate data
  const validationResult = UserDataSignUpValidator.validate(data);
  // Check validation result
  if (validationResult.error) {
    o.code = 400;
    throw new Error(validationResult.error.message);
  }

  // Find user by username and email
  const userCount = await IdentityModels.User.count({
    where: {
      [Op.or]: [{ username: data.username }, { email: data.email }],
    },
  });

  // Check if user with that email or username exists
  if (userCount > 0) {
    o.code = 400;
    throw new Error("The account with this username or email is registered");
  }

  // Hashed password
  const hashedPassword = bcrypt.hashSync(data.password, salt);

  // Delete password and confirmPassword
  delete data.password;
  delete data.confirmPassword;

  // Get role
  const role = (await IdentityModels.Role.findOne({
    where: {
      name: "User",
    },
  }))!.toJSON();

  // Insert user to database
  const insertResult = (
    await IdentityModels.User.create({
      ...data,
      id: uuid(),
      hashedPassword,
    })
  ).toJSON();

  return {
    user: { ...data, id: insertResult.id },
    token: authService.createToken(role.name),
  };
});

authEndpoints.createHandler("sign-in").post(async (req, res, o) => {
  const data = req.body;

  // Validate data
  const validationResult = UserDataSignInValidator.validate(data);
  // Check validation result
  if (validationResult.error) {
    o.code = 400;
    throw new Error(validationResult.error.message);
  }

  // Find user with username
  const findUserResult = await IdentityModels.User.findOne();

  if (!findUserResult) {
    o.code = 400;
    throw new Error(`The user \`${data.username}\` is not registered`);
  }

  const user = findUserResult.toJSON();

  // Check password
  if (!bcrypt.compareSync(data.password, user.hashedPassword)) {
    o.code = 400;
    throw new Error("Incorrect password");
  }

  return {
    user: { ...data, id: user.id },
    token: authService.createToken("User"),
  };
});

export default authEndpoints;