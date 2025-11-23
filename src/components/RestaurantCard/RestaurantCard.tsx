import Link from "next/link";

import { Restaurant } from "@app/types/restaurants";
import { getBestDealDiscount } from "@app/utils/restaurants";

import styles from "./RestaurantCard.module.css";

type Props = {
  restaurant: Restaurant;
};

const RestaurantCard = ({ restaurant }: Props) => {
  const bestDealDiscount = getBestDealDiscount(restaurant);
  const primaryDeal =
    restaurant.deals.find(
      ({ discount }) => discount === `${bestDealDiscount}`
    ) ?? restaurant.deals[0];

  return (
    <Link href={`/restaurants/${restaurant.objectId}`} className={styles.link}>
      <article className={styles.restaurantCard}>
        <div className={styles.imageWrapper}>
          <img
            className={styles.image}
            src={restaurant.imageLink}
            alt={restaurant.name}
          />
          {primaryDeal && (
            <div className={styles.discountRibbon}>
              <div>{primaryDeal.discount}% off</div>
              <div className={styles.discountRibbonSubtext}>
                {primaryDeal.close === "true"
                  ? `Arrive before ${primaryDeal.close}`
                  : "Anytime today"}
              </div>
            </div>
          )}
          <button type="button" className={styles.favouriteButton}>
            ♡
          </button>
        </div>
        <div className={styles.restaurantCardBody}>
          <h2 className={styles.restaurantCardTitle}>{restaurant.name}</h2>
          <div className={styles.restaurantCardLocation}>
            0.5km Away, {restaurant.suburb}
          </div>
          <div className={styles.cuisines}>
            <span>{restaurant.cuisines.join(", ")}</span>
          </div>
          <div className={styles.restaurantCardMetaRow}>
            <span className={styles.metaDot}>•</span>
            <span>
              {primaryDeal.dineIn === "true" ? "Dine In" : "Takeaway"}
            </span>
            <span className={styles.metaDot}>•</span>
            <span>Order Online</span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default RestaurantCard;
