package tn.esprit.syshr.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.syshr.entities.Employee;

import java.lang.ScopedValue;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    <T> ScopedValue<T> findByEmail(String username);
}
