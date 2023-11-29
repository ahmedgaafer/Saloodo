import React, { useState } from "react";
import { Toolbar } from "primereact/toolbar";
import Logo from "../assets/logo.svg";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { login } from "../services/login.service";

const NavRight = () => {
	return (
		<div className="nav-right">
			<img src={Logo} />
		</div>
	);
};

const NavLeft = ({ setUser, user, showToast }) => {
	const [visible, setVisible] = useState(false);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleLogout = () => {
		setUser(null);
		showToast("success", "Logout Successful");
		setVisible(false);
	};

	const handleLogin = async () => {
		const user = await login(username, password);

		if (user.status === 200) {
			setUser(user.data);
			showToast("success", `Welcome ${user.data.Username}`);
			setVisible(false);
		} else if (user.status === 401) {
			setUser(null);
			showToast("error", user.data.message);
			setVisible(false);
		} else {
			showToast("error", "Issue with server");
			setVisible(false);
		}
	};

	const isUser = !!user;
	return (
		<div className="nav-left">
			<Button
				label={isUser ? "Logout" : "Login"}
				icon={`pi pi-sign-${isUser ? "out" : "in"}`}
				onClick={() => setVisible(true)}
			/>

			<Dialog
				header={isUser ? "Logout" : "Login"}
				visible={visible}
				onHide={() => setVisible(false)}
			>
				{isUser ? (
					<>
						<Button
							label="Yes"
							icon={`pi pi-times`}
							severity="danger"
							onClick={handleLogout}
							autoFocus
							className="mr-4"
						/>
						<Button
							label="No"
							icon={`pi pi-times`}
							severity="secondary"
							onClick={() => setVisible(false)}
						/>
					</>
				) : (
					<>
						<label
							htmlFor="username"
							className="font-bold block mb-2"
						>
							Username
						</label>
						<InputText
							id="username"
							className="w-full"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>

						<label
							htmlFor="password"
							className="font-bold block mb-2"
						>
							Password
						</label>
						<InputText
							id="password"
							type="password"
							className="w-full"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>

						<Button
							label="Login"
							className="w-full mt-4"
							onClick={handleLogin}
							icon="pi pi-sign-in"
						/>
					</>
				)}
			</Dialog>
		</div>
	);
};

function Nav({ setUser, user, showToast }) {
	return (
		<div className="card nav">
			<Toolbar
				start={<NavRight />}
				center={<h3>Freight App {user?.Type && `(${user.Type})`}</h3>}
				end={
					<NavLeft
						setUser={setUser}
						user={user}
						showToast={showToast}
					/>
				}
			/>
		</div>
	);
}

export default Nav;
