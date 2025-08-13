const { exec } = require('child_process');
const path = require('path');

console.log('🚀 Starting database migration process...\n');

// Function to run shell commands
function runCommand(command) {
  return new Promise((resolve, reject) => {
    console.log(`📋 Executing: ${command}`);
    exec(command, { cwd: path.resolve(__dirname, '..') }, (error, stdout, stderr) => {
      if (error) {
        console.error(`❌ Error: ${error.message}`);
        reject(error);
        return;
      }
      if (stderr) {
        console.warn(`⚠️  Warning: ${stderr}`);
      }
      if (stdout) {
        console.log(`✅ Output: ${stdout}`);
      }
      resolve(stdout);
    });
  });
}

async function runMigrations() {
  try {
    console.log('📊 Checking migration status...');
    await runCommand('npx sequelize-cli db:migrate:status');
    
    console.log('\n🔄 Running all pending migrations...');
    await runCommand('npx sequelize-cli db:migrate');
    
    console.log('\n✨ All migrations completed successfully!');
    console.log('\n📈 Final migration status:');
    await runCommand('npx sequelize-cli db:migrate:status');
    
  } catch (error) {
    console.error('\n💥 Migration failed:', error.message);
    process.exit(1);
  }
}

// Run the migrations
runMigrations();
