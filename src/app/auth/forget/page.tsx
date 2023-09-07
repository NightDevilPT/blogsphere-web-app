"use client";

import React, { ChangeEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import Image from "next/image";

import banner from "../../../images/banner.png";

import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";

const page = () => {
	const { theme } = useAppSelector((state) => state.themeStore);
	const [email, setEmail] = useState<string>("");
	const [upload, setUpload] = useState<boolean>(false);

	const OnChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value);
	};

	const onSubmitHandle = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setUpload(true);

		await axios
			.post(
				`${process.env.NEXT_PUBLIC_URL}/user/sendupdatelink`,
				{ email },
				{ headers: { "Content-Type": "application/json" } }
			)
			.then((res) => {
				if(res.status===401){
					toast.info(res.data.message);
					setUpload(false);
					return
				}

				setEmail("");
				toast.success(res.data.message);
			})
			.catch((err) => {
				toast.error(err.response.data.message);
			});

		setUpload(false);
	};

	return (
		<div
			className={`relative w-[1000px] h-[600px] rounded overflow-hidden flex justify-between items-center p-5 gap-4 max-[800px]:justify-center max-lg:gap-2 max-lg:w-[calc(100%-20px)] ${
				theme === "dark"
					? "border-[1px] border-slate-900"
					: "shadow-lg shadow-slate-700/80"
			}`}
		>
			<div className="absolute left-40 top-[-40%] rotate-[-45deg] w-[100px] h-[70%] rounded-full bg-primary1"></div>
			<div className="absolute left-0 top-[-50%] rotate-[-45deg] w-[100px] h-[90%] rounded-full bg-primary2"></div>
			<div className="absolute left-0 top-[-10%] rotate-[-45deg] w-[100px] h-[80%] rounded-full bg-primary1"></div>

			<Image
				src={banner}
				alt="signup-logo-banner"
				className={`w-[50%] h-auto object-contain z-10 max-[800px]:hidden`}
				priority
			/>

			<div
				className={`w-[50%] max-[800px]:w-[90%] max-[400px]:w-full h-auto  flex justify-center items-center flex-col backdrop-blur-md rounded`}
			>
				<form
					className="w-full flex justify-center items-center flex-col gap-2 px-4 z-10 max-lg:px-0"
					onSubmit={onSubmitHandle}
				>
					<h1
						className={`w-full h-auto py-1 my-2 font-inter font-bold text-[40px] text-center ${
							theme === "dark"
								? "text-slate-300"
								: "text-slate-800"
						}`}
					>
						Forget Password
					</h1>

					{/* -----[ Email Input Field ]----- */}
					<div
						className={`w-full h-auto px-2 py-1 rounded flex justify-between items-center gap-2`}
					>
						<input
							type="email"
							className={`w-full h-[50px] border-none outline-none rounded px-3 font-inter font-bold text-[16px] placeholder:text-slate-500 ${
								theme === "dark"
									? "bg-slate-900 text-slate-300"
									: "text-slate-800 bg-slate-300"
							}`}
							value={email}
							name="email"
							onChange={OnChangeEvent}
							placeholder="Email ID..."
							autoComplete="off"
							required
							disabled={upload}
						/>
					</div>

					{/* -----[ Signup Button Field ]----- */}
					<div
						className={`w-full h-auto px-2 py-1 rounded flex justify-between items-center gap-2`}
					>
						<button
							type="submit"
							className="w-full rounded font-satisfy font-bold text-2xl h-[50px] flex justify-center items-center bg-gradient-to-tr from-primary1 to-primary2 text-slate-300"
						>
							{upload ? (
								<span className="w-[35px] h-[35px] rounded-full border-[3px] border-slate-300/60 border-t-transparent animate-spin"></span>
							) : (
								"Update Password Link"
							)}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default page;
