//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace DITS.Repository
{
    using System;
    using System.Collections.Generic;
    
    public partial class Screen
    {
        public int ScreenId { get; set; }
        public string ScreenName { get; set; }
        public Nullable<int> ParentId { get; set; }
        public bool Menu { get; set; }
        public string Title { get; set; }
        public string URL { get; set; }
    }
}
