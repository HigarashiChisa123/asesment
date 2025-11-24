import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function LandingLayout({ children }) {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* NAVBAR */}
      <Navbar />

      {/* HALAMAN */}
      <main className="flex-1 px-10 py-8">
        {children}
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
