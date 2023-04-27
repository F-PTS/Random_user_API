"use client";

import Image from "next/image";
import { Inter } from "next/font/google";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";
import { ResultsData } from "@/types";
import { UserCard } from "@/components/UserCard";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    const [page, setPage] = useState(1);
    const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
        useInfiniteQuery(
            ["profiles"],
            ({ pageParam }) => {
                return axios
                    .get<ResultsData>(
                        `https://randomuser.me/api/?results=${5}&page=${pageParam}`
                    )
                    .then((response) => response.data);
            },
            {
                getNextPageParam: (lastPage, allPages) => {
                    const nextPage = allPages.length + 1;
                    return nextPage;
                },
            }
        );

    return (
        <>
            <div className="w-full py-5 grid grid-cols-12 gap-6">
                {isLoading && <h1 className="text-2xl">Loading...</h1>}
                {data &&
                    data.pages.map((page) =>
                        page.results.map((profile) => (
                            <UserCard
                                key={profile.login.uuid}
                                profile={profile}
                            />
                        ))
                    )}
                <button
                    className="bg-slate-200 col-span-12 text-slate-950 hover:bg-slate-400 rounded-md text-sm py-2 px-6 uppercase"
                    onClick={async () => {
                        if (hasNextPage) await fetchNextPage();
                    }}
                >
                    {isFetchingNextPage ? "Loading..." : "Fetch more"}
                </button>
            </div>
        </>
    );
}
