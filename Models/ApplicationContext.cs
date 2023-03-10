using Microsoft.EntityFrameworkCore;

namespace pet_hotel.Models;

public class ApplicationContext : DbContext
{
  public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options) { }
}