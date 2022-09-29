import { v4 as uuid } from "uuid";

function getUser() {
  let subId = localStorage.getItem("sub_id");
  if (!subId) {
    subId = uuid();
    localStorage.setItem("sub_id", subId);
  }
  return { subId };
}

const userActions = {
  getUser,
};

export default userActions;
