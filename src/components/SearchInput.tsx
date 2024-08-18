import { Search } from "lucide-react";

export default function SearchInput() {
    return (
        <div className="header__input">
            <Search />
            <input role="search" placeholder="Search Location..." />
        </div>
    )
}
