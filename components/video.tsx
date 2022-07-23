import { forwardRef } from "react";

interface videoProps {
    source?: string;
}

const Video = forwardRef<HTMLVideoElement, videoProps>((props, ref) => {
    return (
        <video
            id="video"
            width="1280"
            height="720"
            controls
            ref={ref}
            className="rounded"
        >
            <source src={props.source} type="video/mp4" />
        </video>
    );
});

Video.displayName = "Video";

export default Video;
