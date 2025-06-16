enum Role {
  admin,
  user, defaultRole,
}
extension RoleExtension on Role {
  String name() {
    switch (this) {
      case Role.defaultRole:
        return 'Default';
      case Role.admin:
        return 'Admin';
      case Role.user:
        return 'User';
    }
  }

  String description() {
    switch (this) {
      case Role.defaultRole:
        return 'Default role with limited permissions.';
      case Role.admin:
        return 'Has full access to the system.';
      case Role.user:
        return 'Has limited access to the system.';
    }
  }
}

extension RoleFromString on String {
  Role toRole() {
    switch (this) {
      case 'admin':
        return Role.admin;
      case 'user':
        return Role.user;
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
