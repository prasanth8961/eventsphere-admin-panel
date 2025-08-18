const UserTable = ({ children }) => {
  const tableHeaders = [
    "USER ID",
    "PROFILE",
    "FULL NAME",
    "EMAIL",
    "MOBILE",
    "CITY",
    "ROLE",
    "VERIFIED STATUS",
    "Edit"
  ];

  return (
       <div className="relative ml-[4rem] mr-2 mx-auto mt-5 overflow-hidden">
     <div
        className="sticky top-0 z-10 grid bg-[var(--color-secondary)] text-white font-semibold text-sm uppercase tracking-wide p-2 rounded-tr-md rounded-tl-md"
        style={{
          gridTemplateColumns: "0.5fr 0.5fr 1fr 2fr 1fr 1fr 1fr 1fr 0.5fr",
        }}
      >
        {tableHeaders.map((key, index) => (
          <div key={index} className="py-1 text-left">
            {key}
          </div>
        ))}
      </div>
      <div>{children}</div>
   </div>
  );
}

export default UserTable;
