import {
  List,
  Datagrid,
  TextField,
  DateField,
} from "react-admin";

interface PostListProps {
    id: number;
    title: string;
    published_at: string;
  }

export const PostList = (props: PostListProps) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="title" />
      <DateField source="published_at" />
      <TextField source="category" />
      {/* <BooleanField source="commentable" /> */}
    </Datagrid>
  </List>
);
