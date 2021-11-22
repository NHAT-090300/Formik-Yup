import React from 'react';
import styles from './textfield.module.scss';
import { ErrorMessage, useField } from 'formik';
export interface TextField {
	label?: string;
	props?: React.ReactNode;
}
const TextField: React.FC<TextField> = ({ label, ...props }) => {
	const [field, meta] = useField(props);
	return (
		<div className='mb-2'>
			<label htmlFor={field.name}>{label}</label>
			<input
				type='text'
				className={`form-control shadow-none ${
					meta.touched && meta.error && 'is-invalid'
				}`}
				{...field}
				{...props}
				autoComplete='off'
			/>
			<ErrorMessage
				component='div'
				name={field.name}
				className={styles.error}
			/>
		</div>
	);
};
export default TextField;
