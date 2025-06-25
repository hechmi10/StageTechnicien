package tn.esprit.syshr;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.util.Assert;
import tn.esprit.syshr.entities.Autorisation;
import tn.esprit.syshr.entities.Conge;
import tn.esprit.syshr.entities.Employee;
import tn.esprit.syshr.services.AutorisationServiceImpl;
import tn.esprit.syshr.services.CongeServiceImpl;

import java.sql.Date;
import java.util.List;

@SpringBootTest
class SysHrApplicationTests {

    @Autowired
    private CongeServiceImpl congeService;

    @Autowired
    private AutorisationServiceImpl autorisationService;

    @Test
    void contextLoads() {
    }

    @Test
    void getAllCongeTest() {
        List<Conge> conges = congeService.getAllConge();
        Assert.notNull(conges, "Conge List exists");
    }

    @Test
    void getAllAutorisationTest() {
        List<Autorisation> autorisations=autorisationService.getAllAutorisation();
        Assert.notNull(autorisations, "Autorisation List exists");
    }

}
