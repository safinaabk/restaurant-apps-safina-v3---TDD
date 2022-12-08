/* eslint-disable comma-dangle */
/* eslint-disable indent */
import CONFIG from '../../globals/config';

const createRestaurantItemTemplate = (restaurant) => `
  <div class="resto_item">
    <div class="item_header">
      <div class="item_header_location">${restaurant.city}</div>
      <img
        class="item_header_image"
        src=${CONFIG.BASE_IMAGE_URL_SMALL + restaurant.pictureId}
        alt=""
      />
    </div>
    <div class="item_body">
      <div class="item_body_name"><a href="/#/detail/${restaurant.id}">${restaurant.name}</a></div>
      <div class="item_body_rating">
        Rating: <span id="rating">${restaurant.rating}</span>
      </div>
      <div class="item_body_description">
        ${restaurant.description}
      </div>
    </div>
  </div>
`;

const createRestoDetailTemplate = (restaurant) => `
  <div class="resto_item">
    <img src="${CONFIG.BASE_IMAGE_URL_LARGE + restaurant.pictureId}" alt="${restaurant.title}" />
    <h2 class="detail_title">${restaurant.name}</h2>
    <div class="detail_body">
      <h3>Address</h3>
      <p class="detail_description">${restaurant.address}</p>
      <h3>City</h3>
      <p class="detail_description">${restaurant.city}</p>
      <h3>Description</h3>
      <p class="detail_description">${restaurant.description} minutes</p>
      <h3>Foods Menu</h3>
      <div class="detail_menu">
        ${restaurant.menus.foods.map((food) => `<div class="detail_menu_name">${food.name}</div>`).join('')}
      </div>
      <h3>Drinks Menu</h3>
      <div class="detail_menu">
        ${restaurant.menus.drinks.map((drink) => `<div class="detail_menu_name">${drink.name}</div>`).join('')}
      </div>
    </div>
  </div>
`;

const createReviewTemplate = (restaurant) => `
  <div class="detail_review">
    ${restaurant.customerReviews
      .map(
        (review) => `
        <div class="card_detail_review">
          <h5>${review.name}</h5>
          <span class="card_detail_review_date">${review.date}</span>
          <p>${review.review}</p>
        </div>
      `
      )
      .join('')}
  </div>
`;

const createLikeRestaurantButtonTemplate = () => `
  <button aria-label="like this restaurant" id="likeButton" class="like">
     <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createUnlikeRestaurantButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

// eslint-disable-next-line max-len, object-curly-newline
export { createRestoDetailTemplate, createRestaurantItemTemplate, createReviewTemplate, createLikeRestaurantButtonTemplate, createUnlikeRestaurantButtonTemplate };
