import apiClient from "./ApiClient"

export const fetchCardCustomer = async (
  pageNumber = 1,
  pageSize = 10,
  filterField = "",
  filterCondition = "",
  filterValue = ""
) => {
  try {
    const response = await apiClient.get(`/api/GetCardCustomerPagination`, {
      params: {
        pageNumber: Number(pageNumber), // ✅ Ensure it's a number
        pageSize: Number(pageSize), // ✅ Ensure it's a number
        filterField: filterField || null, // ✅ Send `null` if empty
        filterCondition: filterCondition || null,
        filterValue: filterValue || null,
      },
    })

    return response.data
  } catch (error) {
    console.error(
      "Error fetching Card Customer:",
      error.response?.data || error.message
    )
    throw error
  }
}

export const fetchNextCardCode = async () => {
  try {
    const response = await apiClient.get(`/api/GetNxtCardCode`)
    return response.data // Assuming the response contains `nxtCarmakeCode`
  } catch (error) {
    console.error("Error fetching next Branch Type code:", error)
    throw error
  }
}

export const fetchJobOrderTypes = async () => {
  try {
    const response = await apiClient.get(`/api/JobOrdrTypes`)
    return response.data
  } catch (error) {
    console.error("Error fetching item names:", error)
    throw error
  }
}

export const fetchJobOrderStatus = async () => {
  try {
    const response = await apiClient.get(`/api/JobOrdrStatus`)
    return response.data
  } catch (error) {
    console.error("Error fetching item names:", error)
    throw error
  }
}

export const fetchLabourStatusHead = async () => {
  try {
    const response = await apiClient.get(`/api/GetLabourStatusHead`)
    return response.data
  } catch (error) {
    console.error("Error fetching item names:", error)
    throw error
  }
}

export const fetchLabourStatusDetails = async (criteria, lbStatDet_HeadId) => {
  try {
    const response = await apiClient.get(`/api/GetLabourStatusDetail`, {
      params: { Criteria: criteria, LbStatDet_HeadId: lbStatDet_HeadId },
    })
    return response.data
  } catch (error) {
    console.error(
      "Error fetching Labour Status Details:",
      error.response?.data || error.message
    )
    throw error
  }
}

export const fetchCardEmployee = async (
  pageNumber = 1,
  pageSize = 10,
  filterField = "",
  filterCondition = "",
  filterValue = ""
) => {
  try {
    const response = await apiClient.get(`/api/GetCardEmployeePagination`, {
      params: {
        pageNumber: Number(pageNumber), // ✅ Ensure it's a number
        pageSize: Number(pageSize), // ✅ Ensure it's a number
        filterField: filterField || null, // ✅ Send `null` if empty
        filterCondition: filterCondition || null,
        filterValue: filterValue || null,
      },
    })

    return response.data
  } catch (error) {
    console.error(
      "Error fetching Card Customer:",
      error.response?.data || error.message
    )
    throw error
  }
}

export const fetchCardDetails = async (
  cr,
  brId = null,
  jOrderStatus = null,
  jobOrderId = null,
  pageNumber = 1,
  pageSize = 10,
  filterField = "",
  filterCondition = "",
  filterValue = ""
) => {
  try {
    const response = await apiClient.get(`/api/GetCardDetailPagination`, {
      params: {
        cr, // ✅ Required parameter
        brId: brId !== null ? Number(brId) : null,
        jOrderStatus: jOrderStatus !== null ? Boolean(jOrderStatus) : null,
        jobOrderId: jobOrderId !== null ? Number(jobOrderId) : null,
        pageNumber: Number(pageNumber),
        pageSize: Number(pageSize),
        filterField: filterField || null,
        filterCondition: filterCondition || null,
        filterValue: filterValue || null,
      },
    })

    return response.data
  } catch (error) {
    console.error(
      "Error fetching Card Details:",
      error.response?.data || error.message
    )
    throw error
  }
}

export const fetchNextCGenCode = async (brId, cardStatusCode) => {
  try {
    const response = await apiClient.get(
      `/api/FetchNextCGenNumber?brId=${brId}&cardStatusCode=${cardStatusCode}`
    )
    return response.data // Assuming the response contains `nxtCarmakeCode`
  } catch (error) {
    console.error("Error fetching next CGen code:", error)
    throw error
  }
}

