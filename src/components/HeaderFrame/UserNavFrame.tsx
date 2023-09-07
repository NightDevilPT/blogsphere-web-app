"use client";

import Image from "next/image";
import React, { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { CgProfile } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";

import avtar from "../../images/avtar.png";
import { setUserLogout } from "@/redux/userSlicer/userSlicer";
import { useAppDispatch, useAppSelector } from "@/redux/store";


const UserNavFrame = () => {
	const { theme } = useAppSelector((state) => state.themeStore);
	const { user } = useAppSelector((state) => state.userStore);
	const dispatch = useAppDispatch();
	const router = useRouter();
	const [showUserNav, setShowUserNav] = useState<boolean>(false);

	return (
		<div className={`relative transition-all duration-300 w-auto h-[45px]`}>
			<button
				className={`flex justify-center items-center gap-1 font-inter text-[16px] rounded-full p-[3px] border-[1px] font-bold ${
					theme === "dark"
						? "border-slate-300 text-slate-300"
						: "border-slate-400 text-slate-800"
				}`}
				onClick={(event: React.FormEvent<HTMLButtonElement>) => {
					setShowUserNav(!showUserNav);
				}}
			>
				{user.avtar.length !== 0 ? (
					<img
						className={`w-[35px] h-[35px] rounded-full border-[1px] ${
							theme === "dark"
								? "border-slate-300"
								: "border-slate-800"
						}`}
						src={user?.avtar}
						alt="usernavbar-image"
					/>
				) : (
					<Image
						src={avtar}
						alt="usernav-profile"
						className="w-[35px] h-[35px] rounded"
					/>
				)}
				<span className=" pr-2 max-[400px]:hidden">
					{`${user.firstname} ${user.lastname}`}
				</span>
			</button>

			<div
				className={`absolute transition-all duration-500 z-50 ${
					showUserNav
						? "top-[120%] opacity-100 visible"
						: "top-[150%] opacity-0 invisible"
				} right-0 max-md:right-[-50px] w-[250px] h-auto rounded border-[1px] p-3 flex justify-start items-center flex-col gap-2 ${
					theme === "dark"
						? "bg-slate-900 border-slate-800"
						: "bg-slate-300 border-slate-400 shadow-lg shadow-slate-800/50"
				}`}
			>
				<div
					className={`w-full h-auto flex justify-start items-start gap-2 overflow-hidden`}
				>
					{user.avtar.length !== 0 ? (
						<img
							src={user?.avtar}
							alt="usernav-profile"
							className="w-[80px] h-[80px] rounded"
						/>
					) : (
						<Image
							src={avtar}
							alt="usernav-profile"
							className="w-[80px] h-[80px] rounded"
						/>
					)}
					<div
						className={`w-full truncate h-full flex justify-start items-start flex-col gap-[2px]`}
					>
						<span
							className={`w-full font-inter font-bold text-[16px] truncate ${
								theme === "dark"
									? "text-slate-300"
									: "text-slate-800"
							}`}
						>
							{`${user.firstname} ${user.lastname}`}
						</span>
						<span
							className={`mt-[-2px] w-full font-inter text-[14px] truncate text-transparent bg-clip-text bg-gradient-to-tr from-primary1 to-primary2 font-bold`}
						>
							{user.email}
						</span>
						<Link
							className={`w-full mt-[1px] py-[3px] text-center rounded font-inter text-[16px] font-bold ${
								theme === "dark"
									? "bg-slate-300 text-slate-800"
									: "bg-slate-800 text-slate-300"
							}`}
							onClick={()=>{
								setShowUserNav(false);
							}}
							href={'/editprofile'}
						>
							Edit Profile
						</Link>
					</div>
				</div>
				<div className={`w-full h-[2px] bg-slate-700`}></div>
				<Link
					className={`w-full h-auto py-2 px-3 rounded text-[16px] font-bold font-inter transition-all duration-300 flex justify-start items-center gap-2 ${
						theme === "dark"
							? "text-slate-300 hover:bg-slate-300 hover:text-slate-800"
							: "text-slate-800 hover:bg-slate-800 hover:text-slate-300"
					}`}
					href={"/"}
				>
					<CgProfile className="h-[25px] w-[25px]" />
					<span>My Profile</span>
				</Link>

				<button
					className={`w-full h-auto py-2 px-3 rounded text-[16px] font-bold font-inter transition-all duration-300 flex justify-start items-center gap-2  hover:bg-red-500 hover:text-slate-300 ${
						theme === "dark" ? "text-slate-300" : "text-slate-800"
					}`}
					onClick={(event: React.FormEvent<HTMLButtonElement>) => {
						dispatch(setUserLogout());
						window.localStorage.removeItem("token");
						router.push("/auth/login");
					}}
				>
					<FiLogOut className="h-[25px] w-[25px]" />
					<span>Logout</span>
				</button>
			</div>
		</div>
	);
};

export default UserNavFrame;
