import http from "../http-common";

const getAll = () => {
  return http.get("/feedbackData");
};

const get = id => {
  return http.get(`/feedbackData/${id}`);
};

const create = data => {
  return http.post("/feedbackData", data);
};

const update = (id, data) => {
  return http.put(`/feedbackData/${id}`, data);
};

const remove = id => {
  return http.delete(`/feedbackData/${id}`);
};

const removeAll = () => {
  return http.delete(`/feedbackData`);
};

const findByTitle = title => {
  return http.get(`/feedbackData/0/${title}`);
};

const FeedbackService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle
};

export default FeedbackService;
