package tn.esprit.syshr.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String surname;
    private String email;
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "employee")
    private List<Conge> conges;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "employee")
    private List<Absence> absences;

    @OneToOne
    private EvaluationEmployee evaluation;

    @OneToMany(cascade = CascadeType.ALL,mappedBy="employee")
    private List<Autorisation> autorisations;

    @OneToMany(cascade = CascadeType.ALL,mappedBy="employee")
    private List<Retard> retards;
}
