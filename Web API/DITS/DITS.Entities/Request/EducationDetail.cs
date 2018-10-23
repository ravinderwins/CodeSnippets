using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DITS.Entities.Request
{
    public  class EducationDetail
    {
        public int UserBasicInformationId { get; set; }
        public int qualificationtype { get; set; }
        public string institutename { get; set; }
        public int course { get; set; }
        public string passoutyear { get; set; }
        public Nullable<decimal> percentage { get; set; }
        public bool currentlyStudying { get; set; }
        public int? EducationDetailId { get; set; }
    }
}
