import API_ENDPOINT from '../globals/api-endpoint';

class RestoSource {
  static async listRestaurants() {
    const response = await fetch(API_ENDPOINT.LIST_RESTO);
    const responseJson = await response.json();
    return responseJson.restaurants;
  }

  static async detailRestaurants(id) {
    const response = await fetch(API_ENDPOINT.DETAIL(id));
    const responseJson = await response.json();
    return responseJson.restaurant;
  }

  static async newReview(review) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(review),
    };

    const response = await fetch(API_ENDPOINT.NEW_REVIEW, options);
    const responseJson = await response.json();
    return responseJson;
  }
}

export default RestoSource;
