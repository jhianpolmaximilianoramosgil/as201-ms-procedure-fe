// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  personApi: 'http://www.deillanes.com/backend/person/person',
  studentApi: 'http://www.deillanes.com/backend/student/student',
  procedureTypeApi: 'http://www.deillanes.com/backend/proceduretype/procedure_type',
  url_career: 'http://www.deillanes.com/backend/career/career',
  url_person: 'http://www.deillanes.com/backend/person/person',
  procedureApi: 'http://localhost:8092/procedure',
  collaboratorApi: 'http://localhost:8088/v1/procedure',
  attachmentsApi: 'http://localhost:8080/bucket',
  url_student: 'http://localhost:8086/v1/student',
  url_procedure: 'https://as201-ms-procedure-suscriptor-be.azurewebsites.net/v1/procedure'
  // https://as201-ms-procedure-suscriptor-be.azurewebsites.net/v1/procedure
 
   //url_procedure: 'http://localhost:8088/v1/procedure'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
