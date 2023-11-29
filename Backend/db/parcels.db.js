const db = require("./init.db").db;

module.exports.addParcel = function (
	ownerID,
	ParcelInfo,
	parcelFrom,
	parcelTo
) {
	return new Promise((resolve, reject) => {
		db.serialize(async () => {
			const checkStmt = db.prepare(
				"SELECT COUNT(*) as count FROM User WHERE UserID = ? AND Type = 'sender'"
			);

			checkStmt.get(ownerID, (err, row) => {
				if (err) {
					console.log("Error", err);
					resolve(undefined);
				} else {
					console.log("ROW", row);
					if (row.count === 0) return resolve(undefined);

					const stmt = db.prepare(`
					INSERT INTO Parcel (OwnerID, ParcelInfo, ParcelStatus, ParcelFrom, ParcelTo)
					VALUES (?, ?, ?, ?, ?)
					`);

					stmt.run(
						ownerID,
						ParcelInfo,
						"ASSIGNING RIDER",
						parcelFrom,
						parcelTo,

						function (err) {
							if (err) {
								console.log("Error", err);
								resolve(undefined);
							} else {
								resolve(this.lastID);
							}
						}
					);

					stmt.finalize();
				}
			});
		});
	});
};

module.exports.getAvailableParcels = function () {
	return new Promise((resolve, reject) => {
		db.serialize(async () => {
			const stmt = db.prepare(`
            SELECT *
            FROM Parcel
            WHERE BikerID IS NULL
            `);

			stmt.all((err, rows) => {
				if (err) {
					console.log("Error", err);
					reject(undefined);
				} else {
					resolve(rows);
				}
			});

			stmt.finalize();
		});
	});
};

module.exports.addRiderToParcel = function (parcelID, riderID) {
	return new Promise((resolve, reject) => {
		db.serialize(async () => {
			const checkStmt = db.prepare(
				"SELECT COUNT(*) as count FROM User WHERE UserID = ? AND Type = 'biker'"
			);
			checkStmt.get(riderID, (err, row) => {
				if (err) {
					console.log("Error", err);
					resolve(undefined);
				} else {
					if (row.count === 0) return resolve(undefined);

					const stmt = db.prepare(`
                                UPDATE Parcel
                                SET BikerID = ?
                                WHERE ParcelID = ?
                                `);

					stmt.run(riderID, parcelID, function (err, row) {
						if (err) {
							console.log("Error", err);
							resolve(undefined);
						} else {
							resolve(this.changes);
						}
					});

					stmt.finalize();
				}
			});
		});
	});
};

module.exports.updateParcelStatus = function (parcelID, status) {
	return new Promise((resolve, reject) => {
		db.serialize(async () => {
			const stmt = db.prepare(`
            UPDATE Parcel
            SET ParcelStatus = ?
            WHERE ParcelID = ?
            `);

			stmt.run(status, parcelID, function (err) {
				if (err) {
					console.log("Error", err);
					reject(undefined);
				} else {
					resolve(this.changes);
				}
			});

			stmt.finalize();
		});
	});
};

module.exports.getUserParcels = function (userID) {
	return new Promise((resolve, reject) => {
		db.serialize(async () => {
			const stmt = db.prepare(`
            SELECT *
            FROM Parcel
            WHERE OwnerID = ?
            `);

			stmt.all(userID, (err, rows) => {
				if (err) {
					console.log("Error", err);
					reject(undefined);
				} else {
					resolve(rows);
				}
			});

			stmt.finalize();
		});
	});
};

module.exports.getRiderParcels = function (riderID) {
	return new Promise((resolve, reject) => {
		db.serialize(async () => {
			const stmt = db.prepare(`
            SELECT *
            FROM Parcel
            WHERE BikerID = ?
            `);

			stmt.all(riderID, (err, rows) => {
				if (err) {
					console.log("Error", err);
					reject(undefined);
				} else {
					resolve(rows);
				}
			});

			stmt.finalize();
		});
	});
};
