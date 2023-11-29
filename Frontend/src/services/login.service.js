export async function login(username, password) {
	const requestOptions = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ username, password }),
	};

	console.log(requestOptions);

	const response = await fetch(
		"http://localhost:3000/users/auth/login/",
		requestOptions
	).then(async (res) => ({ status: res.status, data: await res.json() }));

	return response;
}
