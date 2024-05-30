import { SelectPlayer } from "@ui/Arrow";
import { AppRoutes } from "@util/AppRoutes";
import { ButtonHTMLAttributes, useState } from "react";

interface LoadingButtonMouseClickEvent {
	preventDefault(): void;
}

interface LoadingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	onClick<T extends LoadingButtonMouseClickEvent>(event: T): Promise<void>;
	onError?(error: unknown): void;
	text: string;
	className?: string;
	to?: AppRoutes;
}

export default function LoadingButton({
	onClick,
	onError,
	text,
	X,
	className,
	to,
	onKeyDown,
	O,
	choosePlayer,
	...props
}: LoadingButtonProps & SelectPlayer) {
	const [loading, setLoading] = useState(false);

	async function handleClick(event: LoadingButtonMouseClickEvent) {
		setLoading(true);
		try {
			await onClick(event);
		} catch (error) {
			onError?.(error);
		}
		setLoading(false);
	}

	return (
		<button
			disabled={loading}
			className={`${loading && "!pointer-events-none"} ${X ? "!bg-x hover:!outline-x focus-visible:!outline-x" : "!bg-o hover:!outline-o focus-visible:!outline-o"} w-full cursor-pointer rounded-lg px-6 py-4 text-center !text-xl font-bold text-white ${className}`}
			onClick={handleClick}
			onKeyDown={(event) => {
				if (event.key === "Enter" || event.key === " ") {
					handleClick(event);
					console.log("here");
				}
				onKeyDown?.(event);
			}}
			{...props}
		>
			{loading ? (
				<div className="mx-auto aspect-square h-7 animate-spin rounded-full border-4 border-white/10 border-b-white"></div>
			) : (
				text
			)}
		</button>
	);
}
