"use client";

import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setTheme } from "@/redux/themeSlicer/themeSlicer";
import { setUserLogin } from "@/redux/userSlicer/userSlicer";
import React from "react";

import { BsFillSunFill, BsMoonStarsFill } from "react-icons/bs";

const ThemeFrame = () => {
	const { theme } = useAppSelector((state) => state.themeStore);
	const dispatch = useAppDispatch();
	
	return (
		<button
			className={`fixed left-5 bottom-5 w-[50px] h-[50px] transition-all duration-300 rounded-full p-2 flex justify-center items-center hover:scale-110 ${
				theme === "dark"
					? "bg-slate-300 text-slate-900"
					: "bg-slate-950 text-slate-300"
			}`}
			onClick={(event) => {
				dispatch(setTheme(theme==="dark"?"light":"dark"));
				window.localStorage.setItem("theme",theme==="dark"?"light":"dark");
			}}
		>
			{theme === "dark" ? (
				<BsFillSunFill className="w-full h-full" />
			) : (
				<BsMoonStarsFill className="w-full h-full" />
			)}
		</button>
	);
};

export default ThemeFrame;
