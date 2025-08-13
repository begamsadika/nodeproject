# Database Migration and Data Insertion Guide

This guide explains how to use migration scripts to insert data into your Node.js application using Sequelize.

## 🚀 Quick Start

### Option 1: Using Custom Scripts (Recommended)
```bash
# Reset database and insert fresh sample data
npm run reset-data

# Insert sample data (without resetting)
npm run insert-data
```

### Option 2: Using Sequelize CLI Migrations
```bash
# Run all pending migrations
npm run migrate

# Check migration status
npm run migrate:status

# Undo last migration
npm run migrate:undo

# Undo all migrations
npm run migrate:undo:all
```

## 📁 Project Structure

```
├── migrations/                 # Sequelize CLI migration files
│   ├── 20250813001-insert-reference-data.js
│   ├── 20250813002-insert-users-data.js
│   ├── 20250813003-insert-projects-data.js
│   ├── 20250813004-insert-testcases-releases.js
│   ├── 20250813005-insert-allocations-permissions.js
│   ├── 20250813006-insert-defects-comments.js
│   ├── 20250813007-insert-config-data.js
│   └── 20250813100-simple-data-insert.js
├── scripts/                   # Custom data insertion scripts
│   ├── insert-sample-data.js
│   ├── reset-and-insert-data.js
│   ├── check-and-migrate.js
│   └── run-migrations.js
├── config/
│   ├── config.js             # Sequelize CLI configuration
│   └── database.js           # Database connection
└── .sequelizerc              # Sequelize CLI configuration
```

## 📊 Sample Data Included

The migration scripts insert comprehensive sample data including:

### Reference Data
- **8 Designations**: Developer, Senior Developer, Lead Developer, Tester, Senior Tester, Manager, Project Manager, Intern
- **5 Roles**: Admin, Project Manager, Developer, Tester, QA Lead
- **3 Severities**: Critical, Major, Minor (with colors and weights)
- **5 Defect Types**: UI/UX, Backend Logic, Database, Performance, Security
- **5 Release Types**: Alpha, Beta, Release Candidate, General Availability, Hotfix

### Business Data
- **4 Users**: Admin, Developer, Tester, Project Manager (with realistic details)
- **2 Projects**: E-Commerce Platform, Mobile Banking App (with client information)
- **5 Modules**: User Authentication, Product Catalog, Shopping Cart, Account Management, Transaction History
- **4 Sub-modules**: Login, Registration, Product Search, Add to Cart
- **3 Test Cases**: Login functionality, Product search, Add to cart (with steps and descriptions)
- **2 Releases**: E-Commerce v1.0, Banking App Beta (with release information)

## 🛠️ Available Scripts

### Package.json Scripts
```json
{
  "scripts": {
    "migrate": "sequelize-cli db:migrate",
    "migrate:undo": "sequelize-cli db:migrate:undo",
    "migrate:undo:all": "sequelize-cli db:migrate:undo:all",
    "migrate:status": "sequelize-cli db:migrate:status",
    "seed": "sequelize-cli db:seed:all",
    "seed:undo": "sequelize-cli db:seed:undo:all",
    "insert-data": "node scripts/insert-sample-data.js",
    "reset-data": "node scripts/reset-and-insert-data.js"
  }
}
```

### Custom Scripts

#### 1. `reset-and-insert-data.js` (Recommended)
- **Purpose**: Completely resets the database and inserts fresh sample data
- **Usage**: `npm run reset-data`
- **Features**: 
  - Drops and recreates all tables
  - Inserts comprehensive sample data
  - Handles foreign key relationships properly
  - Provides detailed progress logging

#### 2. `insert-sample-data.js`
- **Purpose**: Inserts sample data without resetting the database
- **Usage**: `npm run insert-data`
- **Note**: May fail if data already exists due to unique constraints

#### 3. `check-and-migrate.js`
- **Purpose**: Checks database status and runs migrations step by step
- **Usage**: `node scripts/check-and-migrate.js`

## 🔧 Migration Files

### Sequential Migration Files
1. **20250813001-insert-reference-data.js**: Basic reference data (designations, roles, severities, etc.)
2. **20250813002-insert-users-data.js**: User accounts with proper foreign key references
3. **20250813003-insert-projects-data.js**: Projects, modules, and sub-modules
4. **20250813004-insert-testcases-releases.js**: Test cases and release information
5. **20250813005-insert-allocations-permissions.js**: Project allocations and user permissions
6. **20250813006-insert-defects-comments.js**: Defects, defect history, and comments
7. **20250813007-insert-config-data.js**: SMTP configuration and additional settings

## 📝 Creating New Migration Scripts

### Using Sequelize CLI
```bash
# Generate a new migration file
npx sequelize-cli migration:generate --name insert-new-data

# Generate a new seeder file
npx sequelize-cli seed:generate --name insert-new-data
```

### Migration Template
```javascript
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Insert data here
    await queryInterface.bulkInsert('table_name', [
      { field1: 'value1', field2: 'value2' },
      { field1: 'value3', field2: 'value4' }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    // Remove data here
    await queryInterface.bulkDelete('table_name', null, {});
  }
};
```

## 🚨 Important Notes

1. **Foreign Key Dependencies**: Always insert reference data before dependent data
2. **Unique Constraints**: Be careful with unique fields like `user_id`, `project_id`, etc.
3. **Data Types**: Ensure data types match your model definitions
4. **Environment**: Migrations run in the environment specified in `config/config.js`

## 🔍 Troubleshooting

### Common Issues

1. **Foreign Key Constraint Errors**
   - Ensure reference data is inserted first
   - Check that foreign key values exist in parent tables

2. **Unique Constraint Violations**
   - Clear existing data before inserting new data
   - Use `npm run reset-data` for a clean start

3. **Field Name Mismatches**
   - Verify field names match your model definitions
   - Check the actual database schema

### Debugging Commands
```bash
# Check migration status
npm run migrate:status

# View database tables (if MySQL client is available)
mysql -u root -p -e "SHOW TABLES;" node_project

# Reset everything and start fresh
npm run reset-data
```

## ✅ Best Practices

1. **Use the reset script** for development: `npm run reset-data`
2. **Test migrations** in a separate environment before production
3. **Backup data** before running migrations in production
4. **Version control** all migration files
5. **Document changes** in migration files with comments

## 🎯 Next Steps

After running the migrations, you can:
1. Start your application: `npm start`
2. Test the API endpoints with the sample data
3. Verify data relationships in your database
4. Create additional migration scripts for more data as needed

Your database is now populated with realistic sample data that demonstrates all the relationships and features of your application!
