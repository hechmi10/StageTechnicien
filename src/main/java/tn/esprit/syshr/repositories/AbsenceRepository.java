package tn.esprit.syshr.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.syshr.entities.Absence;

@Repository
public interface AbsenceRepository extends JpaRepository<Absence, Long> {
}
