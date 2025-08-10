// app/ClerkClientProvider.tsx
'use client';

import React from 'react';
import { ClerkProvider } from '@clerk/nextjs';

export function ClerkClientProvider({
                                        children,
                                    }: {
    children: React.ReactNode;
}) {
    return (
        <ClerkProvider appearance={{ variables: { colorPrimary: '#fe5933' }}}>
            {children}
        </ClerkProvider>
    );
}
