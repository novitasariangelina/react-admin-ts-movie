import { Admin, Resource } from 'react-admin';
import { Movies, MoviesShow } from './components/movies';
import { FavoriteCreate, FavoriteEdit, Favorites, FavoriteShow } from './components/favorites';
import {dataProvider} from './dataProvider';
import {
  // FirebaseDataProvider,
  FirebaseAuthProvider
} from "react-admin-firebase";
import { firebaseConfig as config } from './FIREBASE_CONFIG';
import { UserList, UserShow, UserCreate, UserEdit } from "./components/users";
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BadgeIcon from '@mui/icons-material/Badge';

const options = {
  logging: true,
  rootRef: 'root_collection/some_document'
}
// const dataProvider = {getList};
// const dataProvider = FirebaseDataProvider(config);
const authProvider = FirebaseAuthProvider(config, options);
console.log('111111111111111111', dataProvider)

const App = () => (
  <Admin dataProvider={dataProvider}
    authProvider={authProvider}
  >
    <Resource
      name="movies"
      list={Movies}
      show={MoviesShow}
      icon={MovieCreationIcon}
    />
    <Resource
      name="favorites"
      list={Favorites}
      show={FavoriteShow}
      create={FavoriteCreate}
      edit={FavoriteEdit}
      icon={FavoriteIcon}
    />
    <Resource
      name="users"
      list={UserList}
      show={UserShow}
      create={UserCreate}
      edit={UserEdit}
      icon={BadgeIcon}
    />
  </Admin>
);

export default App;