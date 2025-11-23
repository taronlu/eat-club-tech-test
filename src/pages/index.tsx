import { GetServerSideProps } from "next";

import { Restaurant } from "@app/types/restaurants";
import { fetchRestaurants } from "@app/api/fetchRestaurants";
import RestaurantCard from "@app/components/RestaurantCard";
import NavBar from "@app/components/NavBar";

import styles from "./index.module.css";

type Props = { restaurants: Restaurant[] };

const RestaurantListPage = ({ restaurants }: Props) => {
  return (
    <>
      <main className={styles.wrapper}>
        <NavBar />
        <div className={styles.content}>
          <input
            className={styles.searchInput}
            placeholder="e.g. chinese, pizza"
          />
          <div className={styles.restaurantsList}>
            {restaurants.map((restaurant) => (
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
