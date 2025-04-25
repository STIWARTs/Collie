export interface HomeNotificationContentProps {
  Heading: string;
  Description: string;
  Badge: string;
  Image: string;
  isRead: string;
}

export const HomeNotificationContent = [
  {
    Heading: 'Summer Collection Launched',
    Image: '/images/avatar/illustration/9.png',
    Description: 'Explore our new summer fashion lineup now',
    Badge: 'new',
    isRead: 'no',
  },
  {
    Heading: 'Limited Time Discount',
    Image: '/images/avatar/illustration/8.png',
    Description: '20% off on all premium items this week',
    Badge: 'hot',
    isRead: 'no',
  },
  {
    Heading: 'Your Order Has Shipped',
    Image: '/images/avatar/illustration/7.png',
    Description: 'Track your recent purchase in the orders section',
    Badge: 'trending',
    isRead: 'no',
  },
  {
    Heading: 'New Payment Methods Added',
    Image: '/images/avatar/illustration/6.png',
    Description: 'We now support cryptocurrency payments',
    Badge: 'new',
    isRead: 'yes',
  },
  {
    Heading: 'Exclusive Member Benefits',
    Image: '/images/avatar/illustration/4.png',
    Description: 'Check out special perks for loyal customers',
    Badge: 'trending',
    isRead: 'no',
  },
];
