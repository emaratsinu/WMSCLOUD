using G.REPOSITORY;
using G.SERVICE;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Localization;
using static G.SERVICE.ICarService;
using static G.SERVICE.IEmployeeService;
using static G.SERVICE.IItemService;
using static G.SERVICE.ISalesService;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Configure CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowCors", // Use the same name as in your controller
        policy =>
        {
            policy.AllowAnyOrigin()
                  .AllowAnyMethod()
                  .AllowAnyHeader();
        });
});

// Retrieve the connection string from configuration
string connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

// Register ConnectionString
builder.Services.AddScoped(sp => new ConnectionString(connectionString));

// Register DapperRepository
builder.Services.AddScoped<IDapperRepository, DapperRepository>();

// Register BranchService
builder.Services.AddScoped<IBranchService, BranchService>();

builder.Services.AddScoped<IBranchTypeService, BranchTypeService>();
builder.Services.AddScoped<IBranchAreaService, BranchAreaService>();
builder.Services.AddScoped<IVendorGroupService, VendorGroupService>();
builder.Services.AddScoped<IVendorService, VendorService>();

builder.Services.AddScoped<IBusinessBranchService, BusinessBranchService>();
builder.Services.AddScoped<IEmployeeService, EmployeeService>();
builder.Services.AddScoped<IItemService, ItemService>();
builder.Services.AddScoped<ICarService, CarService>();
builder.Services.AddScoped<IDepartmentService, DepartmentService>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<ISalesService, SalesService>();
builder.Services.AddScoped<ICardService, CardService>();




builder.Services.AddScoped<IDesignationService, DesignationService>();






// Add localization services
builder.Services.AddLocalization(options => options.ResourcesPath = "Resources");

// Add Swagger/OpenAPI documentation
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

// Apply CORS policy
app.UseCors("AllowCors");

app.UseAuthorization();

app.MapControllers();

app.Run();
