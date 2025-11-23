import { GetServerSideProps } from "next";
import { useState } from "react";

import { fetchRestaurants } from "@app/api/fetchRestaurants";
import Navbar from "@app/components/NavBar";
import { Restaurant, Deal } from "@app/types/restaurants";

import styles from "./index.module.css";

type Props = {
  restaurant: Restaurant;
};

const RestaurantDetailPage = ({ restaurant }: Props) => {
  const [hasBannerImage, setHasBannerImage] = useState(true);

  return (
    <main className={styles.wrapper}>
      <Navbar />
      <div className={styles.content}>
        {hasBannerImage && (
          <div className={styles.heroWrapper}>
            <img
              className={styles.heroImage}
              onError={() => setHasBannerImage(false)}
              src={restaurant.imageLink}
              alt={restaurant.name}
            />
          </div>
        )}
        {/* Using keyboard character + font size emojis for simplicity */}
        <div className={styles.actions}>
          <button className={styles.actionItem}>
            <div className={styles.actionIcon}>📋</div>
            <span>Menu</span>
          </button>
          <button className={styles.actionItem}>
            <div className={styles.actionIcon}>📞</div>
            <span>Call us</span>
          </button>
          <button className={styles.actionItem}>
            <div className={styles.actionIcon}>📍</div>
            <span>Location</span>
          </button>
          <button className={styles.actionItem}>
            <div className={styles.actionIcon}>♡</div>
            <span>Favourite</span>
          </button>
        </div>

        <div className={styles.divider} />

        <h1 className={styles.title}>{restaurant.name}</h1>
        <div className={styles.subtitle}>
          {restaurant.cuisines.join(" • ")} $
        </div>

        <div className={styles.divider} />

        <div className={styles.infoRow}>
          <span className={styles.infoIcon}>⏰</span>
          <span>
            Hours: {restaurant.open} – {restaurant.close}
          </span>
        </div>
        <div className={styles.infoRow}>
          <span className={styles.infoIcon}>📍</span>
          <span>
            {restaurant.address1} • {restaurant.suburb}
          </span>
        </div>

        <div className={styles.divider} />
        {restaurant.deals.map((deal: Deal) => {
          const timeLabel =
            deal.open && deal.close
              ? `Between ${deal.open} – ${deal.close}`
              : "Anytime during opening hours";

          return (
            <div key={deal.objectId} className={styles.dealCard}>
              <div className={styles.dealMain}>
                <div className={styles.dealDiscount}>
                  ⚡ {deal.discount}% Off
                </div>
                <div className={styles.dealSub}>{timeLabel}</div>
                <div className={styles.dealQuantity}>
                  {deal.qtyLeft} Deals Left
                </div>
              </div>
              <button type="button" className={styles.redeemButton}>
                Redeem
              </button>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const restaurantIdParam = context.params?.restaurantId;

  if (typeof restaurantIdParam !== "string") {
    return { notFound: true };
  }

  const restaurantList = await fetchRestaurants();
  const restaurant = restaurantList.find(
    (currentRestaurant) => currentRestaurant.objectId === restaurantIdParam
  );

  if (!restaurant) {
    return { notFound: true };
  }

  return {
    props: {
      restaurant,
    },
  };
};

export default RestaurantDetailPage;
