package tn.esprit.syshr.controllers;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.esprit.syshr.entities.Admin;
import tn.esprit.syshr.services.IAdminService;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/admin")
public class AdminRestController {
    @Autowired
    private IAdminService adminService;

    @GetMapping("/get-all-admins")
    public List<Admin> getAllAdmins() {
        return adminService.getAllAdmins();
    }

    @GetMapping("/get-admin-by-id/{id}")
    public Admin getAdminById(@PathVariable Long id) {
        return adminService.getAdminById(id);
    }

    @PostMapping("/save-admin")
    public Admin saveAdmin(@RequestBody Admin admin) {
        return adminService.saveAdmin(admin);
    }

    @PutMapping("/update-admin/{id}")
    public Admin updateAdmin(@PathVariable Long id,@RequestBody Admin admin) {
        return adminService.updateAdmin(id, admin);
    }

    @DeleteMapping("/delete-admin/{id}")
    public void deleteAdmin(@PathVariable Long id) {
        adminService.deleteAdmin(id);
    }
}
