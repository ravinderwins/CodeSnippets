﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DITS.Entities.Response
{
   public class SaveEmergencyContactResponse:BaseResponse
    {
        public GetEmergencyContactResponse GetEmergencyContactResponse { get; set; }

    }
}

public class GetEmergencyContactResponse
{
    public string Name { get; set; }
    public int? Relation { get; set; }
    public int? Occupation { get; set; }
    public int? ContactNumber { get; set; }
    public int UserBasicInformationId { get; set; }
    public int UserEmergencyContactId { get; set; }
}