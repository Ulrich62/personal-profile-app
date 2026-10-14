const assert = require('assert');
const app = require('./server');

const server = app.listen(3001, async () => {
  const baseUrl = 'http://localhost:3001';
  console.log('Testing personal-profile-app endpoints...\n');

  try {
    // Test 1: GET /
    const resHome = await fetch(`${baseUrl}/`);
    const textHome = await resHome.text();
    assert.strictEqual(textHome, "Welcome to Camper Bot's homepage!");
    console.log('✓ GET / passed');

    // Test 2: GET /hobbies
    const resHobbies = await fetch(`${baseUrl}/hobbies`);
    const textHobbies = await resHobbies.text();
    assert.strictEqual(textHobbies, 'I cycle, go boating, and play guitar.');
    console.log('✓ GET /hobbies passed');

    // Test 3: GET /skills
    const resSkills = await fetch(`${baseUrl}/skills`);
    const textSkills = await resSkills.text();
    assert.strictEqual(textSkills, 'JavaScript, Node.js, and Express.js!');
    console.log('✓ GET /skills passed');

    // Test 4: GET /api/profile
    const resProfile = await fetch(`${baseUrl}/api/profile`);
    assert.ok(resProfile.headers.get('content-type').includes('application/json'));
    const jsonProfile = await resProfile.json();
    assert.strictEqual(jsonProfile.name, 'Camper Bot');
    assert.deepStrictEqual(jsonProfile.hobbies, ['cycling', 'boating', 'guitar']);
    assert.deepStrictEqual(jsonProfile.skills, ['JavaScript', 'Node.js', 'Express.js']);
    console.log('✓ GET /api/profile passed');

    console.log('\n✓ All tests passed successfully!');
  } catch (err) {
    console.error('Test failed:', err);
    process.exit(1);
  } finally {
    server.close();
  }
});
