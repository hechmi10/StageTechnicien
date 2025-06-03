package tn.esprit.syshr.services;

import tn.esprit.syshr.entities.Retard;

import java.util.List;

public interface IRetardService {
    List<Retard> getAllRetards();
    Retard getRetardById(Long id);
    Retard saveRetard(Retard retard);
    Retard updateRetard(Long id,Retard retard);
    void deleteRetard(Long id);
}
