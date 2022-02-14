import React from 'react'
import { useEffect, useState } from 'react'
import CarouselHome from './Carousel'
import ProductCard from './productCard'
import { Row, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsAction } from '../../actions/productAction'
import Loader from '../Loader/Loader'
import Error from '../ErrorAlert/Error'
import Pagination from 'react-js-pagination'
import MetaData from '../MetaData'


const Home = ({ match }) => {
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
    // I'll need to invoke my action creator!
    dispatch(getProductsAction(keyword, currentPage))
  }, [dispatch, keyword, currentPage])
  return (
    <>
      <MetaData title="Home Page" />
      <Container fluid className="px-0">
        <div className="welcome">
          <CarouselHome />
        </div>

        <div className="productContainer">
          <h2 className="homeHeading">Available Products</h2>
          <hr className="headingLine"></hr>

          {isError ? (
            <Error />
          ) : isLoading ? (
            <Loader />
          ) : (
            <Row className="d-flex justify-content-center">
              {products &&
                products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
            </Row>
          )}
        
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
       
        </div>
      </Container>
    </>
  )
}

export default Home
