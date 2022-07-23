const Card = ({ children, ...rest }) => {
    return (
        <div
            className={`bg-white overflow-hidden shadow-md rounded-sm ${
                rest.className ?? ""
            }`}
        >
            <div className="px-4 py-5 sm:p-6">{children}</div>
        </div>
    );
};

export default Card;
