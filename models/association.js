const User = require('./User');
const Designation = require('./designation');
const Project = require('./project');
const Modules = require('./modules');
const SubModule = require('./sub_module');
const Release = require('./release');
const Testcase = require('./testcase');
const Severity = require('./severity');
const DefectType = require('./defect_type');
const ReleaseTestCase = require('./release_test_case');
const Group_Privileges = require('./group_privileges');
const Privilege = require('./privilege');
const Role = require('./role');
const ProjectUserPrivileges = require('./project_user_privileges');
const ProjectAllocation = require('./project_allocation');
const ProjectAllocationHistory = require('./project_allocation_history');
const AllocateModule = require('./allocate_module');
const EmailUser = require('./email_user');
const UserPrivileges = require('./user_privileges');
const Bench = require('./bench');
const Defect = require('./defect');
const DefectStatus = require('./defect_status');
const Priority = require('./priority');
const DefectHistory = require('./defect_history');
const Comments = require('./comments');
const ReleaseType = require('./release_type');

//Designation → User
Designation.hasMany(User, {foreignKey: 'designation_id'});
User.belongsTo(Designation, {foreignKey: 'designation_id'});

// User → Project
User.hasMany(Project, {foreignKey: 'user_id'});
Project.belongsTo(User, {foreignKey: 'user_id'});

// Project → Modules
Project.hasMany(Modules, {foreignKey: 'project_id'});
Modules.belongsTo(Project, {foreignKey: 'project_id'});

// Modules → SubModule
Modules.hasMany(SubModule, {foreignKey: 'modules_id'});
SubModule.belongsTo(Modules, {foreignKey: 'modules_id'});


 // Project → Release
Project.hasMany(Release, {foreignKey: 'project_id'});
Release.belongsTo(Project, {foreignKey: 'project_id'});

// // Project → Testcase
Project.hasMany(Testcase, {foreignKey: 'project_id'});
Testcase.belongsTo(Project, {foreignKey: 'project_id'});

// // Modules → Testcase
Modules.hasMany(Testcase, {foreignKey: 'modules_id'});
Testcase.belongsTo(Modules, {foreignKey: 'modules_id'});

// // SubModule → Testcase
SubModule.hasMany(Testcase, {
  foreignKey: 'sub_module_id'
});
Testcase.belongsTo(SubModule, {
  foreignKey: 'sub_module_id'
});

// Severity → Testcase
Severity.hasMany(Testcase, {foreignKey: 'severity_id'});
Testcase.belongsTo(Severity, {foreignKey: 'severity_id'});

// One DefectType has many Testcases
DefectType.hasMany(Testcase, {foreignKey: 'type_id',});
Testcase.belongsTo(DefectType, {foreignKey: 'type_id',});

// ReleaseTestCase → Owner (User)
User.hasMany(ReleaseTestCase, { foreignKey: 'owner_id', as: 'OwnedTestCases' });
ReleaseTestCase.belongsTo(User, { foreignKey: 'owner_id', as: 'Owner' });

// ReleaseTestCase → Release
Release.hasMany(ReleaseTestCase, { foreignKey: 'release_id' });
ReleaseTestCase.belongsTo(Release, { foreignKey: 'release_id' });

// ReleaseTestCase → TestCase
Testcase.hasMany(ReleaseTestCase, { foreignKey: 'test_case_id' });
ReleaseTestCase.belongsTo(Testcase, { foreignKey: 'test_case_id' });

// privilage can have many group_privilege, one group_privilege can have one privilage
Privilege.hasMany(Group_Privileges,{
  foreignKey: 'privilege_id',
});
Group_Privileges.belongsTo(Privilege,{
  foreignKey: 'privilege_id',
});


// role can have many group_privilege, one group_privilege can have one role
Role.hasMany(Group_Privileges,{
  foreignKey: 'role_id',
});
Group_Privileges.belongsTo(Role,{
  foreignKey: 'role_id',
});


// Many-to-one: Many project_user_privileges belong to one user
ProjectUserPrivileges.belongsTo(User, { foreignKey: 'user_id'});
User.hasMany(ProjectUserPrivileges, { foreignKey: 'user_id'});

// Many-to-one: Many project_user_privileges belong to one project
ProjectUserPrivileges.belongsTo(Project, { foreignKey: 'project_id' });
Project.hasMany(ProjectUserPrivileges, { foreignKey: 'project_id' });

// Many-to-one: Many project_user_privileges belong to one privilege
ProjectUserPrivileges.belongsTo(Privilege, { foreignKey: 'privilege_id' });
Privilege.hasMany(ProjectUserPrivileges, { foreignKey: 'privilege_id' });

// ProjectAllocation → Project
Project.hasMany(ProjectAllocation, { foreignKey: 'project_id' });
ProjectAllocation.belongsTo(Project, { foreignKey: 'project_id' });

// ProjectAllocation → Role
Role.hasMany(ProjectAllocation, { foreignKey: 'role_id' });
ProjectAllocation.belongsTo(Role, { foreignKey: 'role_id' });

// ProjectAllocation → User
User.hasMany(ProjectAllocation, { foreignKey: 'user_id' });
ProjectAllocation.belongsTo(User, { foreignKey: 'user_id' });

// ProjectAllocationHistory → Project
Project.hasMany(ProjectAllocationHistory, { foreignKey: 'project_id' });
ProjectAllocationHistory.belongsTo(Project, { foreignKey: 'project_id' });

