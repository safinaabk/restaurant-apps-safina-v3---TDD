import UrlParser from '../../routes/url-parser';
import RestoSource from '../../data/resto-source';
import { createRestoDetailTemplate, createReviewTemplate } from '../templates/template-creator';
// import LikeButtonInitiator from '../../utils/like-button-initiator';
import LikeButtonPresenter from '../../utils/like-button-presenter';
import FavoriteRestaurantIdb from '../../data/favorite-idb';

const Detail = {
  async render() {
    return `
        <div class="jumbotron"></div>
        <h2 class="jumbo__title">Detail Restaurant</h2>
        <div class="resto_detail" id="restaurant"></div>
        <div id="add-review">
          <h3>Customer Reviews</h3>
          <form class="form_add-review">
            <input type="text" class="review_detail_name" placeholder="Who are you ?" required/>
            <input type="text" class="review_detail_add" placeholder="Write something..." required/>
            <button class="review_detail_submit" type="submit">Post Comment</button>
          </form>
          <div id="comments"></div>
        </div>
        <div id="likeButtonContainer"></div>
      `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await RestoSource.detailRestaurants(url.id);
    const restaurantContainer = document.querySelector('.resto_detail');
    restaurantContainer.innerHTML = createRestoDetailTemplate(restaurant);

    const nameInput = document.querySelector('.review_detail_name');
    const reviewInput = document.querySelector('.review_detail_add');
    const addReviewContainer = document.querySelector('.form_add-review');

    addReviewContainer.addEventListener('submit', async (e) => {
      e.preventDefault();

      const review = {
        id: restaurant.id,
        name: nameInput.value,
        review: reviewInput.value,
      };

      RestoSource.newReview(review);
      location.reload();
    });

    const restaurantReviews = await RestoSource.detailRestaurants(url.id);
    const commentsContainer = document.querySelector('#comments');
    commentsContainer.innerHTML = createReviewTemplate(restaurantReviews);

    LikeButtonPresenter.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      favoriteRestaurants: FavoriteRestaurantIdb,
      restaurant: {
        id: restaurant.id,
        city: restaurant.city,
        pictureId: restaurant.pictureId,
        rating: restaurant.rating,
        name: restaurant.name,
        description: restaurant.description,
      },
    });
  },
};

export default Detail;
