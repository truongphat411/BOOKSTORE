import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../redux/actions/productActions';
import { getCategories } from '../redux/actions/categoryActions';
import { getAuthors } from '../redux/actions/authorActions';
import { addToCart } from '../redux/actions/cartActions';

const Product = ({ match, history }) => {
	const { productId } = match.params;
	const dispatch = useDispatch();

	const { product } = useSelector(state => state.products);
	const { categories } = useSelector(state => state.categories);
	const { authors } = useSelector(state => state.authors);


	useEffect(() => {
		dispatch(getProduct(productId));
		dispatch(getCategories());
		dispatch(getAuthors());
	}, [dispatch, productId]);


	const handleAddToCart = () => {
		dispatch(addToCart(product));
	};

	const handleGoBackBtn = () => {
		history.goBack();
	};

	return (
		<section className='product-page m-4'>
			<button
				to='/shop'
				className='btn btn-light text-primary mb-4'
				onClick={handleGoBackBtn}
			>
				Trở về
			</button>
			{product && (
				<div className='row'>
					<div className='col-md-6'>
						<img
							className='img-fluid w-100 mb-4'
							src={`/uploads/${product.fileName}`}
							alt='product'
						/>
					</div>
					<div className='col-md-5'>
						<h3 className='mb-4'>{product.productName}</h3>
						{/* <p className='text-muted border-top py-2'>
							Thể loại:{' '} {product.productCategory}
						</p>
						<p className='text-muted border-top py-2'>
							Tác giả:{' '}
							{product.productAuthor}
						</p> */}
						<p className='text-muted border-top py-2'>
							Giá:{' '}
							{product.productPrice.toLocaleString('it-IT', {
								style: 'currency',
								currency: 'VND',
							})}
						</p>
						<p className='text-muted border-top py-2'>
							Trang thái:{' '}
							{product.productQty <= 0
								? 'Hết hàng'
								: 'Còn hàng'}
						</p>
						<p className='text-muted border-top py-2'>
							Mô tả: {product.productDesc}
						</p>
						<button
							className='btn btn-dark btn-large btn-block mb-5 py-2'
							disabled={product.productQty <= 0}
							onClick={handleAddToCart}
						>
							Thêm vào giỏ
						</button>
					</div>
				</div>
			)}
		</section>
	);
};

export default Product;
