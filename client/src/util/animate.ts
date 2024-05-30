import { AnimationProps } from "framer-motion";

export const routeAnimate: AnimationProps = {
	initial: { opacity: 0, translateX: 40 },
	animate: {
		opacity: 1,
		translateX: 0,
		transition: {
			delay: 0.2,
			type: "keyframes",
		},
	},
	exit: {
		translateX: -40,
		opacity: 0,
		transition: {
			duration: 0.1,
		},
	},
};

export const toastAminate: AnimationProps = {
	initial: { right: "-40px", translateX: "320px" },
	animate: { right: "40px", translateX: "0px" },
	exit: {
		translateX: "400px",
	},
};
