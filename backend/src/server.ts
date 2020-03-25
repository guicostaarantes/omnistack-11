import app from "./app";

app.listen(process.env.PORT, function() {
  console.log(`Server listening to port ${process.env.PORT}
NODE_ENV=${process.env.NODE_ENV}
CONFIG_ENV=${process.env.CONFIG_ENV}`);
});
