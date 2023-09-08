import Link from "next/link";
import React from "react";

import Image from "next/image";
import dynamic from "next/dynamic";
import starback from '../images/starback2.jpg';


const Custome404 = () => {
	return (
		<div className="fixed left-0 top-0 z-[100] w-full h-full bg-slate-950 flex justify-center items-center flex-col gap-1">
			<Image fill={true} src={starback} alt="404-back" className="absolute left-0 top-0 w-full h-full object-cover" priority />
			<div className="absolute left-0 top-0 w-full h-full bg-slate-900/50 backdrop-blur"></div>
			<div className="asbolute left-0 top-0 w-full h-full flex justify-center items-center flex-col gap-1 backdrop-blur px-3">
				<span className="w-auto h-auto text-slate-300 font-inter font-bold text-[120px] max-sm:text-[100px] max-[400px]:text-[80px] flex justify-center items-center">
					404
					<div className="w-[10px] h-[10px] absolute rounded-full bg-slate-300"></div>
				</span>

				<span className="w-auto h-auto flex text-[30px] max-sm:text-[25px] max-[400px]:text-[20px] font-inter font-bold text-yellow-500 text-center">
					Look like you are lost in Space
				</span>

				<span className="w-[40%] max-lg:w-[60%] max-md:w-[80%] h-auto flex text-[25px] max-sm:text-[20px]  max-[400px]:text-[16px] font-inter font-bold text-slate-300 text-center">
					The page you are looking for might be removed of is
					temproally unavailable
				</span>

				<Link
					href="/"
					className=" my-5 w-auto h-auto px-2 py-1 font-inter font-bold text-[18px] text-slate-300 hover:text-slate-800 border-[1px] border-slate-300 hover:bg-slate-300 rounded transition-all duration-300"
				>
					Back to Home
				</Link>
			</div>
		</div>
	);
};

export default Custome404;
