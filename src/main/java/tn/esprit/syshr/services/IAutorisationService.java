package tn.esprit.syshr.services;

import tn.esprit.syshr.entities.Autorisation;

import java.util.List;

public interface IAutorisationService {
    List<Autorisation> getAllAutorisation();
    Autorisation getAutorisationById(Long id);
    Autorisation saveAutorisation(Autorisation autorisation);
    Autorisation updateAutorisation(Long id,Autorisation autorisation);
    void deleteAutorisation(Long id);
}
