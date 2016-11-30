import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Medication } from './proc/shared/medication';
import { MedicationInstruction } from './proc/shared/medicationinstruction';
import { Preinstruction } from './proc/shared/preinstruction';
import { Procedure } from './proc/shared/procedure';
import { Question } from './proc/shared/question';
import { Subprocedure } from './proc/shared/subprocedure';
import { Video } from './proc/shared/video';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class ProcService {

	private MEDICATION_URL = "http://2aid.azurewebsites.net/api/Medications";
	private MEDICATION_INSTRUCIONS_URL = "http://2aid.azurewebsites.net/api/MedicationInstructions";
	private PREINSTRUCIONS_URL = "http://2aid.azurewebsites.net/api/PreInstructions";
	private PROCEDURES_URL = "http://2aid.azurewebsites.net/api/Procedures";
	private QUESTIONS_URL = "http://secondaid.azurewebsites.net/api/Questionnaires/"; // takes subprocedure id
	private SUBPROCEDURES_URL = "http://2aid.azurewebsites.net/api/SubProcedures";
	private VIDEOS_URL = "http://2aid.azurewebsites.net/api/Videos";

  constructor(private http: Http) { }

  getHeaders(){
  	let headers = new Headers();
    headers.append('Accept', 'application/json');
    let authToken = localStorage.getItem('auth_token');
    headers.append('Authorization', `Bearer ${authToken}`);	
    return headers;
  }

  getMedication(){
  	let headers = this.getHeaders();

  	return this.http.get(this.MEDICATION_URL, {headers})
      .toPromise()
      .then(response => response.json() as Medication[])
  }

  getMedicationInstructions(){
  	let headers = this.getHeaders();

  	return this.http.get(this.MEDICATION_INSTRUCIONS_URL, {headers})
      .toPromise()
      .then(response => response.json() as MedicationInstruction[])
  }

  getPreinstructions(){
  	let headers = this.getHeaders();

  	return this.http.get(this.PREINSTRUCIONS_URL, {headers})
      .toPromise()
      .then(response => response.json() as Preinstruction[])
  }

  getProcedures(){
  	let headers = this.getHeaders();

  	return this.http.get(this.PROCEDURES_URL, {headers})
      .toPromise()
      .then(response => response.json() as Procedure[])
  }

  getQuestions(){
  	let headers = this.getHeaders();

  	return this.http.get(this.QUESTIONS_URL + "1", {headers})
      .toPromise()
      .then(response => response.json() as Question[])
  }

  getSubprocedures(){
  	let headers = this.getHeaders();

  	return this.http.get(this.SUBPROCEDURES_URL, {headers})
      .toPromise()
      .then(response => response.json() as Subprocedure[])
  }

  getVideos(){
  	let headers = this.getHeaders();

  	return this.http.get(this.VIDEOS_URL, {headers})
      .toPromise()
      .then(response => response.json() as Video[])
  }
}