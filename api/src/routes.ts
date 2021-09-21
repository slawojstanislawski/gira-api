import * as authentication from './controllers/authentication';
import * as comments from './controllers/comments';
import * as issues from './controllers/issues';
import * as projects from './controllers/projects';
import * as test from './controllers/test';
import * as users from './controllers/users';

import path from 'path';

export const attachPublicRoutes = (app: any): void => {
  if (process.env.NODE_ENV === 'test') {
    app.delete('/test/reset-database', test.resetDatabase);
    app.post('/test/create-account', test.createAccount);
  }

  app.post('/users/new', users.createNewUser);
  app.post('/authenticate', authentication.authenticateUser);

  app.post('/authentication/guest', authentication.createGuestAccount);
  // Slawoj: for initial Postman test
  app.get('/authentication/guest', authentication.createGuestAccount);

  //just for hosting
  app.get(['/register', '/login', '/backlog', '/board', '/settings'], function(_req:any, res:any) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'), function(err:any) {
       if (err) {
        res.status(500).send(err)
       }
     })
  })
};

export const attachPrivateRoutes = (app: any): void => {
  app.post('/comments', comments.create);
  app.put('/comments/:commentId', comments.update);
  app.delete('/comments/:commentId', comments.remove);

  app.get('/issues', issues.getProjectIssues);
  app.get('/issues/:issueId', issues.getIssueWithUsersAndComments);
  app.post('/issues', issues.create);
  app.put('/issues/:issueId', issues.update);
  app.delete('/issues/:issueId', issues.remove);

  app.get('/project', projects.getProjectWithUsersAndIssues);
  app.put('/project', projects.update);

  app.get('/currentUser', users.getCurrentUser);
};
