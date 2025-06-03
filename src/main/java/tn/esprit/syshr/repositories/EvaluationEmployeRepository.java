package tn.esprit.syshr.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.syshr.entities.EvaluationEmployee;

@Repository
public interface EvaluationEmployeRepository extends JpaRepository<EvaluationEmployee, Long> {
}
