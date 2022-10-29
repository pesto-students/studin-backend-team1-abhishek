const app = require('./app');

const port = process.env.port || 3001;

app.listen(port, '0.0.0.0', ()=>{
  console.log(`StudIn API is listening on port ${port}`);
});
