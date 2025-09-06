import dbConnect from '../../lib/db';
import Topic from '../../models/topic';

export default async function handler(req, res) {
  // Connect to the MongoDB database
  await dbConnect();

  // Handle different HTTP methods
  switch (req.method) {
    case 'GET':
      try {
        // Find all topics in the database
        const topics = await Topic.find({});
        res.status(200).json({ success: true, data: topics });
      } catch (error) {
        // Handle any errors during the fetch
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case 'POST':
      try {
        // Create a new topic with data from the request body
        const topic = await Topic.create(req.body);
        res.status(201).json({ success: true, data: topic });
      } catch (error) {
        // Handle validation or creation errors
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    default:
      // Return an error for unsupported methods
      res.status(405).json({ success: false, message: 'Method Not Allowed' });
      break;
  }
}
