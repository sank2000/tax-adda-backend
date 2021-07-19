import { Router } from 'express';
import { createInvoice, getInvoice, updateInvoice } from '@controllers/invoice';

import { validateBody } from 'src/helpers';
import { validateInvoice, validateUpdateInvoice, validateGetInvoice } from '@models';

const router = Router();

/**
 * Router for /ping routes
 *
 * Available routes: /
 */

router.post('/', validateBody(validateInvoice), createInvoice);
router.get('/:type', validateBody(validateGetInvoice, true), getInvoice);
router.put('/', validateBody(validateUpdateInvoice), updateInvoice);

export default router;
