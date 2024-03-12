export type PostData = {
  uid: number; //had to change this from id to uid because json-server was converting the id field to a string by default
  title: string;
  description: string;
};

export type NewPostData = {
  title: string;
  description: string;
};

export type SavedPostData = {
  uid: number;
};
