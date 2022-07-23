import Link from "next/link";

const navigation = [
    {
        name: "Devices",
        href: "/",
    },
];

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen">
            <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 min-h-screen">
                <div className="flex flex-col flex-grow border-r border-gray-200 pt-5 pb-4 bg-white overflow-y-auto">
                    <div className="flex items-center flex-shrink-0 px-4">
                        <strong>Reach</strong>
                    </div>
                    <div className="mt-5 flex-grow flex flex-col">
                        <nav
                            className="flex-1 px-2 bg-white space-y-1"
                            aria-label="Sidebar"
                        >
                            {navigation.map((item) => (
                                <Link key={item.name} href={item.href}>
                                    <a
                                        className={
                                            "text-white bg-[#4AC7A9] hover:bg-[#37af93] group flex items-center px-2 py-2 text-sm font-medium rounded-md justify-center"
                                        }
                                    >
                                        <span>{item.name}</span>
                                    </a>
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>
            </div>
            <div className="lg:pl-64 flex flex-col flex-1 bg-brand-light-blue min-h-screen">
                <div className="container mx-auto p-4 sm:p-6 lg:p-8 ">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Layout;
