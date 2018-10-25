using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using Microsoft.ApplicationBlocks.Data;
using System.Data.SqlClient;
using Newtonsoft.Json;
using System.IO;
using System.Configuration;
using System.Drawing.Imaging;
using System.Drawing;

namespace VisualFormBuilder
{
    public class CommonFunctions
    {
        /// <summary>
        /// This method will be used to get Form Fields based on the FormId
        /// </summary>
        /// <param name="formId"></param>
        /// <returns>Returns Form Visual Designer Deta in DataSet format</returns>
        public static DataSet GetVisualDesignerDeta(int formId, bool defaultFields = false)
        {
            DataSet DataSetTemp = null;
            SqlParameter[] SqlParametersCollection = null;
            try
            {
                SqlParametersCollection = new SqlParameter[2];
                SqlParametersCollection[0] = new SqlParameter("@formId", formId);
                SqlParametersCollection[1] = new SqlParameter("@defaultfields", defaultFields);
                DataSetTemp = SqlHelper.ExecuteDataset(connectionString, "sp_GetVisualDesignerDeta", SqlParametersCollection);
                
            }
            catch (Exception Ex)
            {
                throw Ex;
            }
            finally
            {
                SqlParametersCollection = null;
            }
            return DataSetTemp;
        }


        /// <summary>
        /// This method will be used to get Form Fields based on the FormId
        /// </summary>
        /// <param name="formId"></param>
        /// <returns>Returns Form Fields in JSON String Format</returns>
        public static string GetFormFields(int formId, bool defaultFields = false)
        {
            SqlParameter[] SqlParametersCollection = null;
            try
            {
                SqlParametersCollection = new SqlParameter[2];
                SqlParametersCollection[0] = new SqlParameter("@formId", formId);
                SqlParametersCollection[1] = new SqlParameter("@defaultfields", defaultFields);
                DataSet DataSetTemp = SqlHelper.ExecuteDataset(connectionString, "sp_getFormFields", SqlParametersCollection);
                if (DataSetTemp.Tables.Count > 0)
                {
                    return ConvertDataTableToJson(DataSetTemp.Tables[0]);
                }
                else
                    throw new Exception("Form Fields are not available");
            }
            catch (Exception Ex)
            {
                throw Ex;
            }
            finally
            {
                SqlParametersCollection = null;
            }
        }


        /// <summary>
        /// This method will be used to get Previous Form Fields based on the FormId
        /// </summary>
        /// <param name="formId"></param>
        /// <returns>Returns Form Fields in JSON String Format</returns>
        public static string GetPreviousFormFields(int formId)
        {
            SqlParameter[] SqlParametersCollection = null;
            try
            {
                SqlParametersCollection = new SqlParameter[1];
                SqlParametersCollection[0] = new SqlParameter("@formId", formId);
                DataSet DataSetTemp = SqlHelper.ExecuteDataset(connectionString, "sp_getPreviousFormFields", SqlParametersCollection);
                if (DataSetTemp.Tables.Count > 0)
                {
                    return ConvertDataTableToJson(DataSetTemp.Tables[0]);
                }
                else
                    throw new Exception("Form Previous Fields are not available");
            }
            catch (Exception Ex)
            {
                throw Ex;
            }
            finally
            {
                SqlParametersCollection = null;
            }
        }


        /// <summary>
        /// This method will be used to get Previous Form Button Fields based on the FormId
        /// </summary>
        /// <param name="formId"></param>
        /// <returns>Returns Form Fields in JSON String Format</returns>
        public static string GetPreviousFormButtonFields(int formId)
        {
            SqlParameter[] SqlParametersCollection = null;
            try
            {
                SqlParametersCollection = new SqlParameter[1];
                SqlParametersCollection[0] = new SqlParameter("@formId", formId);
                DataSet DataSetTemp = SqlHelper.ExecuteDataset(connectionString, "sp_getPreviousFormButtonFields", SqlParametersCollection);
                if (DataSetTemp.Tables.Count > 0)
                {
                    return ConvertDataTableToJson(DataSetTemp.Tables[0]);
                }
                else
                    throw new Exception("Form Previous Fields are not available");
            }
            catch (Exception Ex)
            {
                throw Ex;
            }
            finally
            {
                SqlParametersCollection = null;
            }
        }


