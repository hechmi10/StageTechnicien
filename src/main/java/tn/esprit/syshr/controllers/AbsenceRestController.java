package tn.esprit.syshr.controllers;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.esprit.syshr.entities.Absence;
import tn.esprit.syshr.services.IAbsenceService;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/absence")
public class AbsenceRestController {

    @Autowired
    private IAbsenceService absenceService;

    @GetMapping("/get-all-absences")
    public List<Absence> getAllAbsence() {
        return absenceService.getAllAbsences();
    }

    @GetMapping("/get-absence-by-id/{id}")
    public Absence getAbsenceById(@PathVariable Long id) {
        return absenceService.getAbsenceById(id);
    }

    @PostMapping("/save-absence")
    public Absence saveAbsence(@RequestBody Absence absence) {
        return absenceService.saveAbsence(absence);
    }

    @PutMapping("/update-absence/{id}")
    public Absence updateAbsence(@PathVariable Long id, @RequestBody Absence absence) {
        return absenceService.updateAbsence(id, absence);
    }

    @DeleteMapping("/delete-absence/{id}")
    public void deleteAbsence(@PathVariable Long id) {
        absenceService.deleteAbsence(id);
    }

}
