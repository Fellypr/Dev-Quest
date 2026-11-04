using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackEnd.DTOs.v1
{
    public class CreateRoadmapRequestV1Dto
    {
        public string Specialty { get; set; } = string.Empty;
        public string Stack { get; set; } = string.Empty;
        public string Language { get; set; } = string.Empty;
        public string ExperienceLevel { get; set; } = string.Empty;
    }
}