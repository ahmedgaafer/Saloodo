import { Toast } from "primereact/toast";
import usePrimeToast from "./Hooks/useToast";
import Home from "./pages/Home";

function App() {
	const { showToast, toastRef } = usePrimeToast();

	return (
		<>
			<Home showToast={showToast} />
			<Toast ref={toastRef} position="bottom-left" />
		</>
	);
}

export default App;
