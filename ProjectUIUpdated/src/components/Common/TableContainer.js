import React, { Fragment, useEffect, useState } from "react"
import { Row, Table, Button, Col } from "reactstrap"
import { Link } from "react-router-dom"
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table"
import { rankItem } from "@tanstack/match-sorter-utils"
import JobListGlobalFilter from "./GlobalSearchFilter"

// Column Filter
const Filter = ({ column }) => {
  const columnFilterValue = column.getFilterValue()

  return (
    <DebouncedInput
      type="text"
      value={columnFilterValue ?? ""}
      onChange={value => column.setFilterValue(value)}
      placeholder="Search..."
      className="w-36 border shadow rounded"
      list={column.id + "list"}
    />
  )
}

// Debounced Input for global and column search
const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}) => {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)
    return () => clearTimeout(timeout)
  }, [value, debounce, onChange])

  return (
    <Col sm={4}>
      <input
        {...props}
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </Col>
  )
}

const TableContainer = ({
  columns,
  data,
  tableClass,
  theadClass,
  divClassName,
  isBordered,
  isPagination,
  isGlobalFilter,
  paginationWrapper,
  SearchPlaceholder,
  pagination,
  buttonClass,
  buttonName,
  isAddButton,
  isCustomPageSize,
  handleUserClick,
  isJobListGlobalFilter,
  handleRowClick,
}) => {
  const [columnFilters, setColumnFilters] = useState([])
  const [globalFilter, setGlobalFilter] = useState("")
  const [selectedRow, setSelectedRow] = useState(null)

  const fuzzyFilter = (row, columnId, value, addMeta) => {
    const itemRank = rankItem(row.getValue(columnId), value)
    addMeta({ itemRank })
    return itemRank.passed
  }

  const table = useReactTable({
    columns,
    data,
    filterFns: { fuzzy: fuzzyFilter },
    state: { columnFilters, globalFilter },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  const {
    getHeaderGroups,
    getRowModel,
    getCanPreviousPage,
    getCanNextPage,
    getPageOptions,
    setPageIndex,
    nextPage,
    previousPage,
    getState,
  } = table

  // const handleRowClick = (row) => {
  //   const rowId = row.id;
  //   setSelectedRow(prevSelectedRow => (prevSelectedRow === rowId ? null : rowId));
  //   console.log('Row clicked:', row);

  // };

  return (
    <Fragment>
      {/* Filter and Page Size Control */}
      <Row className="mb-2">
        {isCustomPageSize && (
          <Col sm={2}>
            <select
              className="form-select pageSize mb-2"
              value={table.getState().pagination.pageSize}
              onChange={e => table.setPageSize(Number(e.target.value))}
            >
              {[10, 20, 30, 40, 50].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </Col>
        )}
        {isGlobalFilter && (
          <DebouncedInput
            value={globalFilter ?? ""}
            onChange={value => setGlobalFilter(String(value))}
            className="form-control search-box me-2 mb-2 d-inline-block"
            placeholder={SearchPlaceholder}
          />
        )}
        {isJobListGlobalFilter && (
          <JobListGlobalFilter setGlobalFilter={setGlobalFilter} />
        )}
        {isAddButton && (
          <Col sm={6}>
            <div className="text-sm-end">
              <Button
                type="button"
                className={buttonClass}
                onClick={handleUserClick}
              >
                <i className="mdi mdi-plus me-1"></i> {buttonName}
              </Button>
            </div>
          </Col>
        )}
      </Row>

      {/* Table Component */}
      <div className={divClassName ? divClassName : "table-responsive"}>
        <Table hover className={tableClass} bordered={isBordered}>
          <thead className={theadClass}>
            {getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div
                        className={
                          header.column.getCanSort()
                            ? "cursor-pointer select-none"
                            : ""
                        }
                        {...{
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {header.column.getIsSorted() && (
                          <span>
                            {header.column.getIsSorted() === "desc"
                              ? " 🔽"
                              : " 🔼"}
                          </span>
                        )}
                      </div>
                    )}
                    {header.column.getCanFilter() && (
                      <Filter column={header.column} />
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {getRowModel().rows.map(row => (
              <tr
                key={row.id}
                onClick={() => handleRowClick(row.original)}
                className={selectedRow === row.id ? "selected" : ""}
              >
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Pagination */}
      {isPagination && (
        <Row>
          <Col sm={12} md={5}>
            <div className="dataTables_info">
              Showing {getState().pagination.pageSize} of {data.length} Results
            </div>
          </Col>
          <Col sm={12} md={7}>
            <div className={paginationWrapper}>
              <ul className={pagination}>
                {/* Previous Button */}
                <li
                  className={`paginate_button page-item previous ${
                    !getCanPreviousPage() ? "disabled" : ""
                  }`}
                >
                  <p to="#" className="page-link" onClick={previousPage}>
                    <i className="mdi mdi-chevron-left"></i>
                  </p>
                </li>

                {/* Page Numbers */}
                {getPageOptions().map((item, key) => {
                  const totalPageCount = getPageOptions().length
                  const currentPage = getState().pagination.pageIndex
                  const displayPages = 1 // Number of pages to show around the current page

                  // Show first page, last page, and nearby pages
                  if (
                    item === 0 || // First page
                    item === totalPageCount - 1 || // Last page
                    (item >= currentPage - displayPages &&
                      item <= currentPage + displayPages) // Pages around the current page
                  ) {
                    return (
                      <li
                        key={key}
                        className={`paginate_button page-item ${
                          getState().pagination.pageIndex === item
                            ? "active"
                            : ""
                        }`}
                      >
                        <p
                          to="#"
                          className="page-link"
                          onClick={() => setPageIndex(item)}
                        >
                          {item + 1}
                        </p>
                      </li>
                    )
                  }

                  // Show ellipsis for skipped pages
                  if (
                    item === currentPage - displayPages - 1 ||
                    item === currentPage + displayPages + 1
                  ) {
                    return (
                      <li
                        key={key}
                        className="paginate_button page-item disabled"
                      >
                        <span className="page-link">...</span>
                      </li>
                    )
                  }

                  return null // Skip other pages
                })}

                {/* Next Button */}
                <li
                  className={`paginate_button page-item next ${
                    !getCanNextPage() ? "disabled" : ""
                  }`}
                >
                  <p to="#" className="page-link" onClick={nextPage}>
                    <i className="mdi mdi-chevron-right"></i>
                  </p>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      )}
    </Fragment>
  )
}

export default TableContainer
