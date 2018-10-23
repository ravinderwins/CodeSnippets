// API Application url.
export const SITE_URL: string = "http://localhost:64519";

export class APIURLS {
  public static get SIGN_UP_API(): string {
    return SITE_URL + "/CommonAPI/SignUpUser";
  }
  public static get LOG_IN_API(): string {
    return SITE_URL + "/CommonAPI/UserLogin?id=";
  }
  public static get SAVE_EDUCATION_API(): string {
    return SITE_URL + "/CommonAPI/AddEducationDetails";
  }

  public static get DELETE_EDUCATION_API(): string {
    return SITE_URL + "/CommonAPI/DeleteEducation";
  }

  public static get GET_EDUCATION_API(): string {
    return SITE_URL + "/CommonAPI/GetEducationDetails";
  }
  public static get SAVE_EMERGENCY_CONTACTS_API(): string {
    return SITE_URL + "/CommonAPI/AddEmergencyContacts";
  }

  public static get GET_EMERGENCY_CONTACT_API(): string {
    return SITE_URL + "/CommonAPI/GetAllEmergencyContacts";
  }

  public static get DELETE_EMERGENCY_CONTACT_API(): string {
    return SITE_URL + "/CommonAPI/DeleteEmergencyContact";
  }

  public static get SAVE_WORK_DETAILS_API(): string {
    return SITE_URL + "/CommonAPI/AddWorkDetails";
  }

  public static get GET_WORK_DETAILS_API(): string {
    return SITE_URL + "/CommonAPI/GetWorkDetails";
  }

  public static get DELETE_WORK_API(): string {
    return SITE_URL + "/CommonAPI/DeleteWorkDetail";
  }

  public static get GET_BASIC_DETAILS_API(): string {
    return SITE_URL + "/CommonAPI/GetBasicDetails";
  }

  public static get SAVE_BASIC_DETAILS_API(): string {
    return SITE_URL + "/CommonAPI/AddBasicDetails";
  }

  public static get GET_CONTACT_DETAILS_API(): string {
    return SITE_URL + "/CommonAPI/GetUserDetails";
  }

  public static get SAVE_CONTACT_DETAILS_API(): string {
    return SITE_URL + "/CommonAPI/AddUserDetails";
  }

  public static get FILL_DROPDOWNS_API(): string {
    return SITE_URL + "/CommonAPI/FillDropdowns";
  }

  public static get SAVE_TASK_API(): string {
    return SITE_URL + "/CommonAPI/CreateTask";
  }

  public static get GET_ALL_TASKS_API(): string {
    return SITE_URL + "/CommonAPI/GetAllTasks";
  }
}
