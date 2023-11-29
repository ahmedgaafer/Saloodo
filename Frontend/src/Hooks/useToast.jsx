import { useRef } from "react";

const usePrimeToast = () => {
	const toastRef = useRef(null);

	const showToast = (severity, detail, summary = "Notification") => {
		toastRef.current.show({ severity, summary, detail });
	};

	return {
		showToast,
		toastRef,
	};
};

export default usePrimeToast;
