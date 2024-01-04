import express from 'express';
import bodyParser from 'body-parser';
import { bookRouter } from './routes/bookRoutes';
import { authorRouter } from './routes/authorRoutes';

const app = express();
app.use(bodyParser.json());

app.use('/books', bookRouter);
app.use('/authors', authorRouter);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
