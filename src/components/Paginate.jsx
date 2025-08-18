import { useEffect, useState } from "react";
import React from "react";

const Paginate = ({ totalPage, page, setPage }) => {
  const { pages, prevPage, nextPage, changePage } = usePagination({
    totalPage,
    setPage,
  });

  return (
    <div className="flex justify-center mb-2 select-none transition ease-in">
      <ul className="flex justify-center items-center paginate gap-1">
        <div
          className={`bg-[var(--color-secondary)] px-4 py-2 rounded-sm text-white cursor-pointer ${
            page === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={() => {
            if (page > 1) {
              changePage(page - 1);
              if (page <= pages[0]) prevPage();
            }
          }}
        >
          Prev
        </div>

        {pages.map((p) => (
          <li key={p}>
            <div
              onClick={() => changePage(p)}
              className={`${
                page === p ? "bg-[var(--color-secondary)]" : "bg-[#B9B4C7]"
              } font-semibold px-4 py-2 rounded-sm text-white cursor-pointer`}
            >
              {p}
            </div>
          </li>
        ))}

        <div
          className={`bg-[var(--color-secondary)] px-4 py-2 rounded-sm text-white cursor-pointer ${
            page === totalPage ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={() => {
            if (page < totalPage) {
              changePage(page + 1);
              if (page >= pages[pages.length - 1]) nextPage();
            }
          }}
        >
          Next
        </div>
      </ul>
    </div>
  );
};

export default Paginate;

export const usePagination = ({ totalPage, setPage }) => {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    const initialPages =
      totalPage <= 5
        ? Array.from({ length: totalPage }, (_, i) => i + 1)
        : [1, 2, 3, 4, 5];
    setPages(initialPages);
  }, [totalPage]);

  const prevPage = () => {
    if (pages[0] > 1) {
      setPages(pages.map((p) => p - 1));
    }
  };

  const nextPage = () => {
    if (pages[pages.length - 1] < totalPage) {
      setPages(pages.map((p) => p + 1));
    }
  };

  const changePage = (pageIndex) => {
    setPage(pageIndex);
  };

  return { pages, prevPage, nextPage, changePage };
};
