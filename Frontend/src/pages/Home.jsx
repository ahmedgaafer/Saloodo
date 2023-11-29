import React, { useState } from "react";
import Nav from "../components/Nav";
import Sender from "../components/Sender";
import Biker from "../components/Biker";

const LandingPage = () => {
	const features = [
		{
			title: "Secure Transactions",
			description:
				"Ensure the safety of your shipments with our secure payment system.",
			icon: "🔒",
		},
		{
			title: "Efficient Routing",
			description:
				"Optimized routes for faster and more cost-effective deliveries.",
			icon: "🚚",
		},
		{
			title: "Sender & bikers in the same app",
			description: "We uberized the app for both sender and biker.",
			icon: "🚴🏻‍♂️",
		},
	];
	return (
		<div className="landing-page">
			<h1>Freight App</h1>
			<p>
				Welcome to Freight App where logistics meets simplicity. We're
				here to revolutionize the way you experience freight management.
				Say goodbye to the complexities of shipping and embrace a
				seamless, efficient solution designed just for you. Our
				cutting-edge technology ensures secure transactions, and
				optimized routes, all at your fingertips. Ready to elevate your
				freight experience? Let's embark on this journey together!
			</p>
			<section className="key-features">
				<h2>Key Features</h2>
				<div className="feature-list">
					{features.map((feature, index) => (
						<div key={index} className="feature">
							<div className="icon">{feature.icon}</div>
							<h3>{feature.title}</h3>
							<p>{feature.description}</p>
							{index < features.length - 1 && (
								<span className="divider" />
							)}
						</div>
					))}
				</div>
			</section>
		</div>
	);
};

function Home({ showToast }) {
	const [currentUser, setCurrentUser] = useState(null);

	return (
		<>
			<Nav
				setUser={setCurrentUser}
				user={currentUser}
				showToast={showToast}
			/>
			<div className="page-body">
				{!currentUser?.Type && <LandingPage />}
				{currentUser?.Type === "sender" && (
					<Sender user={currentUser} showToast={showToast} />
				)}
				{currentUser?.Type === "biker" && (
					<Biker user={currentUser} showToast={showToast} />
				)}
			</div>
		</>
	);
}

export default Home;
