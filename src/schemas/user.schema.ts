import { object, string, InferType, mixed } from 'yup';
import { Permissions } from '../database/entities/User.Entity';

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *        - name
 *        - birthday
 *        - cpf
 *        - password
 *        - permissions
 *        - birthday
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *         comments:
 *           type: string
 *         cpf:
 *           type: string
 *         password:
 *           type: string
 *         permissions:
 *           type: string
 *           enum:
 *            - ADMIN
 *            - COLAB
 *         birthday:
 *           type: string
 *     UserUpdate:
 *       type: object
 *       properties:
 *         comments:
 *           type: string
 *         permissions:
 *           type: string
 *           enum:
 *            - ADMIN
 *            - COLAB
 */

const payload = {
  body: object({
    name: string()
      .max(120, 'Name is max length 120')
      .defined('Name is required'),
    birthday: string().defined('Birthday is required'),
    cpf: string()
      .min(11, 'CPF needs to has length 11')
      .max(11, 'CPF needs to has length 11')
      .defined('CPF is required'),
    comments: string(),
    password: string().defined('Password is required'),
    permission: mixed<Permissions>()
      .oneOf(
        [Permissions.ADMIN, Permissions.COLAB],
        'Permissions need to be ADMIN or COLAB'
      )
      .defined('Permissions is required'),
  }).defined(),
};

const params = {
  params: object({
    userId: string().defined('userId is required'),
  }),
};

export const createUserSchema = object({
  ...payload,
});

export const updateUserSchema = object({
  ...payload,
  ...params,
});

export const deleteUserSchema = object({
  ...params,
});

export const getUserSchema = object({
  ...params,
});

export type CreateUserInput = InferType<typeof createUserSchema>;
export type UpdateUserInput = InferType<typeof updateUserSchema>;
export type ReadUserInput = InferType<typeof getUserSchema>;
export type DeleteUserInput = InferType<typeof deleteUserSchema>;
