import { execSync } from 'child_process';
import { existsSync } from 'fs';

console.log('🔨 Building frontend...');
console.log('Current directory:', process.cwd());

try {
  // Just build, don't install (Railway already installed)
  execSync('cd .. && npm run build', { stdio: 'inherit' });
  
  // Check if dist was created
  if (existsSync('../dist')) {
    console.log('✅ Frontend built successfully!');
    execSync('ls -la ../dist', { stdio: 'inherit' });
  } else {
    console.log('❌ Dist folder not created');
  }
} catch (error) {
  console.error('❌ Frontend build failed:', error.message);
  process.exit(1);
}
