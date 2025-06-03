package tn.esprit.syshr.services;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.syshr.entities.Retard;
import tn.esprit.syshr.repositories.RetardRepository;

import java.util.List;

@Service
@AllArgsConstructor
public class RetardServiceImpl implements IRetardService {

    @Autowired
    private RetardRepository retardRepository;

    @Override
    public List<Retard> getAllRetards() {
        return retardRepository.findAll();
    }

    @Override
    public Retard getRetardById(Long id) {
        return retardRepository.findById(id).orElse(null);
    }

    @Override
    public Retard saveRetard(Retard retard) {
        return retardRepository.save(retard);
    }

    @Override
    public Retard updateRetard(Long id, Retard retard) {
        Retard r= retardRepository.findById(id).orElse(null);
        assert r != null;
        r.setDateDebut(retard.getDateDebut());
        r.setDateFin(retard.getDateFin());
        r.setNbJours(retard.getNbJours());
        return retardRepository.save(r);
    }

    @Override
    public void deleteRetard(Long id) {
        retardRepository.deleteById(id);
    }
}
