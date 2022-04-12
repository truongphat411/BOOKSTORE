import React, { Fragment, useState } from 'react';
import isEmpty from 'validator/lib/isEmpty';
import { showErrorMsg, showSuccessMsg } from '../helpers/message';
import { showLoading } from '../helpers/loading';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { clearMessages } from '../redux/actions/messageActions';
import { createProduct } from '../redux/actions/productActions';

const AdminProductModal = () => {
	/****************************
	 * REDUX GLOBAL STATE PROPERTIES
	 ***************************/
	const { loading } = useSelector(state => state.loading);
	const { successMsg, errorMsg } = useSelector(state => state.messages);
	const { categories } = useSelector(state => state.categories);
    const { authors } = useSelector(state => state.authors);

	const dispatch = useDispatch();
	/****************************
	 * COMPONENT STATE PROPERTIES
	 ***************************/
	const [clientSideError, setClientSideError] = useState('');
	const [productData, setProductData] = useState({
		productImage: null,
		productName: '',
		productDesc: '',
		productPrice: '',
		productCategory: '',
        productAuthor: '',
		productQty: '',
	});

	const {
		productImage,
		productName,
		productDesc,
		productPrice,
		productCategory,
		productQty,
        productAuthor,
	} = productData;

	/****************************
	 * EVENT HANDLERS
	 ***************************/
	const handleMessages = evt => {
		dispatch(clearMessages());
		setClientSideError('');
	};

	const handleProductChange = evt => {
		setProductData({
			...productData,
			[evt.target.name]: evt.target.value,
		});
	};

	const handleProductImage = evt => {
		console.log(evt.target.files[0]);
		setProductData({
			...productData,
			[evt.target.name]: evt.target.files[0],
		});
	};

	const handleProductSubmit = evt => {
		evt.preventDefault();

		if (productImage === null) {
			setClientSideError('Vui lòng chọn ảnh');
		} else if (
			isEmpty(productName) ||
			isEmpty(productDesc) ||
			isEmpty(productPrice)
		) {
			setClientSideError('Vui lòng nhập đầy đủ thông tin');
		} else if (isEmpty(productCategory)) {
			setClientSideError('Vui lòng chọn thể loại');
		} else if (isEmpty(productQty)) {
			setClientSideError('Vui lòng nhập số lượng');
		}else if (isEmpty(productAuthor)) {
			setClientSideError('Vui lòng chọn tác giả'); 
        }else {
			let formData = new FormData();

			formData.append('productImage', productImage);
			formData.append('productName', productName);
			formData.append('productDesc', productDesc);
			formData.append('productPrice', productPrice);
			formData.append('productCategory', productCategory);
            formData.append('productAuthor', productAuthor);
			formData.append('productQty', productQty);

			dispatch(createProduct(formData));
			setProductData({
				productImage: null,
				productName: '',
				productDesc: '',
				productPrice: '',
				productCategory: '',
                productAuthor: '',
				productQty: '',
			});
		}
	};

	/****************************
	 * RENDERER
	 ***************************/
	return (
		<div id='addProductModal' className='modal' onClick={handleMessages}>
			<div className='modal-dialog modal-dialog-centered modal-lg'>
				<div className='modal-content'>
					<form onSubmit={handleProductSubmit}>
						<div className='modal-header bg-warning text-white'>
							<h5 className='modal-title'>Thêm sách</h5>
							<button className='close' data-dismiss='modal'>
								<span>
									<i className='fas fa-times'></i>
								</span>
							</button>
						</div>
						<div className='modal-body my-2'>
							{clientSideError && showErrorMsg(clientSideError)}
							{errorMsg && showErrorMsg(errorMsg)}
							{successMsg && showSuccessMsg(successMsg)}

							{loading ? (
								<div className='text-center'>
									{showLoading()}
								</div>
							) : (
								<Fragment>
									<div className='custom-file mb-2'>
										<input
											type='file'
											className='custom-file-input'
											name='productImage'
											onChange={handleProductImage}
										/>
										<label className='custom-file-label'>
											Chọn ảnh
										</label>
										{productImage &&
											productImage.name ? (
												<span className='badge badge-secondary'>
													{productImage.name}
												</span>
											) : null}
										
									</div>

									<div className='form-group'>
										<label className='text-secondary'>
											Tên
										</label>
										<input
											type='text'
											className='form-control'
											name='productName'
											value={productName}
											onChange={handleProductChange}
										/>
									</div>

									<div className='form-group'>
										<label className='text-secondary'>
											Mô tả
										</label>
										<textarea
											className='form-control'
											rows='3'
											name='productDesc'
											value={productDesc}
											onChange={handleProductChange}
										></textarea>
									</div>

                                    
                                    <div className='form-row'>
									<div className='form-group col-md-6'>
										<label className='text-secondary'>
											Giá tiền
										</label>
										<input
											type='text'
											className='form-control'
											name='productPrice'
											value={productPrice}
											onChange={handleProductChange}
										/>
									</div>

                                    <div className='form-group col-md-6'>
											<label className='text-secondary'>
												Số lượng
											</label>
											<input
												type='number'
												className='form-control'
												min='0'
												max='1000'
												name='productQty'
												value={productQty}
												onChange={handleProductChange}
											/>
								    </div>
                                    </div>

									<div className='form-row'>
										<div className='form-group col-md-6'>
											<label className='text-secondary'>
												Thể loại
											</label>
											<select
												className='custom-select mr-sm-2'
												name='productCategory'
												onChange={handleProductChange}
											>
												<option value=''>
													Chọn một...
												</option>
												{categories &&
													categories.map(c => (
														<option
															key={c._id}
															value={c._id}
														>
															{c.category}
														</option>
													))}
											</select>
										</div>

                                        <div className='form-group col-md-6'>
											<label className='text-secondary'>
												Tác giả
											</label>
											<select
												className='custom-select mr-sm-2'
												name='productAuthor'
												onChange={handleProductChange}
											>
												<option value=''>
													Chọn một...
												</option>
												{authors &&
													authors.map(a => (
														<option
															key={a._id}
															value={a._id}
														>
															{a.author}
														</option>
													))}
											</select>
										</div>
									</div>   
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
							<button
								type='submit'
								className='btn btn-warning text-white'
							>
								Hoàn thành
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default AdminProductModal;
