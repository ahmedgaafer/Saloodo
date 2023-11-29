import React from "react";
import { TabView, TabPanel } from "primereact/tabview";

function Biker() {
	return (
		<div className="card">
			<TabView>
				<TabPanel header="Available parcels">
					available parcels
				</TabPanel>
				<TabPanel header="My parcels">my parcels</TabPanel>
			</TabView>
		</div>
	);
}

export default Biker;
