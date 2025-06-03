package tn.esprit.syshr.services;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.syshr.entities.EvaluationEmployee;
import tn.esprit.syshr.repositories.EvaluationEmployeRepository;

import java.util.List;

@Service
@AllArgsConstructor
public class EvaluationServiceImpl implements IEvaluationService{

    @Autowired
    private EvaluationEmployeRepository evaluationEmployeRepository;

    @Override
    public List<EvaluationEmployee> getAllEvaluationEmployees() {
        return evaluationEmployeRepository.findAll();
    }

    @Override
    public EvaluationEmployee getEvaluationEmployee(Long id) {
        return evaluationEmployeRepository.findById(id).orElse(null);
    }

    @Override
    public EvaluationEmployee saveEvaluationEmployee(EvaluationEmployee employee) {
        return evaluationEmployeRepository.save(employee);
    }

    @Override
    public EvaluationEmployee updateEvaluationEmployee(Long id, EvaluationEmployee employee) {
        EvaluationEmployee ev = evaluationEmployeRepository.findById(id).orElse(null);
        assert ev != null;
        ev.setDateEvaluation(employee.getDateEvaluation());
        return evaluationEmployeRepository.save(ev);
    }

    @Override
    public void deleteEvaluationEmployee(Long id) {
        evaluationEmployeRepository.deleteById(id);
    }
}
