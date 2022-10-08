const app = require('./app');

const port = process.env.port || 9000;

app.listen(port, ()=>{
    console.log(`StudIn API is listening on port ${port}`);
});