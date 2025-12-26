
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

const Search = () => {
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/?keyword=${keyword.trim()}&page=1`);
        }
    };

    return (
        <form 
            onSubmit={submitHandler} 
            className="relative w-full max-w-[550px] group flex items-center"
        >
            {/* Search Icon */}
            <div className="absolute left-4 pointer-events-none transition-colors">
                <FiSearch 
                    className="text-gray-400 group-focus-within:text-red-500" 
                    size={18} 
                />
            </div>

            {/* Input Field */}
            <input
                type="text"
                placeholder="Search products, brands and more..."
                className="w-full pl-12 pr-28 py-2.5 bg-gray-50 border border-gray-200 rounded-full text-sm transition-all 
                           focus:outline-none focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/10 
                           placeholder:text-gray-400 text-gray-700 shadow-sm"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />

            {/* Perfected Search Button */}
            <button
                type="submit"
                className="absolute right-1.5 h-[36px] px-5 bg-gray-900 hover:bg-red-600 text-white text-[11px] 
                           font-bold uppercase tracking-wider rounded-full transition-all active:scale-95 
                           flex items-center justify-center shadow-md"
            >
                Search
            </button>
        </form>
    );
};

export default Search;