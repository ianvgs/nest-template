import { registerAs } from '@nestjs/config';
import UserDatabaseConfig from './databases/user.config'

export default registerAs('database', () => ({
  user: UserDatabaseConfig(),
}));

