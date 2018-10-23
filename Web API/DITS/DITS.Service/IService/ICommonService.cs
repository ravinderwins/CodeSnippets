using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DITS.Repository.IRepository;
using DITS.Service.IService;
using DITS.Entities.Request;
using DITS.Entities.Response;

namespace DITS.Service.IService
{
  public  interface ICommonService
    {

        Task<BaseResponse> SignUpUser(SignUpRequest signUpRequest);
        Task<LoginResponse> Login(LoginRequest loginRequest);
        Task<SaveEducationResponse> addEducationDetail(EducationDetail educationDetail);
        List<EducationDetail> getEducationDetails(GetEducationRequest getEducationRequest);
        Task<BaseResponse> DeleteEducation(DeleteEducation deleteEducation);
        Task<SaveEmergencyContactResponse> AddEmergencyContacts(EmergencyContactRequest emergencyContactRequest);
        List<EmergencyContactRequest> GetAllEmergencyContacts(GetEducationRequest getEducationRequest);
        Task<BaseResponse> DeleteEmergencyContact(DeleteEmergencyContact deleteEmergencyContact);
        Task<SaveWorkDetailResponse> AddWorkDetails(WorkDetailRequest workDetailRequest);
        Task<BaseResponse> DeleteWorkDetail(DeleteWork deleteWork);
        List<WorkDetailRequest> GetWorkDetails(GetEducationRequest getEducationRequest);
        List<BasicInformationRequest> GetBasicDetails(GetEducationRequest getEducationRequest);
        Task<SaveBasicDetailResponse> AddBasicDetails(BasicInformationRequest basicInformationRequest);
        Task<SaveUserDetailResponse> AddUserDetails(UserDetailsRequest userDetailsRequest);
        List<UserDetailsRequest> GetUserDetails(GetEducationRequest getEducationRequest);
        Task<GetDropdownResponse> FillDropdowns();
        Task<BaseResponse> CreateTask(TaskRequest taskRequest,List<string> list);
        List<TaskRequest> GetAllTasks(GetEducationRequest getEducationRequest);

    }
}
