import Image from 'next/image'
import React from 'react'
import { AdvanceSearch } from './AdvanceSearch'

const Header = () => {
    return (
        <div className='w-full h-[200px] px-[30px] md:px-[60px] py-3 flex flex-col justify-center items-center space-y-3'>

            <div className='w-full '>
                <Image src={'/logo/logo-rbg.png'} alt='logo' width={400} height={150} className='w-16 lg:w-28' />
            </div>
            <div className='w-full flex justify-center'>
                <AdvanceSearch />
            </div>

        </div>
    )
}

export default Header