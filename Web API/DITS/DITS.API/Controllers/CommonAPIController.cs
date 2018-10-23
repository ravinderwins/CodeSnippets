using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using DITS.Service.IService;
using DITS.Entities.Request;
using DITS.Entities.Common;
using System.IO;
using DITS.Repository;
using Newtonsoft.Json;
using System.Web;

namespace DITS.API.Controllers
{
    [RoutePrefix("CommonAPI")]
    public class CommonAPIController : ApiController
    {
        #region Private
        private HttpResponseMessage httpResponseMessage = null;
        public ICommonService _ICommonService = null;

        #endregion

        public CommonAPIController(ICommonService ICommonService)
        {
            _ICommonService = ICommonService;
        }

        /// <summary>
        /// This API is used for user login.
        /// </summary>
        /// <param name="loginRequest"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("UserLogin")]
        [ActionName("UserLogin")]
        [AllowAnonymous]
        public async Task<HttpResponseMessage> UserLogin(LoginRequest loginRequest)
        {
            try
            {
                httpResponseMessage = new HttpResponseMessage();
                if (ModelState.IsValid && loginRequest != null)
                {
                    var loginResponse = await _ICommonService.Login(loginRequest);
                    httpResponseMessage = Request.CreateResponse(HttpStatusCode.OK, loginResponse);
                }
                else
                {
                    httpResponseMessage = Request.CreateResponse(HttpStatusCode.OK, new { Message = CustomErrorMessages.INVALID_INPUTS, Success = false });
                }
            }
            catch (Exception ex)
            {
                //httpResponseMessage = Request.CreateResponse(HttpStatusCode.OK, APIErrorLog.APIErrorLogToDB(ex, connectionString, userLoginRequest.APILogId));
            }
            return httpResponseMessage;
        }

        /// <summary>
        /// This API is used for register user.
        /// </summary>
        /// <param name="signUpDetails"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("SignUpUser")]
        [ActionName("SignUpUser")]
        public async Task<HttpResponseMessage> SignUpUser(SignUpRequest signUpDetails)
        {
            httpResponseMessage = new HttpResponseMessage();
            if (signUpDetails != null && ModelState.IsValid)
            {
                var signUpUserResponse = await _ICommonService.SignUpUser(signUpDetails);
                httpResponseMessage = Request.CreateResponse(HttpStatusCode.OK, signUpUserResponse);
            }
            else
            {
                httpResponseMessage = Request.CreateResponse(HttpStatusCode.OK, new { Message = CustomErrorMessages.INVALID_INPUTS, Success = false });
            }

            return httpResponseMessage;
        }

        /// <summary>
        /// This API is used for add education detail of user.
        /// </summary>
        /// <param name="educationDetail"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("AddEducationDetails")]
        [ActionName("AddEducationDetails")]
        public async Task<HttpResponseMessage> AddEducationDetails(EducationDetail educationDetail)
        {
            httpResponseMessage = new HttpResponseMessage();
            if (educationDetail != null && ModelState.IsValid)
            {
                var educationDetailResponse = await _ICommonService.addEducationDetail(educationDetail);
                httpResponseMessage = Request.CreateResponse(HttpStatusCode.OK, educationDetailResponse);
            }
            else
            {
                httpResponseMessage = Request.CreateResponse(HttpStatusCode.OK, new { Message = CustomErrorMessages.INVALID_INPUTS, Success = false });
            }

            return httpResponseMessage;
        }


        /// <summary>
        /// This API is used for Get education detail of user.
        /// </summary>
        /// <param name="getEducationRequest"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("GetEducationDetails")]
        [ActionName("GetEducationDetails")]
        public async Task<HttpResponseMessage> GetEducationDetails(GetEducationRequest getEducationRequest)
        {
            httpResponseMessage = new HttpResponseMessage();
            if (ModelState.IsValid)
            {
                var educationDetailResponse = _ICommonService.getEducationDetails(getEducationRequest);
                httpResponseMessage = Request.CreateResponse(HttpStatusCode.OK, educationDetailResponse);
            }
            else
            {
                httpResponseMessage = Request.CreateResponse(HttpStatusCode.OK, new { Message = CustomErrorMessages.INVALID_INPUTS, Success = false });
            }

            return httpResponseMessage;
        }

