import { table } from './utils/airtable.js';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async (req, res) => {
  const todo = req.body;
  try {
    const createdRecords = await table.create([{ fields: todo.fields }]);
    const createdRecord = {
      id: createdRecords[0].id,
      fields: createdRecords[0].fields,
    };
    res.status(200).json(createdRecord);
  } catch (error) {
    console.error(error);
    res.statusCode = 500;
    res.status(500).json({ msg: 'Something went wrong' });
  }
});
