
export const URL_BASE = 'http://gearth.xyz:8001/';

 //export const URL_BASE = 'http://127.0.0.1:8000/';
export const URL_BASE_NEO4J = 'http://ec2-54-198-149-53.compute-1.amazonaws.com:8001/api/v1';

export const URL_BASE_SOCIAL_NETWORK = 'http://localhost:8000';
//export const URL_BASE = 'http://127.0.0.1:8001/';
//export const URL_BASE_NEO4J = 'http://ec2-54-198-149-53.compute-1.amazonaws.com:8001/api/v1';

/* User URLs */
export const urlLogin = 'user/login';
export const urlRegister = 'user/register';

/* Plans URLs */
export const urlListPlans = 'plans/list';
export const urlCreatePlan = 'plans/create';

export const urlListRepositories = 'repositories/list';
export const urlCreateRepositories = 'repositories/create';

export const urlCreateModelNeo4j = 'models-api/create-model';
export const urlDeleteModelNeo4j = 'models-api/delete-model';
export const urlGetModelNeo4j = 'models-api/get-model';
export const urlGetModelByFilterNeo4j = 'models-api/get-model-by-filter';

export const urlCreateModel = 'models/create'
export const urlUpdateModel = 'models/update'
export const urlDeleteModel = 'models/delete'

export const urlChannels = '/channels';

/* Teams URLs */
export const urlListTeam = 'teams/list';
export const urlCheckTeamAvailability = 'teams/team-available';

/* Models URLs */
export const urlListModelsByTeam = 'models/list/team/';
export const urlListVariables = 'models/list-variables/';

/* Roles URLs */
export const urlListRoles = 'roles/list';
export const urlListRolesById = 'roles/list/';

/*Toolbox*/
export const urlListTools = 'toolbox/list';
export const urlListDistinctTools = 'toolbox/list-distinct';
export const urlCreateTool = 'toolbox/create';
export const urlCreateToolTheory = 'toolbox/create-theory';
export const urlCreateToolMethod = 'toolbox/create-method';
export const urlCreateToolUse = 'toolbox/create-use';
export const urlCreateToolChanges = 'toolbox/create-changes';
export const urlCreateComplementaryTool = 'toolbox/create-complementaries'

/*Surveys*/
export const urlListSurveysByProcess = 'surveys-api/get/process/';
export const urlListSurveysByActivity = 'surveys-api/get/activity/';
export const urlCreateSurvey = 'surveys-api/create';
export const urlUpdateSurvey = 'surveys-api/update/';
export const urlGetSurveyById = 'surveys-api/get/';
export const urlDeleteSurvey = 'surveys-api/delete/';

/* Moments-Models URLs */
export const urlListMomentsModelByMoment = 'moments-model/list-all-info/';

/* Processes URLs */
export const urlGetProcessById = 'process/list/';
export const urlUpdateProcessXML = 'process/update-xml-body';

/* Activities URLs */
export const urlCreateActivity = 'activity/create';
export const utlGetActivityByProcess = 'activity/list/by_process/';
export const urlDeleteActivity = 'activity/delete/';
export const urlUpdateActivity = 'activity/update/';
export const urlUpdateActivityType = 'activity/update-type/';
export const urlGetActivityByTask = 'activity/list/by-task/';
export const urlDeleteActivityByTask = 'activity/delete-by-task/';
export const urlUpdateActivityByTask = 'activity/update-by-task/';
export const urlUpdateActivityTypeByTask = 'activity/update-type-by-task/';
