interface Permission {
    view: boolean;
    create?: boolean;
    edit?: boolean;
    delete?: boolean;
    bid?: boolean;
    purchase?: boolean;
    sell?: boolean;
  }
  
  interface UserTypePermissions {
    [key: string]: Permission;
  }

  const basicUserPermission: UserTypePermissions = {
    home: { view: true },
    categories: { view: true },
    signup : {view:true},
    'categories/scrap': { view: true },
    'categories/land': { view: true },
    'categories/timber': { view: true },
    auctions : {view:true},
    notifications: { view: true },
    help: { view: true },
    community: { view: true, edit: true},
  }
  
  const bidderPermissions: UserTypePermissions = {
    // Navigation Permissions
    home: { view: true },
    categories: { view: true },
    dashboard : {view: true, create:true, delete:true, edit:true },
    'categories/scrap': { view: true },
    'categories/land': { view: true },
    'categories/timber': { view: true },
    auctions: { view: true},
    // auctions: { view: true},
    bid: { view: true, bid: true, create:true, delete:true, edit:true },
    // sell: { view: true, create: true },
    buy: { view: true, create: true, edit:true, delete:true },
    notifications: { view: true },
    wishlist: { view: true, create: true, delete: true },
    cart: { view: true, create: true, delete: true },
    help: { view: true },
    community: { view: true, create: true, edit: true, delete: true },
  
    // Service-level Permissions
    'auction-bidding': { view: true, bid: true },
    'direct-purchase': { view: true, purchase: true },
    'user-profile': { view: true, edit: true },
    'payment-methods': { view: true, create: true, edit: true, delete: true },
    'bid-history': { view: true },
    'purchase-history': { view: true },
    'saved-searches': { view: true, create: true, edit: true, delete: true },
    'price-alerts': { view: true, create: true, edit: true, delete: true },
    'product-reviews': { view: true, create: true, edit: true, delete: true },
    'support-tickets': { view: true, create: true, edit: true }
  };
  
  const vendorPermissions: UserTypePermissions = {
    // Navigation Permissions
    home: { view: true },
    categories: { view: true },
    dashboard : {view: true, create:true, delete:true, edit:true },
    'categories/scrap': { view: true, create: true},
    'categories/land': { view: true},
    'categories/timber': { view: true },
    sell: { view: true, create: true },
    auctions: { view: true, create: true, edit: true, delete: true },
    buy: { view: false },
    notifications: { view: true },
    // wishlist: { view: true, create: true, delete: true },
    // cart: { view: false },
    help: { view: true },
    community: { view: true, create: true, edit: true, delete: true },
  
    // Service-level Permissions
    'auction-management': { view: true, create: true, edit: true, delete: true },
    'inventory-management': { view: true, create: true, edit: true, delete: true },
    'order-management': { view: true, create: true, edit: true },
    'vendor-analytics': { view: true },
    'vendor-profile': { view: true, edit: true },
    'bid-monitoring': { view: true },
    'sale-history': { view: true },
    'customer-management': { view: true, create: true },
    'pricing-management': { view: true, create: true, edit: true },
    'support-tickets': { view: true, create: true, edit: true }
  };
  
  // Helper function to check permissions
  const checkPermission = (
    userType: 'BIDDER' | 'VENDOR',
    resource: string,
    action: 'view' | 'create' | 'edit' | 'delete' | 'bid' | 'purchase' | 'sell'
  ): boolean => {
    const permissions = userType === 'BIDDER' ? bidderPermissions : vendorPermissions;
    // console.log("permision for ",userType,resource,action,permissions);
    // console.log(permissions[resource]?.[action] || false);   
    return permissions[resource]?.[action] || false;
  };
  
  export {
    bidderPermissions,
    vendorPermissions,
    basicUserPermission,
    checkPermission
  };