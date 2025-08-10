// This file is likely app/_components/Navbar.tsx
'use client'; // This is needed for using hooks in a component
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import NavItems from "@/components/NavItems";

const Navbar = () => {
    // We get the isLoaded boolean from the useAuth hook.
    // This tells us if Clerk has finished loading the authentication state.
    const { isLoaded } = useAuth();

    // If Clerk has not finished loading, we render nothing (or a loading spinner).
    // This prevents the 'SignedOut' content from flashing before the user is confirmed as signed in.
    if (!isLoaded) {
        return null; // Or return a loading spinner component
    }

    return (
        <nav className="navbar">
            <Link href="/">
                <div className="flex items-center gap-2.5 cursor-pointer">
                    <Image src="/images/logo.svg" alt="logo" width={46} height={44} />
                </div>
            </Link>
            <div className="flex items-center gap-8">
                <NavItems />
                {/* The rest of the code is unchanged, but now it will only render
                    once the authentication state is fully loaded. */}
                <SignedOut>
                    <SignInButton>
                        <button className="btn-signin">Sign In</button>
                    </SignInButton>
                </SignedOut>
                <SignedIn>
                    <UserButton afterSignOutUrl="/"/>
                </SignedIn>
            </div>
        </nav>
    )
}
export default Navbar;
