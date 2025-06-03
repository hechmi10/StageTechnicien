package tn.esprit.syshr.controllers;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.esprit.syshr.entities.Autorisation;
import tn.esprit.syshr.services.IAutorisationService;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/autorisation")
public class AutorisationRestController {
    @Autowired
    private IAutorisationService autorisationService;

    @GetMapping("/get-all-autorisations")
    public List<Autorisation> getAllAutorisation() {
        return autorisationService.getAllAutorisation();
    }

    @GetMapping("/get-autorisation-by-id/{id}")
    public Autorisation getAutorisationById(@PathVariable Long id) {
        return autorisationService.getAutorisationById(id);
    }

    @PostMapping("/save-autorisation")
    public Autorisation saveAutorisation(@RequestBody Autorisation autorisation) {
        return autorisationService.saveAutorisation(autorisation);
    }

    @PutMapping("/update-autorisation/{id}")
    public Autorisation updateAutorisation(@PathVariable Long id,@RequestBody Autorisation autorisation) {
        return autorisationService.updateAutorisation(id, autorisation);
    }

    @DeleteMapping("/delete-autorisation/{id}")
    public void deleteAutorisation(@PathVariable Long id) {
        autorisationService.deleteAutorisation(id);
    }
}
