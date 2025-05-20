import React, { useState, useEffect } from "react";
import Pagination from "rc-pagination";
import { fetchItemList } from "../../components/Api/itemApiService"; // Import your API function
import "../Master/ownstyle.css"; // Import your custom styles

const ItemList = () => {
  // State variables
  const [data, setData] = useState([]); // Holds the paginated data
  const [loading, setLoading] = useState(false); // Loading state
  const [pageNumber, setPageNumber] = useState(1); // Current page number
  const [pageSize, setPageSize] = useState(10); // Number of items per page
  const [totalCount, setTotalCount] = useState(0); // Total number of items

  // Fetch data from the API
  const fetchAndSetItemList = async (page, size) => {
    setLoading(true);
    try {
      const response = await fetchItemList(page, size); // Fetch paginated data
      console.log("API Response:", response);

      if (Array.isArray(response)) {
        // If the API returns an array, process it accordingly
        const transformedData = response.map((item) => ({
          id: item.item_Id,
          code: item.item_Code,
          nameEn: item.itemN_NameEn,
          nameAr: item.itemN_NameAr,
          group: item.itemG_NameEn,
          manf: item.vendor_NameEn,
        }));
        setData(transformedData); // Set the paginated data
        setTotalCount(response.length); // Use the array length as the total count
      } else {
        console.error("Invalid data structure received from API");
      }
    } catch (error) {
      console.error("Error fetching item list:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle page change
  const handlePageChange = (page, size) => {
    setPageNumber(page); // Update the current page number
    setPageSize(size); // Update the page size
    fetchAndSetItemList(page, size); // Re-fetch the data for the new page
  };

  // Fetch data on component mount and when pageNumber or pageSize changes
  useEffect(() => {
    fetchAndSetItemList(pageNumber, pageSize);
  }, [pageNumber, pageSize]);

  return (
    <div className="container">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">Item List</h4>
      </div>

      {/* Table Section */}
      <div className="table-responsive">
        <table className="table table-bordered table-striped dt-responsive nowrap w-100">
          <thead>
            <tr>
              <th>#</th>
              <th>Item Code</th>
              <th>Name (En)</th>
              <th>Name (Ar)</th>
              <th>Manufacture</th>
              <th>Group</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center">
                  Loading...
                </td>
              </tr>
            ) : data.length > 0 ? (
              data.map((item, index) => (
                <tr key={item.id}>
                  <td>{(pageNumber - 1) * pageSize + index + 1}</td>
                  <td>{item.code}</td>
                  <td>{item.nameEn}</td>
                  <td>{item.nameAr}</td>
                  <td>{item.manf}</td>
                  <td>{item.group}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No items found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Section */}
      <div className="d-flex justify-content-between align-items-center mt-4">
        <div className="text-muted">
          Showing {(pageNumber - 1) * pageSize + 1} to{" "}
          {Math.min(pageNumber * pageSize, totalCount)} of {totalCount}
        </div>
        <Pagination
          className="pagination"
          current={pageNumber}
          totalPages={Math.ceil(data.length / pageSize)}
          pageSize={pageSize}
          showSizeChanger={true}
          onChange={handlePageChange}
          onShowSizeChange={(current, size) => handlePageChange(1, size)} // Reset to page 1 when page size changes
        />
      </div>
    </div>
  );
};

export default ItemList;