        /// <summary>
        /// This API is used for delete education detail of user.
        /// </summary>
        /// <param name="deleteEducation"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("DeleteEducation")]
        [ActionName("DeleteEducation")]
        public async Task<HttpResponseMessage> DeleteEducation(DeleteEducation deleteEducation)
        {
            if (deleteEducation != null && ModelState.IsValid)
            {
                httpResponseMessage = new HttpResponseMessage();
                var deleteEducationReponse = await _ICommonService.DeleteEducation(deleteEducation);
                httpResponseMessage = Request.CreateResponse(HttpStatusCode.OK, deleteEducationReponse);
            }
            else
            {
                httpResponseMessage = Request.CreateResponse(HttpStatusCode.OK, new { Message = CustomErrorMessages.INVALID_INPUTS, Success = false });
            }
            return httpResponseMessage;
        }

        /// <summary>
        /// This API is used for add emergency contact of user.
        /// </summary>
        /// <param name="emergencyContactRequest"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("AddEmergencyContacts")]
        [ActionName("AddEmergencyContacts")]
        public async Task<HttpResponseMessage> AddEmergencyContacts(EmergencyContactRequest emergencyContactRequest)
        {
            httpResponseMessage = new HttpResponseMessage();
            if (emergencyContactRequest != null && ModelState.IsValid)
            {
                var educationDetailResponse = await _ICommonService.AddEmergencyContacts(emergencyContactRequest);
                httpResponseMessage = Request.CreateResponse(HttpStatusCode.OK, educationDetailResponse);
            }
            else
            {
                httpResponseMessage = Request.CreateResponse(HttpStatusCode.OK, new { Message = CustomErrorMessages.INVALID_INPUTS, Success = false });
            }

            return httpResponseMessage;
        }

        /// <summary>
        /// This API is used for Get all emergency contact of user.
        /// </summary>
        /// <param name="getEducationRequest"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("GetAllEmergencyContacts")]
        [ActionName("GetAllEmergencyContacts")]
        public async Task<HttpResponseMessage> GetAllEmergencyContacts(GetEducationRequest getEducationRequest)
        {
            httpResponseMessage = new HttpResponseMessage();
            if (ModelState.IsValid)
            {
                var emergencyContactDetailResponse = _ICommonService.GetAllEmergencyContacts(getEducationRequest);
                httpResponseMessage = Request.CreateResponse(HttpStatusCode.OK, emergencyContactDetailResponse);
            }
            else
            {
                httpResponseMessage = Request.CreateResponse(HttpStatusCode.OK, new { Message = CustomErrorMessages.INVALID_INPUTS, Success = false });
            }

            return httpResponseMessage;
        }

        /// <summary>
        /// This API is used for delete emergency contact of user.
        /// </summary>
        /// <param name="getEducationRequest"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("DeleteEmergencyContact")]
        [ActionName("DeleteEmergencyContact")]
        public async Task<HttpResponseMessage> DeleteEmergencyContact(DeleteEmergencyContact deleteEmergencyContact)
        {
            if (deleteEmergencyContact != null && ModelState.IsValid)
            {
                httpResponseMessage = new HttpResponseMessage();
                var deleteEmergencyContactReponse = await _ICommonService.DeleteEmergencyContact(deleteEmergencyContact);
                httpResponseMessage = Request.CreateResponse(HttpStatusCode.OK, deleteEmergencyContactReponse);
            }
            else
            {
                httpResponseMessage = Request.CreateResponse(HttpStatusCode.OK, new { Message = CustomErrorMessages.INVALID_INPUTS, Success = false });
            }
            return httpResponseMessage;
        }

        /// <summary>
        /// This API is used for add work detail of user.
        /// </summary>
        /// <param name="workDetailRequest"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("AddWorkDetails")]
        [ActionName("AddWorkDetails")]
        public async Task<HttpResponseMessage> AddWorkDetails(WorkDetailRequest workDetailRequest)
        {
            httpResponseMessage = new HttpResponseMessage();
            if (workDetailRequest != null && ModelState.IsValid)
            {
                var workDetailResponse = await _ICommonService.AddWorkDetails(workDetailRequest);
                httpResponseMessage = Request.CreateResponse(HttpStatusCode.OK, workDetailResponse);
            }
            else
            {
                httpResponseMessage = Request.CreateResponse(HttpStatusCode.OK, new { Message = CustomErrorMessages.INVALID_INPUTS, Success = false });
            }

            return httpResponseMessage;
        }

