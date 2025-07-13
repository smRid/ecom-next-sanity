'use client';

import { ClerkLoaded, SignedIn, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import Form from "next/form";
import { PackageIcon, TrolleyIcon } from "@sanity/icons";
import useBasketStore from "@/lib/store";

function Header(){

    const { user } = useUser();
    const itemCount = useBasketStore((state) =>
        state.items.reduce((total, item) => total + item.quantity, 0)
    );

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 w-full min-w-0">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/"
                className="text-xl sm:text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors duration-200 whitespace-nowrap"
            >Shopinity</Link>
          </div>

          {/* Search Bar */}
          <div className="flex-1 mx-4 sm:mx-6 md:mx-6 lg:mx-6 xl:mx-48 2xl:mx-8 hidden md:block min-w-0">
            <Form action="/search" className="relative w-full">
              <div className="relative flex items-center">
                  <input
                      type="text"
                      name="query"
                      placeholder="Search for products..."
                      className="w-full bg-gray-50 text-gray-900 px-4 py-3 pr-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                  <button 
                      type="submit"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex-shrink-0"
                      aria-label="Search"
                  >
                      <svg 
                          className="w-5 h-5" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                      >
                          <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={2} 
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                          />
                      </svg>
                  </button>
              </div>
            </Form>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 flex-shrink-0">
            {/* Basket */}
            <Link href='/basket'
                className="relative inline-flex items-center px-2 sm:px-3 lg:px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
                <TrolleyIcon className="w-4 h-4 sm:w-5 sm:h-5 sm:mr-1 lg:mr-2"/>
                <span className="hidden sm:inline text-sm lg:text-base">Basket</span>
                <span className="absolute -top-2 -right-1 sm:-right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium">
                    {itemCount}
                </span>
            </Link>

            {/* User area */}
            <ClerkLoaded>
               <SignedIn>
                    <Link 
                        href="/orders"
                        className="inline-flex items-center px-2 sm:px-3 lg:px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 font-medium rounded-lg border border-gray-300 hover:border-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1"
                        >
                         <PackageIcon className="w-4 h-4 sm:w-5 sm:h-5 sm:mr-1 lg:mr-2"/>   
                         <span className="hidden sm:inline text-sm lg:text-base">Orders</span>   
                    </Link>
                </SignedIn>

                {user ? (
                    <div className="flex items-center space-x-2 sm:space-x-3">
                        <div className="hidden xl:block text-right text-sm">
                            <p className="text-gray-500">Welcome back</p>
                            <p className="font-medium text-gray-900 truncate max-w-32">{user.fullName}</p>
                        </div>
                        <UserButton 
                            appearance={{
                                elements: {
                                    avatarBox: "w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10"
                                }
                            }}
                        />
                    </div>
                    ) : (
                    <SignInButton mode="modal">
                        <button className="inline-flex items-center px-2 sm:px-3 lg:px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                            <svg className="w-4 h-4 sm:hidden mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                            </svg>
                            <span className="hidden sm:inline text-sm lg:text-base">Sign In</span>
                            <span className="sm:hidden">Login</span>
                        </button>
                    </SignInButton>
                    )}
            </ClerkLoaded>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4">
          <Form action="/search" className="relative">
            <div className="relative flex items-center">
                <input
                    type="text"
                    name="query"
                    placeholder="Search for products..."
                    className="w-full bg-gray-50 text-gray-900 px-4 py-3 pr-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button 
                    type="submit"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md transition-colors duration-200"
                    aria-label="Search"
                >
                    <svg 
                        className="w-5 h-5" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                        />
                    </svg>
                </button>
            </div>
          </Form>
        </div>
      </div>
    </header>
  )
}

export default Header
