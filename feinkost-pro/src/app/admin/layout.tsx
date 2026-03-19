export const metadata = {
  title: "Feinkost Admin",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-cream-50">
      {children}
    </div>
  );
}
