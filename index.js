const express = require("express");
const app = express();

const usersRoute = require("./routes/users");
const postsRoute = require("./routes/posts");

app.set("json spaces", 2);
app.use(express.json());
app.use("/users", usersRoute);
app.use("/posts", postsRoute);

app.listen(3000);