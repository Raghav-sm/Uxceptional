import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { LogOut } from "lucide-react";

export default function Header() {
  const { user } = useUser();

  return (
    <div className="relative z-10 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="p-2">
              <svg
                className="w-8 h-8"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
              >
                <path d="M8 2v20l-5.5-6L8 2" />
                <path d="M16 2v20l5.5-6L16 2" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
            <h1 className="text-xl font-bold">UXceptional</h1>

            <SignedIn>
              <div className="flex items-center space-x-2 ml-2">
                <div className="w-1 h-6 bg-gray-600 rounded-full"></div>
                <span className="text-gray-300 text-sm">
                  Welcome,{" "}
                  <span className="font-semibold text-white">
                    {user?.firstName || user?.username || "User"}
                  </span>
                </span>
              </div>
            </SignedIn>
          </div>

          <div className="flex items-center space-x-3">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="bg-white text-black px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-all duration-300 shadow-sm">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <div className="flex items-center space-x-3">
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "w-8 h-8",
                      userButtonPopoverCard: "bg-gray-900 border-gray-700",
                      userButtonPopoverActions: "bg-gray-900",
                      userButtonPopoverActionButton:
                        "text-gray-300 hover:text-white hover:bg-gray-800",
                    },
                  }}
                />
                <SignOutButton>
                  <button className="bg-black border border-gray-700 hover:bg-gray-900 hover:border-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center space-x-2 shadow-sm">
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </SignOutButton>
              </div>
            </SignedIn>
          </div>
        </div>
      </div>
    </div>
  );
}
