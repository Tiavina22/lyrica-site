import { promises as fs } from 'fs';

const countFile = './download_count.txt';

export default async (req, res) => {
  if (req.method === 'GET') {
    try {
      const count = await fs.readFile(countFile, 'utf8');
      res.status(200).json({ count: parseInt(count, 10) });
    } catch (error) {
      res.status(500).json({ error: 'Unable to read count file' });
    }
  } else if (req.method === 'POST') {
    try {
      const count = parseInt(await fs.readFile(countFile, 'utf8'), 10);
      await fs.writeFile(countFile, (count + 1).toString());
      res.status(200).json({ count: count + 1 });
    } catch (error) {
      res.status(500).json({ error: 'Unable to update count file' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
