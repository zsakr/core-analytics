import { ProfileNavbar } from '@/components/profile/navbar';

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <ProfileNavbar />
      <div className="min-h-[calc(100vh-4rem)] bg-[#6C63FF]/5 dark:bg-[#6C63FF]/10">
        <div className="container py-8">
          {children}
        </div>
      </div>
    </div>
  );
}
