import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
    username: Yup.string()
    .min(3, 'Username must be minimum 3 characters')
    .required("Username is required"),

email:Yup.string()
.email("invalid email type")
.required("Email is required"),

password: Yup.string()
.min(3, 'Password must be minimum 3 characters')
.required('Password is required'),

password_confirmation: Yup.string()
.oneOf([Yup.ref('password'), null], 'passwords must match')
.required('Confirmation password is required'),

avatar:Yup.mixed().nullable(),

})