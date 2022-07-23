import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { useState, useRef, useEffect, useCallback } from "react";
import frameData from "../../data/filedata.json";
import Layout from "../../components/layout";
import Card from "../../components/card";
import Title from "../../components/title";
import { rgbValue } from "../../types/rgbValueType";

const Device = () => {
    const router = useRouter();
    const { id }: { id: string } = router.query;
    const [boundingBox, setBoundingBox] = useState<{}>({});
    const [currentFrame, setCurrentFrame] = useState<string>("1");
    const [rgbValues, setRgbValues] = useState<null | rgbValue>(null);

    const videoRef = useRef<HTMLVideoElement>();

    const deviceDataQuery = async (queryKey: string) => {
        return fetch(
            "https://mockapi.lumi.systems/getdevicedata?" +
                new URLSearchParams({
                    deviceId: queryKey,
                })
        ).then((res) => res.json());
    };

    const deviceData = useQuery(
        ["deviceData", id],
        ({ queryKey }) => deviceDataQuery(queryKey[1]),
        { enabled: !!id }
    );

    const frameNumber = (frameRate, time) => {
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

        setRgbValues(frameData.frame_data[currentFrame]);
    }, [currentFrame, setRgbValues]);

    useEffect(() => {
        if (!videoRef.current) {
            return;
        }

        videoRef.current.requestVideoFrameCallback(setVideoFrame);
    }, [videoRef, setVideoFrame, deviceData]);

    const handleWindowResize = () => {
        if (!videoRef.current) {
            return;
        }

        const videoHeight = videoRef.current.height;
        const videoRenderedHeight = videoRef.current.offsetHeight;
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
        videoRef.current?.addEventListener("resize", handleWindowResize);
    }, []);

    if (!deviceData.isSuccess) {
        return "loading";
    }

    return (
        <Layout>
            <Title>Device: {id}</Title>
            <div className="grid gap-4 grid-cols-1 lg:grid-cols-4 xl:grid-cols-5">
                <Card className="lg:col-span-2 xl:col-span-3">
                    <div className="relative">
                        <video
                            id="video"
                            width="1280"
                            height="720"
                            controls
                            ref={videoRef}
                        >
                            <source
                                src={deviceData?.data?.output?.videofiles}
                                type="video/mp4"
                            />
                        </video>
                        <div
                            className="border border-1 border-white border-dashed absolute z-10"
                            style={boundingBox}
                        ></div>
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
                                        {rgbValues?.histDiff.toFixed(2)}
                                    </span>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <div
                                className="w-5/6 mx-auto h-36"
                                style={{
                                    backgroundColor: `rgb(${rgbValues?.avgR}, ${rgbValues?.avgG}, ${rgbValues?.avgB})`,
                                }}
                            ></div>
                        </div>
                    </div>
                    <hr></hr>
                    <div className="mt-4">
                        <b>Current frame: </b>
                        <span id="currentframe">{currentFrame}</span>
                    </div>
                </Card>
            </div>
        </Layout>
    );
};

export default Device;
