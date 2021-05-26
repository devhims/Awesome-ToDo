import { table } from './utils/airtable.js';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';

const handler = withApiAuthRequired(async (req, res) => {
  const todo = req.body;
  try {
    const deletedRecord = await table.destroy([todo.id]);
    res.statusCode = 200;
    res.json(deletedRecord);
  } catch (error) {
    console.error(error);
    res.statusCode = 500;
    res.json({ msg: 'Something went wrong' });
  }
});

export default handler;
