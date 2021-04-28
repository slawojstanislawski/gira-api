import { createEntity } from "../utils/typeorm";
import { catchErrors } from 'errors';
import { Project, User } from '../entities';

export const getCurrentUser = catchErrors((req, res) => {
  res.respond({ currentUser: req.currentUser });
});

export const createNewUser = catchErrors(async (req, res) => {
  let user;
  const { name, email } = req.body;

  const existingUser = await User.createQueryBuilder('user')
    .select()
    .where(
      'user.name = :name OR user.email = :email',
      {
        name,
        email
      }
    )
    .getOne();
  console.log("existingUser", existingUser);
  if (existingUser) {
    res.status(422).json({
      status: 'User already exists'
    });
  } else {
    const project = await Project.findOne(1);
    user = await createEntity(User, {
      ...req.body,
      project
    });
    res.respond({ user });
  }
});
