"use client";

import { useAppSelector } from "@/redux/store";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import { BsCheckCircleFill } from "react-icons/bs";
import { BiSolidErrorCircle } from "react-icons/bi";
import axios from "axios";

interface token {
	token:string
}


const page = () => {
	const router = useRouter();
	const params = useSearchParams();
	const [loading, setLoading] = useState<string | null>(null);
	const { theme } = useAppSelector((state) => state.themeStore);

	const VerifyUser=async(token:string)=>{
		await axios.put(`${process.env.NEXT_PUBLIC_URL}/user/verify?token=${token}`).then(res=>{
			if(res.status===498){
				setLoading("error");
				return;
			}
			setLoading("success");
		}).catch(err=>{
			setLoading("error");

		})
	}

	useEffect(() => {
		const token = params.get("token");
		if(!token){
			setLoading("error");
			return;
		}
		VerifyUser(token);
	}, []);

	return (
		<div className={`w-full h-full flex justify-center items-center`}>
			<div
				className={`w-auto h-auto px-4 py-2 flex justify-center items-center gap-3 rounded ${
					theme === "dark"
						? "bg-slate-900 text-slate-300"
						: "bg-slate-300 text-slate-800 shadow-xl shadow-slate-500/50"
				}`}
			>
				{loading === null ? (
					<span
						className={`w-[30px] h-[30px] rounded-full border-[3px] border-sky-500 animate-spin border-t-transparent`}
					></span>
				) : loading === "success" ? (
					<BsCheckCircleFill className="w-[30px] h-[30px] text-green-500" />
				) : (
					<BiSolidErrorCircle className="w-[30px] h-[30px] text-red-500" />
				)}
				<span className={` font-inter text-[25px] font-bold`}>
					{loading === null
						? "Verifing User"
						: loading === "success"
						? "User verified"
						: "Invalid Token"}
				</span>
			</div>
		</div>
	);
};

export default page;
