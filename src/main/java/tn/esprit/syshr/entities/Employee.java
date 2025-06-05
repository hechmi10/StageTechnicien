package tn.esprit.syshr.entities;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Entity
@Getter
@Setter
@Builder
@DiscriminatorColumn(name = "dtype", discriminatorType = DiscriminatorType.STRING)
@AllArgsConstructor
@NoArgsConstructor
public class Employee implements UserDetails {

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

    @OneToOne(mappedBy="employee")
    private EvaluationEmployee evaluation;

    @OneToMany(cascade = CascadeType.ALL,mappedBy="employee")
    private List<Autorisation> autorisations;

    @OneToMany(cascade = CascadeType.ALL,mappedBy="employee")
    private List<Retard> retards;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_" + this.getRole()));
    }

    @Override
    public String getUsername() {
        return "";
    }

    @Override
    public boolean isAccountNonExpired() {
        return UserDetails.super.isAccountNonExpired();
    }

    @Override
    public boolean isAccountNonLocked() {
        return UserDetails.super.isAccountNonLocked();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return UserDetails.super.isCredentialsNonExpired();
    }

    @Override
    public boolean isEnabled() {
        return UserDetails.super.isEnabled();
    }
}
