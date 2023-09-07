import { useAppSelector } from "@/redux/store";
import Link from "next/link";
import React from "react";

const SignupLoginFrame = () => {
	const { theme } = useAppSelector((state) => state.themeStore);

	return (
		<div className={`w-auto h-auto flex justify-center items-center gap-3 max-[400px]:hidden`}>
			<Link
				className={`w-auto h-auto px-2 py-1 rounded font-inter text-[16px] font-bold ${
					theme === "dark"
						? "text-slate-800 bg-slate-300"
						: "text-slate-300 bg-slate-800"
				}`}
				href={"/auth/signup"}
			>
				Signup
			</Link>

			<Link
				className={`w-auto h-auto px-2 py-1 rounded font-inter text-[16px] font-bold border-[1px] transition-all duration-300 ${
					theme === "dark"
						? "border-slate-300 text-slate-300 hover:bg-slate-300 hover:text-slate-800"
						: "border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-slate-300"
				}`}
				href={"/auth/login"}
			>
				Login
			</Link>
		</div>
	);
};

export default SignupLoginFrame;
