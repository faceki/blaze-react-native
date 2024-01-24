class DocumentData {
  constructor(
      public reference: string,
      public full_name: string,
      public first_name: string,
      public local_name: string,
      public last_name: string,
      public middle_name: string,
      public nationality: string,
      public nationality_iso: string,
      public nationality_iso2: string,
      public issuer: string,
      public issuer_iso: string,
      public issuer_iso2: string,
      public gender: string,
      public dob: string,
      public age: string,
      public expiry: string,
      public expiryDay: string,
      public expiryMonth: string,
      public expiryYear: string,
      public issued: string,
      public issuedDay: string,
      public issuedMonth: string,
      public issuedYear: string,
      public documentAdditionalNumber: string,
      public document_number: string,
      public document_type: string,
      public document_type_full: string,
      public mrz: string,
      public document_face_match: { similarity: number; confidence: number },
      public passed: boolean,
      public date_of_birth: string,
      public date_of_birth_day: string,
      public date_of_birth_month: string,
      public date_of_birth_year: string
  ) {}
}

class SelfieData {
  constructor(public liveness_pass: boolean) {}
}

class VerificationSummary {
  constructor(
      public face_verified: boolean,
      public selfie_liveness_verified: boolean,
      public document_verified: boolean,
      public verification_rules_passed: boolean,
      public document_liveness_verified: boolean,
      public image_quality: boolean
  ) {}
}

class DocumentDataConfidence {
  constructor(
      public reference: string,
      public full_name: number,
      public first_name: number,
      public local_name: number,
      public last_name: number,
      public middle_name: number,
      public nationality: number,
      public nationality_iso: number,
      public nationality_iso2: number,
      public issuer: number,
      public issuer_iso: number,
      public issuer_iso2: number,
      public gender: number,
      public dob: number,
      public age: number,
      public expiry: number,
      public expiryDay: number,
      public expiryMonth: number,
      public expiryYear: number,
      public issued: number,
      public issuedDay: number,
      public issuedMonth: number,
      public issuedYear: number,
      public documentAdditionalNumber: number,
      public placeOfBirth: number,
      public document_number: number,
      public personal_number: number,
      public document_type: number,
      public document_type_full: number,
      public mrz: number,
      public date_of_birth: number,
      public date_of_birth_day: number,
      public date_of_birth_month: number,
      public date_of_birth_year: number
  ) {}
}

class DeviceDetails {
  constructor(
      public useragent: string,
      public detectResult: {
          client: { type: string; name: string; version: string };
          device: { id: string; type: string; brand: string; model: string };
      }
  ) {}
}

class Images {
  constructor(public documentName: string, public side: string, public key: string) {}
}

class Result {
  constructor(
      public link: string,
      public record_identifier: string,
      public requestId: string,
      public document_data: DocumentData[],
      public selfie_data: SelfieData,
      public warnings: any[],
      public notes: any[],
      public aml: any[],
      public verification_summary: VerificationSummary,
      public document_data_confidence: DocumentDataConfidence[],
      public decision: string,
      public errorCodes: any[],
      public deviceDetails: DeviceDetails,
      public createdAt: string,
      public updatedAt: string,
      public __v: number,
      public images: Images[],
      public face_id: string,
      public updateBy: string
  ) {}
}

export class FacekiApiResponse {
  constructor(
      public status: boolean,
      public code: number,
      public message: string,
      public appVersion: string,
      public result: Result[]
  ) {}
  static createInstance(...args: any[]): FacekiApiResponse {
    return new FacekiApiResponse(...args as [boolean, number, string, string, Result[]]);
}
}


