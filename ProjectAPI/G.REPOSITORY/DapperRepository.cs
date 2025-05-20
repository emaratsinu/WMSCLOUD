using Dapper;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Data;

namespace G.REPOSITORY
{
    public interface IDapperRepository
    {
        T Get<T>(string sp, DynamicParameters parms, CommandType commandType = CommandType.StoredProcedure);
        List<T> GetAll<T>(string sp, DynamicParameters parms, CommandType commandType = CommandType.StoredProcedure);
        object Execute(string sp, DynamicParameters parms, CommandType commandType = CommandType.StoredProcedure);
        T InsertUpdateWithTransaction<T>(string sp, DynamicParameters parms, CommandType commandType = CommandType.StoredProcedure);
        T InsertUpdate<T>(string sp, DynamicParameters parms, CommandType commandType = CommandType.StoredProcedure);
        (List<T1>, List<T2>, List<T3>) GetAllMultipleResultSet3Lists<T1, T2, T3>(string sp, DynamicParameters parms, CommandType commandType = CommandType.StoredProcedure);
        (List<T1>, List<T2>) GetAllMultipleResultSet2Lists<T1, T2>(string sp, DynamicParameters parms, CommandType commandType = CommandType.StoredProcedure);
        (T1, T2, T3, T4, T5, T6, T7) GetAllMultipleResultSet7<T1, T2, T3, T4, T5, T6, T7>(string sp, DynamicParameters parms, CommandType commandType = CommandType.StoredProcedure);
        (T1, T2, T3, T4, T5, T6, T7, T8) GetAllMultipleResultSet8<T1, T2, T3, T4, T5, T6, T7, T8>(string sp, DynamicParameters parms, CommandType commandType = CommandType.StoredProcedure);
        List<T> GetAllLive<T>(string sp, DynamicParameters parms, CommandType commandType = CommandType.StoredProcedure);
        (List<T1>, List<T2>, List<T3>) GetAllMultipleResultSet3ListsLive<T1, T2, T3>(string sp, DynamicParameters parms, CommandType commandType = CommandType.StoredProcedure);
        (T1, T2, T3) GetAllMultipleResultSet3<T1, T2, T3>(string sp, DynamicParameters parms, CommandType commandType = CommandType.StoredProcedure);
        (T1, T2) GetAllMultipleResultSet2<T1, T2>(string sp, DynamicParameters parms, CommandType commandType = CommandType.StoredProcedure);
        (T1, List<T2>) GetAllMultipleResultSet1Object1List<T1, T2>(string sp, DynamicParameters parms, CommandType commandType = CommandType.StoredProcedure);
    }

    public sealed class ConnectionString
    {
        public ConnectionString(string value) => Value = value;
        public string Value { get; }
    }

    public class DapperRepository : IDapperRepository
    {
        //private readonly IConfiguration _config;
        private readonly ConnectionString _connectionString;
        //private string IsReport = "";
        public DapperRepository(ConnectionString connectionString)
        {
            _connectionString = connectionString;


        }

        public void Dispose()
        {

        }

        public object Execute(string sp, DynamicParameters parms, CommandType commandType = CommandType.StoredProcedure)
        {
            using (IDbConnection con = new SqlConnection(_connectionString.Value))
            {
                return con.ExecuteScalar<object>(sp, parms, commandType: CommandType.StoredProcedure);
            }
        }

        public T Get<T>(string sp, DynamicParameters parms, CommandType commandType = CommandType.Text)
        {
            IDbConnection db = new SqlConnection(_connectionString.Value);
            return db.Query<T>(sp, parms, commandType: commandType).FirstOrDefault();
        }


