'use client'

import { SignInButton, SignOutButton, useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { useState } from "react"
import { Button } from "./ui/button";
import ModeToggle from "./ModeToggle";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { BellIcon, HomeIcon, LogOutIcon, MenuIcon, UserIcon } from "lucide-react";

const MobileNavbar = () => {
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const {isSignedIn} = useAuth();


  return (
    <div className="flex md:hidden items-center space-x-2">
        <ModeToggle />
        <Sheet open={showMobileMenu} onOpenChange={setShowMobileMenu}>
          <SheetTrigger asChild>
            <Button variant={'ghost'} size={'icon'}>
              <MenuIcon className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px]">
           <SheetHeader>
             <SheetTitle>Menu</SheetTitle>
           </SheetHeader>
           <nav className="flex flex-col space-y-4 mt-6">
             <Button variant={'ghost'} className="flex items-center gap-3 justify-start mx-4" asChild>
             <Link href="/">
              <HomeIcon className="w-4 h-4" />
                Home
              </Link>
             </Button>
             {isSignedIn ? (
               <>
                 <Button variant="ghost" className="flex items-center gap-3 justify-start mx-4" asChild>
                  <Link href="/notifications">
                    <BellIcon className="w-4 h-4" />
                    Notifications
                  </Link>
                  </Button>
                  <Button variant="ghost" className="flex items-center gap-3 justify-start mx-4" asChild>
                  <Link href="/profile">
                    <UserIcon className="w-4 h-4" />
                    Profile
                  </Link>
                </Button>
                <SignOutButton>
                <Button variant="ghost" className="flex items-center gap-3 justify-start w-full mx-4 cursor-pointer">
                    <LogOutIcon className="w-4 h-4" />
                    Logout
                  </Button> 
                </SignOutButton>
               </>
             ):(
                <div className="mx-4">
                 <SignInButton mode="modal">
                 <Button variant="default" className="w-full">
                  Sign In
                </Button>
                 </SignInButton>
                </div>
             )}
           </nav>
          </SheetContent>
        </Sheet>
    </div>
  )
}

export default MobileNavbar