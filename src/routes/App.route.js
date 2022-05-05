import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/Home/Home.page";
import ProductsPage from "../pages/Products/Products.page";
import ProductPage from "../pages/Product/Product.page";
import BasketPage from "../pages/Basket/Basket.page"
import CheckoutPage from '../pages/Checkout/Checkout.page'
import PanelOrdersPage from "../pages/PanelOrder/PanelOrders.page";
import PanelProductsPage from "../pages/PanelProducts/PanelProducts.page";
import PanelQuantityPage from "../pages/PanelQuantity/PanelQuantity.page";
import NotfoundPage from "../pages/Notfound/Notfound.page";
import PrivateRoute from './components/Private.route'
import ProtectedRoute from './components/Protected.route'
import RegularLayout from "../layouts/Regular/Regular.layout";
import AdminLayout from '../layouts/Admin/Admin.layouts'
import LoginLayout from '../layouts/Login/Login.layout'
import SidebarLayout from '../layouts/Sidebar/Sidebar.layout'

function App() {
	return (
		<Routes>
			<Route path="/" element={		
				<RegularLayout>
					<HomePage/>
				</RegularLayout>
			}/>

			<Route path="/products" element={		
				<SidebarLayout>
					<ProductsPage />
				</SidebarLayout>
			}/>

			<Route path="/products/:product" element={		
				<RegularLayout>
					<ProductPage />
				</RegularLayout>
			}/>

			<Route path="/basket" element={		
				<RegularLayout>
					<BasketPage />
				</RegularLayout>
			}/>
			<Route path="/checkout" element={		
				<RegularLayout>
					<CheckoutPage />
				</RegularLayout>
			}/>
			<Route path="/login" element={	
				<PrivateRoute>
					<LoginLayout>
						<AdminLogin />
					</LoginLayout>
				</PrivateRoute>	
			}/>
			<Route path="/panel">
				<Route index element={
					<ProtectedRoute>
						<NotfoundPage />
					</ProtectedRoute>
				}/>
				<Route path="order" element={
					<ProtectedRoute>
						<AdminLayout>
							<PanelOrdersPage />
						</AdminLayout>
					</ProtectedRoute>
				}/>
				<Route path="products" element={
					<ProtectedRoute>
						<AdminLayout>
							<PanelProductsPage />
						</AdminLayout>
					</ProtectedRoute>
				}/>
				<Route path="quantity" element={
					<ProtectedRoute>
						<AdminLayout>
							<PanelQuantityPage />
						</AdminLayout>
					</ProtectedRoute>
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
