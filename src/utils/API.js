import axios from "axios";

const RANDOMUSER_URL = "https://randomuser.me/api"
export default {
getMany: function(limit) {
    return axios.get(RANDOMUSER_URL + "/?results=" + limit);
}
}
