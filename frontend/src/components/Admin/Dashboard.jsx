import React, { useEffect } from "react";
import Sidebar from "./Sidebar.jsx";
import "./dashboard.css";
import { Link } from "react-router-dom";

import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct } from "../../actions/productAction";
import { getAllOrders } from "../../actions/orderAction.js";
import { getAllUsers } from "../../actions/userAction.js";

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  ArcElement,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const dispatch = useDispatch();

  const products = useSelector(state => state.products.stock);

  const { orders } = useSelector(state => state.allOrders);

  const { users } = useSelector(state => state.allUsers);

  let outOfStock = 0;

  products &&
    products.forEach(item => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(
    () => {
      dispatch(getAdminProduct());
      dispatch(getAllOrders());
      dispatch(getAllUsers());
    },
    [dispatch]
  );

  let totalAmount = 0;
  orders &&
    orders.forEach(item => {
      totalAmount += item.totalPrice;
    });

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["red"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        borderColor: ["red"],
        data: [0, totalAmount]
      }
    ]
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, products.length - outOfStock]
      }
    ]
  };

  return (
    <div className="dashboard">
      {/* <h1 title="Dashboard - Admin Panel" /> */}
      <Sidebar />

      <div className="dashboardContainer">
        <h1>Dashboard</h1>

        <div className="dashboardSummary">
          <div className="dashboardSummaryBox2">
            <Link>
              <p>
                Total Amount <br /> € {totalAmount}
              </p>
            </Link>
            <Link to="/admin/products">
              <p>Product</p>
              <p>
                {products && products.length}
              </p>
            </Link>
            <Link to="/admin/orders" className="orders">
              <p>Orders</p>
              <p>
                {orders && orders.length}
              </p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>
                {users && users.length}
              </p>
            </Link>
          </div>
        </div>

        <div className="ChartDoughnut">
          <div className="lineChart">
            <Line data={lineState} />
          </div>

          <div className="doughnutChart">
            <Doughnut data={doughnutState} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