        public List<T> GetAll<T>(string sp, DynamicParameters parms, CommandType commandType = CommandType.StoredProcedure)
        {
            IDbConnection db = new SqlConnection(_connectionString.Value);
            return db.Query<T>(sp, parms, commandType: commandType, commandTimeout: 600).ToList();
        }
        public (List<T1>, List<T2>, List<T3>) GetAllMultipleResultSet3Lists<T1, T2, T3>(string sp, DynamicParameters parms, CommandType commandType = CommandType.StoredProcedure)
        {
            //IDbConnection db = new SqlConnection(_connectionString.Value);

            ////using (var multi = db.QueryMultiple(sp, parms, commandType: commandType, commandTimeout:120))
            ////{
            ////    var result1 = multi.Read<T1>().ToList(); // Convert to List
            ////    var result2 = multi.Read<T2>().ToList();
            ////    var result3 = multi.Read<T3>().ToList();
            ////    return (result1, result2,result3);
            ////}
            using (var db = new SqlConnection(_connectionString.Value))
            {
                db.Open();

                using (var multi = db.QueryMultiple(sp, parms, commandType: commandType, commandTimeout: 120))
                {
                    var result1 = multi.Read<T1>().ToList(); // Convert to List
                    var result2 = multi.Read<T2>().ToList();
                    var result3 = multi.Read<T3>().ToList();

                    // Ensure all data is read before the connection is closed
                    return (result1, result2, result3);
                }
            }
        }
        public (List<T1>, List<T2>) GetAllMultipleResultSet2Lists<T1, T2>(string sp, DynamicParameters parms, CommandType commandType = CommandType.StoredProcedure)
        {
            using (var db = new SqlConnection(_connectionString.Value))
            {
                db.Open();

                using (var multi = db.QueryMultiple(sp, parms, commandType: commandType, commandTimeout: 120))
                {
                    var result1 = multi.Read<T1>().ToList();
                    var result2 = multi.Read<T2>().ToList();
                    return (result1, result2);
                }
            }
        }
        public (T1, T2, T3, T4, T5, T6, T7) GetAllMultipleResultSet7<T1, T2, T3, T4, T5, T6, T7>(string sp, DynamicParameters parms, CommandType commandType = CommandType.StoredProcedure)
        {
            using (var db = new SqlConnection(_connectionString.Value))
            {
                db.Open();

                using (var multi = db.QueryMultiple(sp, parms, commandType: commandType, commandTimeout: 120))
                {
                    var result1 = multi.Read<T1>().FirstOrDefault();
                    var result2 = multi.Read<T2>().FirstOrDefault();
                    var result3 = multi.Read<T3>().FirstOrDefault();
                    var result4 = multi.Read<T4>().FirstOrDefault();
                    var result5 = multi.Read<T5>().FirstOrDefault();
                    var result6 = multi.Read<T6>().FirstOrDefault();
                    var result7 = multi.Read<T7>().FirstOrDefault();

                    return (result1, result2, result3, result4, result5, result6, result7);
                }
            }
        }

        public (T1, T2, T3, T4, T5, T6, T7, T8) GetAllMultipleResultSet8<T1, T2, T3, T4, T5, T6, T7, T8>(string sp, DynamicParameters parms, CommandType commandType = CommandType.StoredProcedure)
        {
            using (var db = new SqlConnection(_connectionString.Value))
            {
                db.Open();

                using (var multi = db.QueryMultiple(sp, parms, commandType: commandType, commandTimeout: 120))
                {
                    var result1 = multi.Read<T1>().FirstOrDefault();
                    var result2 = multi.Read<T2>().FirstOrDefault();
                    var result3 = multi.Read<T3>().FirstOrDefault();
                    var result4 = multi.Read<T4>().FirstOrDefault();
                    var result5 = multi.Read<T5>().FirstOrDefault();
                    var result6 = multi.Read<T6>().FirstOrDefault();
                    var result7 = multi.Read<T7>().FirstOrDefault();
                    var result8 = multi.Read<T8>().FirstOrDefault();

                    return (result1, result2, result3, result4, result5, result6, result7, result8);
                }
            }
        }

        public (T1, T2, T3) GetAllMultipleResultSet3<T1, T2, T3>(string sp, DynamicParameters parms, CommandType commandType = CommandType.StoredProcedure)
        {

            using (var db = new SqlConnection(_connectionString.Value))
            {
                db.Open();

                using (var multi = db.QueryMultiple(sp, parms, commandType: commandType, commandTimeout: 120))
                {
                    var result1 = multi.Read<T1>().FirstOrDefault();
                    var result2 = multi.Read<T2>().FirstOrDefault();
                    var result3 = multi.Read<T3>().FirstOrDefault();

                    // Ensure all data is read before the connection is closed
                    return (result1, result2, result3);
                }
            }
        }

        public (T1, T2) GetAllMultipleResultSet2<T1, T2>(string sp, DynamicParameters parms, CommandType commandType = CommandType.StoredProcedure)
        {

            using (var db = new SqlConnection(_connectionString.Value))
            {
                db.Open();

                using (var multi = db.QueryMultiple(sp, parms, commandType: commandType, commandTimeout: 120))
                {
                    var result1 = multi.Read<T1>().FirstOrDefault();
                    var result2 = multi.Read<T2>().FirstOrDefault();
                    //  var result3 = multi.Read<T3>().FirstOrDefault();

                    // Ensure all data is read before the connection is closed
                    return (result1, result2);
                }
            }
        }

