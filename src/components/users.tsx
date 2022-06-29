// tslint:disable-next-line:no-var-requires
import {
  Datagrid,
  List,
  Show,
  Create,
  Edit,
  Filter,
  SimpleForm,
  TextField,
  TextInput,
  EditButton,
  DeleteButton,
  SelectInput,
  SimpleShowLayout,
} from "react-admin";

const UserFilter = (props: any) => (
    <Filter {...props}>
      {/* <TextInput label="Search" source="q" alwaysOn /> */}
      <TextInput label="Email" source="email" alwaysOn />
    </Filter>
  );
  
  export const UserList = (props: any) => (
    <List {...props} filters={<UserFilter />} sort={{ field: 'email', order: 'asc'}}>
      <Datagrid rowClick="show">
        <TextField source="email" />
        <TextField source="role" />
        <TextField source="id" sortable={false}/>
        {/* <ShowButton label="" /> */}
        <EditButton label="" />
        <DeleteButton label="" redirect={false}/>
      </Datagrid>
    </List>
  );
  
  export const UserShow = (props: any) => (
    <Show {...props}>
      <SimpleShowLayout>
        <TextField source="id" />
        <TextField source="uid" />
        <TextField source="email" />
        <TextField source="role" />
      </SimpleShowLayout>
    </Show>
  );
  
  export const UserCreate = (props: any) => (
    <Create {...props} >
      <SimpleForm>
        <TextInput source="email" />
        <SelectInput source="role" choices={[
        { id: 'administrator', name: 'Administrator' },
        { id: 'user', name: 'User' },
      ]} />
      </SimpleForm>
    </Create>
  );
  
  export const UserEdit = (props: any) => (
    <Edit {...props}>
      <SimpleForm>
        <TextInput source="id" disabled />
        <TextInput source="uid" disabled />
        <TextInput source="email" disabled />
        {/* <ReferenceInput source="role" options={{ disabled: true }} /> */}
        <SelectInput source="role" choices={[
        { id: 'administrator', name: 'Administrator' },
        { id: 'user', name: 'User' },
      ]} />
        </SimpleForm>
    </Edit>
  );