const sqlite3 = require("sqlite3").verbose();
const sampleData = require("../constants/sampleData.js").sampleData;
const dbPath = require("../constants/index").dbPath;

let db = new sqlite3.Database(dbPath, (err) => {
	if (err) {
		console.error(`Error opening database ${dbPath}: ${err.message}`);
	} else {
		console.log(`Opened the database ${dbPath}`);
	}
});

//#region DB

module.exports.closeDBServer = async function () {
	return new Promise((resolve, reject) => {
		db.close((err) => {
			if (err) {
				console.error(
					`Error closing database ${dbPath}: ${err.message}`
				);
				reject(false);
			} else {
				console.log(`Closed the database ${dbPath}`);
				// Assume validation logic here if needed
				resolve(true);
			}
		});
	});
};

module.exports.validateTableAndInitData = async function () {
	db.serialize(async () => {
		// check if table not exists create it
		db.run(`CREATE TABLE IF NOT EXISTS User (
                UserID INTEGER PRIMARY KEY,
                Username TEXT NOT NULL,
                Password TEXT NOT NULL,
                Type TEXT NOT NULL,
                CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                UpdatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
            )`);

		db.run(`CREATE TABLE IF NOT EXISTS Parcel (
                ParcelID INTEGER PRIMARY KEY,
                OwnerID INT,
				BikerID INT,
				ParcelInfo TEXT,
				ParcelFrom TEXT,
				ParcelTo TEXT,
				ParcelStatus TEXT,
                CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                UpdatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                PickedAt DATETIME,
                DeliveredAt DATETIME,
				FOREIGN KEY (OwnerID) REFERENCES User(UserID),
				FOREIGN KEY (BikerID) REFERENCES User(UserID)
            )`);

		// Insert each user from sampleData
		const stmt = db.prepare(`
        INSERT OR IGNORE INTO User ( username, password, type)
        VALUES (?, ?, ?)
        `);

		const userExist = db.prepare(`SELECT * FROM User WHERE Username = ?`);
		for (let i = 0; i < sampleData.users.length; i++) {
			const user = sampleData.users[i];

			userExist.get(user.username, (err, row) => {
				if (err) {
					return console.error("Error checking if user exists", err);
				}

				if (row) {
					console.log(
						"User already exists",
						row.UserID,
						row.Username
					);
				} else {
					stmt.run(user.username, user.password, user.type, (err) => {
						if (err) console.log("Error inserting user", err);
						if (i === sampleData.users.length - 1) {
							stmt.finalize();
							userExist.finalize();
						}
					});
				}
			});
		}
	});
};

//#endregion

module.exports.db = db;
