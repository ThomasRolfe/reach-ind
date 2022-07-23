import { HomeIcon } from "@heroicons/react/outline";
import Link from "next/link";

const navigation = [
    {
        name: "Devices",
        href: "/",
        icon: HomeIcon,
    },
];

const Layout = ({ children }) => {
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
                                            "text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                                        }
                                    >
                                        <item.icon
                                            className={
                                                "text-gray-400 group-hover:text-gray-500  mr-3 flex-shrink-0 h-6 w-6"
                                            }
                                            aria-hidden="true"
                                        />
                                        <span className="flex-1">
                                            {item.name}
                                        </span>
                                    </a>
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>
            </div>
            <div className="lg:pl-64 flex flex-col flex-1 bg-sky-50">
                <div className="container mx-auto p-4 sm:p-6 lg:p-8 ">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Layout;
