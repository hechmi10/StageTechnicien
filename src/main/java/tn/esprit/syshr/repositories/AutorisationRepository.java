package tn.esprit.syshr.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.syshr.entities.Autorisation;

@Repository
public interface AutorisationRepository extends JpaRepository<Autorisation, Long> {
}
