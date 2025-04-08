import express from 'express';
import { supabaseClient } from '../../clients/supabase.js';
import { publishCMSEvent } from '../../clients/rabbitmq.js';

const router = express.Router();

/**
 * @swagger
 * /documents:
 *   post:
 *     summary: Create a new document
 *     tags: [Documents]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               coverImageUrl:
 *                 type: string
 *               status:
 *                 type: string
 *             required:
 *               - title
 *               - content
 *     responses:
 *       201:
 *         description: Document created successfully
 *       400:
 *         description: Bad request, missing required fields
 */
router.post('/', async (req, res) => {
  const { title, content, coverImageUrl = '', status } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }

  try {
    const { data, error } = await supabaseClient
      .from('documents')
      .insert([
        {
          title,
          content,
          cover_image_url: coverImageUrl ?? '',
          status: status ?? 'draft',
        },
      ])
      .select('id, title');

    if (error) {
      console.error('Error inserting document:', error);
      return res.status(500).json({ error });
    }

    await publishCMSEvent({
      type: 'CMS_DOC_CREATED',
      documentId: data[0].id,
      content,
      title,
      timestamp: new Date().toISOString(),
    });

    return res.status(201).json({ id: data[0].id, title: data[0].title });
  } catch (err) {
    console.error('Unexpected error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
