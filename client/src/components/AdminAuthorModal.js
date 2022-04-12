import React, { Fragment, useState } from 'react';
import isEmpty from 'validator/lib/isEmpty';
import { showErrorMsg, showSuccessMsg } from '../helpers/message';
import { showLoading } from '../helpers/loading';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { clearMessages } from '../redux/actions/messageActions';
import { createAuthor } from '../redux/actions/authorActions';

const AdminAuthorModal = () => {
	/****************************
	 * REDUX GLOBAL STATE PROPERTIES
	 ***************************/
	const { successMsg, errorMsg } = useSelector(state => state.messages);
	const { loading } = useSelector(state => state.loading);

	const dispatch = useDispatch();
	/****************************
	 * COMPONENT STATE PROPERTIES
	 ***************************/
	const [author, setauthor] = useState('');
	const [clientSideErrorMsg, setClientSideErrorMsg] = useState('');

	/****************************
	 * EVENT HANDLERS
	 ***************************/
	const handleMessages = evt => {
		dispatch(clearMessages());
	};

	const handleAuthorChange = evt => {
		dispatch(clearMessages());
		setauthor(evt.target.value);
	};

	const handleAuthorSubmit = evt => {
		evt.preventDefault();

		if (isEmpty(author)) {
			setClientSideErrorMsg('Vui lòng nhập tác giả');
		} else {
			const data = { author };
			dispatch(createAuthor(data));
			setauthor('');
		}
	};

	/****************************
	 * RENDERER
	 ***************************/
	return (
		<div id='addAuthorModal' className='modal' onClick={handleMessages}>
			<div className='modal-dialog modal-dialog-centered modal-lg'>
				<div className='modal-content'>
					<form onSubmit={handleAuthorSubmit}>
						<div className='modal-header bg-info text-white'>
							<h5 className='modal-title'>Thêm tác giả</h5>
							<button className='close' data-dismiss='modal'>
								<span>
									<i className='fas fa-times'></i>
								</span>
							</button>
						</div>
						<div className='modal-body my-2'>
							{clientSideErrorMsg &&
								showErrorMsg(clientSideErrorMsg)}
							{errorMsg && showErrorMsg(errorMsg)}
							{successMsg && showSuccessMsg(successMsg)}

							{loading ? (
								<div className='text-center'>
									{showLoading()}
								</div>
							) : (
								<Fragment>
									<label className='text-secondary'>
										Tác giả
									</label>
									<input
										type='text'
										className='form-control'
										name='author'
										value={author}
										onChange={handleAuthorChange}
									/>
								</Fragment>
							)}
						</div>
						<div className='modal-footer'>
							<button
								className='btn btn-secondary'
								data-dismiss='modal'
							>
								Đóng
							</button>
							<button type='submit' className='btn btn-info'>
								Hoàn thành
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default AdminAuthorModal;