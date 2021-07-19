import { Router } from 'express';
import { createInvoice } from '@controllers/invoice';

import { validateBody } from 'src/helpers';
import { validateInvoice } from '@models';

const router = Router();

/**
 * Router for /ping routes
 *
 * Available routes: /new
 */

router.post('/new', validateBody(validateInvoice), createInvoice);

export default router;
