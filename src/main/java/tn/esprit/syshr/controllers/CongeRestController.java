package tn.esprit.syshr.controllers;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.esprit.syshr.entities.Conge;
import tn.esprit.syshr.services.ICongeService;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/conge")
public class CongeRestController {

    @Autowired
    private ICongeService congeService;

    @GetMapping("/get-all-conges")
    public List<Conge> getAllConges() {
        return congeService.getAllConge();
    }

    @GetMapping("/get-conge-by-id/{id}")
    public Conge getCongeById(@PathVariable Long id) {
        return congeService.getCongeById(id);
    }

    @PostMapping("/save-conge")
    public Conge saveConge(Conge conge) {
        return congeService.saveConge(conge);
    }

    @PutMapping("/update-conge/{id}")
    public Conge updateConge(@PathVariable Long id,@RequestBody Conge conge) {
        return congeService.updateConge(id, conge);
    }

    @DeleteMapping("/delete-conge/{id}")
    public void deleteConge(@PathVariable Long id) {
        congeService.deleteConge(id);
    }
}
