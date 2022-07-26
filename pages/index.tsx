import { useQuery } from "@tanstack/react-query";
import type { NextPage } from "next";
import Link from "next/link";
import Breadcrumbs from "../components/breadcrumbs";
import Card from "../components/card";
import Layout from "../components/layout";
import Title from "../components/title";
import { devicesQuery } from "../queries/devices";

const Home: NextPage = () => {
    const pages = [{ name: "Devices", href: "/", current: true }];

    const { data: devices, isSuccess } = useQuery(["devices"], () =>
        devicesQuery("100", "Lumi")
    );

    if (!isSuccess) "Loading";

    return (
        <Layout>
            <Breadcrumbs pages={pages} />
            <Title>Available devices</Title>
            <Card>
                <ul className="flex flex-col gap-4">
                    {devices?.output?.map((device: string, index: number) => {
                        return (
                            <li key={index} className="contents">
                                <Link href={`/devices/${device}`}>
                                    <a className="p-4 bg-brand-light-blue border border-slate-300 rounded hover:shadow-md transition">
                                        {device}
                                    </a>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </Card>
        </Layout>
    );
};

export default Home;
