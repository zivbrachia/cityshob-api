import App from '@/app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';
import validateEnv from '@utils/validateEnv';
import TypesRoute from '@routes/types.route';
import SubTypesRoute from '@routes/subTypes.route';
import ConnectionStates from '@routes/connectionStates.route';
import SensorTypesRoute from '@routes/sensorTypes.route';
import SensorRoute from '@routes/sensors.route';

validateEnv();

const app = new App([
  new IndexRoute(),
  new UsersRoute(),
  new TypesRoute(),
  new SubTypesRoute(),
  new ConnectionStates(),
  new SensorTypesRoute(),
  new SensorRoute(),
  new AuthRoute(),
]);

app.listen();
