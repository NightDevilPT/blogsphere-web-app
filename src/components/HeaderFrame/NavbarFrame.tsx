import { useAppSelector } from "@/redux/store";
import Image from "next/image";
import Link from "next/link";
import React, { SetStateAction } from "react";

// ----- Importing Logo
import lightLogo from "../../images/light.png";
import darkLogo from "../../images/dark.png";

import { MdOutlineClose } from "react-icons/md";
import {
	AiOutlineFacebook,
	AiOutlineInstagram,
	AiOutlineYoutube,
	AiOutlineLinkedin,
} from "react-icons/ai";

type PropsType = {
	hamburger: boolean;
	setHamburger: React.Dispatch<SetStateAction<boolean>>;
};

const NavBarFrame = ({ hamburger, setHamburger }: PropsType) => {
	const { theme } = useAppSelector((state) => state.themeStore);
	const {isUser}=useAppSelector(state=>state.userStore);
	const tabs: string[] = ["home", "blogs", "about", "contact us"];

	return (
		<div
			className={`w-auto h-auto flex justify-center items-center max-md:transition-all max-md:duration-300 max-md:fixed max-md:w-full max-md:h-full ${
				hamburger ? "max-md:left-0" : "max-md:left-full"
			} max-md:top-0 max-md:z-[51] ${
				theme === "dark" ? "max-md:bg-slate-900" : "max-md:bg-slate-300"
			}`}
		>
			<button
				className={`hidden max-md:flex justify-center items-center absolute right-3 top-3 p-1 rounded ${
					theme === "dark"
						? "bg-slate-950 text-slate-300"
						: "bg-slate-400 text-slate-800"
				}`}
				onClick={(event: React.FormEvent<HTMLButtonElement>) => {
					setHamburger(false);
				}}
			>
				<MdOutlineClose className="w-[25px] h-[25px]" />
			</button>
			<nav
				className={`w-full h-full flex justify-center items-center gap-3 max-md:flex-col max-md:w-[200px]`}
			>
				{/* ------[ Navbar Image or Banner ]------ */}
				<Link
					className="h-auto w-full hidden justify-center items-center max-md:flex"
					href={"/"}
					onClick={()=>{
						setHamburger(false);
					}}
				>
					<Image
						className="w-full min-w-full h-[80%] object-contain"
						src={theme === "dark" ? darkLogo : lightLogo}
						alt="header-logo" />
				</Link>

				<div
					className={`w-full my-2 h-[2px] bg-slate-500 hidden max-md:flex`}
				></div>

				{/* -----[ Tabs ]----- */}
				{tabs?.map((items, index) => {
					return (
						<Link
							key={items + "_" + index}
							href={`/${items==='home'?'':items}`}
							className={`w-auto h-auto whitespace-nowrap font-inter text-[16px] font-bold capitalize px-2 py-1 rounded transition-all duration-300 max-md:w-full text-center ${
								theme === "dark"
									? "text-slate-300 hover:bg-slate-300 hover:text-slate-800"
									: "text-slate-800 hover:bg-slate-800 hover:text-slate-300"
							}`}
							onClick={()=>{
								setHamburger(false);
							}}
						>
							{items}
						</Link>
					);
				})}

				<div
					className={`w-full my-2 h-[2px] bg-slate-500 hidden max-md:flex`}
				></div>

				{/* ------[ Signup Login Button ]------ */}
				{
					!isUser&&<div className="w-full mb-2 h-auto hidden justify-center items-stretch gap-2 max-[400px]:flex">
					<Link
						className={`w-full text-center h-auto px-2 py-1 rounded font-inter text-[16px] font-bold ${
							theme === "dark"
								? "text-slate-800 bg-slate-300"
								: "text-slate-300 bg-slate-800"
						}`}
						onClick={()=>{
							setHamburger(false);
						}}
						href={"/auth/signup"}
					>
						Signup
					</Link>

					<Link
						className={`w-full text-center h-auto px-2 py-1 rounded font-inter text-[16px] font-bold border-[1px] transition-all duration-300 ${
							theme === "dark"
								? "border-slate-300 text-slate-300 hover:bg-slate-300 hover:text-slate-800"
								: "border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-slate-300"
						}`}
						
						href={"/auth/login"}
						onClick={()=>{
							setHamburger(false);
						}}
					>
						Login
					</Link>
				</div>
				}

				{/* ------[ Website Social Links Tabs ]----- */}
				<div
					className={`w-full h-auto hidden max-md:flex justify-center items-center gap-2`}
				>
					<a
						className={`w-[35px] h-[35px] flex justify-center items-center p-[3px] rounded transition-all duration-300 border-[1px] ${
							theme === "dark"
								? "border-slate-300 text-slate-300 hover:bg-slate-300 hover:text-slate-800"
								: "border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-slate-300"
						}`}
						href={"#"}
					>
						<AiOutlineFacebook className="w-full h-full" />
					</a>
					<a
						className={`w-[35px] h-[35px] flex justify-center items-center p-[3px] rounded transition-all duration-300 border-[1px] ${
							theme === "dark"
								? "border-slate-300 text-slate-300 hover:bg-slate-300 hover:text-slate-800"
								: "border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-slate-300"
						}`}
						href={"#"}
					>
						<AiOutlineInstagram className="w-full h-full" />
					</a>
					<a
						className={`w-[35px] h-[35px] flex justify-center items-center p-[3px] rounded transition-all duration-300 border-[1px] ${
							theme === "dark"
								? "border-slate-300 text-slate-300 hover:bg-slate-300 hover:text-slate-800"
								: "border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-slate-300"
						}`}
						href={"#"}
					>
						<AiOutlineLinkedin className="w-full h-full" />
					</a>
					<a
						className={`w-[35px] h-[35px] flex justify-center items-center p-[3px] rounded transition-all duration-300 border-[1px] ${
							theme === "dark"
								? "border-slate-300 text-slate-300 hover:bg-slate-300 hover:text-slate-800"
								: "border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-slate-300"
						}`}
						href={"#"}
					>
						<AiOutlineYoutube className="w-full h-full" />
					</a>
				</div>
			</nav>
		</div>
	);
};

export default NavBarFrame;
