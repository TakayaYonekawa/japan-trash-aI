'use client';

import { useAuthenticator } from "@aws-amplify/ui-react";
import { LogOut, User, Trash2, LogIn } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const { signOut, user, authStatus } = useAuthenticator((context) => [context.user, context.authStatus]);
  const pathname = usePathname();

  // Hide login button on the login page itself to avoid confusion
  const isLoginPage = pathname === '/login';

  return (
    <header className="fixed top-0 left-0 w-full z-40 px-4 py-3 flex justify-between items-center bg-slate-900/20 backdrop-blur-md border-b border-white/5">
      <div className="flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="p-1.5 bg-indigo-500 rounded-lg">
            <Trash2 className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-slate-100 hidden sm:block">Japan Trash AI</span>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        {authStatus === 'authenticated' ? (
          <>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full border border-white/10">
              <div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-fuchsia-500 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="text-xs font-medium text-slate-300 max-w-[100px] truncate">
                {user?.signInDetails?.loginId || "User"}
              </span>
            </div>
            
            <button
              onClick={signOut}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 rounded-xl border border-red-500/20 transition-all text-sm font-medium"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">ログアウト</span>
            </button>
          </>
        ) : (
          !isLoginPage && (
            <Link 
              href="/login"
              className="flex items-center gap-2 px-4 py-2 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 hover:text-indigo-300 rounded-xl border border-indigo-500/20 transition-all text-sm font-medium"
            >
              <LogIn className="w-4 h-4" />
              <span className="font-bold">ログイン</span>
            </Link>
          )
        )}
      </div>
    </header>
  );
}
