package tn.esprit.syshr.services;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.syshr.entities.Absence;
import tn.esprit.syshr.repositories.AbsenceRepository;

import java.util.List;

@Service
@AllArgsConstructor
public class AbsenceServiceImpl implements IAbsenceService {

    @Autowired
    private AbsenceRepository absenceRepository;

    @Override
    public List<Absence> getAllAbsences() {
        return absenceRepository.findAll();
    }

    @Override
    public Absence getAbsenceById(Long id) {
        return absenceRepository.findById(id).orElse(null);
    }

    @Override
    public Absence saveAbsence(Absence absence) {
        return absenceRepository.save(absence);
    }

    @Override
    public Absence updateAbsence(Long id, Absence absence) {
        Absence absence1 = absenceRepository.findById(id).orElse(null);
        assert absence1 != null;
        absence1.setDateDebut(absence.getDateDebut());
        absence1.setDateFin(absence.getDateFin());
        absence1.setNbJours(absence.getNbJours());
        return absenceRepository.save(absence1);
    }

    @Override
    public void deleteAbsence(Long id) {
        absenceRepository.deleteById(id);
    }
}
