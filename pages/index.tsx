import { useQuery } from "@tanstack/react-query";
import type { NextPage } from "next";
import Link from "next/link";
import { useState, useRef, useEffect, useCallback } from "react";
import Layout from "../components/layout";

const Home: NextPage = () => {
    const query = async () => {
        return fetch(
            "https://mockapi.lumi.systems/getdevices?" +
                new URLSearchParams({
                    userId: "100",
                    orgId: "Lumi",
                })
        ).then((res) => res.json());
    };

    const devices = useQuery(["devices"], query);

    if (!devices.isSuccess) "Loading";

    return (
        <Layout>
            <h1>Reach Industries</h1>
            <div>
                <ul>
                    {devices.data?.output?.map((device, index) => {
                        return (
                            <li key={index}>
                                <Link href={`/devices/${device}`}>
                                    <a>{device}</a>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </Layout>
    );
};

export default Home;
