import { PropsWithChildren } from "react";
import { Link, LinkProps } from "react-router-dom";

interface LinkWraperProps extends Partial<LinkProps>, PropsWithChildren {
	prevent?: true;
}

export function LinkWraper({
	children,
	to,
	className,
	prevent,
	onClick,
	...rest
}: LinkWraperProps) {
	return to ? (
		<Link
			onClick={(event) => {
				onClick?.(event);
			}}
			to={to}
			{...rest}
			className={`block cursor-pointer ${className}`}
		>
			{children}
		</Link>
	) : (
		children
	);
}
