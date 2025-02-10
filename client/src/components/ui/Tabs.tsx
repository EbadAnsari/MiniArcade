import { motion } from "framer-motion";
import { useState } from "react";

interface TabsProps {
	tabs: { title: string; description: string }[];
	onClick(index: number): void;
	selected?: number;
	className?: string;
}

export default function Tabs({
	tabs,
	onClick,
	selected,
	className,
}: TabsProps) {
	motion;
	const [selectedIndex, setSelectedIndex] = useState<number>(selected ?? 0);

	function handleClick(index: number) {
		setSelectedIndex(index);
		onClick(index);
	}

	return (
		tabs.length && (
			<ul
				style={{
					display: "grid",
					gridTemplateColumns: `repeat(${tabs.length}, minmax(0, 1fr))`,
				}}
				className={`relative gap-3 rounded-lg bg-arsenic-400 p-2 ${className}`}
			>
				{tabs.map(({ description, title }, index) => (
					<li
						key={title}
						onClick={() => {
							handleClick(index);
						}}
						title={description}
						className={`w-full cursor-pointer rounded-lg py-2 text-center text-lg text-white ${selectedIndex === index ? "bg-arsenic-800" : "hover:bg-white/10"}`}
					>
						{title}
					</li>
				))}
			</ul>
		)
	);
}
