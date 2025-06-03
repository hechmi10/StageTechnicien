package tn.esprit.syshr.services;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.syshr.entities.Conge;
import tn.esprit.syshr.repositories.CongeRepository;

import java.util.List;

@Service
@AllArgsConstructor
public class CongeServiceImpl implements ICongeService {
    @Autowired
    private CongeRepository congeRepository;
    @Override
    public List<Conge> getAllConge() {
        return congeRepository.findAll();
    }

    @Override
    public Conge getCongeById(Long id) {
        return congeRepository.findById(id).orElse(null);
    }

    @Override
    public Conge saveConge(Conge conge) {
        return congeRepository.save(conge);
    }

    @Override
    public Conge updateConge(Long id, Conge conge) {
        Conge conge1 = congeRepository.findById(id).orElse(null);
        assert conge1 != null;
        conge1.setDateDebut(conge.getDateDebut());
        conge1.setDateFin(conge.getDateFin());
        conge1.setNbJours(conge.getNbJours());
        return congeRepository.save(conge1);
    }

    @Override
    public void deleteConge(Long id) {
        congeRepository.deleteById(id);
    }
}
