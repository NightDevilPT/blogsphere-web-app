import { Metadata } from 'next';
import React from 'react'

import { ChildrenNode } from '@/types/AllType';

export const metadata: Metadata = {
	title: "BlogSphere Signup",
	description: "BlogSphere Website",
};

const layout = ({children}:ChildrenNode) => {
  return (
	<div className='w-full h-full flex justify-center items-center'>{children}</div>
  )
}

export default layout