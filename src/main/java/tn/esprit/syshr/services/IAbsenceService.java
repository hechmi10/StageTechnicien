package tn.esprit.syshr.services;

import tn.esprit.syshr.entities.Absence;

import java.util.List;

public interface IAbsenceService {
    List<Absence> getAllAbsences();
    Absence getAbsenceById(Long id);
    Absence saveAbsence(Absence absence);
    Absence updateAbsence(Long id,Absence absence);
    void deleteAbsence(Long id);
}
