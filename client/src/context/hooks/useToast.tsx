import { ToastContext } from "@context/providers/ToastContext";
import { useContext } from "react";

export function useToast() {
	const toast = useContext(ToastContext);
	if (toast === null)
		throw new Error("'useToast' must be wrap inside the 'ToastContext'.");
	return toast;
}
