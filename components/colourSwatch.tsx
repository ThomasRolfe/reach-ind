import { rgbValue } from "../types/rgbValueType";

const ColourSwatch = ({
    className,
    rgb,
}: {
    className: string;
    rgb: rgbValue | undefined;
}) => {
    return (
        <div
            className={className}
            style={{
                backgroundColor: `rgb(${rgb?.avgR ?? 0}, ${rgb?.avgG ?? 0}, ${
                    rgb?.avgB ?? 0
                })`,
            }}
        ></div>
    );
};

export default ColourSwatch;
