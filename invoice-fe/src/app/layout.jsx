// src/app/layout.jsx
import 'antd/dist/reset.css';
import Header from "./component/header";
import Footer from "./component/footer";

export default function RootLayout({ children }) {
    return (
        <html lang="vi">
            <body style={{ margin: 0 }}>
                <Header />
                {children} {/* HomePage sẽ được render ở đây */}
                <Footer />
            </body>
        </html>
    );
}