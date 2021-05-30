import { table } from './utils/airtable.js';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import OwnsRecord from './middleware/OwnsRecord.js';

const handler = OwnsRecord(async (req, res) => {
  const todo = req.body;
  delete todo.fields.id;
  try {
    const updatedRecord = await table.update([todo]);
    res.status(200).json(updatedRecord);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Something went wrong' });
  }
});

export default handler;
