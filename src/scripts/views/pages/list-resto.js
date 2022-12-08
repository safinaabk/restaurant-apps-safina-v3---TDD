import RestoSource from '../../data/resto-source';
import { createRestaurantItemTemplate } from '../templates/template-creator';

const ListResto = {
  async render() {
    return `
        <div class="jumbotron"></div>
        <h2 class="jumbo__title">The best restaurant recommendation all of Indonesia</h2>
        <div class="resto_list" id="restaurants"></div>
      `;
  },

  async afterRender() {
    const restaurants = await RestoSource.listRestaurants();
    const restaurantsContainer = document.querySelector('.resto_list');
    restaurants.forEach((restaurant) => {
      restaurantsContainer.innerHTML += createRestaurantItemTemplate(restaurant);
    });
  },
};

export default ListResto;