        /// <summary>
        /// This method will be used to Form Details based on Form Id
        /// </summary>
        /// <param name="formId"></param>
        /// <returns>Returns the Form Details in JSON String format</returns>
        public static string GetFormDetails(int formId)
        {
            SqlParameter[] SqlParametersCollection = null;
            try
            {
                SqlParametersCollection = new SqlParameter[1];
                SqlParametersCollection[0] = new SqlParameter("@formId", formId);
                DataSet DataSetTemp = SqlHelper.ExecuteDataset(connectionString, "sp_getFormDetails", SqlParametersCollection);
                if (DataSetTemp.Tables.Count > 0)
                {
                    return ConvertDataSetToJson(DataSetTemp);
                }
                else
                    throw new Exception("Form Details is not available");
            }
            catch (Exception Ex)
            {
                throw Ex;
            }
            finally
            {
                SqlParametersCollection = null;
            }
        }

        public static string GetFormVersionList(int formID)
        {
            string JsonResponse = String.Empty;
            DataSet DataSetTemp = null;
            int RecordsCount = 0;
            SqlParameter[] SqlParametersCollection = null;
            try
            {
                SqlParametersCollection = new SqlParameter[1];
                SqlParametersCollection[0] = new SqlParameter("FormID", formID);
                DataSetTemp = SqlHelper.ExecuteDataset(connectionString, "sp_getFormVersionList", SqlParametersCollection);

                if (DataSetTemp.Tables.Count > 0)
                {
                    if (DataSetTemp.Tables[0].Rows.Count > 0)
                    {
                        DataSetTemp.Tables[0].TableName = "FormVersionList";
                    }
                    JsonResponse = ConvertDataTableToJson(DataSetTemp.Tables[0]);

                    RecordsCount = DataSetTemp.Tables[0].Rows.Count;
                }
            }
            catch (Exception Ex)
            {
                throw Ex;
            }
            finally
            {
                SqlParametersCollection = null;
            }
            JsonResponse = "{\"data\":" + JsonResponse + ", \"recordsTotal\":" + RecordsCount + "}";
            return JsonResponse;
        }

        public static bool CreateChildForm(int formID, int childFormID, string relationship, int comapanyID)
        {
            SqlParameter[] SqlParametersCollection = null;
            try
            {
                SqlParametersCollection = new SqlParameter[4];
                SqlParametersCollection[0] = new SqlParameter("@formId", formID);
                SqlParametersCollection[1] = new SqlParameter("@childformId", childFormID);
                SqlParametersCollection[2] = new SqlParameter("@relationship", relationship);
                SqlParametersCollection[3] = new SqlParameter("@companyid", comapanyID);

                int recordsAffected = Convert.ToInt32(SqlHelper.ExecuteNonQuery(connectionString, "sp_CreateChildForm", SqlParametersCollection));

                if (recordsAffected > 0)
                    return true;
                else
                    return false;
            }
            catch (Exception Ex)
            {
                throw Ex;
            }
            finally
            {
                SqlParametersCollection = null;
            }
        }
        
