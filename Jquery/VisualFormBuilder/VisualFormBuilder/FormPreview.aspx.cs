using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace VisualFormBuilder
{
    public partial class FormPreview : System.Web.UI.Page
    {
        protected int _FormId = -1;
        public string _FormName = string.Empty;
        public string _FormFieldsResponse = string.Empty;
        public string _ButtonFieldsResponse = string.Empty;

        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {
                if (Request.QueryString["FormId"] != null && Convert.ToInt32(Request.QueryString["FormId"]) > 0)
                {
                    _FormId = Convert.ToInt32(Request.QueryString["FormId"]);
                    string formDetails = CommonFunctions.GetFormDetails(_FormId);

                    var dataSetTemp = CommonFunctions.ConvertJsonToDataSet(formDetails);

                    if (dataSetTemp.Tables.Count > 0 && dataSetTemp.Tables[0].Rows.Count > 0)
                    {
                        var dataRow = dataSetTemp.Tables[0].Rows[0];
                        _FormName = Convert.ToString(dataRow["FormName"]);
                    }

                    _FormFieldsResponse = CommonFunctions.GetPreviousFormFields(_FormId);
                    _ButtonFieldsResponse = CommonFunctions.GetPreviousFormButtonFields(_FormId);
                }
                else
                {
                    Response.Redirect("FormListing.html");
                }
            }
            catch (Exception Ex)
            {
                Response.Write("Error Occured:" + Ex.Message);
            }
        }
    }
}