import axios from "axios";
export const GET_PRODUCTS = 'GET_PRODUCTS'
export const GET_PRODUCTS_ERROR = 'GET_PRODUCTS_ERROR'
export const GET_PRODUCTS_LOADING = 'GET_PRODUCTS_LOADING'

export const ADMIN_PRODUCT_REQUEST = "ADMIN_PRODUCT_REQUEST";
export const ADMIN_PRODUCT_SUCCESS = "ADMIN_PRODUCT_SUCCESS";
export const ADMIN_PRODUCT_FAIL = "ADMIN_PRODUCT_FAIL";

export const NEW_PRODUCT_REQUEST = "NEW_PRODUCT_REQUEST";
export const NEW_PRODUCT_SUCCESS = "NEW_PRODUCT_SUCCESS";
export const NEW_PRODUCT_RESET = "NEW_PRODUCT_RESET";
export const NEW_PRODUCT_FAIL = "NEW_PRODUCT_FAIL";

export const UPDATE_PRODUCT_REQUEST = "UPDATE_PRODUCT_REQUEST";
export const UPDATE_PRODUCT_SUCCESS = "UPDATE_PRODUCT_SUCCESS";
export const UPDATE_PRODUCT_RESET = "UPDATE_PRODUCT_RESET";
export const UPDATE_PRODUCT_FAIL = "UPDATE_PRODUCT_FAIL";

export const DELETE_PRODUCT_REQUEST = "DELETE_PRODUCT_REQUEST";
export const DELETE_PRODUCT_SUCCESS = "DELETE_PRODUCT_SUCCESS";
export const DELETE_PRODUCT_RESET = "DELETE_PRODUCT_RESET";
export const DELETE_PRODUCT_FAIL = "DELETE_PRODUCT_FAIL";

export const PRODUCT_DETAILS_REQUEST = "PRODUCT_DETAILS_REQUEST";
export const PRODUCT_DETAILS_SUCCESS = "PRODUCT_DETAILS_SUCCESS";
export const PRODUCT_DETAILS_FAIL = "PRODUCT_DETAILS_FAIL";

export const NEW_REVIEW_REQUEST = "NEW_REVIEW_REQUEST";
export const NEW_REVIEW_SUCCESS = "NEW_REVIEW_SUCCESS";
export const NEW_REVIEW_FAIL = "NEW_REVIEW_FAIL";
export const NEW_REVIEW_RESET = "NEW_REVIEW_RESET";

export const ALL_REVIEW_REQUEST = "ALL_REVIEW_REQUEST";
export const ALL_REVIEW_SUCCESS = "ALL_REVIEW_SUCCESS";
export const ALL_REVIEW_FAIL = "ALL_REVIEW_FAIL";

export const DELETE_REVIEW_REQUEST = "DELETE_REVIEW_REQUEST";
export const DELETE_REVIEW_SUCCESS = "DELETE_REVIEW_SUCCESS";
export const DELETE_REVIEW_RESET = "DELETE_REVIEW_RESET";
export const DELETE_REVIEW_FAIL = "DELETE_REVIEW_FAIL";

export const CLEAR_ERRORS = "CLEAR_ERRORS";



export const getProductsAction = (keyword='', currentPage = 1) => {
  return async (dispatch, getState) => {
    dispatch({
      type: GET_PRODUCTS_LOADING,
      payload: true,
    })
    try {
      let link = `http://localhost:3001/product?keyword=${keyword}&page=${currentPage}`
      let resp = await fetch(link)
      if (resp.ok) {
        let products = await resp.json()
        dispatch({
          type: GET_PRODUCTS,
          payload: products,
        })
        dispatch({
          type: GET_PRODUCTS_ERROR,
          payload: false,
        })
        dispatch({
          type: GET_PRODUCTS_LOADING,
          payload: false,
        })
      } else {
        console.log('error')
        dispatch({
          type: GET_PRODUCTS_ERROR,
          payload: true,
        })
        dispatch({
          type: GET_PRODUCTS_LOADING,
          payload: false,
        })
      }
    } catch (error) {
      console.log(error)
      dispatch({
        type: GET_PRODUCTS_ERROR,
        payload: true,
      })
      dispatch({
        type: GET_PRODUCTS_LOADING,
        payload: false,
      })
    }
  }
}

// Create Product
export const createProduct = (productData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PRODUCT_REQUEST });

    const { data } = await axios.post(
      `http://localhost:3001/admin/product`,
      productData,
      {withCredentials:true}
    );

    dispatch({
      type: NEW_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Product
export const updateProduct = (id, productData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });

    // const config = {
    //   headers: { "Content-Type": "application/json" },
    // };

    const { data } = await axios.put(
      `http://localhost:3001/admin/product/${id}`,
      productData,
      {withCredentials:true}
    );

    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Product
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });

    const { data } = await axios.delete(`http://localhost:3001/admin/product/${id}`,{withCredentials:true});

    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
}


export const getProductDetails = id => async dispatch => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`http://localhost:3001/product/${id}`);

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.product
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message
    });
  }
};
// Get All Products For Admin
export const getAdminProduct = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_PRODUCT_REQUEST });

    const { data } = await axios.get("http://localhost:3001/admin/products",{withCredentials:true});

    dispatch({
      type: ADMIN_PRODUCT_SUCCESS,
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// NEW REVIEW
export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_REVIEW_REQUEST });

    const { data } = await axios.put(`http://localhost:3001/review`, reviewData,{withCredentials:true});

    dispatch({
      type: NEW_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get All Reviews of a Product
export const getAllReviews = (id) => async (dispatch) => {
  try {
    dispatch({ type: ALL_REVIEW_REQUEST });

    const { data } = await axios.get(`http://localhost:3001/reviews/${id}`,{withCredentials:true});

    dispatch({
      type: ALL_REVIEW_SUCCESS,
      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: ALL_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Review of a Product
export const deleteReviews = (reviewId, productId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_REVIEW_REQUEST });

    const { data } = await axios.delete(
      `http://localhost:3001/reviews?id=${reviewId}&productId=${productId}`,{withCredentials:true}
    );

    dispatch({
      type: DELETE_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
}

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
