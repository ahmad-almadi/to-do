import { execSync } from 'child_process';
import { existsSync } from 'fs';

console.log('🔨 Building frontend...');
console.log('Current directory:', process.cwd());

try {
  // Go to parent and build
  execSync('cd .. && npm install && npm run build', { stdio: 'inherit' });
  
  // Check if dist was created
  if (existsSync('../dist')) {
    console.log('✅ Frontend built successfully!');
    console.log('Dist contents:', execSync('ls -la ../dist').toString());
  } else {
    console.log('❌ Dist folder not created');
  }
} catch (error) {
  console.error('❌ Frontend build failed:', error.message);
  process.exit(1);
}
