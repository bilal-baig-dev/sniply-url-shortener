import ButtonLightDarkMode from "@/components/common/ButtonLightDarkMode";
import Flex from "@/components/common/Flex";
import MobileDrawer from "./(components)/MobileDrawer";
import DashboardSidebar from "./(components)/DashboardSidebar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import DashboardAccount from "./(components)/DashboardAccount";
import DashboardSetting from "./(components)/DashboardSetting";
import { getSession } from "@/actions/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) {
    return redirect("/login");
  }
  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <aside className="hidden w-64 bg-background shadow-md lg:block border-r">
        <DashboardSidebar />
      </aside>

      <main className="flex flex-col flex-1 bg-background overflow-hidden">
        <header className="bg-background shadow-sm border-b">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center">
              <MobileDrawer />
              <h1 className="ml-2 text-2xl font-semibold  lg:ml-0">Dashboard</h1>
            </div>
            <Flex className="items-center gap-2">
              <ButtonLightDarkMode />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="relative h-8 w-8 rounded-full cursor-pointer">
                    <DashboardAccount />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DashboardSetting />
                </DropdownMenuContent>
              </DropdownMenu>
            </Flex>
          </div>
        </header>
        <div className="flex-1 p-4 overflow-y-auto sm:p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
