import React from 'react';
import axios from '../../helpers/axios';
import { connect } from 'react-redux';
import { showBanner } from '../../actions/bannerActions';
import Loading from '../common/Loading';
import ProductSearch from './ProductSearch';
import ProductHeader from './ProductHeader';
import ProductQuantity from './ProductQuantity';
import ProductLocations from './ProductLocations';
import ProductInfo from './ProductInfo';
import ProductButtons from './ProductButtons';

class Products extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			ean: '',
			product: {},
			sellingAssignments: [],
			nonSellingAssignments: [],
			deliveries: [],
			tab: 0
		};
	}

	onChange = (e) => {
		this.setState({ ...this.state, ean: e.target.value });
	}

	onKeypress = (e) => {
		if (e.key === 'Enter') {
			this.search();
		}
	}

	search = () => {
		this.setState({ ...this.state, loading: true });
		Promise.all([
			axios.get('/product/quantity/' + this.props.apiUser.site.code + '/' + this.state.ean, { headers: { Authorization: this.props.apiToken } }),
			axios.get('/assignment/product/' + this.props.apiUser.site.code + '/' + this.state.ean, { headers: { Authorization: this.props.apiToken } }),
			axios.get('/module/site/' + this.props.apiUser.site.code + '/product/' + this.state.ean, { headers: { Authorization: this.props.apiToken } }),
			axios.get('/delivery/product/' + this.props.apiUser.site.code + '/' + this.state.ean, { headers: { Authorization: this.props.apiToken } }),
			axios.get('/review/product/' + this.state.ean, { headers: { Authorization: this.props.apiToken } })
		]).then((all) => {
			const product = all[0];
			const assignments = all[1];
			const modules = all[2];
			const deliveries = all[3];
			const reviews = all[4];

			const sellingAssignments = assignments.data.data.filter((x) => { return ['Multi-Location', 'Clearance', 'Display'].indexOf(x.type) > -1 });
			const nonSellingAssignments = assignments.data.data.filter((x) => { return ['Overstock', 'Topstock', 'Stockroom'].indexOf(x.type) > -1 });
			const moduleLocations = [];
			const incompleteDeliveries = deliveries.data.data.filter((x) => { return x.status !== 'Completed'; });
			for (const module of modules.data.data) {
				if (!module.bay) continue;
				for (var i = 0; i < module.module.products.length; i++) {
					if (module.module.products[i].product.ean === this.state.ean) {
						moduleLocations.push({
							ean: this.state.ean,
							aisle: module.bay.aisle.aisle,
							bay: module.bay.bay,
							facings: module.module.products[i].facings,
							sequence: i + 1
						});
					}
				}
			}
			this.setState({ 
				...this.state,
				product: product.data.data,
				sellingAssignments,
				nonSellingAssignments,
				moduleLocations, modules: modules.data.data,
				deliveries: incompleteDeliveries,
				reviews: reviews.data.data,
				loading: false
			});
		}, (error) => {
			this.setState({ ...this.state, loading: false });
			if (error.response.status === 400) {
				this.props.showBanner('Cannot Get Product: EAN Not Found', 'error');
			} else {
				this.props.showBanner('Cannot Get Product: Something Went Wrong', 'error');
			}
		});
	}

	render() {
		if (this.state.loading) return <Loading />;
		return (
			<>
				<ProductSearch onChange={this.onChange} onKeypress={this.onKeypress} search={this.search} />
				{
					this.state.product.product &&
					<>
						<ProductHeader product={this.state.product.product} reviews={this.state.reviews} />
						<ProductQuantity quantity={this.state.product.quantity} />
						<ProductLocations sellingAssignments={this.state.sellingAssignments} nonSellingAssignments={this.state.nonSellingAssignments} modules={this.state.moduleLocations} />
						<ProductInfo product={this.state.product.product} reviews={this.state.reviews} />
						<ProductButtons ean={this.state.ean} modules={this.state.modules} deliveries={this.state.deliveries} />
					</>
				}
			</>
		)
	}
}

const mapStateToProps = state => ({
	apiToken: state.auth.apiToken,
	apiUser: state.auth.apiUser
});

export default connect(mapStateToProps, { showBanner })(Products);