import Footer from "../components/footer";
import Navbar from "../components/navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">{children}</main>

      <Footer />
    </div>
  );
}