        /// <summary>
        /// This method will be used to get JSON for the Form data List page based on the  parameters passed with Sorting optionss
        /// </summary>
        /// <param name="formType"></param>
        /// <param name="formCategory"></param>
        /// <param name="formLocation"></param>
        /// <param name="formDependencyLevel"></param>
        /// <param name="orderBy"></param>
        /// <param name="orderDirection"></param>
        /// <returns>JSON String of the Datatable</returns>
        public static string GetFormDataList(int formType, int formCategory, int formLocation, int formDependencyLevel, string orderBy, string orderDirection, int offset, int length)
        {
            SqlParameter[] SqlParametersCollection = null;
            try
            {
                SqlParametersCollection = new SqlParameter[8];
                SqlParametersCollection[0] = new SqlParameter("FormType", formType);
                SqlParametersCollection[1] = new SqlParameter("FormCategory", formCategory);
                SqlParametersCollection[2] = new SqlParameter("FormLocation", formLocation);
                SqlParametersCollection[3] = new SqlParameter("FormDependencyLevel", formDependencyLevel);
                SqlParametersCollection[4] = new SqlParameter("OrderBy", orderBy);
                SqlParametersCollection[5] = new SqlParameter("OrderDirection", orderDirection);
                SqlParametersCollection[6] = new SqlParameter("Offset", offset);
                SqlParametersCollection[7] = new SqlParameter("Length", length);
                DataSet DataSetTemp = SqlHelper.ExecuteDataset(connectionString, "sp_getVisualWebForms", SqlParametersCollection);

                if (DataSetTemp.Tables.Count > 0)
                {
                    int totalRecords = 0;
                    if (DataSetTemp.Tables[0].Rows.Count > 0)
                    {
                        DataSetTemp.Tables[0].TableName = "FormDataList";
                    }

                    if (DataSetTemp.Tables.Count > 1 && DataSetTemp.Tables[1].Rows.Count > 0) {
                        totalRecords = DataSetTemp.Tables[1].Rows[0]["TotalRecords"] != null ? Convert.ToInt32(DataSetTemp.Tables[1].Rows[0]["TotalRecords"]) : 0;
                    }

                    string JsonResponse = ConvertDataTableToJson(DataSetTemp.Tables[0]);
                    JsonResponse = "{\"data\":" + JsonResponse + ", \"recordsTotal\":" + totalRecords + ",\"recordsFiltered\":" + totalRecords + "}";
                    return JsonResponse;
                }
                else
                    throw new Exception("Form data list are not available");
            }
            catch (Exception Ex)
            {
                throw Ex;
            }
            finally
            {
                SqlParametersCollection = null;
            }
        }

        /// <summary>
        /// This method wil be used to save the fields from Form Editor. Form Data will have all the controls in XML format.
        /// </summary>
        /// <param name="FormId"></param>
        /// <param name="CompanyId"></param>
        /// <param name="FormData"></param>
        /// <param name="ModifiedBy"></param>
        /// <returns>Returns Boolean based on success or failure of Save</returns>
        public static bool saveFormDataValues(int FormId, int CompanyId, string FormData, string ButtonData, string ModifiedBy)
        {
            SqlParameter[] SqlParametersCollection = null;
            try
            {
                SqlParametersCollection = new SqlParameter[5];
                SqlParametersCollection[0] = new SqlParameter("FormId", FormId);
                SqlParametersCollection[1] = new SqlParameter("CompanyId", CompanyId);
                SqlParametersCollection[2] = new SqlParameter("FormData", FormData);
                SqlParametersCollection[3] = new SqlParameter("ButtonData", ButtonData);
                SqlParametersCollection[4] = new SqlParameter("ModifiedBy", ModifiedBy);

                int recordsAffected = SqlHelper.ExecuteNonQuery(connectionString, "sp_InsertModifyFormData", SqlParametersCollection);
                if (recordsAffected > 0)
                    return true;
                else
                    return false;
            }
            catch (Exception Ex)
            {
                throw Ex;
            }
            finally
            {
                SqlParametersCollection = null;
            }
        }


