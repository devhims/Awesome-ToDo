import { table } from './utils/airtable.js';

import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';

const handler = withApiAuthRequired(async (req, res) => {
  const { user } = getSession(req, res);
  const { id, fields } = req.body;

  try {
    const newFields = { ...fields, userId: user.sub };
    const updatedRecord = await table.update([{ id, fields: newFields }]);
    res.statusCode = 200;
    res.json(updatedRecord);
  } catch (error) {
    console.error(error);
    res.statusCode = 500;
    res.json({ msg: 'Something went wrong' });
  }
});

export default handler;
