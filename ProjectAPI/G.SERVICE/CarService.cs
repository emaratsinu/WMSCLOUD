using Dapper;
using G.ENTITY;
using G.REPOSITORY;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G.SERVICE
{
    public interface ICarService
    {
        List<CarMake> GetCarMake(string filterField = null, string filterCondition = null, string filterValue = null);

        CarMake GetCar_id(long Make_Id);
        string GetNextCarMakeCode();
        DB_STATUS Savecar(CarMake_ins car);

        List<CarModel> GetCarModel(string filterField = null, string filterCondition = null, string filterValue = null);

        CarModel GetCarModel_id(long Model_Id);

        string GetNextCarModelCode();

        DB_STATUS SavecarModel(CarModel_ins carModel);
        List<PayType> GetPayType(string filterField = null, string filterCondition = null, string filterValue = null);
        PayType GetPayType_id(long PayType_Id);

        string GetNextPayCode();


        DB_STATUS SavePayType(PayType pay);

        List<Currency> GetCurrency(string filterField = null, string filterCondition = null, string filterValue = null);
        string GetNxtCurrencyCode();
        Currency GetCurrency_id(long Curr_Id);

        DB_STATUS SaveCurrency(Currency Cur);

        List<Country_List> GetCountries(string filterField = null, string filterCondition = null, string filterValue = null);

        Country_List GetCountries_id(long Country_Id);
        string GetNxtCountryCode();


        DB_STATUS SaveCountry(Country_List country);





        public class CarService : ICarService

        {
            private readonly IDapperRepository _dapperRepository;

            public CarService(IDapperRepository dapperRepository)
            {
                _dapperRepository = dapperRepository;
            }



            public List<CarMake> GetCarMake(string FilterField = null, string FilterCondition = null, string FilterValue = null)
            {
                List<CarMake> result = null;
                try
                {
                    var dbparams = new DynamicParameters();
                    dbparams.Add("@FilterField", FilterField ?? (object)DBNull.Value, DbType.String);
                    dbparams.Add("@FilterCondition", FilterCondition ?? (object)DBNull.Value, DbType.String);
                    dbparams.Add("@FilterValue", FilterValue ?? (object)DBNull.Value, DbType.String);

                    result = _dapperRepository.GetAll<CarMake>("[dbo].[G_Get_CarMake_Api]",
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


            public CarMake GetCar_id(long Make_Id)
            {
                CarMake? result = null;
                try
                {

                    var dbparams = new DynamicParameters();
                    dbparams.Add("@Make_Id", Make_Id, DbType.Int32);

                    result = _dapperRepository.Get<CarMake>("[dbo].[G_Get_CarMake_ById_Api]"
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


            public string GetNextCarMakeCode()
            {
                var parameters = new DynamicParameters();
                var result = _dapperRepository.Execute("[dbo].[G_Get_Next_CarMakeCode_Api]", parameters, CommandType.StoredProcedure);
                return result?.ToString() ?? string.Empty;
            }

            public DB_STATUS Savecar(CarMake_ins model)
            {
                try
                {
                    var parameters = new DynamicParameters();

                    // Add parameters to DynamicParameters
                    parameters.Add("@Make_Id", model.MakeId);            // Input: Make ID (0 for insert)
                    parameters.Add("@Make_Code", model.MakeCode);        // Input: Make Code (non-null)
                    parameters.Add("@Make_NameEn", model.MakeNameEn);    // Input: Make Name (English, non-null)
                    parameters.Add("@Make_NameAr", model.MakeNameAr);    // Input: Make Name (Arabic)

                    parameters.Add("@Make_CreatedBy", model.MakeCreatedBy); // Input: CreatedBy (user ID)
                    parameters.Add("@Result", dbType: DbType.Int32, direction: ParameterDirection.Output);


                    var result = _dapperRepository.InsertUpdate<DB_STATUS>("[dbo].[G_Insert_CarMake_Api]", parameters, CommandType.StoredProcedure);

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




            public List<CarModel> GetCarModel(string FilterField = null, string FilterCondition = null, string FilterValue = null)
            {
                List<CarModel> result = null;
                try
                {
                    var dbparams = new DynamicParameters();
                    dbparams.Add("@FilterField", FilterField ?? (object)DBNull.Value, DbType.String);
                    dbparams.Add("@FilterCondition", FilterCondition ?? (object)DBNull.Value, DbType.String);
                    dbparams.Add("@FilterValue", FilterValue ?? (object)DBNull.Value, DbType.String);

                    result = _dapperRepository.GetAll<CarModel>("[dbo].[G_Get_CarModels_Api]",
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

            public CarModel GetCarModel_id(long Model_Id)
            {
                CarModel? result = null;
                try
                {

                    var dbparams = new DynamicParameters();
                    dbparams.Add("@Model_Id", Model_Id, DbType.Int32);

                    result = _dapperRepository.Get<CarModel>("[dbo].[G_Get_CarModels_ById_Api]"
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



            public string GetNextCarModelCode()
            {
                var parameters = new DynamicParameters();
                var result = _dapperRepository.Execute("[dbo].[G_Get_Next_CarModel_Code_Api]", parameters, CommandType.StoredProcedure);
                return result?.ToString() ?? string.Empty;
            }



            public DB_STATUS SavecarModel(CarModel_ins model)
            {
                try
                {
                    var parameters = new DynamicParameters();

                    // Add parameters to DynamicParameters
                    parameters.Add("@Model_Id", model.ModelId);            // Input: Make ID (0 for insert)
                    parameters.Add("@Model_Code", model.ModelCode);        // Input: Make Code (non-null)
                    parameters.Add("@Model_NameEn", model.ModelNameEn);    // Input: Make Name (English, non-null)
                    parameters.Add("@Model_NameAr", model.ModelNameAr);    // Input: Make Name (Arabic)
                    parameters.Add("@Model_MakeId", model.ModelMakeId);

                    parameters.Add("@Model_CreatedBy", model.ModelCreatedBy); // Input: CreatedBy (user ID)
                    parameters.Add("@Result", dbType: DbType.Int32, direction: ParameterDirection.Output);


                    var result = _dapperRepository.InsertUpdate<DB_STATUS>("[dbo].[G_Insert_CarModels_Api]", parameters, CommandType.StoredProcedure);

                    var resultCode = parameters.Get<int>("@Result");

                    if (resultCode > 0)
                    {
                        return new DB_STATUS
                        {
                            Status = "Success",
                            Success = true,
                            StatusMessage = "model saved successfully.",
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


            public List<PayType> GetPayType(string FilterField = null, string FilterCondition = null, string FilterValue = null)
            {
                List<PayType> result = null;
                try
                {
                    var dbparams = new DynamicParameters();
                    dbparams.Add("@FilterField", FilterField ?? (object)DBNull.Value, DbType.String);
                    dbparams.Add("@FilterCondition", FilterCondition ?? (object)DBNull.Value, DbType.String);
                    dbparams.Add("@FilterValue", FilterValue ?? (object)DBNull.Value, DbType.String);

                    result = _dapperRepository.GetAll<PayType>("[dbo].[G_Get_PaymentTypes_Api]",
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



            public PayType GetPayType_id(long PayType_Id)
            {
                PayType? result = null;
                try
                {

                    var dbparams = new DynamicParameters();
                    dbparams.Add("@PayType_Id", PayType_Id, DbType.Int32);

                    result = _dapperRepository.Get<PayType>("[dbo].[G_Get_PayTypes_Byid]"
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


            public DB_STATUS SavePayType(PayType model)
            {
                try
                {
                    var parameters = new DynamicParameters();

                    // Add parameters to DynamicParameters
                    parameters.Add("@PayType_Id", model.PayType_Id);           // Input: PayType ID (0 for insert)
                    parameters.Add("@PayType_Code", model.PayType_Code);       // Input: PayType Code (non-null)
                    parameters.Add("@PayType_NameEn", model.PayType_NameEn);   // Input: PayType Name (English, non-null)
                    parameters.Add("@PayType_NameAr", model.PayType_NameAr);   // Input: PayType Name (Arabic, optional)


                    parameters.Add("@Result", dbType: DbType.Int32, direction: ParameterDirection.Output);


                    var result = _dapperRepository.InsertUpdate<DB_STATUS>("[dbo].[G_Insert_PayTypes_Api]", parameters, CommandType.StoredProcedure);

                    var resultCode = parameters.Get<int>("@Result");

                    if (resultCode > 0)
                    {
                        return new DB_STATUS
                        {
                            Status = "Success",
                            Success = true,
                            StatusMessage = "Pay Type saved successfully.",
                            Id = resultCode
                        };
                    }
                    else
                    {
                        return new DB_STATUS
                        {
                            Status = "Failure",
                            Success = false,
                            StatusMessage = "pay Type  record was not saved successfully."
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



            public string GetNextPayCode()
            {
                var parameters = new DynamicParameters();
                var result = _dapperRepository.Execute("[dbo].[G_Get_NextPayCode_Api]", parameters, CommandType.StoredProcedure);
                return result?.ToString() ?? string.Empty;
            }



            public List<Currency> GetCurrency(string FilterField = null, string FilterCondition = null, string FilterValue = null)
            {
                List<Currency> result = null;
                try
                {
                    var dbparams = new DynamicParameters();
                    dbparams.Add("@FilterField", FilterField ?? (object)DBNull.Value, DbType.String);
                    dbparams.Add("@FilterCondition", FilterCondition ?? (object)DBNull.Value, DbType.String);
                    dbparams.Add("@FilterValue", FilterValue ?? (object)DBNull.Value, DbType.String);

                    result = _dapperRepository.GetAll<Currency>("[dbo].[G_Get_Currencies_Api]",
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


            public string GetNxtCurrencyCode()
            {
                var parameters = new DynamicParameters();
                var result = _dapperRepository.Execute("[dbo].[G_Get_NextCurrency_Code_Api]", parameters, CommandType.StoredProcedure);
                return result?.ToString() ?? string.Empty;
            }

            public Currency GetCurrency_id(long Curr_Id)
            {
                Currency? result = null;
                try
                {

                    var dbparams = new DynamicParameters();
                    dbparams.Add("@Curr_Id ", Curr_Id, DbType.Int32);

                    result = _dapperRepository.Get<Currency>("[dbo].[G_Get_Currencies_ById]"
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




            public DB_STATUS SaveCurrency(Currency model)
            {
                try
                {
                    var parameters = new DynamicParameters();

                    // Add parameters for the Currency model
                    parameters.Add("@Curr_Id", model.Curr_Id);                  // Input: Currency ID (0 for insert)
                    parameters.Add("@Curr_Code", model.Curr_Code);              // Input: Currency Code (non-null, 3 characters)
                    parameters.Add("@Curr_ShortCode", model.Curr_ShortCode);    // Input: Currency Short Code (non-null, 3 characters)
                    parameters.Add("@Curr_Desc", model.Curr_Desc);              // Input: Currency Description (non-null)

                    parameters.Add("@Result", dbType: DbType.Int32, direction: ParameterDirection.Output);

                    // Call the repository method to execute the stored procedure
                    var result = _dapperRepository.InsertUpdate<DB_STATUS>("[dbo].[G_Insert_Currency_Api]", parameters, CommandType.StoredProcedure);

                    // Get the Result output parameter from the stored procedure
                    var resultCode = parameters.Get<int>("@Result");

                    // Check the result and return appropriate DB_STATUS
                    if (resultCode == 1) // Insert operation
                    {
                        return new DB_STATUS
                        {
                            Status = "Success",
                            Success = true,
                            StatusMessage = "Currency inserted successfully.",
                            Id = resultCode
                        };
                    }
                    else if (resultCode == 2) // Update operation
                    {
                        return new DB_STATUS
                        {
                            Status = "Success",
                            Success = true,
                            StatusMessage = "Currency updated successfully.",
                            Id = resultCode
                        };
                    }
                    else
                    {
                        return new DB_STATUS
                        {
                            Status = "Failure",
                            Success = false,
                            StatusMessage = "Currency record was not saved successfully."
                        };
                    }
                }
                catch (Exception ex)
                {
                    // Log the exception details for troubleshooting
                    return new DB_STATUS
                    {
                        Status = "Failure",
                        Success = false,
                        StatusMessage = "An unexpected error occurred while saving the currency record.",

                    };
                }


            }





            public List<Country_List> GetCountries(string FilterField = null, string FilterCondition = null, string FilterValue = null)
            {
                List<Country_List> result = null;
                try
                {
                    var dbparams = new DynamicParameters();
                    dbparams.Add("@FilterField", FilterField ?? (object)DBNull.Value, DbType.String);
                    dbparams.Add("@FilterCondition", FilterCondition ?? (object)DBNull.Value, DbType.String);
                    dbparams.Add("@FilterValue", FilterValue ?? (object)DBNull.Value, DbType.String);

                    result = _dapperRepository.GetAll<Country_List>("[dbo].[G_Get_Countries_Api]",
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



            public Country_List GetCountries_id(long Country_Id)
            {
                Country_List? result = null;
                try
                {

                    var dbparams = new DynamicParameters();
                    dbparams.Add("@Country_Id", Country_Id, DbType.Int32);

                    result = _dapperRepository.Get<Country_List>("[dbo].[G_Get_Countries_ById]"
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



            public string GetNxtCountryCode()
            {
                var parameters = new DynamicParameters();
                var result = _dapperRepository.Execute("[dbo].[G_Get_NextCountryCode_Api]", parameters, CommandType.StoredProcedure);
                return result?.ToString() ?? string.Empty;
            }



            public DB_STATUS SaveCountry(Country_List model)
            {
                try
                {
                    var parameters = new DynamicParameters();

                    parameters.Add("@Country_Id", model.Country_Id);              // Country ID (0 for insert, existing ID for update)
                    parameters.Add("@Country_Code", model.Country_Code);          // Country Code (non-null)
                    parameters.Add("@Country_NameEn", model.Country_NameEn);      // Country Name in English (non-null)
                    parameters.Add("@Country_NameAr", model.Country_NameAr);      // Country Name in Arabic (optional)
                    parameters.Add("@Result", dbType: DbType.Int32, direction: ParameterDirection.Output); // Output parameter for result (1 = success, 0 = failure)


                    var result = _dapperRepository.InsertUpdate<DB_STATUS>("[dbo].[G_InsertUpdate_Country_Api]", parameters, CommandType.StoredProcedure);

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





        }
    }
}
