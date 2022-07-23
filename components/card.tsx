const Card = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className: string | null;
}) => {
    return (
        <div
            className={`bg-white overflow-hidden shadow-md rounded ${
                className ?? ""
            }`}
        >
            <div className="px-4 py-5 sm:p-6">{children}</div>
        </div>
    );
};

export default Card;
