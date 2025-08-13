const sequelize = require('../config/database');

// Import all models
const { 
  User, Designation, Project, Modules, SubModule, Release, Testcase, 
  Severity, DefectType, ReleaseTestCase, Privilege, Group_Privileges, 
  ProjectUserPrivileges, Role, ProjectAllocation, ProjectAllocationHistory, 
  AllocateModule, EmailUser, UserPrivileges, Bench, Defect, DefectHistory, 
  ReleaseType, Comments 
} = require('../models/association');

async function insertSampleData() {
  try {
    console.log('🚀 Starting sample data insertion using models...');
    
    // Sync database first
    await sequelize.sync();
    console.log('✅ Database synced');

    // 1. Insert reference data first
    console.log('📊 Inserting reference data...');
    
    const designations = await Designation.bulkCreate([
      { designation_name: 'Developer' },
      { designation_name: 'Senior Developer' },
      { designation_name: 'Lead Developer' },
      { designation_name: 'Tester' },
      { designation_name: 'Senior Tester' },
      { designation_name: 'Manager' },
      { designation_name: 'Project Manager' },
      { designation_name: 'Intern' }
    ]);
    console.log(`✅ Inserted ${designations.length} designations`);

    const roles = await Role.bulkCreate([
      { role_name: 'Admin' },
      { role_name: 'Project Manager' },
      { role_name: 'Developer' },
      { role_name: 'Tester' },
      { role_name: 'QA Lead' }
    ]);
    console.log(`✅ Inserted ${roles.length} roles`);

    const severities = await Severity.bulkCreate([
      { severity_color: 'red', severity_name: 'Critical', weight: 5 },
      { severity_color: 'orange', severity_name: 'Major', weight: 4 },
      { severity_color: 'yellow', severity_name: 'Minor', weight: 3 }
    ]);
    console.log(`✅ Inserted ${severities.length} severities`);

    const defectTypes = await DefectType.bulkCreate([
      { defect_type_name: 'UI/UX' },
      { defect_type_name: 'Backend Logic' },
      { defect_type_name: 'Database' },
      { defect_type_name: 'Performance' },
      { defect_type_name: 'Security' }
    ]);
    console.log(`✅ Inserted ${defectTypes.length} defect types`);

    const releaseTypes = await ReleaseType.bulkCreate([
      { release_type_name: 'Alpha' },
      { release_type_name: 'Beta' },
      { release_type_name: 'Release Candidate' },
      { release_type_name: 'General Availability' },
      { release_type_name: 'Hotfix' }
    ]);
    console.log(`✅ Inserted ${releaseTypes.length} release types`);

    // 2. Insert users
    console.log('👥 Inserting users...');
    const users = await User.bulkCreate([
      {
        user_id: 'admin001',
        first_name: 'System',
        last_name: 'Administrator',
        email: 'admin@company.com',
        password: '$2b$10$hashedPasswordHere',
        phone_no: '1234567890',
        join_date: new Date('2024-01-01'),
        user_gender: 'MALE',
        user_status: 'ACTIVE',
        designation_id: designations[5].id // Manager
      },
      {
        user_id: 'dev001',
        first_name: 'John',
        last_name: 'Smith',
        email: 'john.smith@company.com',
        password: '$2b$10$hashedPasswordHere',
        phone_no: '1234567891',
        join_date: new Date('2024-02-01'),
        user_gender: 'MALE',
        user_status: 'ACTIVE',
        designation_id: designations[0].id // Developer
      },
      {
        user_id: 'test001',
        first_name: 'Sarah',
        last_name: 'Johnson',
        email: 'sarah.johnson@company.com',
        password: '$2b$10$hashedPasswordHere',
        phone_no: '1234567892',
        join_date: new Date('2024-02-15'),
        user_gender: 'FEMALE',
        user_status: 'ACTIVE',
        designation_id: designations[3].id // Tester
      }
    ]);
    console.log(`✅ Inserted ${users.length} users`);

    // 3. Insert projects
    console.log('📋 Inserting projects...');
    const projects = await Project.bulkCreate([
      {
        project_id: 'PROJ001',
        project_name: 'E-Commerce Platform',
        description: 'Online shopping platform',
        client_name: 'TechCorp Inc',
        country: 'USA',
        phone_no: 1234567890,
        email: 'contact@techcorp.com',
        state: 'California',
        start_date: new Date('2024-01-01'),
        end_date: new Date('2024-12-31'),
        kloc: 50.5,
        project_status: 'IN_PROGRESS',
        user_id: users[0].id
      },
      {
        project_id: 'PROJ002',
        project_name: 'Mobile Banking App',
        description: 'Secure mobile banking application',
        client_name: 'FinanceBank',
        country: 'Canada',
        phone_no: 1234567891,
        email: 'tech@financebank.com',
        state: 'Ontario',
        start_date: new Date('2024-03-01'),
        end_date: new Date('2025-02-28'),
        kloc: 75.2,
        project_status: 'PLANNED',
        user_id: users[0].id
      }
    ]);
    console.log(`✅ Inserted ${projects.length} projects`);

    // 4. Insert modules
    console.log('🔧 Inserting modules...');
    const modules = await Modules.bulkCreate([
      { module_id: 'MOD001', module_name: 'User Authentication', project_id: projects[0].id },
      { module_id: 'MOD002', module_name: 'Product Catalog', project_id: projects[0].id },
      { module_id: 'MOD003', module_name: 'Shopping Cart', project_id: projects[0].id },
      { module_id: 'MOD004', module_name: 'Account Management', project_id: projects[1].id }
    ]);
    console.log(`✅ Inserted ${modules.length} modules`);

    // 5. Insert sub-modules
    console.log('📝 Inserting sub-modules...');
    const subModules = await SubModule.bulkCreate([
      { sub_module_id: 'SUB001', sub_module_name: 'Login', modules_id: modules[0].id },
      { sub_module_id: 'SUB002', sub_module_name: 'Registration', modules_id: modules[0].id },
      { sub_module_id: 'SUB003', sub_module_name: 'Product Search', modules_id: modules[1].id }
    ]);
    console.log(`✅ Inserted ${subModules.length} sub-modules`);

    // 6. Insert test cases
    console.log('🧪 Inserting test cases...');
    const testcases = await Testcase.bulkCreate([
      {
        test_case_id: 'TC001',
        description: 'Verify user login functionality',
        steps: '1. Open login page 2. Enter credentials 3. Click login',
        project_id: projects[0].id,
        modules_id: modules[0].id,
        sub_module_id: subModules[0].id,
        severity_id: severities[0].id,
        type_id: defectTypes[0].id
      },
      {
        test_case_id: 'TC002',
        description: 'Verify product search functionality',
        steps: '1. Go to search 2. Enter product name 3. Verify results',
        project_id: projects[0].id,
        modules_id: modules[1].id,
        sub_module_id: subModules[2].id,
        severity_id: severities[1].id,
        type_id: defectTypes[1].id
      }
    ]);
    console.log(`✅ Inserted ${testcases.length} test cases`);

    console.log('\n🎉 Sample data insertion completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`   - ${designations.length} designations`);
    console.log(`   - ${roles.length} roles`);
    console.log(`   - ${users.length} users`);
    console.log(`   - ${projects.length} projects`);
    console.log(`   - ${modules.length} modules`);
    console.log(`   - ${subModules.length} sub-modules`);
    console.log(`   - ${testcases.length} test cases`);

  } catch (error) {
    console.error('❌ Error during data insertion:', error);
    throw error;
  } finally {
    await sequelize.close();
  }
}

// Run the script
insertSampleData();
