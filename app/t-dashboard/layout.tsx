import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Admin — Tony Visuals",
    template: "%s — Tony Visuals",
  },
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}