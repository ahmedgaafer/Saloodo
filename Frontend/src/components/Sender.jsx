import { TabPanel, TabView } from "primereact/tabview";
import React, { useState, useEffect } from "react";
import { addNewParcel, getUserParcels } from "../services/sender.services";
import { Accordion, AccordionTab } from "primereact/accordion";
import { Steps } from "primereact/steps";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

function StepsView({ parcel }) {
	let step;
	if (parcel.BikerID) {
		step = parcel.ParcelStatus == "DELIVERED" ? 2 : 1;
	} else {
		step = 0;
	}

	const items = [
		{
			label: "ASSIGNING RIDER",
		},
		{
			label: "In Way",
		},
		{
			label: "Delivered",
		},
	];

	return <Steps model={items} activeIndex={step} />;
}

function renderParcels(parcels) {
	return parcels.map((parcel) => (
		<AccordionTab
			header={`Parcel ${parcel.ParcelInfo} Status: ${parcel.ParcelStatus}`}
			key={parcel.ParcelID}
		>
			<StepsView parcel={parcel} />

			<section>
				<h2>Parcel details</h2>
				<div>
					<strong>name: </strong>
					{parcel.ParcelInfo}
				</div>
				<div>
					<strong>Send date: </strong>
					{parcel.CreatedAt}
				</div>
				<div>
					<strong>Pick up location:</strong> {parcel.ParcelFrom}
				</div>
				<div>
					<strong>Delivery location: </strong>
					{parcel.ParcelTo}
				</div>
				{parcel.PickedAt && (
					<div>
						<strong>Picked up at: </strong>
						{parcel.PickedAt}
					</div>
				)}
				{parcel.DeliveredAt && (
					<div>
						<strong>Delivered at: </strong>
						{parcel.DeliveredAt}
					</div>
				)}
			</section>
		</AccordionTab>
	));
}

function Sender({ user, showToast }) {
	const [currentParcels, setCurrentParcels] = useState([]);
	const [parcelInfo, setParcelInfo] = useState("");
	const [pickup, setPickup] = useState("");
	const [delivery, setDelivery] = useState("");
	const [activeIndex, setActiveIndex] = useState(0);

	const getParcels = () => {
		getUserParcels(user.UserID).then((res) => {
			if (res.status === 200) {
				setCurrentParcels(res.data.parcels);
			}
		});
	};

	useEffect(() => {
		// Do something

		getParcels();
	}, []);

	const addParcel = () => {
		if (
			parcelInfo.length === 0 ||
			pickup.length === 0 ||
			delivery.length === 0
		) {
			showToast("error", "Please fill all the fields");
			return;
		}

		const parcel = {
			ownerID: user.UserID,
			parcelInfo,
			parcelFrom: pickup,
			parcelTo: delivery,
		};
		addNewParcel(parcel).then((res) => {
			if (res.added) {
				showToast("success", "Parcel Added");
			} else {
				showToast("error", res.message);
			}

			getUserParcels(user.UserID).then((res) => {
				if (res.status === 200) {
					setCurrentParcels(res.data.parcels);
				}
			});
		});
	};

	return (
		<div className="card">
			<TabView
				activeIndex={activeIndex}
				onTabChange={(e) => {
					setActiveIndex(e.index);
					e.index === 1 && getParcels();
				}}
			>
				<TabPanel header="Add a new parcel">
					<label
						htmlFor="ParcelInfo"
						className="font-bold block mb-2"
					>
						Parcel info
					</label>
					<InputText
						id="ParcelInfo"
						className="w-full"
						value={parcelInfo}
						onChange={(e) => setParcelInfo(e.target.value)}
					/>
					<label htmlFor="pickup" className="font-bold block mb-2">
						Pick up
					</label>
					<InputText
						id="pickup"
						className="w-full"
						value={pickup}
						onChange={(e) => setPickup(e.target.value)}
					/>
					<label htmlFor="delivery" className="font-bold block mb-2">
						Pick up
					</label>
					<InputText
						id="delivery"
						className="w-full"
						value={delivery}
						onChange={(e) => setDelivery(e.target.value)}
					/>

					<Button
						label="Add parcel"
						onClick={addParcel}
						className="mt-4"
					/>
				</TabPanel>
				<TabPanel header="My parcels">
					{currentParcels.length && (
						<Accordion>{renderParcels(currentParcels)}</Accordion>
					)}
				</TabPanel>
			</TabView>
		</div>
	);
}

export default Sender;
