import { object, string, InferType } from 'yup';

/**
 * @openapi
 * components:
 *   schemas:
 *     Session:
 *       type: object
 *       required:
 *        - password
 *       properties:
 *         username:
 *           type: string
 *         password:
 *           type: string
 */

const payload = {
  body: object({
    nome: string(),
    cpf: string()
      .min(11, 'cpf must have legnth 11')
      .max(11, 'cpf must have legnth 11'),
    password: string().defined('password is required'),
  }).defined(),
};

export const createSessionSchema = object({
  ...payload,
});

export type CreateSessionInput = InferType<typeof createSessionSchema>;
