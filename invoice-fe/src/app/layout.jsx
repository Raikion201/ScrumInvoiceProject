// src/app/layout.jsx
export default function RootLayout({ children }) {
    return (
        <>
            <Header />
            {children} {/* HomePage sẽ được render ở đây */}
            <Footer />
        </>
    );
}