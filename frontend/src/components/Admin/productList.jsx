import React, { useEffect } from 'react'
import { DataGrid } from '@material-ui/data-grid'
import './productList.css'
import { useSelector, useDispatch } from 'react-redux'
import {
  clearErrors,
  getAdminProduct,
  deleteProduct,
} from '../../actions/productAction'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { Button } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import SideBar from './Sidebar'
import { DELETE_PRODUCT_RESET } from '../../actions/productAction'

const ProductList = ({ history }) => {
  const dispatch = useDispatch()

  const alert = useAlert()

  const products = useSelector((state) => state.products.stock)
  const isError = useSelector((state) => state.products.isError)
  //   const isLoading = useSelector(state => state.products.isLoading)

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product,
  )

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id))
  }

  useEffect(() => {
    if (isError) {
      alert.error('error')
      dispatch(clearErrors())
    }

    if (deleteError) {
      alert.error(deleteError)
      dispatch(clearErrors())
    }

    if (isDeleted) {
      alert.success('Product Deleted Successfully')
      history.push('/admin/dashboard')
      dispatch({ type: DELETE_PRODUCT_RESET })
    }

    dispatch(getAdminProduct())
  }, [dispatch, alert, isError, history, deleteError, isDeleted])

  const columns = [
    { field: 'id', headerName: 'Product ID', minWidth: 150, flex: 0.3 },

    {
      field: 'name',
      headerName: 'Name',
      minWidth: 205,
      flex: 0.5,
    },
    {
      field: 'stock',
      headerName: 'Stock',
      type: 'number',
      minWidth: 125,
      flex: 0.3,
    },

    {
      field: 'price',
      headerName: 'Price',
      type: 'number',
      minWidth: 250,
      flex: 0.4,
    },

    {
      field: 'actions',
      flex: 0.2,
      headerName: 'Actions',
      minWidth: 125,
      type: 'number',
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/product/${params.getValue(params.id, 'id')}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteProductHandler(params.getValue(params.id, 'id'))
              }
            >
              <DeleteIcon />
            </Button>
          </>
        )
      },
    },
  ]

  const rows = []

  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.Stock,
        price: item.price,
        name: item.name,
      })
    })

  console.log(rows)
  return (
    <>
      <div className="dashboard">
        <SideBar />

        <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </>
  )
}

export default ProductList
