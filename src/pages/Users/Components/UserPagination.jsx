import { useEffect, useState } from "react";

const UserPagination = ({totalPage, page, setPage}) => {
  const { pages, prevPage, nextPage, changePage } = usePagination({
  totalPage,
  setPage,
});
  return (
  <div className="absolute bottom-0 left-[calc(100vw-54%)]">

    <div className="flex justify-center mb-2 select-none transition ease-in">
      <ul className="flex justify-center items-center paginate gap-1">
        <div
          className={`bg-[var(--color-secondary)] px-4 py-2 rounded-sm text-white cursor-pointer ${
            page === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={() => {
            page > 1 ? changePage(page - 1) : () => {};
          }}
        >
          Prev
        </div>
        {totalPage < 5
          ? Array.from({ length: totalPage }).map((_, p) => (
              <li key={p + 1}>
                <div
                  onClick={() => changePage(p + 1)}
                  className={`${
                    page === p + 1 ? "bg-[var(--color-secondary)]" : "bg-[#B9B4C7]"
                  } font-semibold px-4 py-2 rounded-sm text-white cursor-pointer`}
                >
                  {p + 1}
                </div>
              </li>
            ))
          : pages.map((p) => (
              <li key={p + 1}>
                <div
                  onClick={() => changePage(p + 1)}
                  className={`${
                    page === p + 1 ? "bg-[var(--color-secondary)]" : "bg-[#B9B4C7]"
                  } font-semibold px-4 py-2 rounded-sm text-white cursor-pointer`}
                >
                  {p + 1}
                </div>
              </li>
            ))}

        <div
          className={`bg-[var(--color-secondary)] px-4 py-2 rounded-sm text-white cursor-pointer ${
            page === totalPage ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={() => {
            page < totalPage
              ? changePage(page + 1)
              : totalPage > 5
                ? nextPage
                : () => {};
          }}
        >
          Next
        </div>
      </ul>
    </div>
  </div>
);
}



export const usePagination = ({ totalPage, setPage }) => {
  //const [page, setPage] = useState(1);
  const [pages, setPages] = useState([1, 2, 3, 4, 5]);

  const prevPage = () => {
    if (pages[0] > 1) {
      const newPages = pages.map((p) => p - 1);
      setPages(newPages);
    }
  };
  const nextPage = () => {
    if (pages[pages.length - 1] < totalPage) {
      const newPages = pages.map((p) => p + 1);
      setPages(newPages);
    }
  };

  const changePage = (pageIndex) => {
    setPage(pageIndex);
  };

  return { pages, prevPage, nextPage, changePage, setPage };
};


export default UserPagination;
