import axios from "axios";

import { Restaurant } from "@app/types/restaurants";

export const fetchRestaurants = () =>
  axios
    .get<{ restaurants: Restaurant[] }>(
      // would use BASE_URL setup in env in production project but full URL here for simplicity
      "https://eccdn.com.au/misc/challengedata.json"
    )
    .then(({ data }) => data.restaurants);
