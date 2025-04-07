import express from 'express';
import { supabaseClient } from '../../clients/supabase.js';

const router = express.Router();

/**
 * @swagger
 * /documents:
 *   get:
 *     summary: Get all documents
 *     tags: [Documents]
 *     responses:
 *       200:
 *         description: Documents fetched successfully
 *       500:
 *         description: Internal server error
 */
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabaseClient
      .from('documents')
      .select('id, title, status, cover_image_url, created_at, updated_at');

    if (error) {
      console.error('Error fetching documents:', error);
      return res.status(500).json({ error: 'Failed to fetch documents' });
    }

    res.status(200).json({ data });
  } catch (err) {
    console.error('Unexpected error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
