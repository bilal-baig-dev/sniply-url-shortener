interface Discounts {
  coupon: string;
}
interface Payment {
  name: string;
  quantity: number;
  priceID: string;
  discounts?: Discounts[];
  price: string;
  isPopular?: boolean;
  discountedPrice: string;
  isPremium?: boolean;
}
interface appConfigProps {
  appName: string;
  logo: string;
  primaryColor: string;
  stripePaymentMode: "payment" | "subscription" | "setup";
  onetime: Payment[];
  recurring: {
    monthly: Payment[];
    yearly: Payment[];
  };
  currencySymbol: string;
  supportEmail: string;
}
export const appConfig: appConfigProps = {
  appName: "Sniply",
  primaryColor: "hsl(var(--primary))",
  logo: "",
  stripePaymentMode: "payment",
  supportEmail: "support@sniply.biz",
  currencySymbol: "$",
  onetime: [
    {
      name: "Starter",
      price: "49",
      discountedPrice: "29",
      quantity: 1,
      priceID: "",
      discounts: [
        {
          coupon: "",
        },
      ],
    },
    {
      name: "Premium",
      isPremium: true,
      quantity: 1,
      price: "89",
      isPopular: true,
      discountedPrice: "59",
      priceID: "",
      discounts: [
        {
          coupon: "",
        },
      ],
    },
  ],
  recurring: {
    monthly: [],
    yearly: [],
  },
};
