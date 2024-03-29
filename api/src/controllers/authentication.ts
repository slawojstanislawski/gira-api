import { catchErrors } from '../errors';
import { signToken } from '../utils/authToken';
import seedDatabase from '../database/seedDatabase';
import { User } from "../entities";

export const createGuestAccount = catchErrors(async (_req, res) => {
  const user = await seedDatabase();
  res.respond({
    authToken: signToken({ sub: user.id }),
  });
});

export const authenticateUser = catchErrors(async (_req, res) => {
  const { name, password } = _req.body;
  const user = await User.findOne({
    where: {
      name,
      password
    }
  });
  console.log("authenticateUser > user", user);
  if (!user) {
    res.status(404).send();
  } else {
    const {password, ...remainingUserData}  = user;
    res.respond({
      authToken: signToken({ sub: user.id }),
      user: remainingUserData
    });
  }
});
