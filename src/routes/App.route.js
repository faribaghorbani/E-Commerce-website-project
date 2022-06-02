import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/Home/Home.page";
import ProductsPage from "../pages/Products/Products.page";
import ProductPage from "../pages/Product/Product.page";
import BasketPage from "../pages/Basket/Basket.page"
import CheckoutPage from '../pages/Checkout/Checkout.page'
import AdminLogin from "../pages/AdminLogin/AdminLogin.page";
import PanelOrdersPage from "../pages/PanelOrder/PanelOrders.page";
import PanelProductsPage from "../pages/PanelProducts/PanelProducts.page";
import PanelQuantityPage from "../pages/PanelQuantity/PanelQuantity.page";
import NotfoundPage from "../pages/Notfound/Notfound.page";
import PrivateRoute from './components/Private.route'
import ProtectedRoute from './components/Protected.route'
import RegularLayout from "../layouts/Regular/Regular.layout";
import AdminLayout from '../layouts/Admin/Admin.layout'
import LoginLayout from '../layouts/Login/Login.layout'
import SidebarLayout from "../layouts/Sidebar/Sidebar.layout";
import PanelHomePage from "../pages/PanelHome/PanelHome.page";
import ResultPage from "../pages/Result/Result.page";
// import SidebarLayout from '../layouts/Sidebar/Sidebarlayout'

function App() {
	return (
		<Routes>
			<Route path="/" element={		
				<RegularLayout>
					<HomePage/>
				</RegularLayout>
			}/>

			<Route path="/products">

				<Route index element={		
					<SidebarLayout>
						<ProductsPage />
					</SidebarLayout>
				}/>

				<Route path=":category" element={		
					<SidebarLayout>
						<ProductsPage />
					</SidebarLayout>
				}/>

				<Route path=":category/:subcategory" element={		
					<SidebarLayout>
						<ProductsPage />
					</SidebarLayout>
				}/>

				<Route path=":category/:subcategory/:id" element={		
					<RegularLayout>
						<ProductPage />
					</RegularLayout>
				}/>

			</Route>

			<Route path="/basket" element={		
				<RegularLayout>
					<BasketPage />
				</RegularLayout>
			}/>

			<Route path="/checkout">

				<Route index element={	
					<RegularLayout>
						<CheckoutPage />
					</RegularLayout>
				}/>

				<Route path=":status" element={	
					<RegularLayout>
						<ResultPage />
					</RegularLayout>
				}/>
			</Route>

			<Route path="/login" element={	
				<PrivateRoute>
					<LoginLayout>
						<AdminLogin />
					</LoginLayout>
				</PrivateRoute>	
			}/>
			<Route path="/panel" element={
			<ProtectedRoute>
				<AdminLayout>
				</AdminLayout>
			</ProtectedRoute>
			}>

				<Route index element={
					<PanelHomePage />
				}/>
				<Route path="order" element={
					<PanelOrdersPage />
				}/>
				<Route path="products" element={
					<PanelProductsPage />
				}/>
				<Route path="quantity" element={
					<PanelQuantityPage />
				}/>
			</Route>

			<Route path="*" element={
				<RegularLayout>
					<NotfoundPage />
				</RegularLayout>
			}/>
		</Routes>
	);
}

export default App;
