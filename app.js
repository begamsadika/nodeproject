const express = require('express');
const sequelize = require('./config/database');
const association= require('./models/association');
// Import models
const Designation = require('./models/designation');
const Role = require('./models/role');
const Priority = require('./models/priority');
const Severity = require('./models/severity');
const ReleaseType = require('./models/release_type');
const DefectType = require('./models/defect_type');
const DefectStatus = require('./models/defect_status');
const User = require('./models/User');
const Project = require('./models/project');
const Modules = require('./models/modules');
const SubModule = require('./models/sub_module');
const Testcase = require('./models/testcase');
const Release = require('./models/release');
const ReleaseTestCase = require('./models/release_test_case');
const Privilege = require('./models/privilege');
const Group_Privileges = require('./models/group_privileges');
const ProjectUserPrivileges = require('./models/project_user_privileges');
const ProjectAllocation = require('./models/project_allocation');
const ProjectAllocationHistory = require('./models/project_allocation_history');
const Allocate_module= require('./models/allocate_module');
const Email_user= require('./models/email_user');
const Smtp_config= require('./models/smtp_config');
const UserPrivileges= require('./models/user_privileges');
const Bench = require('./models/bench');
const Defect = require('./models/defect');
const Defect_history= require('./models/defect_history');
const Comments= require('./models/comments');

// Import routes
const designationRoutes = require('./routes/designationRoutes');
const roleRoutes = require('./routes/roleRoutes');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to DB and sync all models (Designation, Role, etc.)
sequelize.authenticate()
  .then(() => {
    console.log('Database connected successfully.');
    return sequelize.sync(); // Drop and recreate tables to match models
  })
  .then(() => {
    console.log('All models synced.');
  })
  .catch((err) => {
    console.error('DB connection or sync error:', err);
  });

// Use API routes
app.use('/api/designations', designationRoutes);
app.use('/api/roles', roleRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Hello world');
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});























// const express = require('express');
// const sequelize = require('./config/database');
// const Designation = require('./models/designation');
// const designationRoutes = require('./routes/designationRoutes');

// const app = express();
// const port = 3000;

// app.use(express.json());

// // ✅ DB Connection + Sync
// sequelize.authenticate()
//   .then(() => {
//     console.log('Database connected successfully.');
//     return sequelize.sync(); // 🔄 Automatically creates table if not exist
//   })
//   .then(() => {
//     console.log('All models synced.');
//   })
//   .catch((err) => {
//     console.error('DB error:', err);
//   });

// // ✅ Routes
// app.use('/api/designations', designationRoutes);

// // ✅ Default route
// app.get('/', (req, res) => {
//   res.send('Hello world');
// });

// // ✅ Start server
// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });
