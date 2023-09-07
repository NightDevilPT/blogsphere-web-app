"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";

// ----- Importing Logo
import lightLogo from "../../images/light.png";
import darkLogo from "../../images/dark.png";

import { TfiMenu } from "react-icons/tfi";

// ----- Importing Frames
import { useAppSelector } from "@/redux/store";
import NavBarFrame from "./NavbarFrame";
import SignupLoginFrame from "./SignupLoginFrame";
import UserNavFrame from "./UserNavFrame";

const HeaderFrame = () => {
	const { theme } = useAppSelector((state) => state.themeStore);
	const [hamburger, setHamburger] = useState<boolean>(false);
	const { isUser } = useAppSelector((state) => state.userStore);

	return (
		<div className={`w-full h-[100px] z-50 border-b-[1px] ${theme==="dark"?"border-b-slate-800":"border-b-slate-300"}`}>
			<div className="container transition-all duration-300 h-full flex justify-between items-center gap-8 max-sm:px-2">
				<Link
					className="h-full w-auto flex justify-center items-center"
					href={"/"}
				>
					<Image
						className="w-full min-w-full h-[70%] object-contain"
						src={theme === "dark" ? darkLogo : lightLogo}
						alt="header-logo"
					/>
				</Link>

				<NavBarFrame
					hamburger={hamburger}
					setHamburger={setHamburger}
				/>

				<div
					className={`w-auto h-auto flex justify-center items-center gap-3`}
				>
					{isUser ? <UserNavFrame /> : <SignupLoginFrame />}

					<button
						className={`w-[40px] h-[40px] p-1 hidden justify-center items-center rounded transition-all duration-300 max-md:flex ${
							theme === "dark"
								? "text-slate-300 hover:bg-slate-300 hover:text-slate-800"
								: "text-slate-800"
						}`}
						onClick={(
							event: React.FormEvent<HTMLButtonElement>
						) => {
							setHamburger(true);
						}}
					>
						<TfiMenu className="w-full h-full" />
					</button>
				</div>
			</div>
		</div>
	);
};

export default HeaderFrame;
