import React from 'react'
import "./main.css"
import Basket from './components/Basket';
import StoreProvider from '@/components/ReduxStoreProvider';

const mainPageLayout = async ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {

    return (
        <main className='relative h-svh w-screen overflow-clip flex flex-col text-slate-800 bg-stone-50'>
            <StoreProvider>
                <div className='relative flex grow h-view flex-col lg:flex-row'>
                    <section className='grow h-full overflow-y-scroll contentSection z-0'>
                        {children}
                    </section>
                    <Basket />
                </div>
            </StoreProvider>
        </main>
    )
}

export default mainPageLayout