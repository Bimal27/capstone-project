import React from 'react'
import { useEffect, useState } from 'react'
import ProductCard from './productCard'
import { Row, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsAction } from '../../actions/productAction'
import Loader from '../Loader/Loader'
import Error from '../ErrorAlert/Error'
import Pagination from 'react-js-pagination'
import MetaData from '../MetaData'

const Products = ({ match }) => {
  const dispatch = useDispatch()

  const [currentPage, setCurrentPage] = useState(1)
  const products = useSelector((state) => state.products.stock)
  const isError = useSelector((state) => state.products.isError)
  const isLoading = useSelector((state) => state.products.isLoading)
  const keyword = match.params.keyword

  const setCurrentPageNo = (e) => {
    setCurrentPage(e)
  }

  useEffect(() => {
    dispatch(getProductsAction(keyword, currentPage))
  }, [dispatch, keyword, currentPage])
  return (
    <>
      <MetaData title="Product" />
      <Container fluid>
        {keyword && <h5 className="mt-4 ml-2"><span style={{color:'#4d4949'}}>Search for </span><b style={{fontSize:'21px'}}>{keyword}</b></h5>}

        {isError ? (
          <Error />
        ) : isLoading ? (
          <Loader />
        ) : (
          <Row className="d-flex justify-content-center mt-4">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </Row>
        )}

        {/* {resultPerPage < count && ( */}
        <div className="paginationBox">
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={8}
            totalItemsCount={500}
            pageRangeDisplayed={2}
            onChange={setCurrentPageNo}
            itemClass="page-item"
            linkClass="page-link"
            activeClass="pageItemActive"
            activeLinkClass="pageLinkActive"
          />
        </div>
      </Container>
    </>
  )
}

export default Products
