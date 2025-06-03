package tn.esprit.syshr.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.syshr.entities.Conge;

@Repository
public interface CongeRepository extends JpaRepository<Conge, Long> {
}
