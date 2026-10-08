namespace BackEnd.DTOs.v1
{
    public class UserAreasPracticeV1Request
    {
        public string AreaPractice { get; set; }
        public string EcosystemSoftware { get; set;}
    }

    public class UserAreasPracticeV1Response
    {
        public int IdUserAreasPractice { get; set; }
        public string AreaPractice { get; set; }
        public string EcosystemSoftware { get; set;}
    }
}
