export default class Config {
  // static baseUrl = "https://eventsphere-backend-3.onrender.com/api/v1";
  static imageBaseUrl = "https://firebasestorage.googleapis.com/v0/b/stuhub-36067.firebasestorage.app/o";

  static baseUrl = 'http://127.0.0.1:8080/api/v1'

  static categoryImgBaseUrl = `${this.imageBaseUrl}/`;
  static eventCoverImgBaseUrl = `${this.imageBaseUrl}/ev_cover_img/`;
  static eventMainImgBaseUrl = `${this.imageBaseUrl}/ev_main_img/`;
  static eventSubImgBaseUrl = `${this.imageBaseUrl}/ev_sub_img/`;
  static internalTeamImgBaseUrl = `${this.imageBaseUrl}/internal_team_img/`;
  static orgIdCardImgBaseUrl = `${this.imageBaseUrl}/org_id_card/`;
  static orgNOCImgBaseUrl = `${this.imageBaseUrl}/org_noc/`;
  static organizerProfileImgBaseUrl = `${this.imageBaseUrl}/organizer_profile/`;
  static userProfileImgBaseUrl = `${this.imageBaseUrl}/user_profile/`;
  static verifiedUserImgBaseUrl = `${this.imageBaseUrl}/verified_user/`;


  static login = "/admin/login";
  static createInternalTeam = "/admin/internal-teams/create";
  static deleteInternalTeam = "/admin/internal-teams/delete";
  static updateInternalTeam = "/admin/internal-teams/update";
  static singleInternalTeam = "/admin/internal-teams/single";
  static getAllInternalTeam = "/admin/internal-teams";

  static createEvent = "/admin/events/create";
  static mainEventActive = "/admin/events/active";
  static mainEventPending = "/admin/events/pending";
  static mainEventCompleted = "/admin/events/completed";
  static mainEventRejected = "/admin/events/rejected";
  static subEvents = "/admin/subevents/";
  static getEventsByStatus = "/events/geteventbystatus"

  static approveUser = "/admin/user/approve";
  static rejectUser = "/admin/user/reject";
  static getAllUsers = "/admin/users";
  static getSingleUser = "/admin/users/single";

  static approveOrganizer = "/admin/organizers/approve";
  static rejectOrganizer = "/admin/organizers/reject";
  static createOrganizer = "/admin/organizers/create";

  static getAllEventCategory = "/admin/categories";
  static createEventCategory = "/admin/category/create";
  static updateEventCategory = "/admin/category";

  static getDashboard = "/admin/dashboard";

  // static eventMainImage = "http://localhost:3000/ev_main_img/";
  // static eventCoverImage = "";
  // static subEventImage = "";

  // static userIdCard = "";
  // static organizerIdCard = "";
  // static organizerNoc = "";
  // static InternalTeamProfile = "";
  // static EventCategoryImage = "";
}
