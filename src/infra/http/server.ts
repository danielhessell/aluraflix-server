import { app } from './app';

app.listen(process.env.PORT || 3333, () => {
  console.log('🚀 Server running on port 3333.');
});
