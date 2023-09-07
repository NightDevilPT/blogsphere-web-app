import { Metadata } from 'next';

import { ChildrenNode } from '@/types/AllType';

export const metadata: Metadata = {
	title: "User Verification",
	description: "BlogSphere Website",
};

const layout = ({children}:ChildrenNode) => {
  return (
	<div className='w-full h-full flex justify-center items-center'>{children}</div>
  )
}

export default layout