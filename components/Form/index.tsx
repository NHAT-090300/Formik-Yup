// tsrsfc
import React, { useEffect, useState } from 'react';
import styles from './form.module.scss';
import { Formik, Form, Field } from 'formik';
import TextField from '../TextField/index';
import * as Yup from 'yup';
interface TextField {
	label?: string;
	name?: string;
	type?: string;
	TextField?: React.ReactNode;
	handleSubmit?: () => void;
}
const index: React.FC<TextField> = ({
	handleSubmitCreate,
	dataUpdate,
	handleSubmitUpdate,
}: object) => {
	const [loaded, setLoaded] = useState(true);
	let postUpdate = dataUpdate[0];
	const validate = Yup.object({
		firstName: Yup.string()
			.max(15, 'must be 15 characters or less')
			.min(2, 'must be at least 3 characters')
			.required('Required'),
		lastName: Yup.string()
			.max(15, 'must be 15 characters or less')
			.min(2, 'must be at least 3 characters')
			.required('Required'),
		email: Yup.string().email('Email is invail').required('Required'),
		phone: Yup.number().integer('phone is not string').required('Required'),
		address: Yup.string()
			.max(30, 'must be 30 characters or less')
			.min(6, 'must be at least 6 charaters')
			.required('Required'),
		country: Yup.string()
			.max(15, 'must be 15 characters or less')
			.min(3, 'must be at least 3 characters')
			.required('Required'),
	});
	return (
		<Formik
			initialValues={
				postUpdate || {
					id: '',
					firstName: '',
					lastName: '',
					email: '',
					phone: '',
					address: '',
					country: '',
				}
			}
			enableReinitialize={true}
			onSubmit={(values, actions) => {
				if (dataUpdate[0]) {
					handleSubmitUpdate(values, actions);
				} else {
					handleSubmitCreate(values, actions);
				}
			}}
			validationSchema={validate}>
			{(formik) => {
				return (
					<>
						<Form onSubmit={formik.handleSubmit}>
							<TextField label='First Name' name='firstName' type='text' />
							<TextField label='Last Name' name='lastName' type='text' />
							<TextField label='Email' name='email' type='text' />
							<TextField label='Phone Number' name='phone' type='number' />
							<TextField label='Address' name='address' type='text' />
							<TextField label='Country' name='country' type='text' />
							{dataUpdate[0] ? (
								<button
									className={`btn btn-dark mt-5 d-flex align-items-center ${styles.btn_submit}`}
									type='submit'>
									<div
										className={`spinner-border text-light ${
											loaded ? 'invisible' : ''
										}`}
										role='status'>
										<span className='visually-hidden'>Loading...</span>
									</div>
									<div className='px-2 text-center'>Update</div>
								</button>
							) : (
								<button
									className={`btn btn-dark mt-5 d-flex align-items-center ${styles.btn_submit}`}
									type='submit'>
									<div
										className={`spinner-border text-light ${
											loaded ? 'invisible' : ''
										}`}
										role='status'>
										<span className='visually-hidden'>Loading...</span>
									</div>
									<div className='px-2 text-center'>Submit</div>
								</button>
							)}
						</Form>
					</>
				);
			}}
		</Formik>
	);
};

export default index;
