import { useToast } from "@context/hooks/useToast";
import Alert, { AlertProps } from "@ui/Alert";
import { toastAminate } from "@util/animate";
import { motion } from "framer-motion";
import { useEffect } from "react";

export interface ToastProps extends Omit<AlertProps, "className"> {}

export function SingleToast({ ...props }: ToastProps) {
	const toast = useToast();

	useEffect(() => {
		let confirmRemove: NodeJS.Timeout;

		const remover = setTimeout(() => {
			toast(null);
			confirmRemove = setTimeout(() => {
				toast(null);
			}, 300);
		}, 5000);

		return () => {
			clearTimeout(remover);
			clearTimeout(confirmRemove);
		};
	}, []);

	return (
		<motion.div
			initial={toastAminate.initial}
			animate={toastAminate.animate}
			exit={toastAminate.exit}
			className="overflow-hidden rounded-md"
			key="toast"
		>
			<div
				style={{
					animation: `strech 5s linear forwards`,
				}}
				className="absolute left-0 top-0 h-1 w-full rounded-r-full bg-white"
			></div>
			<button
				style={{
					backgroundImage: "url('/cross.svg')",
				}}
				className="absolute right-0 top-0 m-2.5 block aspect-square w-3.5"
				onClick={() => {
					toast(null);
				}}
			></button>
			<Alert {...props} />
		</motion.div>
	);
}
