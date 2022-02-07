require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");

const indexRoutes = require("./server/routes/indexRoutes.js");
const productsRoutes = require("./server/routes/productsRoutes.js");

const app = express();
const port = process.env.PORT || 3000;

//database connection
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Databe Connected Successfully");
});

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());

// app.use(cookieParser("CookingBlogSecure"));
app.use(
  session({
    secret: "CookingBlogSecretSession",
    saveUninitialized: true,
    resave: false,
  })
);
app.use((req, res, next) => {
  res.locals.message = req.session.message;
  delete req.session.message;
  next();
});

// app.use(flash());
// app.use(fileUpload());

// app.use("/css", express.static(path.resolve(__dirname, "public/css")));
// app.use("/images", express.static(path.resolve(__dirname, "public/images")));
// app.use("/js", express.static(path.resolve(__dirname, "public/js")));
app.set("view engine", "ejs");

app.use("/", indexRoutes);
app.use("/admin", productsRoutes);

app.listen(port, () => console.log(`Listening to port ${port}`));
