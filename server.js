const app = require('./app');

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', ()=>{
  console.log(`StudIn API is listening on port ${PORT}`);
});