        /// <summary>
        /// This API is used for delete work detail of user.
        /// </summary>
        /// <param name="deleteWork"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("DeleteWorkDetail")]
        [ActionName("DeleteWorkDetail")]
        public async Task<HttpResponseMessage> DeleteWorkDetail(DeleteWork deleteWork)
        {
            if (deleteWork != null && ModelState.IsValid)
            {
                httpResponseMessage = new HttpResponseMessage();
                var deleteWorkDetailReponse = await _ICommonService.DeleteWorkDetail(deleteWork);
                httpResponseMessage = Request.CreateResponse(HttpStatusCode.OK, deleteWorkDetailReponse);
            }
            else
            {
                httpResponseMessage = Request.CreateResponse(HttpStatusCode.OK, new { Message = CustomErrorMessages.INVALID_INPUTS, Success = false });
            }
            return httpResponseMessage;
        }

        /// <summary>
        /// This API is used for get work detail of user.
        /// </summary>
        /// <param name="getEducationRequest"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("GetWorkDetails")]
        [ActionName("GetWorkDetails")]
        public async Task<HttpResponseMessage> GetWorkDetails(GetEducationRequest getEducationRequest)
        {
            httpResponseMessage = new HttpResponseMessage();
            if (ModelState.IsValid)
            {
                var workDetailResponse = _ICommonService.GetWorkDetails(getEducationRequest);
                httpResponseMessage = Request.CreateResponse(HttpStatusCode.OK, workDetailResponse);
            }
            else
            {
                httpResponseMessage = Request.CreateResponse(HttpStatusCode.OK, new { Message = CustomErrorMessages.INVALID_INPUTS, Success = false });
            }

            return httpResponseMessage;
        }

        /// <summary>
        /// This API is used for add basic detail of user.
        /// </summary>
        /// <param name="basicInformationRequest"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("AddBasicDetails")]
        [ActionName("AddBasicDetails")]
        public async Task<HttpResponseMessage> AddBasicDetails(BasicInformationRequest basicInformationRequest)
        {
            httpResponseMessage = new HttpResponseMessage();
            if (basicInformationRequest != null && ModelState.IsValid)
            {
                var workDetailResponse = await _ICommonService.AddBasicDetails(basicInformationRequest);
                httpResponseMessage = Request.CreateResponse(HttpStatusCode.OK, workDetailResponse);
            }
            else
            {
                httpResponseMessage = Request.CreateResponse(HttpStatusCode.OK, new { Message = CustomErrorMessages.INVALID_INPUTS, Success = false });
            }

            return httpResponseMessage;
        }

        /// <summary>
        /// This API is used for get basic detail of user.
        /// </summary>
        /// <param name="getEducationRequest"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("GetBasicDetails")]
        [ActionName("GetBasicDetails")]
        public async Task<HttpResponseMessage> GetBasicDetails(GetEducationRequest getEducationRequest)
        {
            httpResponseMessage = new HttpResponseMessage();
            if (ModelState.IsValid)
            {
                var basicDetailResponse = _ICommonService.GetBasicDetails(getEducationRequest);
                httpResponseMessage = Request.CreateResponse(HttpStatusCode.OK, basicDetailResponse);
            }
            else
            {
                httpResponseMessage = Request.CreateResponse(HttpStatusCode.OK, new { Message = CustomErrorMessages.INVALID_INPUTS, Success = false });
            }

            return httpResponseMessage;
        }

        /// <summary>
        /// This API is used for add user detail.
        /// </summary>
        /// <param name="userDetailsRequest"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("AddUserDetails")]
        [ActionName("AddUserDetails")]
        public async Task<HttpResponseMessage> AddUserDetails(UserDetailsRequest userDetailsRequest)
        {
            httpResponseMessage = new HttpResponseMessage();
            if (userDetailsRequest != null && ModelState.IsValid)
            {
                var userDetailResponse = await _ICommonService.AddUserDetails(userDetailsRequest);
                httpResponseMessage = Request.CreateResponse(HttpStatusCode.OK, userDetailResponse);
            }
            else
            {
                httpResponseMessage = Request.CreateResponse(HttpStatusCode.OK, new { Message = CustomErrorMessages.INVALID_INPUTS, Success = false });
            }

            return httpResponseMessage;
        }

