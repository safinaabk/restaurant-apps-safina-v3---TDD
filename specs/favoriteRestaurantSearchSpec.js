import FavoriteRestaurantSearchPresenter from '../src/scripts/views/pages/favorite-restaurants/favorite-restaurant-search-presenter';
import FavoriteRestaurantIdb from '../src/scripts/data/favorite-idb';
import FavoriteRestaurantSearchView from '../src/scripts/views/pages/favorite-restaurants/favorite-restaurant-search-view';

describe('Searching restaurants', () => {
  let presenter;
  let favoriteRestaurants;
  let view;

  const searchRestaurants = (query) => {
    const queryElement = document.getElementById('query');
    queryElement.value = query;
    queryElement.dispatchEvent(new Event('change'));
  };

  const setRestaurantSearchContainer = () => {
    const view = new FavoriteRestaurantSearchView();
    document.body.innerHTML = view.getTemplate();
  };

  const constructPresenter = () => {
    favoriteRestaurants = spyOnAllFunctions(FavoriteRestaurantIdb);
    presenter = new FavoriteRestaurantSearchPresenter({
      favoriteRestaurants,
      view,
    });
  };

  beforeEach(() => {
    setRestaurantSearchContainer();
    constructPresenter();
  });

  describe('When query is not empty', () => {
    it('should be able to capture the query typed by the user', () => {
      searchRestaurants('restaurant a');

      expect(presenter.latestQuery).toEqual('restaurant a');
    });

    it('should ask the model to search for restaurants', () => {
      searchRestaurants('restaurant a');

      expect(favoriteRestaurants.searchRestaurants).toHaveBeenCalledWith('restaurant a');
    });

    it('should show the found restaurants', () => {
      presenter._showFoundRestaurants([{ id: 1 }]);
      expect(document.querySelectorAll('.resto_item').length).toEqual(1);

      presenter._showFoundRestaurants([
        { id: 1, name: 'Satu' },
        { id: 2, name: 'Dua' },
      ]);
      expect(document.querySelectorAll('.resto_item').length).toEqual(2);
    });

    it('should show the title of the found restaurants', () => {
      presenter._showFoundRestaurants([{ id: 1, name: 'Satu' }]);
      expect(document.querySelectorAll('.item_body_name').item(0).textContent).toEqual('Satu');
    });

    it('should show the title of the found restaurants', () => {
      presenter._showFoundRestaurants([{ id: 1, name: 'Satu' }]);
      expect(document.querySelectorAll('.item_body_name').item(0).textContent).toEqual('Satu');

      presenter._showFoundRestaurants([
        { id: 1, name: 'Satu' },
        { id: 2, name: 'Dua' },
      ]);

      const restaurantNames = document.querySelectorAll('.item_body_name');
      expect(restaurantNames.item(0).textContent).toEqual('Satu');
      expect(restaurantNames.item(1).textContent).toEqual('Dua');
    });

    it('should show - for found restaurant without title', () => {
      presenter._showFoundRestaurants([{ id: 1 }]);

      expect(document.querySelectorAll('.item_body_name').item(0).textContent).toEqual('-');
    });

    it('should show the restaurants found by Favorite Restaurants', (done) => {
      document.getElementById('restaurant-search-container').addEventListener('restaurants:searched:updated', () => {
        expect(document.querySelectorAll('.resto_item').length).toEqual(3);
        done();
      });

      favoriteRestaurants.searchRestaurants.withArgs('restaurant a').and.returnValues([
        { id: 111, name: 'restaurant abc' },
        { id: 222, name: 'ada juga restaurant abcde' },
        { id: 333, name: 'ini juga boleh restaurant a' },
      ]);

      searchRestaurants('restaurant a');
    });

    it('should show the name of the movies found by Favorite Restaurants', (done) => {
      document.getElementById('restaurant-search-container').addEventListener('restaurants:searched:updated', () => {
        const restaurantNames = document.querySelectorAll('.item_body_name');
        expect(restaurantNames.item(0).textContent).toEqual('restaurant a');
        expect(restaurantNames.item(1).textContent).toEqual('ada juga restaurant abcde');
        expect(restaurantNames.item(2).textContent).toEqual('ini juga boleh restaurant a');

        // expect(document.querySelectorAll('.resto_item').length).toEqual(3);
        done();
      });

      favoriteRestaurants.searchRestaurants.withArgs('restaurant a').and.returnValues([
        { id: 111, name: 'restaurant a' },
        { id: 222, name: 'ada juga restaurant abcde' },
        { id: 333, name: 'ini juga boleh restaurant a' },
      ]);
      searchRestaurants('restaurant a');
    });
  });

  describe('When query is empty', () => {
    it('should capture the query as empty', () => {
      searchRestaurants(' ');
      expect(presenter.latestQuery.length).toEqual(0);
    });

    it('should show all favorite restaurants', () => {
      searchRestaurants('    ');
      expect(favoriteRestaurants.getAllRestaurants).toHaveBeenCalled();
    });

    it('should capture the query as empty', () => {
      searchRestaurants(' ');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurants('    ');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurants('');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurants('\t');
      expect(presenter.latestQuery.length).toEqual(0);
    });
  });

  describe('When no favorite restaurants could be found', () => {
    it('should show the empty message', (done) => {
      document.getElementById('restaurant-search-container').addEventListener('restaurants:searched:updated', () => {
        expect(document.querySelectorAll('.restaurants__not__found').length).toEqual(1);
        done();
      });

      // favoriteRestaurants.searchRestaurants.withArgs('restaurant a').and.returnValues([]);
      favoriteRestaurants.searchRestaurants.withArgs('restaurant a').and.returnValues([]);
      searchRestaurants('restaurant a');
    });

    it('should not show any restaurant', (done) => {
      document.getElementById('restaurant-search-container').addEventListener('restaurants:searched:updated', () => {
        expect(document.querySelectorAll('.resto_item').length).toEqual(0);
        done();
      });
      // favoriteRestaurants.searchRestaurants.withArgs('restaurant a').and.returnValues([]);
      favoriteRestaurants.searchRestaurants.withArgs('restaurant a').and.returnValues([]);
      searchRestaurants('restaurant a');
    });
  });
});
