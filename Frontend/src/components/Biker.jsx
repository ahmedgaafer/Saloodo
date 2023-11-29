import React, { useEffect, useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import {
	getBikerParcels,
	assignBikerToParcel,
	getAvailableParcels,
	deliverPackage,
} from "../services/biker.services";
import { Button } from "primereact/button";
import { Accordion, AccordionTab } from "primereact/accordion";

const ParcelsTable = ({ parcels, user, showToast, setParcels }) => {
	const assignParcel = async (e) => {
		assignBikerToParcel(user.UserID, e.ParcelID).then((res) => {
			if (res.status === 200) {
				showToast("success", "Biker assigned to parcel");
				setParcels((prev) => {
					return prev.filter(
						(parcel) => parcel.ParcelID !== e.ParcelID
					);
				});
			} else {
				showToast("error", res.data.message);
			}
		});
	};
	return (
		<DataTable
			value={parcels.map((parcel) => {
				parcel.action = (
					<Button
						label="Assign"
						onClick={() => assignParcel(parcel)}
					/>
				);
				return parcel;
			})}
			paginator
			rows={5}
			rowsPerPageOptions={[5, 10, 25, 50]}
			tableStyle={{ minWidth: "50rem" }}
		>
			<Column field="ParcelID" header="ID"></Column>
			<Column field="ParcelInfo" header="Info"></Column>
			<Column field="ParcelFrom" header="Pick up from"></Column>
			<Column field="ParcelTo" header="Delivery to"></Column>
			<Column field="OwnerID" header="OwnerID"></Column>
			<Column field="action" header="Assign order"></Column>
		</DataTable>
	);
};

const ActiveParcels = (bikerParcels, setParcels, showToast) => {
	return bikerParcels.map((parcel) => {
		return (
			<AccordionTab
				header={`Parcel ${parcel.ParcelInfo} Status: ${parcel.ParcelStatus}`}
				key={parcel.ParcelID}
			>
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
					<div>
						<strong>Picked up at: </strong>
						{parcel.PickedAt}
					</div>
					{parcel.DeliveredAt && (
						<div>
							<strong>Delivered at: </strong>
							{parcel.DeliveredAt}
						</div>
					)}
				</section>
				{parcel.ParcelStatus !== "DELIVERED" && (
					<Button
						label="Deliver"
						onClick={() => {
							deliverPackage(parcel.ParcelID).then((res) => {
								if (res.status === 200) {
									showToast("success", "Parcel delivered");
									setParcels((prev) => {
										//change parcel status to dilivered
										return prev.map((p) => {
											if (
												p.ParcelID === parcel.ParcelID
											) {
												return {
													...p,
													ParcelStatus: "DELIVERED",
												};
											}
											return p;
										});
									});
								} else {
									showToast("error", res.data.message);
								}
							});
						}}
					/>
				)}
			</AccordionTab>
		);
	});
};
function Biker({ user, showToast }) {
	const [parcels, setParcels] = useState([]);
	const [bikerParcels, setBikerParcels] = useState([]);
	const [activeIndex, setActiveIndex] = useState(0);

	const fetchBikerParcels = async () => {
		const bikerParcels = await getBikerParcels(user.UserID);

		if (bikerParcels.status === 200) {
			setBikerParcels(bikerParcels.data.parcels);
		} else {
			setBikerParcels([]);
			showToast("error", bikerParcels.data.message);
		}
	};

	const fetchAvailableParcels = async () => {
		const newParcels = await getAvailableParcels();

		if (newParcels.status === 200) {
			setParcels(newParcels.data.parcels);
		} else {
			setParcels([]);
			showToast("error", newParcels.data.message);
		}
	};

	useEffect(() => {
		fetchAvailableParcels();
	}, []);

	return (
		<div className="card">
			<TabView
				onTabChange={(e) => {
					setActiveIndex(e.index);
					e.index === 0 && fetchAvailableParcels();
					e.index === 1 && fetchBikerParcels();
				}}
				activeIndex={activeIndex}
			>
				<TabPanel header="Available parcels">
					{parcels && (
						<ParcelsTable
							parcels={parcels}
							user={user}
							setParcels={setParcels}
							showToast={showToast}
						/>
					)}
				</TabPanel>
				<TabPanel header="My parcels">
					<Accordion>
						{bikerParcels &&
							ActiveParcels(
								bikerParcels,
								setBikerParcels,
								showToast
							)}
					</Accordion>
				</TabPanel>
			</TabView>
		</div>
	);
}

export default Biker;
