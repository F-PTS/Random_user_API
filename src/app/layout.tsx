"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import {
    QueryClient,
    QueryClientProvider,
    useQueryClient,
} from "@tanstack/react-query";

const inter = Inter({ subsets: ["latin"] });

const queryClient = new QueryClient();

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head />
            <body>
                <QueryClientProvider client={queryClient}>
                    <main className="container mx-auto">{children}</main>
                </QueryClientProvider>
            </body>
        </html>
    );
}