        /// <summary>
        /// Tihs method will be used to save Form Details based on the parameters passed along with JSON in FormDetails
        /// </summary>
        /// <param name="CompanyId"></param>
        /// <param name="FormDetails"></param>
        /// <param name="ModifiedBy"></param>
        /// <param name="FormId"></param>
        /// <returns>Returns Boolean based on the success/failure of Save</returns>
        public static bool saveForm(int CompanyId, string FormDetails, string ModifiedBy, ref int FormId)
        {
            SqlParameter[] SqlParametersCollection = null;
            try
            {

                SqlParametersCollection = new SqlParameter[3];
                SqlParametersCollection[0] = new SqlParameter("CompanyId", CompanyId);
                SqlParametersCollection[1] = new SqlParameter("FormDetails", FormDetails);
                SqlParametersCollection[2] = new SqlParameter("ModifiedBy", ModifiedBy);
                FormId = Convert.ToInt32(SqlHelper.ExecuteScalar(connectionString, "sp_InsertModifyForm", SqlParametersCollection));
                if (FormId > 0) return true;
                else return false;
            }
            catch (Exception Ex)
            {
                throw Ex;
            }
            finally
            {
                SqlParametersCollection = null;
            }
        }

        public static Boolean RestorePreviousVersion(int formID)
        {
            SqlParameter[] SqlParametersCollection = null;
            try
            {

                SqlParametersCollection = new SqlParameter[1];
                SqlParametersCollection[0] = new SqlParameter("FormID", formID);
                int recordsAffected = Convert.ToInt32(SqlHelper.ExecuteNonQuery(connectionString, "sp_RestorePreviousVersion", SqlParametersCollection));

                if (recordsAffected > 0)
                    return true;
                else
                    return false;
            }
            catch (Exception Ex)
            {
                throw Ex;
            }
            finally
            {
                SqlParametersCollection = null;
            }
        }

        public static string GetTableColumnsList(int formID = -1, string tableName = "")
        {
            SqlParameter[] SqlParametersCollection = null;
            try
            {
                SqlParametersCollection = new SqlParameter[2];
                SqlParametersCollection[0] = new SqlParameter("formid", formID);
                SqlParametersCollection[1] = new SqlParameter("tablename", tableName);
                DataSet DataSetTemp = SqlHelper.ExecuteDataset(connectionString, "sp_GetTableColumnsList", SqlParametersCollection);
                if (DataSetTemp.Tables.Count > 0)
                {
                    return ConvertDataTableToJson(DataSetTemp.Tables[0]);
                }
                else
                    throw new Exception("Columns list are not available");
            }
            catch (Exception Ex)
            {
                throw Ex;
            }
            finally
            {

            }
        }

        /// <summary>
        /// This method will be used to get all Dropdown data in one go. We can add parameters on later go.
        /// </summary>
        /// <returns>Dataset with FormLocation,FormType,FormCategory,FormDependencyLevel Tables</returns>
        public static string GetDropDowns(string dropdownName = "ALL", int keyValue = -1)
        {
            SqlParameter[] SqlParametersCollection = null;
            try
            {
                SqlParametersCollection = new SqlParameter[2];
                SqlParametersCollection[0] = new SqlParameter("@dropDownName", dropdownName);
                SqlParametersCollection[1] = new SqlParameter("@KeyValue", keyValue);
                DataSet DataSetTemp = SqlHelper.ExecuteDataset(connectionString, "sp_getDataForDropDown", SqlParametersCollection);
                if (DataSetTemp.Tables.Count > 0)
                {
                    if (dropdownName == "ALL")
                    {
                        DataSetTemp.Tables[0].TableName = "FormLocation";
                        DataSetTemp.Tables[1].TableName = "FormType";
                        DataSetTemp.Tables[2].TableName = "FormCategory";
                        DataSetTemp.Tables[3].TableName = "FormDepedencyLevel";
                        DataSetTemp.Tables[4].TableName = "ParentFormName";
                        DataSetTemp.Tables[5].TableName = "DisplayStyle";

                        return ConvertDataSetToJson(DataSetTemp);
                    }
                    else
                    {
                        return ConvertDataTableToJson(DataSetTemp.Tables[0]);
                    }
                }
                else
                    throw new Exception("AllDropDowns are not available");
            }
            catch (Exception Ex)
            {
                throw Ex;
            }
            finally
            {
                SqlParametersCollection = null;
            }
        }

