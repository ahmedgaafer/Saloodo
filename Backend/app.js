const createError = require("http-errors");
const express = require("express");
const logger = require("morgan");
var cors = require("cors");

const { PORT } = require("./constants/index");
const dbFunctions = require("./db/index");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const parcelsRouter = require("./routes/parcels");

const app = express();

app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/parcels", parcelsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.send("error");
});

app.listen(PORT, async () => {
	// server init logic
	console.log(`App listening on port ${PORT}`);

	dbFunctions.init.validateTableAndInitData();
});

module.exports = app;
