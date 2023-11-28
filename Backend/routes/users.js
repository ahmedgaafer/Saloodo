var express = require("express");
var router = express.Router();
const dbFunctions = require("../db/index");

/* GET users listing. */
router.get("/", function (req, res, next) {
	res.send("respond with a resource");
});

router.post("/auth/login", async function (req, res, next) {
	const { username, password } = req.body;

	const userInfo = await dbFunctions.auth.login(username, password);

	if (!userInfo)
		res.status(401).send({ message: "Invalid username or password" });
	else res.status(200).send(userInfo);
});

module.exports = router;
