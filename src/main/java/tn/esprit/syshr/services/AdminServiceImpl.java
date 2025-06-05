package tn.esprit.syshr.services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.syshr.entities.Admin;
import tn.esprit.syshr.entities.Employee;
import tn.esprit.syshr.repositories.AdminRepository;

import java.util.List;

@Service
@AllArgsConstructor
public class AdminServiceImpl implements IAdminService {
    private AdminRepository adminRepository;

    @Override
    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

    @Override
    public Admin getAdminById(Long id) {
        return adminRepository.findById(id).orElse(null);
    }

    @Override
    public Admin saveAdmin(Admin admin) {
        return adminRepository.save(admin);
    }

    @Override
    public Admin updateAdmin(Long id, Admin admin) {
        Admin admin1 = adminRepository.findById(id).orElse(null);
        assert admin1 != null;
        admin1.setEmail(admin.getEmail());
        admin1.setPassword(admin.getPassword());
        return adminRepository.save(admin1);
    }

    @Override
    public void deleteAdmin(Long id) {
        adminRepository.deleteById(id);
    }
}
