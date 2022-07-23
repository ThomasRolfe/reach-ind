import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { useState, useRef, useEffect, useCallback } from "react";
import frameData from "../../data/filedata.json";
import Layout from "../../components/layout";
import Card from "../../components/card";
import Title from "../../components/title";
import { rgbValue } from "../../types/rgbValueType";
import Breadcrumbs, { page } from "../../components/breadcrumbs";
import { deviceDataQuery } from "../../queries/deviceData";
import Video from "../../components/video";
import BoundingBox from "../../components/boundingBox";
import ColourSwatch from "../../components/colourSwatch";

const Device = () => {
    const router = useRouter();
    const { id } = router.query;
    const [boundingBox, setBoundingBox] = useState<{}>({});
    const [currentFrame, setCurrentFrame] = useState<number>(1);
    const [rgbValues, setRgbValues] = useState<undefined | rgbValue>();

    const pages: page[] = [
        { name: "Devices", href: "/", current: false },
        {
            name: typeof id === "string" ? id : "",
            href: `/${id}`,
            current: true,
        },
    ];

    const videoRef = useRef<HTMLVideoElement>(null);

    const deviceData = useQuery(
        ["deviceData", id],
        ({ queryKey }) => deviceDataQuery(queryKey[1]),
        { enabled: !!id }
    );

    const frameNumber = (frameRate: number, time: number): number => {
        let singleFrameTimeInSeconds = 1 / frameRate;
        return Math.round(time / singleFrameTimeInSeconds);
    };

    const setVideoFrame: VideoFrameRequestCallback = useCallback(
        (now: DOMHighResTimeStamp, metaData: VideoFrameMetadata) => {
            setCurrentFrame(frameNumber(12, metaData.mediaTime));
            videoRef?.current?.requestVideoFrameCallback(setVideoFrame);
        },
        [videoRef]
    );

    useEffect(() => {
        if (!currentFrame) {
            return;
        }

        setRgbValues((frameData.frame_data as any)[String(currentFrame)]);
    }, [currentFrame, setRgbValues]);

    useEffect(() => {
        if (!videoRef.current) {
            return;
        }

        videoRef.current.requestVideoFrameCallback(setVideoFrame);
    }, [videoRef, setVideoFrame, deviceData]);

    const handleWindowResize = () => {
        const videoHeight = videoRef?.current?.height;
        const videoRenderedHeight = videoRef?.current?.offsetHeight;

        if (!videoHeight || !videoRenderedHeight) {
            return;
        }

        const sizeRatio = videoRenderedHeight / videoHeight;

        setBoundingBox({
            top: frameData.RoI[1] * sizeRatio,
            left: frameData.RoI[0] * sizeRatio,
            width: frameData.RoI[2] * sizeRatio,
            height: frameData.RoI[3] * sizeRatio,
        });
    };

    useEffect(() => {
        if (!videoRef.current) {
            return;
        }
        handleWindowResize();
    }, [videoRef?.current]);

    useEffect(() => {
        window.addEventListener("resize", handleWindowResize);
        videoRef?.current?.addEventListener("loadeddata", handleWindowResize);
    }, []);

    console.log(deviceData.data);

    if (!deviceData.isSuccess) {
        return "loading";
    }

    if (deviceData.data.err) {
        return (
            <Layout>
                <Breadcrumbs pages={pages} />
                <Title>Device: {id}</Title>
                <p className="my-4 font-bold">
                    Oops, it looks like there is no data for this device. Please
                    return to the devices menu.
                </p>
                <p>Error: {deviceData.data.err}</p>
            </Layout>
        );
    }

    return (
        <Layout>
            <Breadcrumbs pages={pages} />
            <Title>Device: {id}</Title>
            <div className="grid gap-4 grid-cols-1 lg:grid-cols-4 xl:grid-cols-5">
                <Card className="lg:col-span-2 xl:col-span-3">
                    <h2 className="font-bold text-xl mb-4">Video</h2>
                    <div className="relative">
                        <Video
                            source={deviceData?.data?.output?.videofiles}
                            ref={videoRef}
                        />
                        <BoundingBox style={boundingBox} />
                    </div>
                </Card>
                <Card className="col-span-1 lg:col-span-2">
                    <h2 className="font-bold text-xl mb-4">
                        Frame information
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mb-4">
                        <div className="flex flex-col justify-center">
                            <ul className="flex flex-col gap-2">
                                <li className="flex justify-between">
                                    <b>Red:</b>{" "}
                                    <span>{rgbValues?.avgR.toFixed(2)}</span>
                                </li>
                                <li className="flex justify-between">
                                    <b>Green:</b>{" "}
                                    <span>{rgbValues?.avgG.toFixed(2)}</span>
                                </li>
                                <li className="flex justify-between">
                                    <b>Blue:</b>{" "}
                                    <span>{rgbValues?.avgB.toFixed(2)}</span>
                                </li>
                                <li className="flex justify-between">
                                    <b>Histogram diff:</b>{" "}
                                    <span>
                                        {rgbValues?.histDiff?.toFixed(2)}
                                    </span>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <ColourSwatch
                                className="w-5/6 mx-auto h-36 rounded"
                                rgb={rgbValues}
                            />
                        </div>
                    </div>
                    <hr></hr>
                    <div className="p-4 mt-4 bg-brand-light-blue border border-slate-300 rounded flex justify-between">
                        <b>Current frame: </b>
                        <span id="currentframe" className="font-bold">
                            {currentFrame}
                        </span>
                    </div>
                </Card>
            </div>
        </Layout>
    );
};

export default Device;
