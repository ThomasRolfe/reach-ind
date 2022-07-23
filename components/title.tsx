const Title = ({ children }: { children: React.ReactNode }) => {
    return (
        <h1 className="font-sans text-xl font-bold text-gray-900 sm:text-2xl mb-8">
            {children}
        </h1>
    );
};

export default Title;
