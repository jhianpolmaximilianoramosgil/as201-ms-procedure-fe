export class Procedure {
    id: number | undefined;
    procedureConfigId: number | undefined;
    phaseId: number | undefined;
    studentId: number | undefined;
    personId: number | undefined;
    batch: number | undefined;
    note: number | undefined;
    collaboratorTypeId: number | undefined;
    active: boolean | undefined;
    procedure_type_name: string | undefined;
    createdDate: string | undefined;
    modifiedDate: string | undefined;
    person_name: string | undefined;//personName?: string | undefined;
    personName?: string | undefined;
    phase_name: string | undefined;
    person_email: string | undefined;
//-----------NecesitoYo
    unique_identifier?: number | undefined;
    procedure_config_id?: string | undefined;
    phase_id?: number | undefined;//..phaseId?: number | undefined;
    person_id?: number | undefined;//personId?: number | undefined;
    student_id?: number | undefined;//studentId?: number | undefined;
    institute_id?: number | undefined;
    link?: number | undefined;

//------------F
    attached1?: string | undefined;
    attached2?: string | undefined;
    attached3?: string | undefined;
    attached4?: string | undefined;
    institutionalEmail?: string | undefined;
    message?: string | undefined;
}


  