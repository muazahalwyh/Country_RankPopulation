import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="flex h-screen justify-center items-center">
            <div className="font-bold">
                <h2 className="mb-2 text-red-600">PAGE NOT FOUND</h2>
                <p>
                    Go to <Link className="hover:text-red-700" to="/">Home page.</Link>.
                </p>
            </div>
        </div>

    );
}