import { Logger } from '@nestjs/common';

async function testNormalUser() {
  const logger = new Logger('TestNormalUser');
  const baseUrl = 'http://localhost:3001';
  const timestamp = Date.now();
  const email = `user_${timestamp}@test.com`;
  const password = 'Password123!';

  // 1. Register
  logger.log(`1. Registering new user: ${email}`);
  const registerResponse = await fetch(`${baseUrl}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      password,
      firstName: 'Test',
      lastName: 'User',
      phone: '+2250707070707',
      city: 'Abidjan'
    }),
  });

  if (!registerResponse.ok) {
    const text = await registerResponse.text();
    logger.error(`Registration failed: ${registerResponse.status} - ${text}`);
    return;
  }
  logger.log('Registration successful!');

  // 2. Login
  logger.log('2. Logging in...');
  const loginResponse = await fetch(`${baseUrl}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!loginResponse.ok) {
    const text = await loginResponse.text();
    logger.error(`Login failed: ${loginResponse.status} - ${text}`);
    return;
  }

  const loginData = await loginResponse.json();
  const token = loginData.accessToken;
  logger.log('Login successful, token received.');

  // 3. Get Profile
  logger.log('3. Getting Profile...');
  const profileResponse = await fetch(`${baseUrl}/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!profileResponse.ok) {
    const text = await profileResponse.text();
    logger.error(`Get Profile failed: ${profileResponse.status} - ${text}`);
    return;
  }

  const profile = await profileResponse.json();
  logger.log('Profile retrieved:');
  console.dir(profile, { depth: null, colors: true });

  if (profile.role === 'MEMBER') {
    logger.log('✅ SUCCESS: User has MEMBER role.');
  } else {
    logger.error(`❌ FAILURE: User has role ${profile.role}, expected MEMBER.`);
  }
}

testNormalUser().catch(console.error);
