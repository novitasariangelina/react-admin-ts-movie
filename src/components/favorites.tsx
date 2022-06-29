// tslint:disable-next-line:no-var-requires
import {
    Datagrid,
    List,
    Show,
    SimpleShowLayout,
    TextField,
    ImageField,
    Create,
    SimpleForm,
    TextInput,
    Edit,
    EditButton,
    DeleteButton,
    Filter
} from "react-admin";

const FavoriteFilter = (props: any) => (
    <Filter {...props}>
      {/* <TextInput label="Search" source="q" alwaysOn /> */}
      <TextInput label="Email" source="email" alwaysOn />
    </Filter>
  );

export const Favorites = (props: any) => (
    <List {...props} filters={<FavoriteFilter />} sort={{ field: 'email', order: 'desc'}}>
        <Datagrid rowClick="show">
            {/* <TextField source="id" /> */}
            <ImageField source="poster" sortable={false}/>
            <TextField source="title" sortable={false}/>
            {/* <TextField source="overview" /> */}
            <TextField source="popularity" sortable={false}/>
            <TextField source="rating" sortable={false}/>
            <TextField source="email" />
            {/* <ShowButton label="" /> */}
        <EditButton label="" />
        <DeleteButton label="" redirect={false}/>
        </Datagrid>
    </List>
);

export const FavoriteShow = (props: any) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id_movie" />
            <ImageField source="poster" />
            <TextField source="title" />
            <TextField source="release_date" />
            <TextField source="popularity" />
            <TextField source="overview" />
            <TextField source="rating" />
            <TextField source="email" />
        </SimpleShowLayout>
    </Show>
);

export const FavoriteCreate = (props: any) => (
    <Create {...props} >
        <SimpleForm>
            <TextInput source="id_movie" />
            <TextInput source="poster" />
            <TextInput source="title" />
            <TextInput source="release_date" />
            <TextInput source="popularity" />
            <TextInput source="overview" />
            <TextInput source="rating" />
            <TextInput source="email" />
        </SimpleForm>
    </Create>
);

export const FavoriteEdit = (props: any) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="id_movie" />
            <TextInput source="poster" />
            <TextInput source="title" />
            <TextInput source="release_date" />
            <TextInput source="popularity" />
            <TextInput source="overview" />
            <TextInput source="rating" />
            <TextInput source="email" />
            {/* <ReferenceInput source="role" options={{ disabled: true }} /> */}
        </SimpleForm>
    </Edit>
);