package tn.esprit.syshr.controllers;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.esprit.syshr.entities.EvaluationEmployee;
import tn.esprit.syshr.services.IEvaluationService;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("evaluation")
public class EvaluationRestController {

    @Autowired
    private IEvaluationService evaluationService;

    @GetMapping("/get-all-evaluation-employees")
    public List<EvaluationEmployee> getAllEvaluationEmployees() {
        return evaluationService.getAllEvaluationEmployees();
    }

    @GetMapping("/get-evaluation-employee/{id}")
    public EvaluationEmployee getEvaluationEmployee(@PathVariable Long id) {
        return evaluationService.getEvaluationEmployee(id);
    }

    @PostMapping("/save-evaluation-employee")
    public EvaluationEmployee addEvaluationEmployee(@RequestBody EvaluationEmployee evaluationEmployee) {
        return evaluationService.saveEvaluationEmployee(evaluationEmployee);
    }

    @PutMapping("/update-evaluation-employee/{id}")
    public EvaluationEmployee updateEvaluationEmployee(@PathVariable Long id, EvaluationEmployee evaluationEmployee) {
        return evaluationService.updateEvaluationEmployee(id, evaluationEmployee);
    }

    @DeleteMapping("/delete-evaluation-employee/{id}")
    public void deleteEvaluationEmployee(@PathVariable Long id) {
        evaluationService.deleteEvaluationEmployee(id);
    }

}
