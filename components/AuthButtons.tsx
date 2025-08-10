// Create a new file: components/AuthButtons.tsx
'use client'; // This component must be a client component

import React from 'react';
import { useAuth, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

const AuthButtons = () => {
    // This is the key: we wait until Clerk has finished loading its state.
    const { isLoaded } = useAuth();

    if (!isLoaded) {
        return null; // Don't render anything yet to avoid a flash.
    }

    return (
        <>
            <SignedOut>
                <SignInButton>
                    <button className="btn-signin">Sign In</button>
                </SignInButton>
            </SignedOut>
            <SignedIn>
                <UserButton afterSignOutUrl="/"/>
            </SignedIn>
        </>
    );
}

export default AuthButtons;
