import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Evaluation } from '../../models/evaluation';

@Injectable({
  providedIn: 'root'
})
export class GestionEvaluationService {

  private apiUrl: string = "http://localhost:8080/api/evaluation";
  constructor(private http: HttpClient) { }

  getEvaluation() {
    return this.http.get<Evaluation[]>(this.apiUrl + "/get-all-evaluations");
  }

  createEvaluation(evaluation: Evaluation) {
    return this.http.post<Evaluation>(this.apiUrl + "/create-evaluation", evaluation);
  }

  updateEvaluation(id: number, evaluation: Evaluation) {
    return this.http.put<Evaluation>(this.apiUrl + "/update-evaluation/" + id, evaluation);
  }

  deleteEvaluation(id: number) {
    return this.http.delete<Evaluation>(this.apiUrl + "/delete-evaluation/" + id);
  }

  getEvaluationById(id: number) {
    return this.http.get<Evaluation>(this.apiUrl + "/get-evaluation-by-id/" + id);
  }

}
