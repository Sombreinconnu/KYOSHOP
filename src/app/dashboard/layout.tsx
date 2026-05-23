import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-[#F8F9FC]">
      <DashboardSidebar />
      <div className="pl-64">{children}</div>
    </div>
  );
}
