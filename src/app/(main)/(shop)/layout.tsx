import React from 'react'
import OrderInProgress from '../components/OrderInProgress';
import SearchBar from '../components/SearchBar';

const ShoppingSectionsLayout = async ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <>
            <header className='bg-stone-50 z-50 flex justify-center items-center text-gray-900 py-5 gap-3 px-3 md:px-5'>
                <OrderInProgress />
                <SearchBar />
            </header>
            {children}
        </>
    )
}

export default ShoppingSectionsLayout