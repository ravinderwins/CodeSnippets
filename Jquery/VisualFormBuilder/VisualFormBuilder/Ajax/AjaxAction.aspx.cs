using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Xml;
using Newtonsoft.Json;


namespace VisualFormBuilder
{
    public partial class AjaxAction : System.Web.UI.Page
    {
        public string ConnectionString { get; set; }


        protected void Page_Load(object sender, EventArgs e)
        {
            string jsonResponse = string.Empty;
            if (Request.QueryString["Action"] != null && Request.QueryString["Action"] == "FormDataListing")
            {
                int formType = -1;
                int formCategory = -1;
                int formLocation = -1;
                int formDependencyLevel = -1;
                string orderBy = "";
                string orderDirection = "";
                int offset = 0;
                int length = 50;

                formType = Request.QueryString["FormType"] == null ? -1 : Convert.ToInt32(Request.QueryString["FormType"]);
                formCategory = Request.QueryString["FormCategory"] == null ? -1 : Convert.ToInt32(Request.QueryString["FormCategory"]);
                formLocation = Request.QueryString["FormLocation"] == null ? -1 : Convert.ToInt32(Request.QueryString["FormLocation"]);
                formDependencyLevel = Request.QueryString["FormDependencyLevel"] == null ? -1 : Convert.ToInt32(Request.QueryString["FormDependencyLevel"]);
                if (Request.QueryString["order[0][column]"] != null && Convert.ToString(Request.QueryString["order[0][column]"]) != "")
                    orderBy = Convert.ToString(Request.QueryString["order[0][column]"]);
                if (Request.QueryString["order[0][dir]"] != null && Convert.ToString(Request.QueryString["order[0][dir]"]) != "")
                    orderDirection = Convert.ToString(Request.QueryString["order[0][dir]"]);

                offset = Request.QueryString["start"] == null ? 0 : Convert.ToInt32(Request.QueryString["start"]);
                length = Request.QueryString["length"] == null ? 50 : Convert.ToInt32(Request.QueryString["length"]);

                jsonResponse = CommonFunctions.GetFormDataList(formType, formCategory, formLocation, formDependencyLevel, orderBy, orderDirection, offset, length);

            }
            else if (Request.QueryString["Action"] != null && Request.QueryString["Action"] == "FormVersionListing")
            {
                int formID = -1;

                if (Request.QueryString["FormID"] != null && Convert.ToInt32(Request.QueryString["FormID"]) > 0)
                {
                    formID = Convert.ToInt32(Request.QueryString["FormID"]);
                    jsonResponse = CommonFunctions.GetFormVersionList(formID);
                }
            }
            else if (Request.QueryString["Action"] != null && Request.QueryString["Action"] == "LoadDropDowns")
            {
                jsonResponse = CommonFunctions.GetDropDowns("ALL", 1);
                jsonResponse = "{\"data\":" + jsonResponse + "}";
            }
            else if (Request.QueryString["Action"] != null && Request.QueryString["Action"] == "SaveFormData")
            {
                int FormId = Convert.ToInt32(Request.QueryString["FormId"]);
                string FormData = Request.Form["FormData"];
                string ButtonData = Request.Form["ButtonData"];
                string ImageBase64 = Request.Form["ImageBase64"];

                XmlDocument doc = JsonConvert.DeserializeXmlNode(FormData);
                XmlDocument btndoc = JsonConvert.DeserializeXmlNode(ButtonData);

                Boolean result = CommonFunctions.saveFormDataValues(FormId, 1, doc.InnerXml, btndoc.InnerXml, "admin");

                if (result)
                {
                    CommonFunctions.saveImageInFolder(ImageBase64, FormId);
                }

                jsonResponse = "{\"data\":{\"Result\":\"" + result.ToString() + "\"}}";
            }
            else if (Request.QueryString["Action"] != null && Request.QueryString["Action"] == "SaveForm")
            {
                int FormId = -1;
                if (Session["CurrentFormId"] != null)
                    FormId = Convert.ToInt32(Session["CurrentFormId"]);
                string FormData = Request.Form["FormData"];
                XmlDocument doc = JsonConvert.DeserializeXmlNode(FormData);
                jsonResponse = "{\"data\":{\"Result\":\"" + CommonFunctions.saveForm(1, doc.InnerXml, "1", ref FormId).ToString() + "\",\"FormId\":" + FormId.ToString() + "}}";
            }
            else if (Request.QueryString["Action"] != null && Request.QueryString["Action"] == "getTableColumnsList")
            {
                int formID = Request.QueryString["FormID"] != null && Request.QueryString["FormID"] != ""? Convert.ToInt32(Request.QueryString["FormID"]): -1;
                string tableName = Convert.ToString(Request.QueryString["TableName"]);
                jsonResponse = CommonFunctions.GetTableColumnsList(formID, tableName);
                jsonResponse = "{\"data\":" + jsonResponse + "}";
            }
            else if (Request.QueryString["Action"] != null && Request.QueryString["Action"] == "FormDetails")
            {
                int FormID = -1;
                Boolean result = false;
                string data = string.Empty;

                if (Request.QueryString["FormID"] != null && Convert.ToInt32(Request.QueryString["FormID"]) > 0)
                {
                    FormID = Convert.ToInt32(Request.QueryString["FormID"]);

                    data = CommonFunctions.GetFormDetails(FormID);
                    result = true;
                }

                jsonResponse = "{\"data\": " + data + ", \"success\":\"" + result.ToString() + "\"}";
            }
            else if (Request.QueryString["Action"] != null && Request.QueryString["Action"] == "CreateChildForm")
            {
                int formID = -1;
                int childFormID = -1;
                bool result = false;
                string message = string.Empty;
                try
                {
                    if (Request.QueryString["FormID"] != null && Convert.ToInt32(Request.QueryString["FormID"]) > 0)
                    {
                        formID = Convert.ToInt32(Request.QueryString["FormID"]);

                        childFormID = Convert.ToInt32(Request.Form["form"]);
                        string relationship = Convert.ToString(Request.Form["relationship"]);

                        if (childFormID > 0)
                        {
                            result = CommonFunctions.CreateChildForm(formID, childFormID, relationship, 1);
                        }
                        else
                        {
                            message = "Please select form id.";
                        }
                    }
                }
                catch (Exception ex)
                {
                    message = ex.Message;
                }

                jsonResponse = "{\"message\": \"" + message + "\", \"success\":" + result.ToString().ToLower() + ", \"ChildFormID\":" + childFormID + "}";
            }
            else if (Request.QueryString["Action"] != null && Request.QueryString["Action"] == "FormFields")
            {
                int childFormID = -1;
                bool success = false;
                string message = string.Empty;
                string result = string.Empty;
                try
                {
                    if (Request.QueryString["ChildFormID"] != null && Convert.ToInt32(Request.QueryString["ChildFormID"]) > 0)
                    {
                        childFormID = Convert.ToInt32(Request.QueryString["ChildFormID"]);
                        
                        if (childFormID > 0)
                        {
                            result = CommonFunctions.GetFormFields(childFormID);
                            success = true;
                        }
                        else
                        {
                            message = "Form id is not valid.";
                        }
                    }
                }
                catch (Exception ex)
                {
                    message = ex.Message;
                }

                jsonResponse = "{\"message\": \"" + message + "\", \"success\":" + success.ToString().ToLower() + ", \"data\":" + result + ", \"childFormId\": " + childFormID + "}";
            }
            else if (Request.QueryString["Action"] != null && Request.QueryString["Action"] == "RestorePreviousVersion")
            {
                int FormID = -1;
                Boolean result = false;

                if (Request.QueryString["FormID"] != null && Convert.ToInt32(Request.QueryString["FormID"]) > 0)
                {
                    FormID = Convert.ToInt32(Request.QueryString["FormID"]);

                    result = CommonFunctions.RestorePreviousVersion(FormID);

                }

                jsonResponse = "{\"data\":{\"Result\":\"" + result.ToString() + "\"}}";
            }
            else if (Request.QueryString["Action"] != null && Request.QueryString["Action"] == "generateBRD")
            {
                int FormId = -1;
                FormId = Convert.ToInt32(Request.QueryString["FormId"]);

                string formName = String.Empty;
                string htmlString = String.Empty;

                htmlString += "<h2 align='center'>Business Requirements Document for '{0}'</h2>" +
                                        "<p align='right'>{1}</p>" +
                                        "<table border='1' cellspacing='0'>" +
                                            "<tr>" +
                                                "<th>Category</th>" +
                                                "<th>Field Name</th>" +
                                                "<th>Field Type</th>" +
                                                "<th>Field Size (Col and Rows)</ th>" +
                                                "<th>Character Length</ th>" +
                                                "<th>Required?</ th>" +
                                                "<th>Read Only?</ th>" +
                                                "<th>UDO values</ th>" +
                                                "<th>Logic/Comments on field</ th>" +
                                                "<th>Comments on form/tab</ th>" +
                                            "</tr>" +
                                            "{2}" +
                                        "</table>" +
                                        "<img src='data:image/jpeg;base64, {3}' />";

                string formDetails = CommonFunctions.GetFormDetails(FormId);

                DataSet formDetailsDataSet = CommonFunctions.ConvertJsonToDataSet(formDetails);

                if (formDetailsDataSet != null
                        && formDetailsDataSet.Tables.Count > 0
                            && formDetailsDataSet.Tables[0].Rows.Count > 0)
                {

                    DataRow DR = formDetailsDataSet.Tables[0].Rows[0];
                    formName = Convert.ToString(DR["FormName"]);
                    string currentDateTime = DateTime.Now.ToString("dddd, dd MMMM yyyy hh:mm tt");
                    string imageFilePath = CommonFunctions.FormImageFilePath(FormId);

                    if (String.IsNullOrWhiteSpace(imageFilePath))
                    {
                        jsonResponse = "{\"data\": \"Designer Image of this form is not exist. Please save the form from designer view.\"}";
                        Response.Clear();
                        Response.ContentType = "application/json; charset=utf-8";
                        Response.Write(jsonResponse);
                        Response.End();
                        return;
                    }

                    string formFields = CommonFunctions.GetFormFields(FormId);
                    System.Data.DataTable formFieldsDataTable = CommonFunctions.ConvertJsonToDataTable(formFields);

                    string fieldsString = String.Empty;

                    if (formFieldsDataTable != null && formFieldsDataTable.Rows.Count > 0)
                    {
                        string OldCategoryID = String.Empty;
                        string NewCatgoryID = String.Empty;
                        string CategoryName = String.Empty;

                        int RowSpan = 1;

                        string TableDataString = "<td>{0}</td>";
                        for (int i = 0; i < formFieldsDataTable.Rows.Count; i++)
                        {
                            DR = formFieldsDataTable.Rows[i];
                            fieldsString += "<tr>";

                            NewCatgoryID = Convert.ToString(DR["CategoryID"]);
                            CategoryName = Convert.ToString(DR["CategoryName"]);

                            if (String.IsNullOrWhiteSpace(NewCatgoryID) || NewCatgoryID != OldCategoryID)
                            {
                                if (!String.IsNullOrWhiteSpace(NewCatgoryID) && Convert.ToInt32(NewCatgoryID) > 0)
                                {
                                    RowSpan = formFieldsDataTable.Select("CategoryID = " + NewCatgoryID).Length;
                                    fieldsString += "<td rowspan='" + Convert.ToString(RowSpan) + "'> " + CategoryName + "</td>";
                                }
                                else
                                {
                                    fieldsString += String.Format(TableDataString, CategoryName);
                                }
                            }


                            fieldsString += String.Format(TableDataString, Convert.ToString(DR["FieldName"]));
                            fieldsString += String.Format(TableDataString, Convert.ToString(DR["FieldTypeDescription"]));

                            fieldsString += String.Format(TableDataString, (Convert.ToInt32(DR["Columns"]) > 0 ? Convert.ToString(DR["Columns"]) + " Columns" + (Convert.ToInt32(DR["Rows"]) > 0 ? ", " + Convert.ToString(DR["Rows"]) + " Rows" : "") : "N/A"));
                            fieldsString += String.Format(TableDataString, (DR["Maxlength"] != DBNull.Value ? Convert.ToString(DR["Maxlength"]) : "N/A"));
                            fieldsString += String.Format(TableDataString, (Convert.ToBoolean(DR["Required"]) ? "Yes" : "No"));
                            fieldsString += String.Format(TableDataString, (Convert.ToBoolean(DR["IsReadOnly"]) ? "Yes" : "No"));
                            fieldsString += String.Format(TableDataString, (DR["ItemsDataController"] != DBNull.Value ? Convert.ToString(DR["ItemsDataController"]) + "<br />" + Convert.ToString(DR["ItemsDataValueField"]) + "<br />" + Convert.ToString(DR["ItemsDataTextField"]) : "N/A"));
                            fieldsString += String.Format(TableDataString, "");
                            fieldsString += String.Format(TableDataString, "");

                            fieldsString += "</tr>";

                            OldCategoryID = NewCatgoryID;
                        }
                    }

                    string imageBase64 = CommonFunctions.convertToBase64(imageFilePath);

                    htmlString = String.Format(htmlString, formName, currentDateTime, fieldsString, imageBase64);
                }


                /** Generate Word Document **/
                Response.ContentType = "application/msword";
                Response.ContentEncoding = System.Text.UnicodeEncoding.UTF8;
                Response.Charset = "UTF-8";
                Response.AddHeader("content-disposition", "attachment; filename=" + formName + ".doc");

                Response.Write("<html>");
                Response.Write("<head>");
                Response.Write("<META HTTP-EQUIV=Content-Type CONTENT=text/html charset=UTF-8");
                Response.Write("<meta name=progId content=Word.Document>");
                Response.Write("<meta name=Generator content=Microsoft Word 9>");
                Response.Write("<meta name=Originator content=Microsoft Word 9>");
                Response.Write("<style>");
                Response.Write("@page Section1 {size:595.45pt 841.7pt; margin:1.0in 1.25in 1.0in 1.25in;mso-header-margin:.5in;mso-footer-margin:.5in;mso-paper-source:0;}");
                Response.Write("div.Section1 {page:Section1;}"); //Portrait
                Response.Write("@page Section2 {size:841.7pt 595.45pt;mso-page-orientation: landscape;margin:1.25in 1.0in 1.25in 1.0in;mso-header-margin:.5in; mso-footer-margin:.5in;mso-paper-source:0;}");
                Response.Write("div.Section2 {page:Section2;}");  //Landscape
                Response.Write("</style>");
                Response.Write("</head>");
                Response.Write("<body>");
                Response.Write("<div class=Section2>");
                Response.Write(htmlString);
                Response.Write("</div>");
                Response.Write("</body>");
                Response.Write("</html>");
                Response.End();
                Response.Flush();
            }

            if (Request.QueryString["Action"] != "generateBRD")
            {
                Response.Clear();
                Response.ContentType = "application/json; charset=utf-8";
                Response.Write(jsonResponse);
                Response.End();
            }

        }
    }
}