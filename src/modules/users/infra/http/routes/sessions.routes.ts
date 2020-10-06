import { Router } from 'express';
import AutenticationUserService from '../../../services/AuthenticationUserService';
import UserRepository from '../../typeorm/repositories/UserRepository';

const sessionRouter = Router();

sessionRouter.post('/', async (request, response) => {
  const { email, password } = request.body;
  const autenticationUserService = new AutenticationUserService(
    new UserRepository(),
  );
  const { user, token } = await autenticationUserService.execute({
    email,
    password,
  });
  delete user.password;

  const session = { user, token };
  return response.json(session);
});

export default sessionRouter;
