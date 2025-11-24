export const metadata = {
  title: "Dashboard",
};

export default function DashboardLayout({ children }) {
  return (
    <section className="bg-gray-100 w-full min-h-screen">
      {children}
    </section>
  );
}
