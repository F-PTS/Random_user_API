import React from "react";
import type { Result } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface UserCardProps {
    profile: Result;
}

export function UserCard({ profile }: UserCardProps) {
    return (
        <div className="col-span-12 lg:col-span-4 flex flex-col w-full items-center border border-slate-200 rounded-md p-6 gap-3">
            <Image
                alt={profile.email}
                src={profile.picture.large}
                width={200}
                height={200}
                className="rounded-md"
            />
            <h1 className="text-xl">
                {profile.name.first} {profile.name.last}
            </h1>
            <p className="text-sm text-slate-500">{profile.email}</p>
            <Link href={`/${profile.login.uuid}`} className="w-full">
                <button className="bg-slate-950 text-slate-50 w-full rounded-md text-sm py-2 px-6 uppercase">
                    Details
                </button>
            </Link>
        </div>
    );
}
