const app = require('./app');

const port = process.env.PORT || 5000;

app.listen(port, '0.0.0.0', ()=>{
  console.log(`StudIn API is listening on port ${port}`);
});
