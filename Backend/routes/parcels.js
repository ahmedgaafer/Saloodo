var express = require("express");
var router = express.Router();
const dbFunctions = require("../db/index");
router.get("/", async function (req, res, next) {
	const parcels = await dbFunctions.parcels.getAvailableParcels();
	console.log(parcels);

	res.status(200).send({ parcels });
});
router.post("/", async function (req, res, next) {
	const { ownerID, parcelInfo, parcelFrom, parcelTo } = req.body;

	const newParcel = await dbFunctions.parcels.addParcel(
		ownerID,
		parcelInfo,
		parcelFrom,
		parcelTo
	);

	if (!newParcel)
		res.status(400).send({ message: "Invalid data", added: false });
	else res.status(200).send({ added: true });
});

router.put("/status", async function (req, res, next) {
	const { parcelID, status } = req.body;

	const parcel = await dbFunctions.parcels.updateParcelStatus(
		parcelID,
		status
	);

	if (!parcel)
		res.status(400).send({ message: "Invalid parcel id", parcel: false });
	else res.status(200).send({ parcel: true });
});

router.put("/rider", async function (req, res, next) {
	const { parcelID, riderID } = req.body;

	const parcel = await dbFunctions.parcels.addRiderToParcel(
		parcelID,
		riderID
	);

	if (!parcel)
		res.status(400).send({
			message: "Invalid parcel or rider id",
			parcel: false,
		});
	else res.status(200).send({ parcel: true });
});

router.get("/user/:userID", async function (req, res, next) {
	const { userID } = req.params;

	const parcels = await dbFunctions.parcels.getUserParcels(userID);

	res.status(200).send({ parcels });
});

router.get("/rider/:riderId", async function (req, res, next) {
	const { riderId } = req.params;

	const parcels = await dbFunctions.parcels.getRiderParcels(riderId);

	res.status(200).send({ parcels });
});
module.exports = router;
