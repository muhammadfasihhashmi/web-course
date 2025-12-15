import SearchMovie from "./SearchMovie";

function Navbar({ movies, setQuery, query }) {
  return (
    <nav className="nav-bar">
      <div className="logo">
        <span role="img">🍿</span>
        <h1>usePopcorn</h1>
      </div>
      <SearchMovie setQuery={setQuery} query={query} />
      <p className="num-results">
        {/* Found <strong>{movies.length}</strong> results */}
      </p>
    </nav>
  );
}

export default Navbar;
