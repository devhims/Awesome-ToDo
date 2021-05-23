import { table, minifyRecords } from './utils/airtable.js';

import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async (req, res) => {
  const { user } = getSession(req, res);
  try {
    const records = await table
      .select({ filterByFormula: `userId = '${user.sub}'` })
      .firstPage(); //20 records
    const formattedRecords = minifyRecords(records);
    console.log(formattedRecords);
    res.statusCode = 200;
    res.json(formattedRecords);
  } catch (error) {
    console.error(error);
    res.statusCode = 500;
    res.json({ msg: 'Something went wrong' });
  }
});

// { filterByFormula: `userId = '${user.sub}'` }
