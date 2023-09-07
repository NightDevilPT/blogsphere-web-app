import { Metadata } from "next";
import React from "react";

import { ChildrenNode } from "@/types/AllType";
import Link from "next/link";
import { MdOutlineArrowBack } from "react-icons/md";

export const metadata: Metadata = {
	title: "Edit Profile",
	description: "BlogSphere Website",
};

const layout = ({ children }: ChildrenNode) => {
	return (
		<div className="w-full h-auto py-5 max-md:pb-[80px]">
			<Link
				href={"/"}
				className="fixed z-[100] w-[50px] h-[50px] p-2 bg-sky-600 text-slate-300 rounded-full underline font-inter font-bold left-5 bottom-20 animate-bounce"
			>
				<MdOutlineArrowBack className='w-full h-full' />
			</Link>
			{children}
		</div>
	);
};

export default layout;
