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
    }
}