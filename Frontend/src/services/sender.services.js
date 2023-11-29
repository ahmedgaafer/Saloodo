export async function getUserParcels(userId) {
	const URL = `http://localhost:3000/parcels/user/${userId}`;

	return await fetch(URL).then(async (res) => ({
		status: res.status,
		data: await res.json(),
	}));
}

export async function addNewParcel(parcel) {
	const URL = `http://localhost:3000/parcels/`;

	console.log(parcel);

	return await fetch(URL, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(parcel),
	}).then((res) => res.json());
}
