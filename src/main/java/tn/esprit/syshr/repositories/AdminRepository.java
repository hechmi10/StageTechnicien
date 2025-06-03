package tn.esprit.syshr.repositories;

import org.hibernate.type.descriptor.converter.spi.JpaAttributeConverter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.syshr.entities.Admin;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {
}
