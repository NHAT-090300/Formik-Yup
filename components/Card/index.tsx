import React from 'react';
export interface CardProps {
	data?: object | undefined;
	onClickUpdateCard?: () => void;
	onClickDeleteCard?: () => void;
}

export default function Card({ data, getIdDelete, getIdUpdate }) {
	const onClickDeleteCard = () => getIdDelete(data.id);
	const onClickUpdateCard = () => getIdUpdate(data.id);
	return (
		<div className='card col-md-5 p-0' style={{ width: '47%' }}>
			<div className='card-body'>
				<h5 className='card-title'>{data.firstName + ' ' + data.lastName}</h5>
				<b className='card-subtitle d-block text-muted'>Email-{data.email}</b>
				<b className='card-subtitle d-block text-muted'>
					Phone number-{data.phone}
				</b>
				<p className='card-text'>
					address: {data.address} - country: {data.country}
				</p>
				<p className='card-text'>
					Animation glitch when returning to inactive tab after animations
					occurred while tab was hiddenAnimation glitch when returning to
					inactive tab after animations occurred
				</p>
				<button
					type='button'
					onClick={onClickUpdateCard}
					className='btn mx-2 btn-outline-primary'>
					Update
				</button>
				<button
					type='button'
					onClick={onClickDeleteCard}
					className='btn btn-outline-danger'>
					Delete
				</button>
			</div>
		</div>
	);
}
