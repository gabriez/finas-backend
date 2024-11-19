import Joi from "joi";
import { join } from "path";
import { abort } from "process";

const schemaCreateUser = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),

  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  nombre: Joi.string().min(4).max(50).required(),
  apellido: Joi.string().min(4).max(50).required(),
  phone: Joi.string().length(11),
  cedula: Joi.string().pattern(new RegExp("^[0-9]*$")),
  roleId: Joi.number().required(),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
});

const schemaId = Joi.object({

  id: Joi.number().required()
  
});

const validator = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false });

export const validateUser = validator(schemaCreateUser);
export const validateId = validator(schemaId);
