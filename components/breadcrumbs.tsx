import Link from "next/link";

interface page {
    name: string;
    href: string;
    current: boolean;
}

const Breadcrumbs = ({ pages }: { pages: page[] }) => {
    return (
        <nav className="flex my-4 -ml-4" aria-label="Breadcrumb">
            <ol role="list" className="flex items-center space-x-4">
                {pages.map((page, index) => (
                    <li key={page.name}>
                        <div className="flex items-center">
                            {index !== 0 && (
                                <svg
                                    className="flex-shrink-0 h-5 w-5 text-gray-300"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    aria-hidden="true"
                                >
                                    <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                                </svg>
                            )}
                            <Link href={page.href}>
                                <a
                                    className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                                    aria-current={
                                        page.current ? "page" : undefined
                                    }
                                >
                                    {page.name}
                                </a>
                            </Link>
                        </div>
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;
