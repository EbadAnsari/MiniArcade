import { ReactNode } from "react";

interface BaseProps {
	className?: string;
	children: ReactNode;
}

export default function Base({ children, className }: BaseProps) {
	return (
		<div
			className={`${className} !rounded-xl !border-b-[6px] !border-b-arsenic-950 !bg-arsenic-400`}
		>
			{children}
		</div>
	);
}
