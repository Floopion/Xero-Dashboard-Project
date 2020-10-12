using System;
using Newtonsoft.Json;
 
namespace WebApplication1
{
    public class Tenant
    {
        [JsonProperty("id")]
        public Guid id { get; set; }
        [JsonProperty("tenantId")]
        public Guid TenantId { get; set; }
        [JsonProperty("tenantType")]
        public string TenantType { get; set; }
    }
}