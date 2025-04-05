"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth, UserButton, SignInButton } from "@clerk/nextjs";

const links = [
  { href: "/client", label: "client" },
  { href: "/drinks", label: "drinks" },
  { href: "/prisma-example", label: "query" },
  { href: "/tasks", label: "tasks" },
  { href: "/blog", label: "blog" },
];

const Navbar = () => {
  const { isLoaded, userId, isSignedIn } = useAuth();
  const pathname = usePathname();

  const isActive = (path) => {
    return pathname === path;
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-800 shadow-lg">
      <div className="navbar px-8 py-3 max-w-6xl mx-auto">
        <div className="flex-1">
          <Link href="/" className="flex items-center gap-2">
            <div className="p-2 bg-white rounded-lg shadow-md">
              <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-800 text-transparent bg-clip-text">
                G
              </div>
            </div>
            <div className="text-2xl font-bold text-white">
              <span className="text-white">GCP-</span>
              <span className="text-cyan-200">BLOG</span>
            </div>
          </Link>
        </div>

        <div className="flex-none">
          <ul className="menu menu-horizontal p-0 gap-1 mr-4">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-white hover:bg-blue-500 rounded-md px-4 py-2 transition-all duration-200 font-medium ${
                    isActive(link.href) ? "bg-blue-500" : ""
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {isLoaded ? (
            isSignedIn ? (
              <UserButton
                afterSignOutUrl="/blog"
                appearance={{
                  elements: {
                    userButtonAvatarBox: "w-10 h-10",
                    userButtonTrigger: "focus:shadow-none",
                  },
                }}
              />
            ) : (
              <SignInButton mode="modal">
                <button className="btn btn-sm btn-outline bg-transparent border-white text-white hover:bg-white hover:text-blue-600">
                  로그인
                </button>
              </SignInButton>
            )
          ) : (
            <span className="loading loading-spinner loading-xs text-white"></span>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