        #region Image Processing & Upload file 
        public static string saveImageInFolder(string imageBase64, int formId)
        {
            byte[] imageBytes = Convert.FromBase64String(imageBase64);
            MemoryStream ms = new MemoryStream(imageBytes, 0, imageBytes.Length);

            // Convert byte[] to Image
            ms.Write(imageBytes, 0, imageBytes.Length);
            System.Drawing.Image image = System.Drawing.Image.FromStream(ms, true);

            string newFile = ConfigurationManager.AppSettings["ImageFileNamePrefix"] + Convert.ToString(formId) + ".jpg";

            string PartialFilePath = ConfigurationManager.AppSettings["ImageFileUploadPath"];
            string FilePath = "~" + PartialFilePath;

            bool exists = System.IO.Directory.Exists(HttpContext.Current.Server.MapPath(FilePath));

            if (!exists)
            {
                System.IO.Directory.CreateDirectory(HttpContext.Current.Server.MapPath(FilePath));
            }

            var path = Path.Combine(HttpContext.Current.Server.MapPath(FilePath), newFile);

            FileInfo file = new FileInfo(path);
            if (file.Exists)
            {
                file.Delete();
            }

            image.Save(path, ImageFormat.Jpeg);

            return path;
        }

        public static string FormImageFilePath(int formId) {
            string file = ConfigurationManager.AppSettings["ImageFileNamePrefix"] + Convert.ToString(formId) + ".jpg";

            string PartialFilePath = ConfigurationManager.AppSettings["ImageFileUploadPath"];
            string FilePath = "~" + PartialFilePath;

            var path = Path.Combine(HttpContext.Current.Server.MapPath(FilePath), file);

            if (!File.Exists(path))
                return null;

            return path;
        }
        
        public static string convertToBase64(string filepath)
        {
            using (Image image = Image.FromFile(filepath))
            {
                using (MemoryStream m = new MemoryStream())
                {
                    image.Save(m, image.RawFormat);
                    byte[] imageBytes = m.ToArray();

                    // Convert byte[] to Base64 String
                    string base64String = Convert.ToBase64String(imageBytes);
                    return base64String;
                }
            }
        }
        #endregion

        #region Data to Json convert or vice-versa
        /// <summary>
        /// This method will be used to convert DataSet to JSON string
        /// </summary>
        /// <param name="TempDataSet"></param>
        /// <returns>Returns string in JSON format</returns>
        private static string ConvertDataSetToJson(DataSet TempDataSet)
        {
            string JSONString = string.Empty;
            JSONString = JsonConvert.SerializeObject(TempDataSet);
            return JSONString;
        }


        /// <summary>
        /// This method will be used to convert Datatable to JSON string
        /// </summary>
        /// <param name="TempDataTable"></param>
        /// <returns>Returns string in JSON format</returns>
        public static string ConvertDataTableToJson(DataTable TempDataTable)
        {
            string JSONString = string.Empty;
            JSONString = JsonConvert.SerializeObject(TempDataTable);
            return JSONString;
        }


        /// <summary>
        /// This method will be used to JSON string to DataSet
        /// </summary>
        /// <param name="TempDataSet"></param>
        /// <returns>Returns DataSet from JSON string</returns>
        public static DataSet ConvertJsonToDataSet(string json)
        {
            DataSet TempDataSet = JsonConvert.DeserializeObject<DataSet>(json);
            return TempDataSet;
        }

        /// <summary>
        /// This method will be used to JSON string to DataTable
        /// </summary>
        /// <param name="TempDataTable"></param>
        /// <returns>Returns DataSet from JSON string</returns>
        public static DataTable ConvertJsonToDataTable(string json)
        {
            DataTable TempDataTable = JsonConvert.DeserializeObject<DataTable>(json);
            return TempDataTable;
        }

        #endregion
    }

}