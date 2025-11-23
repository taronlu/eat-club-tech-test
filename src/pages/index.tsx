import { GetServerSideProps } from "next";
import { useState } from "react";

import { Restaurant } from "@app/types/restaurants";
import { fetchRestaurants } from "@app/api/fetchRestaurants";
import RestaurantCard from "@app/components/RestaurantCard";
import NavBar from "@app/components/NavBar";

import styles from "./index.module.css";
import { getBestDealDiscount } from "@app/utils/restaurants";

type Props = { restaurants: Restaurant[] };

const RestaurantListPage = ({ restaurants }: Props) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRestaurants = restaurants
    .filter((restaurant) =>
      (restaurant.name + restaurant.cuisines)
        .toLocaleLowerCase()
        .includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => getBestDealDiscount(b) - getBestDealDiscount(a));

  return (
    <>
      <main className={styles.wrapper}>
        <NavBar />
        <div className={styles.content}>
          <input
            type="text"
            className={styles.searchInput}
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="e.g. chinese, pizza"
          />
          <div className={styles.restaurantsList}>
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant.objectId}
                restaurant={restaurant}
              />
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const restaurants = await fetchRestaurants();

  return {
    props: {
      restaurants,
    },
  };
};

export default RestaurantListPage;
