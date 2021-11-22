import React, { useState, useEffect } from 'react';
import Form from '../components/Form';
import Notiflix from 'Notiflix';
import Card from '../components/Card';
export interface HomePage {
	handleSubmit?: () => void;
	deleteCard?: () => void;
	getCardUpdate?: () => void;
	handleUpdateCard?: () => void;
	values?: object;
	actions?: object;
	localData?: object;
	LOCAL_STORAGE_NAME?: string;
	localStorage?: Storage;
	initialData?: object;
	id?: string;
	data?: any;
}
const Home: React.FC<HomePage> = () => {
	const [data, setData] = useState([]);
	const [dataUpdate, setdataUpdate] = useState([]);
	const [id, setId] = useState(() =>
		Math.random().toString(36).replace('0.', 'formik-yup'),
	);
	const alertSuccess = (data: object, message: string) => {
		localStorage.setItem('formik-data', JSON.stringify(data));
		Notiflix.Notify.success(message);
	};

	// check localStorage then loading
	useEffect(() => {
		if (typeof window !== 'undefined') {
			const localData = JSON.parse(localStorage.getItem('formik-data') || '');
			localData
				? setData(localData)
				: localStorage.setItem('formik-data', JSON.stringify([]));
		}
	}, []);
	// set id
	useEffect(() => {
		setId(Math.random().toString(36).replace('0.', 'formik-yup'));
	}, [data]);
	// create a new card
	const handleSubmit = (values: HomePage, actions: HomePage) => {
		setData([...data, (values = { ...values, id: id })]);
		alertSuccess(data, 'You posted data successfully');
		setTimeout(() => actions.resetForm(), 1000);
	};
	// delete card
	const deleteCard = (id: string) => {
		const newData = data.filter((value) => value['id'] != id);
		setData(newData);
		alertSuccess(newData, 'You deleted data successfully');
	};
	// get data update card
	const getCardUpdate = (id: string) => {
		const getData = data.filter((value) => value['id'] === id);
		setdataUpdate(getData);
	};
	// update card
	const handleUpdateCard = (values: HomePage, actions: HomePage) => {
		let preData = data;
		data.map((post, i) => {
			if (post.id === values.id) {
				preData[i] = values;
			}
		});
		setData([...preData]);
		alertSuccess(data, 'You updated data successfully');
		setdataUpdate({});
		setTimeout(() => actions.resetForm(), 1000);
	};

	return (
		<>
			<div className='container mt-3'>
				<div className='row'>
					<div className='col-md-4'>
						<h3 className='mb-5 logo'>FORM USER</h3>
						<Form
							handleSubmitCreate={handleSubmit}
							dataUpdate={dataUpdate}
							handleSubmitUpdate={handleUpdateCard}
						/>
					</div>
					<div className='col-md-8 content'>
						<img
							className='content_img img-fluid w-100'
							src='/images/rocket.png'
							alt='images form'
						/>
						<div className='list_card row w-100'>
							{data.map((value, i) => {
								return (
									<Card
										key={i}
										data={value}
										getIdDelete={deleteCard}
										getIdUpdate={getCardUpdate}
									/>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Home;