        public (T1, List<T2>) GetAllMultipleResultSet1Object1List<T1, T2>(string sp, DynamicParameters parms, CommandType commandType = CommandType.StoredProcedure)
        {
            using (var db = new SqlConnection(_connectionString.Value))
            {
                db.Open();

                using (var multi = db.QueryMultiple(sp, parms, commandType: commandType, commandTimeout: 120))
                {
                    var result1 = multi.Read<T1>().FirstOrDefault();
                    var result2 = multi.Read<T2>().ToList();
                    // var result3 = multi.Read<T3>().FirstOrDefault();

                    // Ensure all data is read before the connection is closed
                    return (result1, result2);
                }
            }
        }
        public List<T> GetAllLive<T>(string sp, DynamicParameters parms, CommandType commandType = CommandType.StoredProcedure)
        {
            IDbConnection db = new SqlConnection("server=10.10.10.2;Database=PHARMACYWAREHOUSE;User Id=sa;Password=sa.walan.ph@2023;");
            return db.Query<T>(sp, parms, commandType: commandType, commandTimeout: 120).ToList();
        }
        public (List<T1>, List<T2>, List<T3>) GetAllMultipleResultSet3ListsLive<T1, T2, T3>(string sp, DynamicParameters parms, CommandType commandType = CommandType.StoredProcedure)
        {
            //IDbConnection db = new SqlConnection(_connectionString.Value);

            ////using (var multi = db.QueryMultiple(sp, parms, commandType: commandType, commandTimeout:120))
            ////{
            ////    var result1 = multi.Read<T1>().ToList(); // Convert to List
            ////    var result2 = multi.Read<T2>().ToList();
            ////    var result3 = multi.Read<T3>().ToList();
            ////    return (result1, result2,result3);
            ////}
            using (var db = new SqlConnection("server=10.10.10.2;Database=PHARMACYWAREHOUSE;User Id=sa;Password=sa.walan.ph@2023;"))
            {
                db.Open();

                using (var multi = db.QueryMultiple(sp, parms, commandType: commandType, commandTimeout: 120))
                {
                    var result1 = multi.Read<T1>().ToList(); // Convert to List
                    var result2 = multi.Read<T2>().ToList();
                    var result3 = multi.Read<T3>().ToList();

                    // Ensure all data is read before the connection is closed
                    return (result1, result2, result3);
                }
            }
        }


        public T InsertUpdateWithTransaction<T>(string sp, DynamicParameters parms, CommandType commandType = CommandType.StoredProcedure)
        {
            T result;
            //var output;
            IDbConnection db = new SqlConnection(_connectionString.Value);
            try
            {
                if (db.State == ConnectionState.Closed)
                    db.Open();

                var tran = db.BeginTransaction();
                try
                {
                    result = db.Query<T>(sp, parms, commandType: commandType, transaction: tran).FirstOrDefault();
                    tran.Commit();
                    //result = parms.Get<T>("@Output");

                }
                catch (Exception ex)
                {
                    tran.Rollback();
                    throw ex;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (db.State == ConnectionState.Open)
                    db.Close();
            }

            return result;
        }

        public T InsertUpdate<T>(string sp, DynamicParameters parms, CommandType commandType = CommandType.StoredProcedure)
        {
            T result;
            using (var db = new SqlConnection(_connectionString.Value))
            {
                if (db.State == ConnectionState.Closed)
                    db.Open();

                try
                {
                    result = db.Query<T>(sp, parms, commandType: commandType).FirstOrDefault();
                }
                catch (Exception ex)
                {
                    // Log the exception (for example, using a logging framework or simply writing to the console)
                    Console.WriteLine($"Error executing stored procedure {sp}: {ex.Message}");
                    throw;
                }
            }

            return result;
        }


        //public T Update<T>(string sp, DynamicParameters parms, CommandType commandType = CommandType.StoredProcedure)
        //{
        //    T result;
        //    IDbConnection db = new SqlConnection(_connectionString.Value);
        //    try
        //    {
        //        if (db.State == ConnectionState.Closed)
        //            db.Open();

        //        var tran = db.BeginTransaction();
        //        try
        //        {
        //            result = db.Query<T>(sp, parms, commandType: commandType, transaction: tran).FirstOrDefault();
        //            tran.Commit();
        //        }
        //        catch (Exception ex)
        //        {
        //            tran.Rollback();
        //            throw ex;
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //    finally
        //    {
        //        if (db.State == ConnectionState.Open)
        //            db.Close();
        //    }

        //    return result;
        //}
    }
}

