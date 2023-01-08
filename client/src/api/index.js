import axios from 'axios';

const url = 'http://localhost:5000/posts';

export const fetchPosts = () => {
  console.log("We are fetching with the 'input'", url)
  return axios.get(url)
};
export const createPost = (newPost) => {
  console.log("The url is what is it? provided in the global context. The real input we have is ", newPost)
  axios.post(url, newPost);
}
export const updatePost = (id, updatedPost) => {
  console.log("We can still update the post but we do it with id", id, "and updatedPost ", updatedPost)
  axios.patch(`${url}/${id}`, updatedPost);
}
export const deletePost = (id) => {
  console.log("We are about to delete a post at this Id", id)
  axios.delete(`${url}/${id}`);
}
