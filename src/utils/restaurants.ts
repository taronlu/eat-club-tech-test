import { Restaurant } from "@app/types/restaurants";

export const getBestDealDiscount = (restaurant: Restaurant) => {
  let bestDiscount = 0;

  for (const deal of restaurant.deals) {
    const discount = Number(deal.discount);

    if (discount > bestDiscount) {
      bestDiscount = discount;
    }
  }

  return bestDiscount;
};
