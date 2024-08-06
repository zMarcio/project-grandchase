import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  nickname: yup
    .string()
    .required('Nickname é obrigatório')
    .min(3, 'Nickname deve ter pelo menos 3 caracteres')
    .max(20, 'Nickname deve ter no máximo 20 caracteres'),
  email: yup
    .string()
    .required('Email é obrigatório')
    .email('Email inválido'),
  password: yup
    .string()
    .required('Senha é obrigatória')
    .min(6, 'Senha deve ter pelo menos 6 caracteres'),
});
