import React from 'react';

const AdminActionBtns = () => (
	<div className='bg-light my-2'>
		<div className='container'>
			<div className='row pb-3'>
				<div className='col-md-4 my-1'>
					<button
						className='btn btn-outline-info btn-block'
						data-toggle='modal'
						data-target='#addCategoryModal'>
						<i className='fas fa-plus'>Thêm thể loại</i>
					</button>
				</div>

				<div className='col-md-4 my-1'>
					<button
						className='btn btn-outline-warning btn-block'
						data-toggle='modal'
						data-target='#addProductModal'>
						<i className='fas fa-plus'>Thêm sách</i>
					</button>
				</div>

				<div className='col-md-4 my-1'>
					<button className='btn btn-outline-success btn-block'
						data-toggle='modal'
						data-target='#addAuthorModal'>
						<i className='fas fa-money-check-alt'>Thêm tác giả</i>
					</button>
				</div>
			</div>
		</div>
	</div>
);

export default AdminActionBtns;