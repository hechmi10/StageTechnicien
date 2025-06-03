package tn.esprit.syshr.services;

import tn.esprit.syshr.entities.Conge;

import java.util.List;

public interface ICongeService {
    List<Conge> getAllConge();
    Conge getCongeById(Long id);
    Conge saveConge(Conge conge);
    Conge updateConge(Long id,Conge conge);
    void deleteConge(Long id);
}
