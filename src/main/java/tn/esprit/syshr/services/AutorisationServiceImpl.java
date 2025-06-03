package tn.esprit.syshr.services;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.syshr.entities.Autorisation;
import tn.esprit.syshr.repositories.AutorisationRepository;

import java.util.List;

@Service
@AllArgsConstructor
public class AutorisationServiceImpl implements IAutorisationService {

    @Autowired
    private AutorisationRepository autorisationRepository;

    @Override
    public List<Autorisation> getAllAutorisation() {
        return autorisationRepository.findAll();
    }

    @Override
    public Autorisation getAutorisationById(Long id) {
        return autorisationRepository.findById(id).orElse(null);
    }

    @Override
    public Autorisation saveAutorisation(Autorisation autorisation) {
        return autorisationRepository.save(autorisation);
    }

    @Override
    public Autorisation updateAutorisation(Long id, Autorisation autorisation) {
        Autorisation a = autorisationRepository.findById(id).orElse(null);
        assert a != null;
        a.setDateAutorisation(autorisation.getDateAutorisation());
        a.setDuration(autorisation.getDuration());
        return null;
    }

    @Override
    public void deleteAutorisation(Long id) {
        autorisationRepository.deleteById(id);
    }
}
