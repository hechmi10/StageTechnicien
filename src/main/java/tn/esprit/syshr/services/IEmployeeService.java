package tn.esprit.syshr.services;

import tn.esprit.syshr.entities.Employee;

import java.util.List;

public interface IEmployeeService {
    List<Employee> getAllEmployees();
    Employee getEmployeeById(Long id);
    Employee saveEmployee(Employee employee);
    Employee updateEmployee(Long id,Employee employee);
    void deleteEmployee(Long id);
}
