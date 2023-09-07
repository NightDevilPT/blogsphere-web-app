"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

import banner from "../../images/banner2.png";
import bannerBack from "../../images/banner-back.jpeg";

import { useAppSelector } from "@/redux/store";

const HeroBanner = () => {
	const { theme } = useAppSelector((state) => state.themeStore);

	return (
		<div
			className={` mt-2 w-full h-[500px] max-xl:h-[400px] max-lg:h-auto relative transition-all duration-300 flex justify-between items-center ${
				theme === "dark" ? "text-slate-300" : "text-slate-800"
			}`}
		>
			<div className="container transition-all duration-300 h-full grid grid-cols-2 gap-5 max-lg:flex max-lg:flex-col-reverse max-lg:items-center max-lg:justify-center max-lg:gap-7 max-sm:px-3">
				<div className="flex justify-center items-start flex-col">
					<h1
						className={`w-full font-satisfy text-[65px] max-xl:text-[55px] font-bold max-sm:text-center max-[460px]:text-[40px]`}
					>
						Welcome to{" "}
						<span className="text-transparent bg-clip-text bg-gradient-to-tr from-primary1 to-primary2">
							BlogSphere
						</span>
					</h1>

					<span className="w-full h-auto font-satisfy text-[35px] max-xl:text-[25px] font-bold max-[460px]:text-[18px]">
						Welcome to the world of blog writing
						<br />
						Awesome place to make oneself productive and entertained
						through daily updates.
					</span>

					<Link
						className={`text-slate-300 px-3 py-1 mt-3 text-[18px] hover:scale-110 rounded font-inter font-bold transition-all duration-500 bg-gradient-to-tr from-primary2 to-primary1`}
						href={"/"}
					>
						Explore Now
					</Link>
				</div>
				<div className="flex justify-center items-center">
					<Image
						className="w-auto h-[500px] max-xl:h-[400px] max-sm:w-full max-sm:h-auto object-contain"
						src={banner}
						alt="banner-image"
					/>
				</div>
			</div>
		</div>
	);
};

export default HeroBanner;
