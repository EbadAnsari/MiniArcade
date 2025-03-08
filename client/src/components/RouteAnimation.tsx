import { routeAnimate } from "@util/animate";
import { motion } from "framer-motion";
import { PropsWithChildren } from "react";
import { useLocation } from "react-router-dom";

interface RouteAnimationProps extends PropsWithChildren {
	className?: string;
	id?: string;
}

export default function RouteAnimate({
	className,
	children,
}: RouteAnimationProps) {
	const { pathname } = useLocation();
	return (
		<div className="flex h-d-screen items-center">
			<motion.div
				key={pathname}
				initial={routeAnimate.initial}
				animate={routeAnimate.animate}
				exit={routeAnimate.exit}
				className={`mx-auto w-[calc(100%_-_2rem)] xs:w-[30rem] ${className}`}
			>
				{children}
			</motion.div>
		</div>
	);
}
