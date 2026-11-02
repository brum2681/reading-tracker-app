export const metadata = {
  title: 'Student Reading Tracker',
  description: 'Full stack Next.js app with Node.js and Neon PostgreSQL',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif', backgroundColor: '#f9fafb' }}>
        {children}
      </body>
    </html>
  );
}