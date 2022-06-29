import { 
  List, 
  Datagrid, 
  TextField, 
  ImageField, 
  Show, 
  Filter,
  TextInput,
  SimpleShowLayout 
} from "react-admin";
import { MoviePagination } from "../MyPagination";

const MoviesFilter = (props: any) => (
  <Filter {...props} >
    {/* <TextInput label="Id" source="id" allowEmpty /> */}
    <TextInput label="Title" source="title" alwaysOn />
  </Filter>
);

export const Movies = (props: any) => (
  <List {...props} perPage={20} pagination={<MoviePagination />} filters={<MoviesFilter />} >
    <Datagrid rowClick="show">
      <TextField source="id" />
      <ImageField source="poster" />
      <TextField source="title" />
      {/* <TextField source="overview" /> */}
      <TextField source="popularity" />
      <TextField source="rating" />
        {/* <ShowButton label="" /> */}
    </Datagrid>
  </List>
);

export const MoviesShow = (props: any) => (
  <Show {...props}>
    <SimpleShowLayout>
    <TextField source="id" />
      <ImageField source="poster" />
      <TextField source="title" />
      <TextField source="release_date" />
      <TextField source="overview" />
      <TextField source="popularity" />
      <TextField source="rating" />
    </SimpleShowLayout>
  </Show>
);