// ProjectAllocationHistory → Role
Role.hasMany(ProjectAllocationHistory, { foreignKey: 'role_id' });
ProjectAllocationHistory.belongsTo(Role, { foreignKey: 'role_id' });

// ProjectAllocationHistory → User
User.hasMany(ProjectAllocationHistory, { foreignKey: 'user_id' });
ProjectAllocationHistory.belongsTo(User, { foreignKey: 'user_id' });


// AllocateModule → Modules
Modules.hasMany(AllocateModule, { foreignKey: 'modules_id' });
AllocateModule.belongsTo(Modules, { foreignKey: 'modules_id' });

// AllocateModule → Project
Project.hasMany(AllocateModule, { foreignKey: 'project_id' });
AllocateModule.belongsTo(Project, { foreignKey: 'project_id' });

// AllocateModule → User
User.hasMany(AllocateModule, { foreignKey: 'user_id' });
AllocateModule.belongsTo(User, { foreignKey: 'user_id' });

// AllocateModule → SubModule
SubModule.hasMany(AllocateModule, { foreignKey: 'sub_module_id' });
AllocateModule.belongsTo(SubModule, { foreignKey: 'sub_module_id' });

// EmailUser → User
User.hasMany(EmailUser, { foreignKey: 'user_id' });
EmailUser.belongsTo(User, { foreignKey: 'user_id' });

// UserPrivileges → Privilege
Privilege.hasMany(UserPrivileges, { foreignKey: 'privilege_id' });
UserPrivileges.belongsTo(Privilege, { foreignKey: 'privilege_id' });

// UserPrivileges → Project
Project.hasMany(UserPrivileges, { foreignKey: 'project_id' });
UserPrivileges.belongsTo(Project, { foreignKey: 'project_id' });

// UserPrivileges → User
User.hasMany(UserPrivileges, { foreignKey: 'user_id' });
UserPrivileges.belongsTo(User, { foreignKey: 'user_id' });

// One User can have many Benches
User.hasMany(Bench, {foreignKey: 'user_id',});
Bench.belongsTo(User, {foreignKey: 'user_id',});


// Defect → Project
Project.hasMany(Defect, { foreignKey: 'project_id' });
Defect.belongsTo(Project, { foreignKey: 'project_id' });

// Defect → Modules
Modules.hasMany(Defect, { foreignKey: 'modules_id' });
Defect.belongsTo(Modules, { foreignKey: 'modules_id' });

// Defect → SubModule
SubModule.hasMany(Defect, { foreignKey: 'sub_module_id' });
Defect.belongsTo(SubModule, { foreignKey: 'sub_module_id' });

// Defect → ReleaseTestCase
ReleaseTestCase.hasMany(Defect, { foreignKey: 'release_test_case_id' });
Defect.belongsTo(ReleaseTestCase, { foreignKey: 'release_test_case_id' });

// Defect → Severity
Severity.hasMany(Defect, { foreignKey: 'severity_ic', as: 'Defects' });
Defect.belongsTo(Severity, { foreignKey: 'severity_ic', as: 'Severity' });

// Defect → DefectType
DefectType.hasMany(Defect, { foreignKey: 'type_id' });
Defect.belongsTo(DefectType, { foreignKey: 'type_id' });

// Defect → DefectStatus
DefectStatus.hasMany(Defect, { foreignKey: 'defect_sta', as: 'Defects' });
Defect.belongsTo(DefectStatus, { foreignKey: 'defect_sta', as: 'DefectStatus' });

// Defect → Priority
Priority.hasMany(Defect, { foreignKey: 'priority_id' });
Defect.belongsTo(Priority, { foreignKey: 'priority_id' });

// Defect → Assigned By (User)
User.hasMany(Defect, { foreignKey: 'assigned_by' });
Defect.belongsTo(User, { foreignKey: 'assigned_by', as: 'AssignedBy' });

// Defect → Assigned To (User)
User.hasMany(Defect, { foreignKey: 'assigned_to' });
Defect.belongsTo(User, { foreignKey: 'assigned_to', as: 'AssignedTo' });

// DefectHistory → Defect
Defect.hasMany(DefectHistory, { foreignKey: 'defect_id' });
DefectHistory.belongsTo(Defect, { foreignKey: 'defect_id' });

// One ReleaseType has many Releases
ReleaseType.hasMany(Release, { foreignKey: 'release_type_id' });
Release.belongsTo(ReleaseType, { foreignKey: 'release_type_id' });

// Defect has many Comments
Defect.hasMany(Comments, { foreignKey: 'defect_id' });
Comments.belongsTo(Defect, { foreignKey: 'defect_id' });

// User has many Comments
User.hasMany(Comments, { foreignKey: 'user_id' });
Comments.belongsTo(User, { foreignKey: 'user_id' });




module.exports = {
  User,
  Designation,
  Project,
  Modules,
  SubModule,
  Release,
  Testcase,
  Severity,
  DefectType,
  ReleaseTestCase,
  Privilege,
  Group_Privileges,
  ProjectUserPrivileges,
  Role,
  ProjectAllocation,
  ProjectAllocationHistory,
  AllocateModule,
  EmailUser,
  UserPrivileges,
  Bench,
  Defect,
  DefectHistory,
  ReleaseType,
  Comments
}