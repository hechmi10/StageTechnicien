package tn.esprit.syshr.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.syshr.entities.Retard;

@Repository
public interface RetardRepository extends JpaRepository<Retard,Long> {
}
