using firstapi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace firstapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly string _connectionString;
        private readonly ILogger<ProductController> _logger;

        public ProductController(IConfiguration configuration, ILogger<ProductController> logger)
        {
            _connectionString = configuration.GetConnectionString("SqlServerDb") ?? string.Empty;
            _logger = logger;
        }

        [HttpPost]
        public IActionResult CreateProduct(ProductDto productDto)
        {
            if (productDto == null)
            {
                _logger.LogError("ProductDto is null.");
                return BadRequest("Product data is null.");
            }

            try
            {
                using (var connection = new SqlConnection(_connectionString))
                {
                    connection.Open();
                    string sql = "INSERT INTO PRODUCTS (name, brand, category, price, description, created_at) " +
                                 "VALUES (@name, @brand, @category, @price, @description, @created_at)";

                    using (var command = new SqlCommand(sql, connection))
                    {
                        command.Parameters.AddWithValue("@name", productDto.Name);
                        command.Parameters.AddWithValue("@brand", productDto.Brand);
                        command.Parameters.AddWithValue("@category", productDto.Category);
                        command.Parameters.AddWithValue("@price", productDto.Price);
                        command.Parameters.AddWithValue("@description", productDto.Description);
                        command.Parameters.AddWithValue("@created_at", DateTime.UtcNow);
                        command.ExecuteNonQuery();
                    }
                }

                return Ok(new { message = "Product created successfully" });
            }
            catch (SqlException sqlEx)
            {
                _logger.LogError(sqlEx, "SQL error occurred while creating a product.");
                return StatusCode(StatusCodes.Status500InternalServerError, new { error = sqlEx.Message });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while creating a product.");
                return StatusCode(StatusCodes.Status500InternalServerError, new { error = ex.Message });
            }
        }

        [HttpGet]
        public IActionResult GetProducts()
        {
            List<Product> products = new List<Product>();

            try
            {
                using (var connection = new SqlConnection(_connectionString))
                {
                    connection.Open();
                    string sql = "SELECT * FROM PRODUCTS";
                    using (var command = new SqlCommand(sql, connection))
                    {
                        using (var reader = command.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                Product product = new Product
                                {
                                    Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                    Name = reader.GetString(reader.GetOrdinal("name")),
                                    Brand = reader.GetString(reader.GetOrdinal("brand")),
                                    Category = reader.GetString(reader.GetOrdinal("category")),
                                    Price = reader.GetDecimal(reader.GetOrdinal("price")),
                                    Description = reader.GetString(reader.GetOrdinal("description")),
                                    CreatedAt = reader.GetDateTime(reader.GetOrdinal("created_at"))
                                };
                                products.Add(product);
                            }
                        }
                    }
                }

                return Ok(products);
            }
            catch (SqlException sqlEx)
            {
                _logger.LogError(sqlEx, "SQL error occurred while retrieving products.");
                return StatusCode(StatusCodes.Status500InternalServerError, new { error = sqlEx.Message });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while retrieving products.");
                return StatusCode(StatusCodes.Status500InternalServerError, new { error = ex.Message });
            }
        }

        [HttpPut("{id}")]
        public IActionResult UpdateProduct(int id, ProductDto productDto)
        {
            if (productDto == null)
            {
                _logger.LogError("ProductDto is null.");
                return BadRequest("Product data is null.");
            }

            try
            {
                using (var connection = new SqlConnection(_connectionString))
                {
                    connection.Open();
                    string sql = "UPDATE PRODUCTS SET name = @name, brand = @brand, category = @category, " +
                                 "price = @price, description = @description WHERE id = @id";

                    using (var command = new SqlCommand(sql, connection))
                    {
                        command.Parameters.AddWithValue("@id", id);
                        command.Parameters.AddWithValue("@name", productDto.Name);
                        command.Parameters.AddWithValue("@brand", productDto.Brand);
                        command.Parameters.AddWithValue("@category", productDto.Category);
                        command.Parameters.AddWithValue("@price", productDto.Price);
                        command.Parameters.AddWithValue("@description", productDto.Description);
                        int rowsAffected = command.ExecuteNonQuery();

                        if (rowsAffected == 0)
                        {
                            _logger.LogWarning($"Product with id {id} not found.");
                            return NotFound(new { message = "Product not found" });
                        }
                    }
                }

                return Ok(new { message = "Product updated successfully" });
            }
            catch (SqlException sqlEx)
            {
                _logger.LogError(sqlEx, "SQL error occurred while updating the product.");
                return StatusCode(StatusCodes.Status500InternalServerError, new { error = sqlEx.Message });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while updating the product.");
                return StatusCode(StatusCodes.Status500InternalServerError, new { error = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteProduct(int id)
        {
            try
            {
                using (var connection = new SqlConnection(_connectionString))
                {
                    connection.Open();
                    string sql = "DELETE FROM PRODUCTS WHERE id = @id";

                    using (var command = new SqlCommand(sql, connection))
                    {
                        command.Parameters.AddWithValue("@id", id);
                        int rowsAffected = command.ExecuteNonQuery();

                        if (rowsAffected == 0)
                        {
                            _logger.LogWarning($"Product with id {id} not found.");
                            return NotFound(new { message = "Product not found" });
                        }
                    }
                }

                return Ok(new { message = "Product deleted successfully" });
            }
            catch (SqlException sqlEx)
            {
                _logger.LogError(sqlEx, "SQL error occurred while deleting the product.");
                return StatusCode(StatusCodes.Status500InternalServerError, new { error = sqlEx.Message });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while deleting the product.");
                return StatusCode(StatusCodes.Status500InternalServerError, new { error = ex.Message });
            }
        }
    }
}