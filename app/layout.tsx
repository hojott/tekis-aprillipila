import './styles/globals.css';
import styles from './styles/Layout.module.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <title>Chatbot</title>
            </head>
            <body>
                <header className={styles.header}>
                    <img src="/tko-aly-logo.png" alt="TKO-äly Logo" className={styles.logo} />
                    <span className={styles.title}>TKO-äly ry</span>
                </header>
                <main className={styles.main}>
                    {children}
                </main>
            </body>
        </html>
    );
}