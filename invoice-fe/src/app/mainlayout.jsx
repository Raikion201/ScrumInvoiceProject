import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './header';
import Footer from './footer';

const MainLayout = () => {
    return (
        <html lang="vi">
            <body style={{ margin: 0 }}>
                <div className="main-layout" style={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh'
                }}>
                    <Header />
                    <main style={{ flex: 1 }}>
                        <Outlet />
                    </main>
                    <Footer />
                </div>
            </body>
        </html>
    );
};

export default MainLayout;