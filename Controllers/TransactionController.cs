using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using pet_hotel.Models;
using Microsoft.EntityFrameworkCore;

namespace pet_hotel.Controllers{
    [ApiController]
    [Route("api/[controller]")]
    public class TransactionController : ControllerBase
    {
        private readonly ApplicationContext _context;
        public TransactionController(ApplicationContext context){
            _context = context;
        }
        
        [HttpGet]
        public ICollection<Transaction> GetTransactions()
        {
            return _context.Transactions
                    .Include(trans => trans.description).ToArray();
        }

        [HttpPost]
        public IActionResult createTransaction([FromBody] Transaction newTransaction)
        {
            _context.Transactions.Add(newTransaction);
            _context.SaveChanges();

            return Created($"/api/Transactions/{newTransaction.id}", newTransaction);
        }
    }
}