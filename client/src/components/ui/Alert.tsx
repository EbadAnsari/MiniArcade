import { AppRoutes } from "@util/AppRoutes";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

export interface AlertProps {
	text: string | ReactNode;
	type: "sucess" | "error" | "warn" | "info";
	link?: { linkTo: AppRoutes; linkMessage: string };
	className?: string;
}

// #202124
export default function Alert({
	text,
	type,
	link,
	className,
}: Readonly<AlertProps>) {
	return (
		<div
			className={`w-full rounded p-4 text-white ${className} ${(() => {
				if (type === "error") return "bg-orange-600 dark:bg-orange-600";
				if (type === "info") return "bg-sky-500 dark:bg-sky-600";
				if (type === "sucess")
					return "bg-green-500 dark:bg-green-600 dark:bg-opacity-80";
				if (type === "warn") return "bg-amber-500 dark:bg-amber-600";
			})()}`}
		>
			<span className="line-clamp-1 pr-1 font-bold">
				{type.charAt(0)!.toUpperCase() + type.substring(1) + "!"}
			</span>
			{text}
			{link && (
				<span className="pl-1">
					<Link className="underline" to={link.linkTo}>
						{link.linkMessage}
					</Link>
				</span>
			)}
		</div>
	);
}
