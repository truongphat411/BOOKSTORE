import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import AdminHeader from './AdminHeader';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../redux/actions/productActions';
import { getCategories } from '../redux/actions/categoryActions';
import { getAuthors } from '../redux/actions/authorActions';


const AdminEditProduct = ({ match, history }) => {
	/****************************
	 * PARAMS
	 ***************************/
	const productId = match.params.productId;

	/****************************
	 * REDUX GLOBAL STATE PROPERTIES
	 ***************************/
	const dispatch = useDispatch();
	const { product } = useSelector(state => state.products);
	const { categories } = useSelector(state => state.categories);
	const { authors } = useSelector(state => state.authors);
	

	/****************************
	 * COMPONENT STATE PROPERTIES
	 ***************************/
	const [productImage, setProductImage] = useState(null);
	const [productName, setProductName] = useState('');
	const [productDesc, setProductDesc] = useState('');
	const [productPrice, setProductPrice] = useState('');
	const [productCategory, setProductCategory] = useState('');
	const [productAuthor, setProductAuthor] = useState('');
	const [productQty, setProductQty] = useState('');

	/****************************
	 * LIFECYCLE METHODS
	 ***************************/
	useEffect(() => {
		if (!product) {
			dispatch(getProduct(productId));
			dispatch(getCategories());
			dispatch(getAuthors());
		} else {
			setProductImage(product.fileName);
			setProductName(product.productName);
			setProductDesc(product.productDesc);
			setProductPrice(product.productPrice);
			setProductCategory(product.productCategory);
			setProductAuthor(product.productAuthor);
			setProductQty(product.productQty);
		}
	}, [dispatch, productId, product]);

	/****************************
	 * EVENT HANDLERS
	 ***************************/
	const handleImageUpload = e => {
		const image = e.target.files[0];
		setProductImage(image);
	};

	const handleProductSubmit = async e => {
		e.preventDefault();

		const formData = new FormData();
		formData.append('productImage', productImage);
		formData.append('productName', productName);
		formData.append('productDesc', productDesc);
		formData.append('productPrice', productPrice);
		formData.append('productCategory', productCategory);
		formData.append('productAuthor', productAuthor);
		formData.append('productQty', productQty);

		const config = {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		};

		await axios
			.put(`/api/product/${productId}`, formData, config)
			.then(res => {
				history.push('/admin/dashboard');
			})
			.catch(err => {
				console.log(err);
			});
	};

	/****************************
	 * RENDERER
	 ***************************/
	return (
		<Fragment>
			<AdminHeader />
			<div className='container my-3'>
				<div className='row'>
					<div className='col-md-8 mx-auto'>
						<Link to='/admin/dashboard'>
							<span className='fas fa-arrow-left'>Trở về</span>
						</Link>
						<div>
							<br />
							<div className='modal-content'>
								<form onSubmit={handleProductSubmit}>
									<div className='modal-header bg-warning text-white'>
										<h5 className='modal-title'>
											Cập nhật sách
										</h5>
									</div>
									<div className='modal-body my-2'>
										<Fragment>
											<label className='btn btn-dark mr-4'>
												Chọn ảnh
												<input
													type='file'
													name='productImage'
													accept='images/*'
													hidden
													onChange={handleImageUpload}
												/>
											</label>
											{productImage &&
											productImage.name ? (
												<span className='badge badge-secondary'>
													{productImage.name}
												</span>
											) : productImage ? (
												<img
													className='img-thumbnail'
													style={{
														width: '120px',
														height: '80px',
													}}
													src={`/uploads/${productImage}`}
													alt='product'
												/>
											) : null}

											<div className='form-group'>
												<label className='text-secondary'>
													Tên sách
												</label>
												<input
													type='text'
													className='form-control'
													name='productName'
													value={productName}
													onChange={e =>
														setProductName(
															e.target.value
														)
													}
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
													onChange={e =>
														setProductDesc(
															e.target.value
														)
													}
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
													onChange={e =>
														setProductPrice(
															e.target.value
														)
													}
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
														onChange={e =>
															setProductQty(
																e.target.value
															)
														}
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
														value={productCategory}
														onChange={e =>
															setProductCategory(
																e.target.value
															)
														}
													>
														<option value=''>
															Chọn một...
														</option>
														{categories &&
															categories.map(
																c => (
																	<option
																		key={
																			c._id
																		}
																		value={
																			c._id
																		}
																	>
																		{
																			c.category
																		}
																	</option>
																)
															)}
													</select>
												</div>
												<div className='form-group col-md-6'>
													<label className='text-secondary'>
														Tác giả
													</label>
													<select
														className='custom-select mr-sm-2'
														name='productAuthor'
														value={productAuthor}
														onChange={e =>
															setProductAuthor(
																e.target.value
															)
														}
													>
														<option value=''>
															Chọn một...
														</option>
														{authors &&
															authors.map(
																c => (
																	<option
																		key={
																			c._id
																		}
																		value={
																			c._id
																		}
																	>
																		{
																			c.author
																		}
																	</option>
																)
															)}
													</select>
												</div>								
											</div>
										</Fragment>
									</div>
									<div className='modal-footer'>
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
				</div>
			</div>
		</Fragment>
	);
};

export default AdminEditProduct;
