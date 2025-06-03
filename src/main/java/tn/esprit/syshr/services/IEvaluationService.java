package tn.esprit.syshr.services;

import tn.esprit.syshr.entities.EvaluationEmployee;

import java.util.List;

public interface IEvaluationService {
    List<EvaluationEmployee> getAllEvaluationEmployees();
    EvaluationEmployee getEvaluationEmployee(Long id);
    EvaluationEmployee saveEvaluationEmployee(EvaluationEmployee employee);
    EvaluationEmployee updateEvaluationEmployee(Long id,EvaluationEmployee employee);
    void deleteEvaluationEmployee(Long id);
}
