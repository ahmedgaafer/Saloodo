import React from "react";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/fluent-light/theme.css"; // theme
import "primeflex/primeflex.css"; // css utility
import "primeicons/primeicons.css";
import "primereact/resources/primereact.css";

import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import "./index.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<PrimeReactProvider>
			<App />
		</PrimeReactProvider>
	</React.StrictMode>
);
