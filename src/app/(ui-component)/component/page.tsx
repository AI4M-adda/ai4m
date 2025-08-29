import { SidebarTrigger } from "@/components/ui/sidebar";
import { Code } from "lucide-react";
import { componentDetails } from "../_lib/component-configs";
import ClientPage from "./client-page";
import { Box } from "@/components/ui/box";

export default function ComponentPage() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <SidebarTrigger className="-ml-1" />
              </div>
              <div className="hidden md:flex items-center space-x-4 text-sm text-slate-600">
                <div className="flex items-center space-x-2">
                  <Code className="w-4 h-4" />
                  <span>{componentDetails.length} Components</span>
                </div>
              </div>
            </div>
          </div>
        </header>
        <Box className={{ "": "p-4 m-4 border", "hover:": "bg-amber-400" }}>
          Box Component
        </Box>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ClientPage />
        </main>

        {/* Footer */}
        <footer className="bg-white/60 backdrop-blur-sm border-t border-slate-200 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center text-slate-600">
              <p className="mb-2">
                Built with Next.js, Tailwind CSS, and shadcn/ui
              </p>
              <p className="text-sm">
                Interactive component documentation system
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
