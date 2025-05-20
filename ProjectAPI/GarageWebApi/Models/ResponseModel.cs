namespace GarageWebApi.Models
{
    public class ResponseModel
    {
        public long ID { get; set; }
        public int StatusCode { get; set; }
        public bool Success { get; set; }
        public string StatusMessage { get; set; }
        public string RedirectUrl { get; set; }
    }
}
