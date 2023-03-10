using Microsoft.EntityFrameworkCore;
using pet_hotel.Models;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews();

string DATABASE_URL = Environment.GetEnvironmentVariable("DATABASE_URL_STR");
string connectionString = (DATABASE_URL == null ? builder.Configuration.GetConnectionString("DefaultConnection") : DATABASE_URL);
Console.WriteLine($"Using connection string: {connectionString}");

builder.Services.AddDbContext<ApplicationContext>(options =>
    options.UseNpgsql(connectionString)
);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
}

app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();
