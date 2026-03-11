import express, { Request, Response } from 'express';
import multer from 'multer';
import Contact from '../models/Contact';

const router = express.Router();

// Configure Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});



// @route   POST api/contact
// @desc    Submit a contact form with optional attachment
// @access  Public
router.post('/', upload.single('attachment'), async (req: Request, res: Response) => {
  const { name, email, message } = req.body;
  const file = req.file;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please provide all fields' });
  }

  try {
    // Save to database
    const newContact = new Contact({
      name,
      email,
      message,
    });
    await newContact.save();

    res.json({ success: true, message: 'Message logged to database successfully!' });
  } catch (err: any) {
    console.error('Contact Route Error:', err.message);
    res.status(500).json({ error: 'Failed to send message. Check your Gmail credentials.' });
  }
});

export default router;


