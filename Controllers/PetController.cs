using System.Net.NetworkInformation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using pet_hotel.Models;
using Microsoft.EntityFrameworkCore;

namespace pet_hotel.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PetsController : ControllerBase
    {
        private readonly ApplicationContext _context;
        public PetsController(ApplicationContext context)
        {
            _context = context;
        }

        // This is just a stub for GET / to prevent any weird frontend errors that 
        // occur when the route is missing in this controller
        [HttpGet]
        public ICollection<Pet> GetPets()
        {
            return _context.Pets
                .Include(pet => pet.petOwner)
                .ToArray();
        }

        [HttpGet("{petId}")] // get pet by id
        public IActionResult getPetById(int petId)
        {
            Pet foundPet = _context.Pets
            .SingleOrDefault(pet => pet.id == petId);

            if (foundPet == null)
            {
                return NotFound();
            }
            return Ok(foundPet);
        }

        [HttpPost] // post a new pet
        public IActionResult createPet([FromBody] Pet newPet)
        {
            Pet goodestPet = newPet;
            goodestPet.petOwner = _context.PetOwners.SingleOrDefault(owner => owner.id == newPet.petOwnerId);
            
            Console.WriteLine($"pet owner: {goodestPet.petOwner}", goodestPet);

            _context.Pets.Add(goodestPet);
            _context.SaveChanges();
            return Created($"/api/pets/{goodestPet.id}", goodestPet);
        }

        [HttpDelete("{petId}")] // delete pet by id
        public IActionResult deletePetById(int petId)
        {
            Pet petToDelete = _context.Pets.SingleOrDefault(pet => pet.id == petId);
            if (petToDelete == null)
            {
                return NotFound();
            }
            _context.Pets.Remove(petToDelete);
            _context.SaveChanges();
            return NoContent();
        }

        [HttpPut("{petId}")] // update a pet
        public IActionResult updatePet([FromBody] Pet pet, int petId)
        {
            if (petId != pet.id) return BadRequest();

            // Make sure the pet we are updating is real
            if (!_context.Pets.Any(p => p.id == petId)) return NotFound();

            // Security double check: Make sure that pet.id matches the URL id
            _context.Pets.Update(pet);
            _context.SaveChanges();
            return Ok(pet);
        }

        [HttpPut("{petId}/checkin")]
        public IActionResult whereMyDogsAt(int petId)
        {
            Pet checkingIn = _context.Pets
            .SingleOrDefault(pet => pet.id == petId);
            if (checkingIn == null)
            {
                return NotFound();
            }
            checkingIn.checkIn();
            _context.Pets.Update(checkingIn);
            _context.SaveChanges();
            return Ok(checkingIn);

        }

        [HttpPut("{petId}/checkout")]
        public IActionResult whereMyDogsOut(int petId)
        {
            Pet checkingOut = _context.Pets
            .SingleOrDefault(pet => pet.id == petId);
            if (checkingOut == null)
            {
                return NotFound();
            }
            checkingOut.checkOut();
            _context.Pets.Update(checkingOut);
            _context.SaveChanges();
            return Ok(checkingOut);

        }

        // [HttpGet]
        // [Route("test")]
        // public IEnumerable<Pet> GetPets() {
        //     PetOwner blaine = new PetOwner{
        //         name = "Blaine"
        //     };

        //     Pet newPet1 = new Pet {
        //         name = "Big Dog",
        //         petOwner = blaine,
        //         color = PetColorType.Black,
        //         breed = PetBreedType.Poodle,
        //     };

        //     Pet newPet2 = new Pet {
        //         name = "Little Dog",
        //         petOwner = blaine,
        //         color = PetColorType.Golden,
        //         breed = PetBreedType.Labrador,
        //     };

        //     return new List<Pet>{ newPet1, newPet2};
        // }
    }
}