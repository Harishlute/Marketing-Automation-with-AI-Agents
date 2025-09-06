import mongoose from 'mongoose';

const topicSchema = new mongoose.Schema({
  title: String,
  content: Object,
});

export default mongoose.models.Topic || mongoose.model('Topic', topicSchema);
