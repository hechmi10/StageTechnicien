package tn.esprit.syshr.controllers;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.esprit.syshr.entities.Retard;
import tn.esprit.syshr.services.IRetardService;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/retard")
public class RetardRestController {

    @Autowired
    private IRetardService retardService;

    @GetMapping("/get-all-retards")
    public List<Retard> getAllRetards() {
        return retardService.getAllRetards();
    }

    @GetMapping("/get-retard-by-id/{id}")
    public Retard getRetardById(@PathVariable Long id) {
        return retardService.getRetardById(id);
    }

    @PostMapping("/save-retard")
    public Retard saveRetard(@RequestBody Retard retard) {
        return retardService.saveRetard(retard);
    }

    @PutMapping("/update-retard/{id}")
    public Retard updateRetard(@PathVariable Long id,@RequestBody Retard retard){
        return retardService.updateRetard(id,retard);
    }

    @DeleteMapping("/delete-retard/{id}")
    public void deleteRetard(@PathVariable Long id) {
        retardService.deleteRetard(id);
    }
}
