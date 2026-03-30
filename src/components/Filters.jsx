import { useState } from "react";

export default function Filters({ articles }) {
  const [search, setSearch] = useState("");
  const [month, setMonth] = useState("");
  const [page, setPage] = useState(1);

  const PAGE_SIZE = 5;

  const query = search.trim().toLowerCase();

  // ✅ Extract months
  const months = [
    ...new Set(articles.map(a => a.data.date.slice(0, 7)))
  ].sort().reverse();

  const formatMonth = (m) =>
    new Date(m + "-01").toLocaleDateString("en-GB", {
      month: "long",
      year: "numeric"
    });

  // ✅ Base sorted list
  const sortedArticles = [...articles].sort(
    (a, b) => new Date(b.data.date) - new Date(a.data.date)
  );

  // ✅ Filter logic (NO LIMIT here)
  const filtered =
    query.length > 0 || month !== ""
      ? sortedArticles.filter(a => {
          const title = (a.data?.title || "").toLowerCase();

          const matchSearch =
            query === "" || title.includes(query);

          const matchMonth =
            month === "" || a.data.date.startsWith(month);

          return matchSearch && matchMonth;
        })
      : sortedArticles;

  // ✅ Pagination (applies to both cases)
  const totalPages = Math.max(
    1,
    Math.ceil(filtered.length / PAGE_SIZE)
  );

  const paginatedArticles = filtered.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  return (
    <div>

      {/* 🔍 SEARCH */}
      <div className="search-section">
        <div className="search-row">
          <input
            placeholder="Search articles..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>
      </div>

      {/* 📂 FILTER */}
      <div className="filter-section">
        <select
          value={month}
          onChange={(e) => {
            setMonth(e.target.value);
            setPage(1);
          }}
        >
          <option value="">Filter by month</option>
          {months.map(m => (
            <option key={m} value={m}>
              {formatMonth(m)}
            </option>
          ))}
        </select>
      </div>

      {/* 📄 RESULTS */}
      {filtered.length === 0 ? (
        <p>No articles found</p>
      ) : (
        <>
          <div className="articles-list">
            {paginatedArticles.map(a => (
              <a
                key={a.id}
                className="article-link"
                href={`/articles/${a.id}`}
              >
                <div className="article-title">
                  {a.data.title}
                </div>

                <div className="article-meta">
                  {new Date(a.data.date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                  })}
                </div>
              </a>
            ))}
          </div>

          {/* 🔢 PAGINATION */}
          <div className="pagination">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Prev
            </button>

            <span>{page} / {totalPages}</span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}

    </div>
  );
}