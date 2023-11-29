export async function getBikerParcels(userId) {
	const URL = `http://localhost:3000/parcels/rider/${userId}`;

	return await fetch(URL).then(async (res) => ({
		status: res.status,
		data: await res.json(),
	}));
}

export async function assignBikerToParcel(bikerId, parcelId) {
	const URL = `http://localhost:3000/parcels/rider`;

	return await fetch(URL, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ riderID: bikerId, parcelID: parcelId }),
	}).then(async (res) => {
		return {
			status: res.status,
			data: await res.json(),
		};
	});
}

export async function getAvailableParcels() {
	const URL = `http://localhost:3000/parcels/`;

	return await fetch(URL).then(async (res) => ({
		status: res.status,
		data: await res.json(),
	}));
}

export async function deliverPackage(parcelId) {
	const URL = `http://localhost:3000/parcels/status`;

	return await fetch(URL, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ parcelID: parcelId, status: "DELIVERED" }),
	}).then(async (res) => {
		return {
			status: res.status,
			data: await res.json(),
		};
	});
}
