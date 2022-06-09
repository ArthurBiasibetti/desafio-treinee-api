import { Router } from 'express';
import {
  createUserHandler,
  findUserHandler,
  findUsersHandler,
  updateUserHandler,
} from '../../controllers/user.controller';
import onlyAdmin from '../../middlewares/onlyAdmin';

const routes = Router();

/**
 * @openapi
 * '/api/v1/users/{userId}':
 *  post:
 *     tags:
 *     - user
 *     summary: Create a single User
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *      - name: userId
 *        in: path
 *        description: The id of the user
 *        required: true
 *     requestBody:
 *        content:
 *          application/json:
 *             schema:
 *                $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Success
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schemas/User'
 *       401:
 *         description: Not Authorized user
 *       403:
 *         description: Only admin can use this command
 *       404:
 *         description: User not found
 *  get:
 *     tags:
 *     - user
 *     summary: Get a single user by id
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *      - name: userId
 *        in: path
 *        description: The id of the user
 *        required: true
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schemas/User'
 *  put:
 *     tags:
 *     - user
 *     summary: Update a single user by id
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *      - name: userId
 *        in: path
 *        descriptions: The id of the user
 *        required:  true
 *     requestBody:
 *        content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schemas/UserUpdate'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schemas/User'
 * '/api/v1/users':
 *  get:
 *     tags:
 *     - user
 *     sumarry: Get a list of users
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *           schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/User'
 */

routes.route('/').get(findUsersHandler);
routes
  .route('/:userId')
  .get(findUserHandler)
  .post(onlyAdmin, createUserHandler)
  .put(updateUserHandler);

export default routes;
