import axios from "axios";

export const CREATE_ORDER_REQUEST = "CREATE_ORDER_REQUEST";
export const CREATE_ORDER_SUCCESS = "CREATE_ORDER_SUCCESS";
export const CREATE_ORDER_FAIL = "CREATE_ORDER_FAIL";

export const MY_ORDERS_REQUEST = "MY_ORDERS_REQUEST";
export const MY_ORDERS_SUCCESS = "MY_ORDERS_SUCCESS";
export const MY_ORDERS_FAIL = "MY_ORDERS_FAIL";

export const ALL_ORDERS_REQUEST = "ALL_ORDERS_REQUEST";
export const ALL_ORDERS_SUCCESS = "ALL_ORDERS_SUCCESS";
export const ALL_ORDERS_FAIL = "ALL_ORDERS_FAIL";

export const UPDATE_ORDER_REQUEST = "UPDATE_ORDER_REQUEST";
export const UPDATE_ORDER_SUCCESS = "UPDATE_ORDER_SUCCESS";
export const UPDATE_ORDER_RESET = "UPDATE_ORDER_RESET";
export const UPDATE_ORDER_FAIL = "UPDATE_ORDER_FAIL";

export const DELETE_ORDER_REQUEST = "DELETE_ORDER_REQUEST";
export const DELETE_ORDER_SUCCESS = "DELETE_ORDER_SUCCESS";
export const DELETE_ORDER_RESET = "DELETE_ORDER_RESET";
export const DELETE_ORDER_FAIL = "DELETE_ORDER_FAIL";

export const ORDER_DETAILS_REQUEST = "ORDER_DETAILS_REQUEST";
export const ORDER_DETAILS_SUCCESS = "ORDER_DETAILS_SUCCESS";
export const ORDER_DETAILS_FAIL = "ORDER_DETAILS_FAIL";

export const CLEAR_ERRORS = "CLEAR_ERRORS";


// Create Order
export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });

    // const config = {
    //   headers: {
    //     "Content-Type": "application/json", 
    //   },
    // };
    const { data } = await axios.post("http://localhost:3001/order/new", order, {withCredentials:true});

    dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
}

// My Orders
export const myOrders = () => async (dispatch) => {
  try {
    dispatch({ type: MY_ORDERS_REQUEST });

    const { data } = await axios.get("http://localhost:3001/orders/me" , {withCredentials:true});

    dispatch({ type: MY_ORDERS_SUCCESS, payload: data.orders });
  } catch (error) {
    dispatch({
      type: MY_ORDERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get All Orders (admin)
export const getAllOrders = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_ORDERS_REQUEST });

    const { data } = await axios.get("http://localhost:3001/admin/orders",{withCredentials:true});

    dispatch({ type: ALL_ORDERS_SUCCESS, payload: data.orders });
  } catch (error) {
    dispatch({
      type: ALL_ORDERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Order
export const updateOrder = (id, order) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ORDER_REQUEST });
    const { data } = await axios.put(
      `http://localhost:3001/admin/order/${id}`,
      order,
      {withCredentials:true}
    );

    dispatch({ type: UPDATE_ORDER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Order
export const deleteOrder = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ORDER_REQUEST });

    const { data } = await axios.delete(`http://localhost:3001/admin/order/${id}`,{withCredentials:true});

    dispatch({ type: DELETE_ORDER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: DELETE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};


// Get Order Details
export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });

    const { data } = await axios.get(`http://localhost:3001/order/${id}`,{withCredentials:true});

    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data.order });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
}


// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};