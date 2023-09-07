import "./globals.css";
import type { Metadata } from "next";
import { ChildrenNode } from "@/types/AllType";
import Layout from "@/components/RootLayout";
import ReduxLayout from "@/components/ReduxLayout/ReduxLayout";
import iconImage from "../images/dark.png"

export const metadata: Metadata = {
	title: "BlogSphere",
	description: "BlogSphere Website",
	icons:{
		icon:{
			url:"https://i.postimg.cc/fypYrRMV/dark-Blogo-Sphere.png",
			type:"image/png"
		}
	}
};

export default function RootLayout({ children }: ChildrenNode) {
	return (
		<html lang="en">
			<body className="selection:bg-primary2 selection:text-slate-300 overflow-hidden">
				<ReduxLayout>
					<Layout>
						{children}
					</Layout>
				</ReduxLayout>
			</body>
		</html>
	);
}
