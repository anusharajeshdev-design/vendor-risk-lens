using Microsoft.EntityFrameworkCore;
using VRL.API.Data;
using VRL.API.Services;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(options =>
{
    options.AddPolicy("ReactPolicy",
        policy =>
        {
            policy.AllowAnyOrigin()
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});
// Add services
builder.Services.AddControllers();

builder.Services.AddDbContext<VrlDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<VendorService>();
builder.Services.AddScoped<IncidentsService>();

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen();
var app = builder.Build();
app.UseCors("ReactPolicy");
// Configure middleware
app.UseSwagger();

app.UseSwaggerUI();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();