// prettier-ignore
export const fetchLabourDetails = async (criteria, lbDet_CardId = null, lbDet_IsCancelled = null, lbDet_Id = null, lbDet_MechId = null) => {
    try {
        const response = await apiClient.get(`/api/GetCardlabourDetails`, {
            params: { criteria, lbDet_CardId, lbDet_IsCancelled, lbDet_Id, lbDet_MechId }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching labour details:', error);
        throw error;
    }
};

// prettier-ignore
export const fetchLabourJobDetails = async (LGrp_ParentId, Criteria, filterField = null, filterCondition = null, filterValue = null) => {
    try {
        const response = await apiClient.get('/api/GetCardlabourGrpJobs', {
            params: { LGrp_ParentId, Criteria, filterField, filterCondition, filterValue }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching labour details:', error);
        throw error;
    }
};

export const fetchLabourOtherJobDetails = async (
  filterField = null,
  filterCondition = null,
  filterValue = null
) => {
  try {
    const response = await apiClient.get("/api/GetCardlabourGrpJobs2", {
      params: { filterField, filterCondition, filterValue },
    })
    return response.data
  } catch (error) {
    console.error("Error fetching labour details:", error)
    throw error
  }
}

export const SaveLabourdetails = async payload => {
  try {
    const response = await apiClient.post("/api/SaveLabourDetails", payload)
    return response.data // Return the data from API response
  } catch (error) {
    console.error(
      "Error saving Labour Details:",
      error?.response?.data || error.message
    )

    // Throw a new error with more details
    throw new Error(
      error?.response?.data?.StatusMessage || "Failed to save labour details"
    )
  }
}

export const fetchNextLabourDetCode = async () => {
  try {
    const response = await apiClient.get(`/api/FetchNextLabourCode`)
    return response.data // Assuming the response contains `nxtCarmakeCode`
  } catch (error) {
    console.error("Error fetching next Labour  code:", error)
    throw error
  }
}

export const fetchMechanicGroup = async (BrId, Criteria, MechGrpId = null) => {
  try {
    const response = await apiClient.get("/api/GetCardMechGroups", {
      params: { BrId, Criteria, MechGrpId }, // ✅ Correct parameter names
    })
    return response.data
  } catch (error) {
    console.error("Error fetching mechanic groups:", error)
    throw error
  }
}

export const SaveCardMain = async payload => {
  try {
    const response = await apiClient.post("/api/SaveCardMain", payload)
    return response.data // Return the data from API response
  } catch (error) {
    console.error(
      "Error saving Card Details:",
      error?.response?.data || error.message
    )

    // Throw a new error with more details
    throw new Error(
      error?.response?.data?.StatusMessage || "Failed to save labour details"
    )
  }
}

export const UpdateCardCgenStatus = async payload => {
  try {
    const response = await apiClient.post("/api/UpdateCardStatus", payload)
    return response.data // Return the data from API response
  } catch (error) {
    console.error(
      "Error Update CardChen Status:",
      error?.response?.data || error.message
    )

    // Throw a new error with more details
    throw new Error(
      error?.response?.data?.StatusMessage || " error in Update CardChen Status"
    )
  }
}

export const fetchJobOrderCode = async statusid => {
  try {
    const response = await apiClient.get(
      `/api/JobOrdrStatusById?statusid=${statusid}`
    )
    return response.data // Assuming the response contains `nxtCarmakeCode`
  } catch (error) {
    console.error("Error fetching next CGen code:", error)
    throw error
  }
}

export const fetchSavedCardId = async (CardCode, BranchId) => {
  try {
    const response = await apiClient.get(
      `/api/GetSavedCardId?CardCode=${CardCode}&BranchId=${BranchId}`
    )
    return response.data // Assuming the response contains `nxtCarmakeCode`
  } catch (error) {
    console.error("Error fetching Saved Card Id :", error)
    throw error
  }
}

export const UpdateLabourCommission = async payload => {
  try {
    const response = await apiClient.post("/api/SaveLabourCommission", payload)
    return response.data // Return the data from API response
  } catch (error) {
    console.error(
      "Error Update Labour Commission:",
      error?.response?.data || error.message
    )

    // Throw a new error with more details
    throw new Error(
      error?.response?.data?.StatusMessage || "Failed to save labour details"
    )
  }
}

export const SaveAllLabourCommission = async payload => {
  try {
    const response = await apiClient.post("/api/SaveLabourCommission", payload)
    return response.data // Return the data from API response
  } catch (error) {
    console.error(
      "Error Update Labour Commission:",
      error?.response?.data || error.message
    )

    // Throw a new error with more details
    throw new Error(
      error?.response?.data?.StatusMessage || "Failed to save labour details"
    )
  }
}

export const fetchOldParts = async (
  criteria,
  COld_CardId,
  COld_IsReturned = null,
  COld_Id = null
) => {
  try {
    alert(COld_CardId)
    const response = await apiClient.get("/api/GetOldParts", {
      params: {
        criteria,
        COld_CardId,
        COld_IsReturned,
        COld_Id,
      },
    })
    return response.data
  } catch (error) {
    console.error("Error fetching old parts:", error)
    throw error
  }
}

export const fetchStoreParts = async (SaJobcardid, SaBrId) => {
  try {
    const response = await apiClient.get("/api/GetStoreParts", {
      params: {
        SaJobcardid,
        SaBrId,
      },
    })
    return response.data
  } catch (error) {
    console.error("Error fetching Store parts  parts:", error)
    throw error
  }
}

export const fetchOutsideParts = async (Card_Id, Br_Id, IsReturned) => {
  try {
    const response = await apiClient.get("/api/GetOutsideParts", {
      params: {
        Card_Id,
        Br_Id,
        IsReturned,
      },
    })
    return response.data
  } catch (error) {
    console.error("Error fetching Store parts  parts:", error)
    throw error
  }
}

export const fetchJobNetAmts = async (Card_Id, Br_Id) => {
  try {
    const response = await apiClient.get("/api/GetJobOrdrNetAmt", {
      params: {
        Card_Id,
        Br_Id,
      },
    })
    return response.data
  } catch (error) {
    console.error("Error fetching Store parts  parts:", error)
    throw error
  }
}

export const fetchCustParts = async (
  CPart_CardId,
  CPart_IsReturned,
  criteria
) => {
  try {
    const response = await apiClient.get("/api/GetCustParts", {
      params: {
        CPart_CardId,
        CPart_IsReturned,
        criteria,
      },
    })
    return response.data
  } catch (error) {
    console.error("Error fetching Store parts  parts:", error)
    throw error
  }
}

export const fetchNextOldPartCode = async () => {
  try {
    const response = await apiClient.get(`/api/NextOldPartCode`)
    return response.data // Assuming the response contains `nxtCarmakeCode`
  } catch (error) {
    console.error("Error fetching next Branch Type code:", error)
    throw error
  }
}

export const SaveOldPart = async payload => {
  try {
    const response = await apiClient.post("/api/SaveOldParts", payload)
    return response.data // Return the data from API response
  } catch (error) {
    console.error(
      "Error Saving Old Part:",
      error?.response?.data || error.message
    )

    // Throw a new error with more details
    throw new Error(
      error?.response?.data?.StatusMessage || "Failed to save Old Part"
    )
  }
}

export const fetchNextCustPartCode = async () => {
  try {
    const response = await apiClient.get(`/api/NextCustCode`)
    return response.data // Assuming the response contains `nxtCarmakeCode`
  } catch (error) {
    console.error("Error fetching next Branch Type code:", error)
    throw error
  }
}

export const SaveCustPart = async payload => {
  try {
    const response = await apiClient.post("/api/SaveCustParts", payload)
    return response.data // Return the data from API response
  } catch (error) {
    console.error(
      "Error Saving Cust Part:",
      error?.response?.data || error.message
    )

    // Throw a new error with more details
    throw new Error(
      error?.response?.data?.StatusMessage || "Failed to save  Cust"
    )
  }
}
