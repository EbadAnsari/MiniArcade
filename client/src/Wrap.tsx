import { useToast } from "@context/hooks/useToast";
import { AlertProps } from "@ui/Alert";
import { useRef, useState } from "react";

export default function Wrap() {
	const toast = useToast();

	const [value, setValue] = useState({
		text: "adsfsda",
		type: "sucess",
	});

	const ref = useRef<HTMLInputElement>(null);

	// create me a input to show toast

	return (
		<div className="fixed left-52 top-52 flex flex-col gap-3 bg-black px-2 py-4">
			<input
				ref={ref}
				value={value.text}
				type="text"
				className="border border-blue-500"
				onChange={(e) => setValue({ ...value, text: e.target.value })}
			/>
			<select
				value={value.type}
				onChange={(event) => {
					setValue({
						...value,
						type: (event.target as HTMLSelectElement).value,
					});
				}}
			>
				{["sucess", "error", "warn", "info"].map((type) => (
					<option key={type} value={type}>
						{type}
					</option>
				))}
			</select>
			<input
				type="submit"
				value="Submit"
				className="border border-blue-500 bg-white"
				onClick={() => {
					toast({
						text: value.text,
						type: value.type as AlertProps["type"],
					});

					ref.current?.focus();
				}}
			/>
		</div>
	);
}
