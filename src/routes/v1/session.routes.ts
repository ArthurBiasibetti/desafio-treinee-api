import { Router } from 'express';
import { createSessionHandler } from '../../controllers/session.controller';

const routes = Router();

/**
 * @openapi
 * '/api/v1/sessions':
 *  post:
 *     tags:
 *     - session
 *     summary: Create a single User
 *     requestBody:
 *        content:
 *          application/json:
 *             schema:
 *                $ref: '#/components/schemas/Session'
 *     responses:
 *       200:
 *         description: Success
 *         headers:
 *          Authorization:
 *            schema:
 *              type: string
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schemas/User'
 *       404:
 *         description: Not found
 */

routes.route('/').post(createSessionHandler);

export default routes;
