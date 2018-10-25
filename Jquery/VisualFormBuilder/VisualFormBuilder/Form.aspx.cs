using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace VisualFormBuilder
{
    public partial class Form : System.Web.UI.Page
    {
        public int _FormId = -1;
        public string _FormType = string.Empty;
        public string _RootFormId = string.Empty;
        public string JsonResponse = string.Empty;

        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {
                if (Request.QueryString["FormId"] != null && Convert.ToInt32(Request.QueryString["FormId"]) > 0)
                {
                    _FormId = Convert.ToInt32(Request.QueryString["FormId"]);
                    JsonResponse =CommonFunctions.GetFormDetails(_FormId);
                }
                _FormType = Convert.ToString(Request.QueryString["FormType"]);
                _RootFormId = Convert.ToString(Request.QueryString["RootFormId"]);

            }
            catch (Exception Ex)
            {
                Response.Write("Error Occured:" + Ex.Message);
            }
        }
    }
}