using Dapper;
using G.ENTITY;
using G.REPOSITORY;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace G.SERVICE
{


    public interface IItemService
    {


        IEnumerable<Item_Main> GetAllItem();


        object GetAllItemList(int pageNumber, int pageSize = 0);

        string GetNextItemCode();

        string GetNextItemPrfxCode();

        IEnumerable<ItemPrefix> GetItemPrefix();


        IEnumerable<ItemOEM> GetItemOEM();

        IEnumerable<ItemTax> GetItemTax();

        IEnumerable<ItemGroup> GetItemGroup();

        List<ItemName> GetItemName(string filterField = null, string filterCondition = null, string filterValue = null);

        IEnumerable<PartCodes> GetItemPartCode();

        DB_STATUS Save(ItemDto item);

        DB_STATUS SaveTax(ItemTaxinsert tax);
        string GetNextItemOemCode();

        DB_STATUS SaveOem(ItemOEMIns oem);
        string GetNextItemNameCode();

        DB_STATUS SaveItemName(ItemNameIns part);
        DB_STATUS SaveGroup(ItemGroupIns grp);

        DB_STATUS SaveUnit(ItemUnit_ins unit);

        DB_STATUS SavePrefix(ItemPrefixInsert prfx);

        DB_STATUS SavePrtOrigin(PartOrigin_ins origin);

        string GetNextItemOrgnCode();

        string GetNextItemUnitRowNo();

        string GetNextItemVendorRowNo();


        string GetNextItemCarDetRowNo();

        string GetNextItemLocationDetRowNo();





        DB_STATUS SavePartCode(PartCodeins prtcode);



        ItemGroupfetch Get(string FilterField,string FilterCondition, string FilterValue);


        List<ItemUnitFil> GetItemUnit(string filterField = null, string filterCondition = null, string filterValue = null);

        List<ItemPrefix_fil> GetItemPrefix(string filterField = null, string filterCondition = null, string filterValue = null);

        List<ItemLocation> GetItemLocation(string filterField = null, string filterCondition = null, string filterValue = null);



        string GetNextGroupCode();
        string GetNextItemUnitCode();
        List<PartOrigin> GetItemPartOrgn(string filterField = null, string filterCondition = null, string filterValue = null);


        PartOrigin Get(long PartOrg_Id);
        DB_STATUS SaveItemLocation(ItemLocationInsert loc);

        ItemUnitFil GetUnit_Byid(long Unit_Id);


        ItemName GetItemName_id(long ItemN_Id);


        ItemGroup GetItemGroup_id(long ItemG_Id);


        DB_STATUS DeleteItemName(ItemName_Dlt loc);

        string GetNextPartCode();

        ItemOEM GetItemOem_id(long ItemOEM);



        DB_STATUS SaveMainItem(int itemId, ItemModel item, List<ItemUnitDetModel> unitList, List<ItemVendorsModel> vendorList, List<ItemCarDetModel> carDetList, List<ItemLocDetModel> locList, List<ItemVatDetailsDto> vat);


        string GetNextItemPrfxCodeByid(int id);



        IEnumerable<CarDetail> GetItemCarDetails();


        List<ItemDetailsDto> GetItemDtls_Id(long Item_Id);





        public class ItemService : IItemService

        {
            private readonly IDapperRepository _dapperRepository;

            public ItemService(IDapperRepository dapperRepository)
            {
                _dapperRepository = dapperRepository;
            }

            public IEnumerable<Item_Main> GetAllItem()
            {
                var parameters = new DynamicParameters();
                return _dapperRepository.GetAll<Item_Main>("[G_Get_Item_Dlts_Api]", parameters, CommandType.StoredProcedure);
            }

            public object GetAllItemList(int pageNumber, int pageSize)
            {
                var parameters = new DynamicParameters();
                parameters.Add("@PageNumber", pageNumber, DbType.Int32);
                parameters.Add("@PageSize", pageSize, DbType.Int32);
                parameters.Add("@TotalCount", dbType: DbType.Int32, direction: ParameterDirection.Output);

                // Execute the stored procedure and get the list of items
                var items = _dapperRepository.GetAll<Item_Main>(
                    "[G_Get_Item_List_Api]",
                    parameters,
                    CommandType.StoredProcedure
                );

                // Retrieve the total count after execution
                int totalCount = parameters.Get<int>("@TotalCount");

                // Return both items and total count
                return new
                {
                    Items = items ?? new List<Item_Main>(),  // Ensure items is never null
                    TotalCount = totalCount
                };
            }



            public string GetNextItemCode()
            {
                var parameters = new DynamicParameters();
                var result = _dapperRepository.Execute("dbo.[G_Get_Item_NextCode_Api]", parameters, CommandType.StoredProcedure);
                return result?.ToString() ?? string.Empty;
            }

            public string GetNextItemPrfxCode()
            {
                var parameters = new DynamicParameters();
                var result = _dapperRepository.Execute("dbo.[G_Get_Item_Next_PrefixCode]", parameters, CommandType.StoredProcedure);
                return result?.ToString() ?? string.Empty;
            }


            public IEnumerable<ItemPrefix> GetItemPrefix()
            {
                var parameters = new DynamicParameters();
                return _dapperRepository.GetAll<ItemPrefix>("[G_Get_ItemPrefix_Api]", parameters, CommandType.StoredProcedure);
            }


            public IEnumerable<ItemOEM> GetItemOEM()
            {
                var parameters = new DynamicParameters();
                return _dapperRepository.GetAll<ItemOEM>("[G_Get_ItemOEM_Api]", parameters, CommandType.StoredProcedure);
            }

            public IEnumerable<ItemTax> GetItemTax()
            {
                var parameters = new DynamicParameters();
                return _dapperRepository.GetAll<ItemTax>("[G_Get_ItemTax_Api]", parameters, CommandType.StoredProcedure);
            }


            public IEnumerable<ItemGroup> GetItemGroup()
            {
                var parameters = new DynamicParameters();
                return _dapperRepository.GetAll<ItemGroup>("[G_Get_Item_Group]", parameters, CommandType.StoredProcedure);
            }


         



            public List<ItemName> GetItemName(string FilterField = null, string FilterCondition = null, string FilterValue = null)
            {
                List<ItemName> result = null;
                try
                {
                    var dbparams = new DynamicParameters();
                    dbparams.Add("@FilterField", FilterField ?? (object)DBNull.Value, DbType.String);
                    dbparams.Add("@FilterCondition", FilterCondition ?? (object)DBNull.Value, DbType.String);
                    dbparams.Add("@FilterValue", FilterValue ?? (object)DBNull.Value, DbType.String);

                    result = _dapperRepository.GetAll<ItemName>("[dbo].[G_Get_ItemName_Api]",
                        dbparams,
                        commandType: CommandType.StoredProcedure);
                }
                catch
                {
                    throw;
                }
                finally
                {
                    // Optional: Clean-up code if needed
                }
                return result;
            }


            public IEnumerable<PartCodes> GetItemPartCode()
            {
                var parameters = new DynamicParameters();
                return _dapperRepository.GetAll<PartCodes>("[G_Get_ItemPartCode_Api]", parameters, CommandType.StoredProcedure);
            }



            public DB_STATUS Save(ItemDto model)
            {
                try
                {
                    var parameters = new DynamicParameters();

                    // Add parameters to DynamicParameters
                    parameters.Add("@Item_Id", model.Item_Id);
                    parameters.Add("@Item_Code", model.Item_Code);
                    parameters.Add("@Item_OemId1", model.Item_OemId1);
                    parameters.Add("@Item_OemId2", model.Item_OemId2);
                    parameters.Add("@Item_OemId3", model.Item_OemId3);
                    parameters.Add("@Item_OemId4", model.Item_OemId4);
                    parameters.Add("@Item_OemId5", model.Item_OemId5);
                    parameters.Add("@Item_OemId6", model.Item_OemId6);
                    parameters.Add("@Item_PrefixId", model.Item_PrefixId);
                    parameters.Add("@Item_PrefixCode", model.Item_PrefixCode);
                    parameters.Add("@Item_NameId", model.Item_NameId);
                    parameters.Add("@Item_DescEn", model.Item_DescEn);
                    parameters.Add("@Item_DescAr", model.Item_DescAr);
                    parameters.Add("@Item_AgentPrice", model.Item_AgentPrice);
                    parameters.Add("@Item_EcoOrderQty", model.Item_EcoOrderQty);
                    parameters.Add("@Item_MfrId", model.Item_MfrId);
                    parameters.Add("@Item_GroupId", model.Item_GroupId);
                    parameters.Add("@Item_CountryId", model.Item_CountryId);
                    parameters.Add("@Item_MfrPartNo", model.Item_MfrPartNo);
                    parameters.Add("@Item_PartCodeId", model.Item_PartCodeId);
                    parameters.Add("@Item_IsActive", model.Item_IsActive);
                    parameters.Add("@Item_NeedExpDate", model.Item_NeedExpDate);
                    parameters.Add("@Item_PhotoPath", model.Item_PhotoPath);
                    parameters.Add("@Item_MinPackingQty", model.Item_MinPackingQty);
                    parameters.Add("@Item_MaxPackingQty", model.Item_MaxPackingQty);
                    parameters.Add("@Item_Barcode1", model.Item_Barcode1);
                    parameters.Add("@Item_Barcode2", model.Item_Barcode2);
                    parameters.Add("@Item_Notes", model.Item_Notes);
                    parameters.Add("@Item_CreatedBy", model.Item_CreatedBy);
                    parameters.Add("@Item_UpdatedBy", model.Item_UpdatedBy);
                    parameters.Add("@Item_Quality", model.Item_Quality);
                    parameters.Add("@Item_TimeFix", model.Item_TimeFix);
                    parameters.Add("@Item_isOriginal", model.Item_isOriginal);
                    parameters.Add("@Result", dbType: DbType.Int32, direction: ParameterDirection.Output);


                    var result = _dapperRepository.InsertUpdate<DB_STATUS>("[dbo].[G_Item_Insert_Api]", parameters, CommandType.StoredProcedure);

                    var resultCode = parameters.Get<int>("@Result");

                    if (resultCode > 0)
                    {
                        return new DB_STATUS
                        {
                            Status = "Success",
                            Success = true,
                            StatusMessage = "Item saved successfully.",
                            Id = resultCode
                        };
                    }
                    else
                    {
                        return new DB_STATUS
                        {
                            Status = "Failure",
                            Success = false,
                            StatusMessage = "Branch record was not saved successfully."
                        };
                    }
                }
                catch (Exception ex)
                {
                    // Log the exception details
                    return new DB_STATUS
                    {
                        Status = "Failure",
                        Success = false,
                        StatusMessage = "An unexpected error occurred while saving the branch record."
                    };
                }
            }

            public DB_STATUS SaveTax(ItemTaxinsert model)
            {
                try
                {
                    var parameters = new DynamicParameters();

                    // Add parameters to DynamicParameters
                    // Add parameters to DynamicParameters
                    parameters.Add("@Code", model.Code);
                    parameters.Add("@ItemCode", model.ItemCode);
                    parameters.Add("@TaxMastCode", model.TaxMastCode);
                    parameters.Add("@TaxPerc", model.TaxPerc);
                    parameters.Add("@IsActive", model.IsActive);
                    parameters.Add("@CreatedBy", model.CreatedBy);
                    parameters.Add("@UpdatedBy", model.UpdatedBy);
                    parameters.Add("@Result", dbType: DbType.Int32, direction: ParameterDirection.Output);
                    


                    var result = _dapperRepository.InsertUpdate<DB_STATUS>("[dbo].[G_ItemTax_Insert_Api]", parameters, CommandType.StoredProcedure);

                    var resultCode = parameters.Get<int>("@Result");

                    if (resultCode > 0)
                    {
                        return new DB_STATUS
                        {
                            Status = "Success",
                            Success = true,
                            StatusMessage = "Item saved successfully.",
                            Id = resultCode
                        };
                    }
                    else
                    {
                        return new DB_STATUS
                        {
                            Status = "Failure",
                            Success = false,
                            StatusMessage = "Branch record was not saved successfully."
                        };
                    }
                }
                catch (Exception ex)
                {
                    // Log the exception details
                    return new DB_STATUS
                    {
                        Status = "Failure",
                        Success = false,
                        StatusMessage = "An unexpected error occurred while saving the branch record."
                    };
                }
            }




            public DB_STATUS SavePartCode(PartCodeins model)
            {
                try
                {
                    var parameters = new DynamicParameters();

                    // Add parameters to DynamicParameters
                    parameters.Add("@PartC_Code", model.PartC_Code);
                    parameters.Add("@PartC_Partcode", model.PartC_Partcode);
                    parameters.Add("@PartC_Type", model.PartC_Type);
                    parameters.Add("@Result", dbType: DbType.Int32, direction: ParameterDirection.Output);

                    // Execute the stored procedure
                    _dapperRepository.Execute("[dbo].[G_Insert_ItemPartCode_Api]", parameters, CommandType.StoredProcedure);

                    // Get the result code from the output parameter
                    var resultCode = parameters.Get<int>("@Result");

                    // Return appropriate status based on resultCode
                    if (resultCode > 0)
                    {
                        return new DB_STATUS
                        {
                            Status = "Success",
                            Success = true,
                            StatusMessage = "Part code saved successfully.",
                            Id = resultCode
                        };
                    }
                    else if (resultCode == -1)
                    {
                        return new DB_STATUS
                        {
                            Status = "Failure",
                            Success = false,
                            StatusMessage = "Duplicate part code. Please use a unique part code."
                        };
                    }
                    else if (resultCode == -2)
                    {
                        return new DB_STATUS
                        {
                            Status = "Failure",
                            Success = false,
                            StatusMessage = "Invalid input data."
                        };
                    }
                    else
                    {
                        return new DB_STATUS
                        {
                            Status = "Failure",
                            Success = false,
                            StatusMessage = "An unknown error occurred while saving the part code."
                        };
                    }
                }
                catch (Exception ex)
                {
                    // Log the exception details
                    return new DB_STATUS
                    {
                        Status = "Failure",
                        Success = false,
                        StatusMessage = $"An unexpected error occurred: {ex.Message}"
                    };
                }
            }



            public string GetNextItemOemCode()
            {
                var parameters = new DynamicParameters();
                var result = _dapperRepository.Execute("[dbo].[G_Get_NextOemCode]", parameters, CommandType.StoredProcedure);
                return result?.ToString() ?? string.Empty;
            }

            public string GetNextPartCode()
            {
                var parameters = new DynamicParameters();
                var result = _dapperRepository.Execute("[dbo].[G_Get_NextPartCode_Api]", parameters, CommandType.StoredProcedure);
                return result?.ToString() ?? string.Empty;
            }


            public DB_STATUS SaveOem(ItemOEMIns model)
            {
                try
                {
                    var parameters = new DynamicParameters();

                    // Add parameters to DynamicParameters

                    parameters.Add("@OEM_Id", model.OEM_Id);
                    parameters.Add("@OEM_Code", model.OEM_Code); // Assuming Code corresponds to OEM_Code
                    parameters.Add("@OEM_Number", model.OEM_Number); // Assuming ItemCode corresponds to OEM_Number
                    parameters.Add("@OEM_CreatedBy", model.OEM_CreatedBy); // Assuming CreatedBy is the ID of the user creating the item

                    // Output parameter for result status
                    parameters.Add("@Result", dbType: DbType.Int32, direction: ParameterDirection.Output);

                    // Execute the stored procedure

                    var result = _dapperRepository.InsertUpdate<DB_STATUS>("[dbo].[G_Insert_ItemOem]", parameters, CommandType.StoredProcedure);

                    // Retrieve the output parameter value
                    var resultCode = parameters.Get<int>("@Result");

                    // Determine status based on the result code
                    switch (resultCode)
                    {
                        case 1:
                            return new DB_STATUS
                            {
                                Status = "Success",
                                Success = true,
                                StatusMessage = "Item saved successfully."
                            };
                        case 2:
                            return new DB_STATUS
                            {
                                Status = "Failure",
                                Success = false,
                                StatusMessage = "OEM Number already exists."
                            };
                        case 3:
                            return new DB_STATUS
                            {
                                Status = "Failure",
                                Success = false,
                                StatusMessage = "An error occurred while saving the item."
                            };
                        default:
                            return new DB_STATUS
                            {
                                Status = "Failure",
                                Success = false,
                                StatusMessage = "Unknown error occurred."
                            };
                    }
                }
                catch (Exception ex)
                {
                    // Log the exception details
                    // _logger.LogError(ex, "An unexpected error occurred while saving the item."); // Uncomment and configure logging as needed

                    return new DB_STATUS
                    {
                        Status = "Failure",
                        Success = false,
                        StatusMessage = "An unexpected error occurred while saving the item."
                    };
                }
            }

            public string GetNextItemNameCode()
            {
                var parameters = new DynamicParameters();
                var result = _dapperRepository.Execute("[dbo].[G_Get_Next_ItemName_Code]", parameters, CommandType.StoredProcedure);
                return result?.ToString() ?? string.Empty;
            }


            public DB_STATUS SaveItemName(ItemNameIns model)
            {
                try
                {
                    var parameters = new DynamicParameters();

                    // Add parameters to DynamicParameters
                    parameters.Add("@ItemN_Id", model.ItemN_Id);
                    parameters.Add("@ItemN_Code", model.ItemN_Code);           // Assuming model.ItemN_Code corresponds to ItemN_Code
                    parameters.Add("@ItemN_NameEn", model.ItemN_NameEn);       // Assuming model.ItemN_NameEn corresponds to ItemN_NameEn
                    parameters.Add("@ItemN_NameAr", model.ItemN_NameAr);       // Assuming model.ItemN_NameAr corresponds to ItemN_NameAr
                    parameters.Add("@ItemN_CreatedBy", model.ItemN_CreatedBy); // Assuming model.ItemN_CreatedBy corresponds to the user ID

                    // Output parameter for result status
                    parameters.Add("@Result", dbType: DbType.Int32, direction: ParameterDirection.Output);

                    // Execute the stored procedure
                    var result = _dapperRepository.InsertUpdate<DB_STATUS>("[dbo].[G_Insert_ItemName]", parameters, CommandType.StoredProcedure);

                    // Retrieve the output parameter value
                    var resultCode = parameters.Get<int>("@Result");

                    // Determine status based on the result code
                    switch (resultCode)
                    {
                        case 1:
                            return new DB_STATUS
                            {
                                Status = "Success",
                                Success = true,
                                StatusMessage = "Item name saved successfully."
                            };
                        case 2:
                            return new DB_STATUS
                            {
                                Status = "Failure",
                                Success = false,
                                StatusMessage = "Item Name (En) already exists."
                            };
                        case 3:
                            return new DB_STATUS
                            {
                                Status = "Failure",
                                Success = false,
                                StatusMessage = "An error occurred while saving the item name."
                            };
                        default:
                            return new DB_STATUS
                            {
                                Status = "Failure",
                                Success = false,
                                StatusMessage = "Unknown error occurred."
                            };
                    }
                }
                catch (Exception ex)
                {
                    // Log the exception details
                    // _logger.LogError(ex, "An unexpected error occurred while saving the item name."); // Uncomment and configure logging as needed

                    return new DB_STATUS
                    {
                        Status = "Failure",
                        Success = false,
                        StatusMessage = "An unexpected error occurred while saving the item name."
                    };
                }
            }


            public ItemGroupfetch Get(string FilterField, string FilterCondition, string FilterValue)
            {
                ItemGroupfetch? result = null;
                try
                {
                    var dbparams = new DynamicParameters();
                    dbparams.Add("@FilterField", FilterField, DbType.String);
                    dbparams.Add("@FilterCondition", FilterCondition, DbType.String);
                    dbparams.Add("@FilterValue", FilterValue, DbType.String);

                    result = _dapperRepository.Get<ItemGroupfetch>("[dbo].[G_Get_Item_Groups_Api]",
                        dbparams,
                        commandType: CommandType.StoredProcedure);
                }
                catch
                {
                    throw;
                }
                finally
                {
                    // Optional: Clean-up code if needed
                }
                return result;
            }


            public string GetNextGroupCode()
            {
                var parameters = new DynamicParameters();
                var result = _dapperRepository.Execute("[dbo].[G_Get_Next_ItemGrpCode]", parameters, CommandType.StoredProcedure);
                return result?.ToString() ?? string.Empty;
            }
           


            public DB_STATUS SaveGroup(ItemGroupIns model)
            {
                try
                {
                    var parameters = new DynamicParameters();

                    // Add parameters to DynamicParameters
                    parameters.Add("@ItemG_Id", model.ItemG_Id);
                    parameters.Add("@ItemG_Code", model.ItemG_Code);          // Code for the ItemGroup
                    parameters.Add("@ItemG_NameEn", model.ItemG_NameEn);      // Name in English
                    parameters.Add("@ItemG_NameAr", model.ItemG_NameAr);      // Name in Arabic
                    parameters.Add("@ItemG_CreatedBy", model.ItemG_CreatedBy); // ID of the user creating the item

                    parameters.Add("@Result", dbType: DbType.Int32, direction: ParameterDirection.Output);


                    var result = _dapperRepository.InsertUpdate<DB_STATUS>("[dbo].[G_Insert_ItemGroup]", parameters, CommandType.StoredProcedure);

                    var resultCode = parameters.Get<int>("@Result");

                    if (resultCode > 0)
                    {
                        return new DB_STATUS
                        {
                            Status = "Success",
                            Success = true,
                            StatusMessage = "Group saved successfully.",
                            Id = resultCode
                        };
                    }
                    else
                    {
                        return new DB_STATUS
                        {
                            Status = "Failure",
                            Success = false,
                            StatusMessage = "Group  record was not saved successfully."
                        };
                    }
                }
                catch (Exception ex)
                {
                    // Log the exception details
                    return new DB_STATUS
                    {
                        Status = "Failure",
                        Success = false,
                        StatusMessage = "An unexpected error occurred while saving the branch record."
                    };
                }
            }




            public List<ItemUnitFil> GetItemUnit(string FilterField = null, string FilterCondition = null, string FilterValue = null)
            {
                List<ItemUnitFil> result = null;
                try
                {
                    var dbparams = new DynamicParameters();
                    dbparams.Add("@FilterField", FilterField ?? (object)DBNull.Value, DbType.String);
                    dbparams.Add("@FilterCondition", FilterCondition ?? (object)DBNull.Value, DbType.String);
                    dbparams.Add("@FilterValue", FilterValue ?? (object)DBNull.Value, DbType.String);

                    result = _dapperRepository.GetAll<ItemUnitFil>("[dbo].[G_Get_ItemUnits_Filter_Api]",
                        dbparams,
                        commandType: CommandType.StoredProcedure);
                }
                catch
                {
                    throw;
                }
                finally
                {
                    // Optional: Clean-up code if needed
                }
                return result;
            }

            public string GetNextItemUnitCode()
            {
                var parameters = new DynamicParameters();
                var result = _dapperRepository.Execute("[dbo].[G_Get_Next_ItemUnitCode_Api]", parameters, CommandType.StoredProcedure);
                return result?.ToString() ?? string.Empty;
            }



            public DB_STATUS SaveUnit(ItemUnit_ins model)
            {
                try
                {
                    var parameters = new DynamicParameters();

                    parameters.Add("@Unit_Id", model.Unit_Id);
                    parameters.Add("@Unit_Code", model.Unit_Code);          // Code for the ItemGroup
                    parameters.Add("@Unit_NameEn", model.Unit_NameEn);      // Name in English
                    parameters.Add("@Unit_NameAr", model.Unit_NameAr);      // Name in Arabic
                  

                    // Output parameter for result status
                    parameters.Add("@Result", dbType: DbType.Int32, direction: ParameterDirection.Output);

                    // Call the stored procedure
                    _dapperRepository.InsertUpdate<DB_STATUS>("[dbo].[G_Insert_ItemUnit_Api]", parameters, CommandType.StoredProcedure);

                    // Retrieve the output parameter value
                    var resultCode = parameters.Get<int>("@Result");

                    // Determine status based on the result code
                    if (resultCode == 1)
                    {
                        return new DB_STATUS
                        {
                            Status = "Success",
                            Success = true,
                            StatusMessage = "Insert successful."
                        };
                    }
                    else
                    {
                        return new DB_STATUS
                        {
                            Status = "Failure",
                            Success = false,
                            StatusMessage = "Insert failed."
                        };
                    }
                }
                catch (Exception ex)
                {
                    // Log the exception details
                    // _logger.LogError(ex, "An unexpected error occurred while saving the item group."); // Uncomment and configure logging as needed

                    return new DB_STATUS
                    {
                        Status = "Failure",
                        Success = false,
                        StatusMessage = "An unexpected error occurred while saving the item group."
                    };
                }
            }


            public List<ItemPrefix_fil> GetItemPrefix(string FilterField = null, string FilterCondition = null, string FilterValue = null)
            {
               List<ItemPrefix_fil> result = null;
                try
                {
                    var dbparams = new DynamicParameters();
                    dbparams.Add("@FilterField", FilterField ?? (object)DBNull.Value, DbType.String);
                    dbparams.Add("@FilterCondition", FilterCondition ?? (object)DBNull.Value, DbType.String);
                    dbparams.Add("@FilterValue", FilterValue ?? (object)DBNull.Value, DbType.String);

                    result = _dapperRepository.GetAll<ItemPrefix_fil>("[dbo].[G_Get_ItemPrefixfil_Api]",
                        dbparams,
                        commandType: CommandType.StoredProcedure);
                }
                catch
                {
                    throw;
                }
                finally
                {
                    // Optional: Clean-up code if needed
                }
                return result;
            }

            public DB_STATUS SavePrefix(ItemPrefixInsert model)
            {
                try
                {
                    var parameters = new DynamicParameters();

                    // Add parameter for Prefix_Code
                    parameters.Add("@Prefix_Code", model.Prefix_Code, DbType.String, size: 3);

                    // Output parameter for result status
                    parameters.Add("@Result", dbType: DbType.Int32, direction: ParameterDirection.Output);

                    // Call the stored procedure
                    _dapperRepository.InsertUpdate<DB_STATUS>("[dbo].[G_Insert_ItemPrefix_Api]", parameters, CommandType.StoredProcedure);

                    // Retrieve the output parameter value
                    var resultCode = parameters.Get<int>("@Result");

                    // Determine status based on the result code
                    if (resultCode == 1)
                    {
                        return new DB_STATUS
                        {
                            Status = "Success",
                            Success = true,
                            StatusMessage = "Prefix_Code inserted successfully."
                        };
                    }
                    else
                    {
                        return new DB_STATUS
                        {
                            Status = "Failure",
                            Success = false,
                            StatusMessage = "Failed to insert Prefix_Code."
                        };
                    }
                }
                catch (Exception ex)
                {
                    // Log the exception details
                    // _logger.LogError(ex, "An unexpected error occurred while saving the Prefix_Code."); // Uncomment and configure logging as needed

                    return new DB_STATUS
                    {
                        Status = "Failure",
                        Success = false,
                        StatusMessage = "An unexpected error occurred while saving the Prefix_Code."
                    };
                }
            }



            public string GetNextItemOrgnCode()
            {
                var parameters = new DynamicParameters();
                var result = _dapperRepository.Execute("dbo.[G_Get_Next_PartOrg_Code_Api]", parameters, CommandType.StoredProcedure);
                return result?.ToString() ?? string.Empty;
            }

            public string GetNextItemPrfxCodeByid(int id )
            {
                var parameters = new DynamicParameters();
                parameters.Add("@prfx_id", id);

                var result = _dapperRepository.Execute("dbo.[G_Get_NextPrfxCode_ById_Api]", parameters, CommandType.StoredProcedure);
                return result?.ToString() ?? string.Empty;
            }



            public string GetNextItemUnitRowNo()
            {
                var parameters = new DynamicParameters();
                var result = _dapperRepository.Execute("dbo.[G_Get_NextItemUnitRowno]", parameters, CommandType.StoredProcedure);
                return result?.ToString() ?? string.Empty;
            }


            public string GetNextItemVendorRowNo()
            {
                var parameters = new DynamicParameters();
                var result = _dapperRepository.Execute("dbo.[G_Get_NextItemVendorRowno]", parameters, CommandType.StoredProcedure);
                return result?.ToString() ?? string.Empty;
            }
            
             public string GetNextItemCarDetRowNo()
            {
                var parameters = new DynamicParameters();
                var result = _dapperRepository.Execute("dbo.[G_Get_NextItemCarDetRowno]", parameters, CommandType.StoredProcedure);
                return result?.ToString() ?? string.Empty;
            }



            public string GetNextItemLocationDetRowNo()
            {
                var parameters = new DynamicParameters();
                var result = _dapperRepository.Execute("dbo.[G_Get_NextLocationDetRowNo_Api]", parameters, CommandType.StoredProcedure);
                return result?.ToString() ?? string.Empty;
            }






            public List<PartOrigin> GetItemPartOrgn(string FilterField = null, string FilterCondition = null, string FilterValue = null)
            {
                List<PartOrigin> result = null;
                try
                {
                    var dbparams = new DynamicParameters();
                    dbparams.Add("@FilterField", FilterField ?? (object)DBNull.Value, DbType.String);
                    dbparams.Add("@FilterCondition", FilterCondition ?? (object)DBNull.Value, DbType.String);
                    dbparams.Add("@FilterValue", FilterValue ?? (object)DBNull.Value, DbType.String);

                    result = _dapperRepository.GetAll<PartOrigin>("[dbo].[G_Get_ItemPartOrgin_fil_Api]",
                        dbparams,
                        commandType: CommandType.StoredProcedure);
                }
                catch
                {
                    throw;
                }
                finally
                {
                    // Optional: Clean-up code if needed
                }
                return result;
            }



            public DB_STATUS SavePrtOrigin(PartOrigin_ins model)
            {
                try
                {
                    var parameters = new DynamicParameters();

                    // Add parameters for PartOrigin properties
                    parameters.Add("@PartOrg_Id", model.PartOrg_Id, DbType.Int32);
                    parameters.Add("@PartOrg_Code", model.PartOrg_Code, DbType.String, size: 3);
                    parameters.Add("@PartOrg_NameEn", model.PartOrg_NameEn, DbType.String, size: 100);
                    parameters.Add("@PartOrg_NameAr", model.PartOrg_NameAr, DbType.String, size: 100);
                    parameters.Add("@PartOrg_Type", model.PartOrg_Type, DbType.Byte);
                    parameters.Add("@PartOrg_CreatedBy", model.PartOrg_CreatedBy, DbType.Int32);

                    // Output parameter for result status
                    parameters.Add("@Result", dbType: DbType.Int32, direction: ParameterDirection.Output);

                    // Call the stored procedure
                    _dapperRepository.InsertUpdate<DB_STATUS>("[dbo].[G_Insert_PartOrigin_Api]", parameters, CommandType.StoredProcedure);

                    // Retrieve the output parameter value
                    var resultCode = parameters.Get<int>("@Result");

                    // Determine status based on the result code
                    if (resultCode == 1)
                    {
                        return new DB_STATUS
                        {
                            Status = "Success",
                            Success = true,
                            StatusMessage = "PartOrigin data saved successfully."
                        };
                    }
                    else
                    {
                        return new DB_STATUS
                        {
                            Status = "Failure",
                            Success = false,
                            StatusMessage = "Failed to save PartOrigin data."
                        };
                    }
                }
                catch (Exception ex)
                {
                    // Log the exception details
                    // _logger.LogError(ex, "An unexpected error occurred while saving PartOrigin data."); // Uncomment and configure logging as needed

                    return new DB_STATUS
                    {
                        Status = "Failure",
                        Success = false,
                        StatusMessage = "An unexpected error occurred while saving PartOrigin data."
                    };
                }
            }



            public PartOrigin Get(long PartOrg_Id)
            {
                PartOrigin? result = null;
                try
                {

                    var dbparams = new DynamicParameters();
                    dbparams.Add("@PartOrg_Id", PartOrg_Id, DbType.Int32);

                    result = _dapperRepository.Get<PartOrigin>("[dbo].[G_Get_PartOrigin_ById_Api]"
                        , dbparams,
                        commandType: CommandType.StoredProcedure);

                }
                catch
                {
                    throw;
                }
                finally
                {

                }
                return result;
            }


            public List<ItemLocation> GetItemLocation(string FilterField = null, string FilterCondition = null, string FilterValue = null)
            {
                List<ItemLocation> result = null;
                try
                {
                    var dbparams = new DynamicParameters();
                    dbparams.Add("@FilterField", FilterField ?? (object)DBNull.Value, DbType.String);
                    dbparams.Add("@FilterCondition", FilterCondition ?? (object)DBNull.Value, DbType.String);
                    dbparams.Add("@FilterValue", FilterValue ?? (object)DBNull.Value, DbType.String);

                    result = _dapperRepository.GetAll<ItemLocation>("[dbo].[G_Get_ItemLocation_Fil_Api]",
                        dbparams,
                        commandType: CommandType.StoredProcedure);
                }
                catch
                {
                    throw;
                }
                finally
                {
                    // Optional: Clean-up code if needed
                }
                return result;
            }



            public DB_STATUS SaveItemLocation(ItemLocationInsert model)
            {
                try
                {
                    var parameters = new DynamicParameters();

                    // Add the parameter for ItemLoc_Code
                    parameters.Add("@ItemLoc_Code", model.ItemLoc_Code, DbType.String, size: 5);

                    // Output parameter for result status
                    parameters.Add("@Result", dbType: DbType.Int32, direction: ParameterDirection.Output);

                    // Call the stored procedure
                    _dapperRepository.InsertUpdate<DB_STATUS>("[dbo].[G_Insert_ItemLocation_Api]", parameters, CommandType.StoredProcedure);

                    // Retrieve the output parameter value
                    var resultCode = parameters.Get<int>("@Result");

                    // Determine status based on the result code
                    if (resultCode == 1)
                    {
                        return new DB_STATUS
                        {
                            Status = "Success",
                            Success = true,
                            StatusMessage = "ItemLocation data saved successfully."
                        };
                    }
                    else
                    {
                        return new DB_STATUS
                        {
                            Status = "Failure",
                            Success = false,
                            StatusMessage = "Failed to save ItemLocation data."
                        };
                    }
                }
                catch (Exception ex)
                {
                    // Log the exception details (uncomment and configure logging as needed)
                    // _logger.LogError(ex, "An unexpected error occurred while saving ItemLocation data.");

                    return new DB_STATUS
                    {
                        Status = "Failure",
                        Success = false,
                        StatusMessage = "An unexpected error occurred while saving ItemLocation data."
                    };
                }
            }



            public ItemUnitFil GetUnit_Byid(long Unit_Id)
            {
                ItemUnitFil? result = null;
                try
                {

                    var dbparams = new DynamicParameters();
                    dbparams.Add("@Unit_Id", Unit_Id, DbType.Int32);

                    result = _dapperRepository.Get<ItemUnitFil>("[dbo].[G_Get_ItemUnit_ById_Api]"
                        , dbparams,
                        commandType: CommandType.StoredProcedure);

                }
                catch
                {
                    throw;
                }
                finally
                {

                }
                return result;
            }


            public ItemGroup GetItemGroup_id(long ItemG_Id)
            {
                ItemGroup? result = null;
                try
                {

                    var dbparams = new DynamicParameters();
                    dbparams.Add("@ItemG_Id", ItemG_Id, DbType.Int32);

                    result = _dapperRepository.Get<ItemGroup>("[dbo].[G_Get_Item_Groups_ByIdApi]"
                        , dbparams,
                        commandType: CommandType.StoredProcedure);

                }
                catch
                {
                    throw;
                }
                finally
                {

                }
                return result;
            }




            public ItemName GetItemName_id(long ItemN_Id)
            {
                ItemName? result = null;
                try
                {

                    var dbparams = new DynamicParameters();
                    dbparams.Add("@ItemN_Id", ItemN_Id, DbType.Int32);

                    result = _dapperRepository.Get<ItemName>("[dbo].[G_Get_ItemNames_ById_Api]"
                        , dbparams,
                        commandType: CommandType.StoredProcedure);

                }
                catch
                {
                    throw;
                }
                finally
                {

                }
                return result;
            }




            public DB_STATUS DeleteItemName(ItemName_Dlt model)
            {
                try
                {
                    var parameters = new DynamicParameters();

                    parameters.Add("@ItemN_Id", model.ItemN_Id);               
                    parameters.Add("@Result", dbType: DbType.Int32, direction: ParameterDirection.Output); // Output parameter

                    // Call the stored procedure using the Dapper repository
                  

                    var result = _dapperRepository.InsertUpdate<DB_STATUS>("[dbo].[G_Delete_ItemNames_Api]", parameters, CommandType.StoredProcedure);

                    var resultCode = parameters.Get<int>("@Result");

                    if (resultCode > 0)
                    {
                        return new DB_STATUS
                        {
                            Status = "Success",
                            Success = true,
                            StatusMessage = "Item Name Deleted successfully.",
                            Id = resultCode
                        };
                    }
                    else
                    {
                        return new DB_STATUS
                        {
                            Status = "Failure",
                            Success = false,
                            StatusMessage = "ERROR ."
                        };
                    }
                }
                catch (Exception ex)
                {
                    // Log the exception details
                    return new DB_STATUS
                    {
                        Status = "Failure",
                        Success = false,
                        StatusMessage = "An unexpected error occurred while saving the branch record."
                    };
                }
            }




            public ItemOEM GetItemOem_id(long OEM_Id)
            {
                ItemOEM? result = null;
                try
                {

                    var dbparams = new DynamicParameters();
                    dbparams.Add("@OEM_Id", OEM_Id, DbType.Int32);

                    result = _dapperRepository.Get<ItemOEM>("[dbo].[G_Get_ItemOEMById_Api]"
                        , dbparams,
                        commandType: CommandType.StoredProcedure);

                }
                catch
                {
                    throw;
                }
                finally
                {

                }
                return result;
            }


            private DataTable ConvertToDataTable<T>(List<T> data)
            {
                DataTable table = new DataTable(typeof(T).Name);
                PropertyInfo[] props = typeof(T).GetProperties(BindingFlags.Public | BindingFlags.Instance);

                foreach (var prop in props)
                {
                    table.Columns.Add(prop.Name, Nullable.GetUnderlyingType(prop.PropertyType) ?? prop.PropertyType);
                }

                foreach (var item in data)
                {
                    var values = new object[props.Length];
                    for (int i = 0; i < props.Length; i++)
                    {
                        values[i] = props[i].GetValue(item, null);
                    }
                    table.Rows.Add(values);
                }

                return table;
            }

            public DB_STATUS SaveMainItem(int ItemId, ItemModel item, List<ItemUnitDetModel> unit, List<ItemVendorsModel> vendor,
                               List<ItemCarDetModel> cardet, List<ItemLocDetModel> loc, List<ItemVatDetailsDto> vat)
            {
                try
                {
                    var parameters = new DynamicParameters();

                    // Convert lists to DataTables for TVPs
                    var itemTable = ConvertToDataTable(new List<ItemModel> { item });
                    var unitTable = ConvertToDataTable(unit);
                    var vendorTable = ConvertToDataTable(vendor);
                    var carDetTable = ConvertToDataTable(cardet);
                    var locTable = ConvertToDataTable(loc);
                    var vatTable = ConvertToDataTable(vat);

                    // Pass Item_Id as a separate parameter
                    parameters.Add("@ItemId", ItemId, dbType: DbType.Int32, direction: ParameterDirection.Input);
                    parameters.Add("@ItemData", itemTable.AsTableValuedParameter("dbo.ItemsType"));
                    parameters.Add("@ItemUnitDetData", unitTable.AsTableValuedParameter("dbo.ItemUnitDetType"));
                    parameters.Add("@ItemVendorsData", vendorTable.AsTableValuedParameter("dbo.ItemVendorsType"));
                    parameters.Add("@ItemCarDetData", carDetTable.AsTableValuedParameter("dbo.ItemCarDetType"));
                    parameters.Add("@ItemLocDetData", locTable.AsTableValuedParameter("dbo.ItemLocDetType"));
                    parameters.Add("@ItemTaxData", vatTable.AsTableValuedParameter("dbo.ItemTaxesType"));

                    // Output Parameters for Result Status and Message
                    parameters.Add("@ResultStatus", dbType: DbType.Int32, direction: ParameterDirection.Output);
                    parameters.Add("@ResultMessage", dbType: DbType.String, size: 500, direction: ParameterDirection.Output);

                    // Execute Stored Procedure
                    _dapperRepository.InsertUpdate<DB_STATUS>("[dbo].[G_Insert_ItemsAdd_Api]", parameters, CommandType.StoredProcedure);

                    // Retrieve output parameter values
                    var resultCode = parameters.Get<int>("@ResultStatus");
                    var resultMessage = parameters.Get<string>("@ResultMessage");

                    return new DB_STATUS
                    {
                        Status = resultCode == 1 ? "Success" : "Failure",
                        Success = resultCode == 1,
                        StatusMessage = resultMessage
                    };
                }
                catch (Exception ex)
                {
                    return new DB_STATUS
                    {
                        Status = "Failure",
                        Success = false,
                        StatusMessage = "An unexpected error occurred: " + ex.Message
                    };
                }
            }

            public IEnumerable<CarDetail> GetItemCarDetails()
            {
                var parameters = new DynamicParameters();
                return _dapperRepository.GetAll<CarDetail>("[G_Get_Fetch_CarDetails_Api]", parameters, CommandType.StoredProcedure);
            }



            public List<ItemDetailsDto> GetItemDtls_Id (long Item_Id)
            {
                List<ItemDetailsDto> result = null;
                try
                {

                    var dbparams = new DynamicParameters();
                    dbparams.Add("@Item_Id", Item_Id, DbType.Int32);

                    result = _dapperRepository.GetAll<ItemDetailsDto>("[dbo].[G_Get_Item_Dtls_ById_Api]"
                        , dbparams,
                        commandType: CommandType.StoredProcedure);

                }
                catch
                {
                    throw;
                }
                finally
                {

                }
                return result;
            }



        }



    }

    }

