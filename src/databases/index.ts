import { DB_HOST, DB_USER, DB_PASSWORD, DB_PORT, DB_DATABASE } from '@config';

export const dbConnection = {
  // url: `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`,
  url: `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_DATABASE}?retryWrites=true&w=majority&appName=Cluster0`,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};
