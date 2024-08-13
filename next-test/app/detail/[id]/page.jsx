import React from 'react'
import dynamic from "next/dynamic";
import Image from 'next/image';
const HeaderComponent = dynamic(() => import('../../../components/Header'))

// get data by id
const fetchItem = async (id) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    if (!res.ok) {
        throw new Error('Failed to fetch');
    }
    return res.json();
};

const fetchRandomImage = async () => {
    const imageUrl = 'https://picsum.photos/200/300';
    return imageUrl;
};

const Detail = async ({ params }) => {
    const { id } = params;
    const item = await fetchItem(id);
    const imageUrl = await fetchRandomImage();
  return (
    <div className='bg-blue-200 min-h-screen"'>
        <div className="bg-white xl:w-[450px] min-h-screen mx-auto">
            <HeaderComponent back title={'Detail post'}/>
            <div className="p-4 pt-20">
            <p className="font-bold mb-4 text-green-700 text-xl capitalize"><strong></strong> {item.title}</p>
            <p><strong>Description:</strong> {item.body}</p>
            <div className='relative w-full h-[250px] mt-4 rounded-md'>
            <Image
                src={imageUrl} 
                alt="img-post"
                fill
                objectFit='cover'
            />                 
            </div>
            </div>
        </div>
    </div>
  )
}

export default Detail