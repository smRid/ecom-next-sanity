#!/usr/bin/env node

/**
 * Deployment Verification Script
 * Verifies that the project is ready for Vercel deployment
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying Vercel deployment configuration...\n');

const checks = [];

// Check 1: vercel.json exists and is valid
try {
  const vercelConfig = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
  checks.push({
    name: 'vercel.json configuration',
    status: 'pass',
    details: `✓ Found version ${vercelConfig.version} config with ${vercelConfig.builds?.length || 0} builds`
  });
} catch (error) {
  checks.push({
    name: 'vercel.json configuration',
    status: 'fail',
    details: `✗ ${error.message}`
  });
}

// Check 2: Package.json has required scripts
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const requiredScripts = ['dev', 'build', 'install:all'];
  const missingScripts = requiredScripts.filter(script => !packageJson.scripts[script]);
  
  if (missingScripts.length === 0) {
    checks.push({
      name: 'Root package.json scripts',
      status: 'pass',
      details: '✓ All required scripts present: dev, build, install:all'
    });
  } else {
    checks.push({
      name: 'Root package.json scripts',
      status: 'fail',
      details: `✗ Missing scripts: ${missingScripts.join(', ')}`
    });
  }
} catch (error) {
  checks.push({
    name: 'Root package.json scripts',
    status: 'fail',
    details: `✗ ${error.message}`
  });
}

// Check 3: Frontend build script
try {
  const frontendPackage = JSON.parse(fs.readFileSync('frontend/package.json', 'utf8'));
  if (frontendPackage.scripts.build && frontendPackage.scripts['vercel-build']) {
    checks.push({
      name: 'Frontend build configuration',
      status: 'pass',
      details: '✓ Build and vercel-build scripts present'
    });
  } else {
    checks.push({
      name: 'Frontend build configuration',
      status: 'fail',
      details: '✗ Missing build or vercel-build script'
    });
  }
} catch (error) {
  checks.push({
    name: 'Frontend build configuration',
    status: 'fail',
    details: `✗ ${error.message}`
  });
}

// Check 4: Backend serverless compatibility
try {
  const backendIndex = fs.readFileSync('backend/index.js', 'utf8');
  const hasModuleExports = backendIndex.includes('module.exports = app');
  const hasConditionalListen = backendIndex.includes('process.env.VERCEL') || backendIndex.includes('process.env.NODE_ENV');
  
  if (hasModuleExports && hasConditionalListen) {
    checks.push({
      name: 'Backend serverless compatibility',
      status: 'pass',
      details: '✓ Exports app and has conditional server start'
    });
  } else {
    checks.push({
      name: 'Backend serverless compatibility',
      status: 'warn',
      details: '⚠ May not be fully serverless compatible'
    });
  }
} catch (error) {
  checks.push({
    name: 'Backend serverless compatibility',
    status: 'fail',
    details: `✗ ${error.message}`
  });
}

// Check 5: Environment template
try {
  const envProd = fs.readFileSync('.env.production', 'utf8');
  if (envProd.includes('MONGODB_URI=')) {
    checks.push({
      name: 'Environment configuration',
      status: 'pass',
      details: '✓ .env.production template found with MONGODB_URI'
    });
  } else {
    checks.push({
      name: 'Environment configuration',
      status: 'warn',
      details: '⚠ .env.production exists but may be incomplete'
    });
  }
} catch (error) {
  checks.push({
    name: 'Environment configuration',
    status: 'warn',
    details: '⚠ No .env.production template found'
  });
}

// Display results
console.log('📋 Deployment Readiness Report:\n');

let passCount = 0;
let warnCount = 0;
let failCount = 0;

checks.forEach(check => {
  const icon = check.status === 'pass' ? '✅' : check.status === 'warn' ? '⚠️' : '❌';
  console.log(`${icon} ${check.name}`);
  console.log(`   ${check.details}\n`);
  
  if (check.status === 'pass') passCount++;
  else if (check.status === 'warn') warnCount++;
  else failCount++;
});

// Summary
console.log('📊 Summary:');
console.log(`   ✅ Passed: ${passCount}`);
console.log(`   ⚠️  Warnings: ${warnCount}`);
console.log(`   ❌ Failed: ${failCount}\n`);

if (failCount === 0) {
  console.log('🚀 Your project is ready for Vercel deployment!');
  console.log('\n📝 Next steps:');
  console.log('   1. Set MONGODB_URI in Vercel dashboard');
  console.log('   2. Run: npx vercel');
  console.log('   3. Test your deployment\n');
} else {
  console.log('🔧 Please fix the failed checks before deploying.');
}

process.exit(failCount > 0 ? 1 : 0);
