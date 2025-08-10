// Update your existing file: components/Navbar.tsx
'use client';

import React from 'react'
import Link from "next/link";
import Image from 'next/image';
import NavItems from "@/components/NavItems"
import AuthButtons from "@/components/AuthButtons" // Import the new component

const Navbar = () => {
    // We no longer need the useAuth hook here, as it's in AuthButtons.
    return (
        <nav className="navbar">
            <Link href="/">
                <div className="flex items-center gap-2.5 cursor-pointer">
                    <Image src="/images/logo.svg" alt="logo" width={46} height={44} />
                </div>
            </Link>
            <div className="flex items-center gap-8">
                <NavItems />
                {/* Now we just render the new AuthButtons component here */}
                <AuthButtons />
            </div>
        </nav>
    )
}
export default Navbar;
