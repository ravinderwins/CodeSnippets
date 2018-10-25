using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace VisualFormBuilder
{
    public partial class FormEditor : System.Web.UI.Page
    {
        protected int _FormId = -1;

        public string _FormDetailsResponse = string.Empty;
        public string _FormFieldsResponse = string.Empty;
        public string _DefaultFormFieldsResponse = string.Empty;
        public string _ButtonFieldsResponse = string.Empty;
        public string _MasterFormFieldResponse = string.Empty;

        public string _FormFieldDataControllerResponse = string.Empty;
        public string _UserDefinedCategoriesReponse = string.Empty;
        public string _ChildFormsListResponse = string.Empty;
        public string _FieldTypeJson = string.Empty;
        public string _FieldMaskTypesJson = string.Empty;
        public string _FieldDataFormatsJson = string.Empty;
        public string _VisibilityFieldOperatorsJson = string.Empty;
        public string _ColumnsListResponse = string.Empty;
        public string _TableColumnListResponse = string.Empty;
        public string _FormActionScopesResponse = string.Empty;
        public string _FormActionCommandsResponse = string.Empty;
        public string _NavigateFormsListResponse = string.Empty;
        public string _CommandArgumentsResponse = string.Empty;

        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {
                if (Request.QueryString["FormId"] != null && Convert.ToInt32(Request.QueryString["FormId"]) > 0)
                {
                    _FormId = Convert.ToInt32(Request.QueryString["FormId"]);
                    
                    var dataSetTemp = CommonFunctions.GetVisualDesignerDeta(_FormId);

                    if (dataSetTemp != null && dataSetTemp.Tables.Count > 0)
                    {
                        _FormDetailsResponse = CommonFunctions.ConvertDataTableToJson(dataSetTemp.Tables[0]);

                        if (dataSetTemp.Tables.Count > 1)
                        {
                            _FormFieldsResponse = CommonFunctions.ConvertDataTableToJson(dataSetTemp.Tables[1]);
                        }

                        if (dataSetTemp.Tables.Count > 2)
                        {
                            _DefaultFormFieldsResponse = CommonFunctions.ConvertDataTableToJson(dataSetTemp.Tables[2]);
                        }

                        if (dataSetTemp.Tables.Count > 3)
                        {
                            _ButtonFieldsResponse = CommonFunctions.ConvertDataTableToJson(dataSetTemp.Tables[3]);
                        }

                        if (dataSetTemp.Tables.Count > 4)
                        {
                            _MasterFormFieldResponse = CommonFunctions.ConvertDataTableToJson(dataSetTemp.Tables[4]);
                        }
                        
                        _FieldTypeJson = CommonFunctions.GetDropDowns("FormFieldTypes");
                        _FieldMaskTypesJson = CommonFunctions.GetDropDowns("FormFieldsMaskType");
                        _FieldDataFormatsJson = CommonFunctions.GetDropDowns("FormFieldDataFormats");
                        _VisibilityFieldOperatorsJson = CommonFunctions.GetDropDowns("VisibilityFieldOperators");
                        _FormFieldDataControllerResponse = CommonFunctions.GetDropDowns("DataItemsControllers");
                        _UserDefinedCategoriesReponse = CommonFunctions.GetDropDowns("UserDefinedCategories");
                        _TableColumnListResponse = CommonFunctions.GetTableColumnsList(_FormId, "");
                        _ChildFormsListResponse = CommonFunctions.GetDropDowns("ChildFormName");
                        _FormActionScopesResponse = CommonFunctions.GetDropDowns("FormActionScopes");
                        _FormActionCommandsResponse = CommonFunctions.GetDropDowns("FormActionCommands");
                        _NavigateFormsListResponse = CommonFunctions.GetDropDowns("NavigationForms", _FormId);
                        _CommandArgumentsResponse = CommonFunctions.GetDropDowns("CommandArguments", _FormId);
                    }
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