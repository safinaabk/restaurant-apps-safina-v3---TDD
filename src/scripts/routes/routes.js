import Detail from '../views/pages/detail';
import Favorite from '../views/pages/favorite';
import ListResto from '../views/pages/list-resto';

const routes = {
  '/': ListResto, // default page
  '/list-resto': ListResto,
  '/detail/:id': Detail,
  '/favorite': Favorite,
};

export default routes;
