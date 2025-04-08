import express from 'express';
import { supabaseClient } from '../../clients/supabase.js';
import { publishCMSEvent } from '../../clients/rabbitmq.js';

const router = express.Router();

/**
 * @swagger
 * /documents/{id}:
 *   delete:
 *     summary: Delete a document by ID
 *     tags: [Documents]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The document ID
 *     responses:
 *       200:
 *         description: Document deleted successfully
 *       404:
 *         description: Document not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabaseClient
      .from('documents')
      .delete()
      .eq('id', id)
      .select('id, title');

    if (error) {
      console.error('Error deleting document:', error);
      return res.status(500).json({ error: 'Failed to delete document' });
    }

    if (data.length === 0) {
      return res.status(404).json({ error: 'Document not found' });
    }

    await publishCMSEvent({
      type: 'CMS_DOC_DELETED',
      documentId: id,
      timestamp: new Date().toISOString(),
    });

    res.status(200).json({ message: 'Document deleted successfully' });
  } catch (err) {
    console.error('Unexpected error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
