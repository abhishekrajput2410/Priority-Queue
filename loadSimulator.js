const axios = require('axios');
const Faker = require('faker');

const API_BASE = process.env.API_BASE || 'http://localhost:5000/api';
const TOKEN = process.env.SIM_TOKEN || '';

const categories = ['billing', 'support', 'security', 'performance', 'compliance'];
const types = ['ingest', 'compute', 'report', 'audit', 'notification'];
const priorities = ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW', 'UNKNOWN'];

const createRequest = () => ({
  title: `Automated request ${Faker.datatype.uuid()}`,
  description: Faker.lorem.sentence(),
  category: categories[Math.floor(Math.random() * categories.length)],
  type: types[Math.floor(Math.random() * types.length)],
  payload: { size: Math.floor(Math.random() * 3000) + 100, details: Faker.lorem.paragraph() },
  priority: priorities[Math.floor(Math.random() * priorities.length)],
  slaDeadline: new Date(Date.now() + (Math.floor(Math.random() * 45) + 15) * 60000).toISOString()
});

const run = async (count = 100) => {
  const headers = TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {};
  const results = [];

  for (let i = 0; i < count; i++) {
    const payload = createRequest();
    try {
      const response = await axios.post(`${API_BASE}/requests`, payload, { headers });
      results.push(response.data);
      process.stdout.write(`Created ${i + 1}/${count}\r`);
    } catch (error) {
      console.error('Request failed', error.response ? error.response.data : error.message);
    }
  }

  console.log(`\nDone. Generated ${results.length} requests.`);
};

const count = parseInt(process.argv[2], 10) || 100;
run(count).catch(console.error);
