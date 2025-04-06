"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth, UserButton, SignInButton } from "@clerk/nextjs";
import { useState } from "react";

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path) => {
    return pathname === path;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-800 shadow-lg">
      <div className="navbar px-4 sm:px-8 py-3 max-w-6xl mx-auto">
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

        <div className="flex-none md:hidden">
          <button
            className="btn btn-square btn-ghost text-white"
            onClick={toggleMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-6 h-6 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>

        <div className="hidden md:flex md:items-center">
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

          <div className="ml-4 flex items-center">
            {isLoaded ? (
              isSignedIn ? (
                <div className="bg-blue-500 bg-opacity-20 rounded-full p-1 hover:bg-opacity-30 transition-all">
                  <UserButton
                    appearance={{
                      elements: {
                        userButtonAvatarBox: "w-8 h-8",
                        userButtonTrigger: "focus:shadow-none",
                        userButtonPopoverCard: "shadow-xl",
                      },
                    }}
                  />
                </div>
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
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-gradient-to-r from-blue-600 to-indigo-800 shadow-lg">
          <ul className="menu p-2">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-white hover:bg-blue-500 rounded-md py-2 my-1 transition-all duration-200 font-medium ${
                    isActive(link.href) ? "bg-blue-500" : ""
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="mt-2">
              {isLoaded ? (
                isSignedIn ? (
                  <div className="flex items-center justify-between px-4 py-2">
                    <span className="text-white">내 계정</span>
                    <div className="bg-blue-500 bg-opacity-20 rounded-full p-1">
                      <UserButton
                        appearance={{
                          elements: {
                            userButtonAvatarBox: "w-8 h-8",
                            userButtonTrigger: "focus:shadow-none",
                          },
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <SignInButton mode="modal">
                    <button className="btn btn-sm btn-outline w-full bg-transparent border-white text-white hover:bg-white hover:text-blue-600">
                      로그인
                    </button>
                  </SignInButton>
                )
              ) : (
                <span className="loading loading-spinner loading-xs text-white"></span>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
