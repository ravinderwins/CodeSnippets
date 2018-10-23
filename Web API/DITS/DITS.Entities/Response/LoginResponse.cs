using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DITS.Entities.Response
{
    public class LoginResponse : BaseResponse
    {
        public UserDetail UserDetail { get; set; }
    }

    public class UserDetail
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public bool IsLocked { get; set; }
        public int UserBasicInformationId { get; set; }
    }
}
