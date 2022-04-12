import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { ADD_TO_CART } from '../redux/constants/cartConstants';
import { deleteFromCart } from '../redux/actions/cartActions';

const Cart = ({ history }) => {
	const { cart } = useSelector(state => state.cart);

	const dispatch = useDispatch();

	const handleGoBackBtn = () => {
		history.goBack();
	};

	const handleQtyChange = (e, product) => {
		const cart = localStorage.getItem('cart')
			? JSON.parse(localStorage.getItem('cart'))
			: [];

		cart.forEach(cartItem => {
			if (cartItem._id === product._id) {
				cartItem.count = e.target.value;
			}
		});

		localStorage.setItem('cart', JSON.stringify(cart));

		dispatch({
			type: ADD_TO_CART,
			payload: cart,
		});
	};

	return (
		<section className='cart-page m-4'>
			{cart.length <= 0 ? (
				<div className='jumbotron'>
					<h1 className='display-4'>
						Giỏ hàng của bạn trống{' '}
						<button
							className='btn btn-light text-primary ml-4'
							onClick={handleGoBackBtn}
						>
							Trở về
						</button>
					</h1>
				</div>
			) : (
				<>
					<div className='jumbotron'>
						<h1 className='display-4'>Giỏ hàng</h1>
					</div>
					<div className='row'>
						<div className='col-md-8'>
							<table className='table'>
								<thead>
									<tr>
										<th scope='col'></th>
										<th scope='col'>Sản phẩm</th>
										<th scope='col'>Giá</th>
										<th scope='col'>Số lượng</th>
										<th scope='col'>Xóa</th>
									</tr>
								</thead>
								<tbody>
									{cart.map(product => (
										<tr key={product._id}>
											<th scope='row'>
												{' '}
												<img
													style={{
														maxWidth: '110px',
													}}
													className='img-fluid w-100 img-thumbnail'
													src={`/uploads/${product.fileName}`}
													alt='product'
												/>
											</th>
											<td>
												{' '}
												<Link
													to={`/product/${product._id}`}
												>
													{product.productName}
												</Link>
											</td>
											<td>
												{' '}
												{product.productPrice.toLocaleString(
													'it-IT',
													{
														style: 'currency',
														currency: 'VND',
													}
												)}
											</td>
											<td>
												<input
													type='number'
													min='1'
													max={product.productQty}
													value={product.count}
													onChange={e =>
														handleQtyChange(
															e,
															product
														)
													}
												/>
											</td>
											<td>
												{' '}
												<button
													type='button'
													className='btn btn-danger btn-sm'
													onClick={() =>
														dispatch(
															deleteFromCart(
																product
															)
														)
													}
												>
													<i className='far fa-trash-alt pr-1'></i>
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
						<div className='col-md-4 border-left pl-4'>
							<h2>Tóm tắt giỏ hàng</h2>
							<p className='font-weight-light text-muted border-bottom'>
								{cart.length === 1
									? '(1) Sản phẩm'
									: `(${cart.length}) Sản phẩm`}
							</p>
							<p className='font-weight-bold'>
								Tổng tiền: 
								{cart
									.reduce(
										(currentSum, currentCartItem) =>
											currentSum +
											currentCartItem.count *
												currentCartItem.productPrice,
										0
									)
									.toLocaleString(undefined, {minimumFractionDigits: 0})} VND
							</p>
							<button className='btn btn-dark btn-large btn-block mb-5 py-2'>
								Đặt hàng
							</button>
						</div>
					</div>
				</>
			)}
		</section>
	);
};

export default Cart;
