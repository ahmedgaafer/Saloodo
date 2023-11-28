const db = require("./init.db").db;

module.exports.login = function (username, password) {
	return new Promise((resolve, reject) => {
		db.serialize(async () => {
			const userStm = db.prepare(
				`SELECT * FROM User WHERE Username = ? AND Password = ?`
			);

			userStm.get(username, password, (err, row) => {
				if (err) {
					console.log("Error", err);
					reject(err);
				} else {
					console.log(row);
					resolve(row);
				}
			});
		});
	});
};
