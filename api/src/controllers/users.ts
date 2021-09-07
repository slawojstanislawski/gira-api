import { createEntity } from "../utils/typeorm";
import { catchErrors } from '../errors';
import { Project, User } from '../entities';
import { seedProject, seedIssues } from '../database/seedDatabase';

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

  const existingProject = await Project.createQueryBuilder('project')
    .select()
    .where(
      'project.id = 1'
    )
    .getOne();
  console.log("existingProject", existingProject);

  if (existingUser) {
    res.status(422).json({
      status: 'User already exists'
    });
  } else if(existingProject) {
    user = await createEntity(User, {
      ...req.body,
      project: existingProject
    });
    await seedIssues(existingProject, [user]);
    res.respond({ user });
  }
  else{
    user = await createEntity(User, {
      ...req.body,
    });
    const project = await seedProject([user]);
    await seedIssues(project, [user]);
    res.respond({ user });
  }
});
