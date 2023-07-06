using System.Collections.Generic;
using System;
using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace pet_hotel {

    public class Transaction {

        public int id { get; set; }
        
        [Required]
        public string description { get; set; }

        // [ForeignKey("PetOwners")]
        // public int petOwnerId { get; set; }

        // [ForeignKey("Pets")]
        // public int petId { get; set; }

        public Transaction(){
            
        }

        public Transaction (string descript){

            description = descript + DateTime.Now.ToString();

        }
    }
}