import * as yup from 'yup'

export const signupSchema = yup.object({
    user: yup.string().required(),
    email: yup.string().email().required(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    password: yup.string().required(),
    password2: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
})