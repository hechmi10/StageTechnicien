package tn.esprit.syshr.services;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import tn.esprit.syshr.entities.Employee;
import tn.esprit.syshr.repositories.EmployeeRepository;

import java.util.List;

@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements IEmployeeService, UserDetailsService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    @Override
    public Employee getEmployeeById(Long id) {
        return employeeRepository.findById(id).orElse(null);
    }

    @Override
    public Employee saveEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    @Override
    public Employee updateEmployee(Long id, Employee employee) {
        Employee emp = employeeRepository.findById(id).orElse(null);
        assert emp != null;
        emp.setEmail(employee.getEmail());
        emp.setPassword(employee.getPassword());
        return employeeRepository.save(emp);
    }

    @Override
    public void deleteEmployee(Long id) {
        employeeRepository.deleteById(id);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return employeeRepository.findByEmail(username).orElse(null);
    }
}
