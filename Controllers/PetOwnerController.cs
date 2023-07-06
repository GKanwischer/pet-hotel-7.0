using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using pet_hotel.Models;
using Microsoft.EntityFrameworkCore;

namespace pet_hotel.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PetOwnersController : ControllerBase
    {
        private readonly ApplicationContext _context;
        public PetOwnersController(ApplicationContext context)
        {
            _context = context;
        }

        // This is just a stub for GET / to prevent any weird frontend errors that 
        // occur when the route is missing in this controller
        [HttpGet]
        public ICollection<PetOwner> GetPetOwners()
        {
            return _context.PetOwners
            .Include(owner => owner.pets)
            .ToArray();
        }

        [HttpGet("{petOwnerId}")]
        public IActionResult getOwnerById(int petOwnerId)
        {
            PetOwner foundOwner = _context.PetOwners.SingleOrDefault(owner => owner.id == petOwnerId);
            if (foundOwner == null)
            {
                return NotFound();
            }
            return Ok(foundOwner);
        }

        [HttpPost]
        public IActionResult createOwner([FromBody] PetOwner newOwner)
        {
            _context.PetOwners.Add(newOwner);
            _context.SaveChanges();
            

            PetOwner CreatedPetOwner = _context.PetOwners.OrderByDescending(p => p.id).Include(p => p.pets).FirstOrDefault();
            return Created($"api/PetOwner/{newOwner.id}", newOwner);
            // return CreatedAtAction(nameof(GetPetOwnerById), new (Id = newOwner.id ), CreatedPetOwner);
        }

        [HttpDelete("{petOwnerId}")]
        public IActionResult deletePetOwnerById(int petOwnerId)
        {
            PetOwner ownerToDelete = _context.PetOwners.SingleOrDefault(owner => owner.id == petOwnerId);
            if (ownerToDelete == null)
            {
                return NotFound();
            }
            _context.PetOwners.Remove(ownerToDelete);
            _context.SaveChanges();
            return NoContent();
        }

        [HttpPut("{petOwnerId}")]
        public IActionResult updatePetOwner([FromBody] PetOwner owner, int petOwnerId)
        {
            if (petOwnerId != owner.id) return BadRequest();

            if (!_context.PetOwners.Any(b => b.id == petOwnerId)) return NotFound();

            _context.PetOwners.Update(owner);
            _context.SaveChanges();
            return Ok(owner);
        }
    }
}
