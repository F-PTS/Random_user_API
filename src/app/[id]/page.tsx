"use client";

import { ResultsData } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";
import React from "react";
import Image from "next/image";
import Link from "next/link";

function Page() {
    const profileId = useParams();

    const { data, isLoading } = useQuery(["profile", profileId], () => {
        return axios
            .get<ResultsData>(`https://randomuser.me/api/?id=${profileId}`)
            .then((response) => response.data);
    });

    if (isLoading) return <h1 className="text-xl">Loading...</h1>;

    return (
        <>
            {data &&
                data.results.map((profile) => (
                    <div
                        key={profile.login.uuid}
                        className="flex flex-col w-full items-center gap-6 h-full"
                    >
                        <Image
                            alt={profile.email}
                            src={profile.picture.large}
                            width={400}
                            height={400}
                            className="rounded-md"
                        />
                        <h1 className="text-xl">
                            {profile.name.first} {profile.name.last}
                        </h1>
                        <p className="text-sm text-slate-500">
                            {new Date(
                                profile.registered.date
                            ).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-slate-500">
                            {new Date(
                                profile.registered.date
                            ).toLocaleTimeString()}
                        </p>
                        <p className="text-sm text-slate-500">
                            {profile.location.city}, {profile.location.country}
                        </p>
                        <p className="text-sm text-slate-500">
                            {new Date(profile.dob.date).toDateString()}
                        </p>
                    </div>
                ))}
            <Link href={`/`} className="w-full mt-6">
                <button className="bg-slate-950 text-slate-50 w-full rounded-md text-sm py-2 px-6 uppercase mt-6">
                    go back
                </button>
            </Link>
        </>
    );
}

export default Page;
