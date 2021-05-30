import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { table } from '../utils/airtable';

const OwnsRecord = (handler) =>
  withApiAuthRequired(async (req, res) => {
    const { user } = getSession(req, res);
    const todo = req.body;

    try {
      const existingRecord = await table.find(todo.id);

      if (!existingRecord || user.sub !== existingRecord.fields.userId) {
        return res.status(404).json({ msg: 'Something went wrong' });
      }

      req.record = existingRecord;
      return handler(req, res);
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: 'Error' });
    }
  });

export default OwnsRecord;
