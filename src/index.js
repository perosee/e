import { Hono } from 'hono';
import { obfuscate } from 'js-confuser';

const app = new Hono();

app.post('/teraxzot', async (c) => {
  try {
    const { code } = await c.req.json();
    if (!code) {
      return c.json({ error: 'No code provided' }, 400);
    }

    // Single obfuscation with high preset
    const result = await obfuscate(code, {
      target: 'browser',
      preset: "high",
      stringEncoding: false,
    });

    if (!result) {
      return c.json({ error: 'Obfuscation returned no result' }, 500);
    }

    return c.json({ obfuscatedCode: result });
  } catch (error) {
    return c.json({ error: 'Obfuscation failed', details: error.message }, 500);
  }
});

app.get('/health', (c) => {
  return c.json({ status: 'OK' });
});

export default {
  fetch: app.fetch,
};
