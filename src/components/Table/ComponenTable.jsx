import { useState, useEffect } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  sortingFns,
  getSortedRowModel,
  FilterFn,
  SortingFn,
  flexRender,
} from '@tanstack/react-table';
import Select, { components } from 'react-select';

const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}) => {
  const [value, setValue] = useState(initialValue);
  // console.log('props', props);
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <input
      {...props}
      value={value}
      // placeholder={ttitlee}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

const Table = ({ columns, data, placeholder }) => {
  const [globalFilter, setGlobalFilter] = useState('');

  const rows_per_page = [
    { label: 2, value: 2 },
    { label: 5, value: 5 },
    { label: 10, value: 10 },
    { label: 25, value: 25 },
    { label: 50, value: 50 },
    { label: 100, value: 100 },
  ];

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div>
      <div className="flex justify-between px-2 py-2 gap-x-10">
        {data?.length > 0 ? (
          <div className="relative flex w-96 transition-all rounded-full ease-soft">
            <span className="text-sm ease-soft leading-5.6 absolute z-10 -ml-px flex h-full items-center whitespace-nowrap rounded-lg rounded-tr-none rounded-br-none border border-r-0 border-transparent bg-transparent py-1 px-1.5 text-center font-normal text-slate-500 transition-all">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                  stroke="#9CA3AF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20.9999 20.9999L16.6499 16.6499"
                  stroke="#9CA3AF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>

            <DebouncedInput
              value={globalFilter ?? ''}
              onChange={(value) => setGlobalFilter(String(value))}
              type="text"
              className="block pl-9 text-sm dark:bg-gray-950 dark:placeholder:text-white/80 dark:text-white/80 ease-soft  leading-5.6 relative -ml-px  rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-1 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:shadow-md outline-none focus:outline-none w-32"
              placeholder={placeholder}
            />
          </div>
        ) : null}
      </div>
      <div className="w-full overflow-auto mb-4">
        <table className="pb-4 items-center w-full mb-0 align-top border-solid border-black ">
          <thead className="px-6 py-2 font-bold uppercase align-middle bg-transparent border border-black border-solid shadow-none text-xs tracking-none whitespace-nowrap text-teal-400 opacity-70 dark:border-white/40 dark:text-white dark:opacity-80">
            {table?.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="py-4 px-1 text-black align-middle bg-transparent border-y whitespace-nowrap dark:border-white/40"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="text-sm border-t-2 border-current border-solid dark:border-black">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="py-2 px-1 align-middle bg-transparent border-b whitespace-nowrap dark:border-white/40"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="w-full">
        {data.length > 0 && (
          <div className="flex justify-between items-center gap-4 px-4">
            <div className="flex items-center gap-1 text-sm">
              {/* <div>Page</div>
                        <strong>
                            {table.getState().pagination.pageIndex + 1} of{" "}
                            {table.getPageCount()}
                        </strong> */}
              <span className="opacity-50">
                {parseInt(table.getPaginationRowModel().rows[0]?.id) + 1} -{' '}
                {parseInt(
                  table.getPaginationRowModel().rows[
                    table.getPaginationRowModel().rows.length - 1
                  ]?.id
                ) + 1}{' '}
                of {parseInt(table.getCoreRowModel().rows.length)}
              </span>
            </div>

            <div className="flex gap-x-4">
              {/* <div className="flex text-sm gap-x-2 items-center">
                <span>Rows per page:</span>
                <Select
                  name="rows"
                  options={rows_per_page}
                  value={rows_per_page.find(
                    (x) => x.value === table.getState().pagination.pageSize
                  )}
                  onChange={(option) => table.setPageSize(Number(option.value))}
                  isSearchable={false}
                  styles={{
                    menu: (base) => ({ ...base, zIndex: 9999 }),
                    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                  }}
                  menuPortalTarget={document?.body}
                  menuPosition={'fixed'}
                />
              </div> */}

              <div className="flex gap-x-2 items-center">
                <button
                  className="py-1 px-1.5 border rounded-lg disabled:opacity-50"
                  onClick={() => table.setPageIndex(0)}
                  disabled={!table.getCanPreviousPage()}
                >
                  <svg
                    className="h-6 w-6 text-gray-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {' '}
                    <polyline points="11 17 6 12 11 7" />{' '}
                    <polyline points="18 17 13 12 18 7" />
                  </svg>
                </button>

                <button
                  className="py-1 px-1.5 border rounded-lg disabled:opacity-50"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  <svg
                    className="h-6 w-6 text-gray-500"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {' '}
                    <path stroke="none" d="M0 0h24v24H0z" />{' '}
                    <polyline points="15 6 9 12 15 18" />
                  </svg>
                </button>

                <button
                  className="py-1 px-1.5 border rounded-lg disabled:opacity-50"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  <svg
                    className="h-6 w-6 text-gray-500"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {' '}
                    <path stroke="none" d="M0 0h24v24H0z" />{' '}
                    <polyline points="9 6 15 12 9 18" />
                  </svg>
                </button>

                <button
                  className="py-1 px-1.5 border rounded-lg disabled:opacity-50"
                  onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                  disabled={!table.getCanNextPage()}
                >
                  <svg
                    className="h-6 w-6 text-gray-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {' '}
                    <polyline points="13 17 18 12 13 7" />{' '}
                    <polyline points="6 17 11 12 6 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Table;
