import { CustomDispatch } from "@class/HandleDispatch";
import { SingleToast, ToastProps } from "@components/Toast";
import { AnimatePresence } from "framer-motion";
import { PropsWithChildren, createContext, useState } from "react";

export const ToastContext =
	createContext<CustomDispatch<ToastProps | null> | null>(null);

export default function ToastProvider({ children }: PropsWithChildren) {
	const [toast, setToast] = useState<ToastProps | null>(null);

	return (
		<ToastContext.Provider value={setToast}>
			{children}
			<div className="fixed bottom-10 right-10 w-80">
				<AnimatePresence>
					{toast && <SingleToast {...toast} />}
				</AnimatePresence>
			</div>
		</ToastContext.Provider>
	);
}
