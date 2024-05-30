import RouteAnimate from "@components/RouteAnimation";
import { useToast } from "@context/hooks/useToast";
import { useUser } from "@context/hooks/useUser";
import HomeIcon from "@icon/Home";
import Arrow from "@ui/Arrow";
import InputBox from "@ui/InputBox";
import LoadingButton from "@ui/LoadingButton";
import { AppRoutes } from "@util/AppRoutes";
import { dev } from "@util/development";
import {
	EmailSchema,
	PasswordSchema,
	UserNameSchema,
} from "@util/validation-schema";
import { FirebaseError } from "firebase/app";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ZodError } from "zod";

type LoginFormProps =
	| {
			login: true;
			signin?: false;
	  }
	| { login?: false; signin: true };

interface FieldValues {
	email: string;
	password: string;
	userName: string;
}

export default function LoginForm({ login, signin }: LoginFormProps) {
	const [fieldValues, setFieldValues] = useState<FieldValues>(
		dev
			? {
					email: "ebadansari414@gmail.com",
					password: "ebadansari",
					userName: "ebad_ansari",
				}
			: {
					email: "",
					password: "",
					userName: "",
				},
	);

	const toast = useToast();

	const user = useUser();

	const navigate = useNavigate();

	async function handleSubmit<T extends { preventDefault: () => void }>(
		event: T,
	) {
		event.preventDefault();

		const email = EmailSchema.parse(fieldValues.email);

		const password = PasswordSchema.parse(fieldValues.password);

		if (signin) {
			user.user.userName = UserNameSchema.parse(fieldValues.userName);
		}

		const credential = signin
			? await user.user.signin(email, password)
			: await user.user.login(email, password);

		await user.user.setUser(credential.user);

		console.log(credential.user.email);

		navigate(signin ? AppRoutes.login : AppRoutes.root, {
			replace: true,
		});
	}

	function handleSubmitError(error: unknown) {
		if (error instanceof ZodError) {
			console.log(error.issues[0].message);
			toast({
				...alert,
				text: error.issues[0].message,
				type: "error",
			});
		} else if (error instanceof FirebaseError) {
			const errorMessage = RegExp(/(auth\/[\w-]*)/i)
				.exec(error.message)?.[0]
				.split("/")[1]
				.replace(/-/g, " ");

			if (errorMessage) {
				toast({
					text:
						errorMessage.charAt(0)?.toUpperCase() +
						errorMessage.slice(1),
					type: "error",
				});
			}
		}
	}

	return (
		<RouteAnimate
			id={login ? AppRoutes.login : AppRoutes.signin}
			// initial={routeAnimate.initial}
			// animate={routeAnimate.animate}
			// exit={routeAnimate.exit}
			// className="flex w-11/12 flex-col sm:w-8/12 lg:w-6/12 xl:w-4/12"
		>
			<div className="m-3 flex h-9 cursor-pointer justify-between">
				<button
					onClick={() => {
						history.back();
					}}
					className={`w-9 rounded-sm ${login ? "focus-visible:outline-x" : "focus-visible:outline-o"}`}
				>
					{login ? <Arrow X /> : <Arrow O />}
				</button>
				<Link
					to={AppRoutes.root}
					className={`w-9 rounded-sm ${login ? "focus-visible:outline-x" : "focus-visible:outline-o"}`}
				>
					{login ? <HomeIcon X /> : <HomeIcon O />}
				</Link>
			</div>
			<div className="space-y-6 rounded-xl border-b-[6px] border-b-arsenic-950 bg-arsenic-400 p-8 md:space-y-9">
				<div className="rounded-lg bg-arsenic-950">
					<div className="grid grid-cols-2 gap-2 p-2">
						<Link
							replace
							to={AppRoutes.login}
							className={`rounded ${
								login
									? "bg-arsenic-400 focus-visible:outline-o"
									: "focus-visible:outline-x"
							} py-2 text-center text-xl font-bold uppercase text-x`}
						>
							Login
						</Link>
						<Link
							replace
							to={AppRoutes.signin}
							className={`rounded ${
								signin
									? "bg-arsenic-400 focus-visible:outline-x"
									: "focus-visible:outline-o"
							} py-2 text-center text-xl font-bold uppercase text-o`}
						>
							Sign In
						</Link>
					</div>
				</div>
				<div className="space-y-6 md:space-y-9">
					<div className="space-y-3 md:space-y-6">
						{signin && (
							<InputBox
								type="text"
								autoFocus
								placeholder="Enter your user name"
								player="X"
								name="user-name"
								label="User name"
								required
								value={fieldValues.userName}
								onChange={(event) => {
									setFieldValues({
										...fieldValues,
										userName: event.target.value,
									});
								}}
							/>
						)}
						<InputBox
							{...(!signin && { autoFocus: true })}
							type="email"
							placeholder="Enter your email address"
							player="X"
							name="email"
							label="Email"
							required
							value={fieldValues.email}
							onChange={(event) => {
								setFieldValues({
									...fieldValues,
									email: event.target.value,
								});
							}}
						/>
						<InputBox
							type="password"
							placeholder="Enter your password"
							player="X"
							name="password"
							label="Password"
							required
							value={fieldValues.password}
							onChange={(event) => {
								setFieldValues({
									...fieldValues,
									password: event.target.value,
								});
							}}
						/>
					</div>

					<LoadingButton
						to={signin ? AppRoutes.login : AppRoutes.root}
						text="Submit"
						{...(signin ? { X: true } : { O: true })}
						onClick={handleSubmit}
						onError={handleSubmitError}
						className="overflow-hidden rounded-lg"
					/>
				</div>
			</div>
		</RouteAnimate>
	);
}