        /// <summary>
        /// This API is used for get user detail.
        /// </summary>
        /// <param name="getEducationRequest"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("GetUserDetails")]
        [ActionName("GetUserDetails")]
        public async Task<HttpResponseMessage> GetUserDetails(GetEducationRequest getEducationRequest)
        {
            httpResponseMessage = new HttpResponseMessage();
            if (ModelState.IsValid)
            {
                var basicDetailResponse = _ICommonService.GetUserDetails(getEducationRequest);
                httpResponseMessage = Request.CreateResponse(HttpStatusCode.OK, basicDetailResponse);
            }
            else
            {
                httpResponseMessage = Request.CreateResponse(HttpStatusCode.OK, new { Message = CustomErrorMessages.INVALID_INPUTS, Success = false });
            }

            return httpResponseMessage;
        }

        /// <summary>
        /// This API is used for fill dropdowns.
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        [Route("FillDropdowns")]
        [ActionName("FillDropdowns")]
        public async Task<HttpResponseMessage> FillDropdowns()
        {
            httpResponseMessage = new HttpResponseMessage();
            if (ModelState.IsValid)
            {
                var dropdownResponse = _ICommonService.FillDropdowns();
                httpResponseMessage = Request.CreateResponse(HttpStatusCode.OK, dropdownResponse);
            }
            else
            {
                httpResponseMessage = Request.CreateResponse(HttpStatusCode.OK, new { Message = CustomErrorMessages.INVALID_INPUTS, Success = false });
            }

            return httpResponseMessage;
        }

        /// <summary>
        /// This API is used for Get task detail.
        /// </summary>
        /// <param name="getEducationRequest"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("GetAllTasks")]
        [ActionName("GetAllTasks")]
        public async Task<HttpResponseMessage> GetAllTasks(GetEducationRequest getEducationRequest)
        {
            httpResponseMessage = new HttpResponseMessage();
            if (ModelState.IsValid)
            {
                var getTaskResponse = _ICommonService.GetAllTasks(getEducationRequest);
                httpResponseMessage = Request.CreateResponse(HttpStatusCode.OK, getTaskResponse);
            }
            else
            {
                httpResponseMessage = Request.CreateResponse(HttpStatusCode.OK, new { Message = CustomErrorMessages.INVALID_INPUTS, Success = false });
            }

            return httpResponseMessage;
        }

        /// <summary>
        /// This API is used for add task detail.
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        [Route("CreateTask")]
        [ActionName("CreateTask")]
        public async Task<HttpResponseMessage> CreateTask( )
        {

            httpResponseMessage = new HttpResponseMessage();
            int iUploadedCnt = 0;

            List<string> list = new List<string>();
            // DEFINE THE PATH WHERE WE WANT TO SAVE THE FILES.
            string sPath = "";
            sPath = System.Web.Hosting.HostingEnvironment.MapPath("~/Documents/");

            System.Web.HttpFileCollection hfc = System.Web.HttpContext.Current.Request.Files;

            // CHECK THE FILE COUNT.
            for (int iCnt = 0; iCnt <= hfc.Count - 1; iCnt++)
            {
                System.Web.HttpPostedFile hpf = hfc[iCnt];

                if (hpf.ContentLength > 0)
                {

                    // CHECK IF THE SELECTED FILE(S) ALREADY EXISTS IN FOLDER. (AVOID DUPLICATE)
                    if (!File.Exists(sPath + Path.GetFileName(hpf.FileName)))
                    {

                        // SAVE THE FILES IN THE FOLDER.
                         hpf.SaveAs(sPath + Path.GetFileName(hpf.FileName));
                        var p=(Path.Combine(sPath + (hpf.FileName)));
                        list.Add(p);
                    }
                }
            }

        
            try
            {
                var modelData = JsonConvert.DeserializeObject<TaskRequest>(System.Web.HttpContext.Current.Request.Form["data"]);
                var createTaskResponse = await _ICommonService.CreateTask(modelData, list);
                httpResponseMessage = Request.CreateResponse(HttpStatusCode.OK, createTaskResponse);


            }
            catch (Exception ex)
            {
                
            }
            return httpResponseMessage;
        }
    }
}






    