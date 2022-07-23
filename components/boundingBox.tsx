const BoundingBox = ({
    style,
}: {
    style: { top: number; left: number; width: number; height: number } | {};
}) => {
    return (
        <div
            className="border-2 border-red-500  absolute z-10"
            style={style}
        ></div>
    );
};

export default BoundingBox;
