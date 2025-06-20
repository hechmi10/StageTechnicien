enum Role {
  ADMIN,
  EMPLOYEE,
}
extension RoleExtension on Role {
  String name() {
    switch (this) {
      case Role.ADMIN:
        return 'Admin';
      case Role.EMPLOYEE:
        return 'Employee';
    }
  }

  String description() {
    switch (this) {
      case Role.ADMIN:
        return 'Admin role with full permissions.';
      case Role.EMPLOYEE:
        return 'Employee role with limited permissions.';
    }
  }
}

extension RoleFromString on String {
  Role toRole() {
    switch (this) {
      case 'admin':
        return Role.ADMIN;
      case 'employee':
        return Role.EMPLOYEE;
      default:
        throw ArgumentError('Unknown role: $this');
    }
  }
}

extension RoleToString on Role {
  String toShortString() {
    return this.toString().split('.').last;
  }
}

extension RoleToJson on Role {
  Map<String, dynamic> toJson() {
    return {'name': this.toShortString()};
  }
}

extension RoleFromJson on Map<String, dynamic> {
  Role fromJson() {
    final name = this['name'] as String;
    return name.toRole();
  }
}
