package tn.esprit.syshr.services;

import tn.esprit.syshr.entities.Admin;

import java.util.List;

public interface IAdminService{
    List<Admin> getAllAdmins();
    Admin getAdminById(Long id);
    Admin saveAdmin(Admin admin);
    Admin updateAdmin(Long id,Admin admin);
    void deleteAdmin(Long id);
}
