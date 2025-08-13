const sequelize = require('../config/database');
const Designation = require('../models/designation');

async function checkAndMigrate() {
  try {
    console.log('🔍 Checking database connection...');
    await sequelize.authenticate();
    console.log('✅ Database connected successfully');

    console.log('\n📊 Running first migration (reference data)...');
    const { exec } = require('child_process');
    const util = require('util');
    const execPromise = util.promisify(exec);

    // Run first migration
    await execPromise('npx sequelize-cli db:migrate --to 20250813001-insert-reference-data.js');
    console.log('✅ Reference data migration completed');

    // Check designation data
    console.log('\n🔍 Checking designation data...');
    const designations = await Designation.findAll();
    console.log('📋 Available designations:');
    designations.forEach(d => {
      console.log(`   ID: ${d.id}, Name: ${d.designation_name}`);
    });

    console.log('\n📊 Running remaining migrations...');
    await execPromise('npx sequelize-cli db:migrate');
    console.log('✅ All migrations completed successfully!');

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.stdout) console.log('Output:', error.stdout);
    if (error.stderr) console.error('Error details:', error.stderr);
  } finally {
    await sequelize.close();
  }
}

checkAndMigrate();
