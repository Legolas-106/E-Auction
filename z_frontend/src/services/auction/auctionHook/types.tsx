export interface LotDetails {
    lotNumber: number;
    productCategory: string;
    weight?: number;
    emd: number;
    auctionAmount: number;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    contactNumber: string;
    lotDescription: string;
    images: string[];
  }
  
  export interface Item {
    itemId: number;
    auctionType: string;
    auctionDescription: string;
    auctionTitle: string;
    auctionLotType: string;
    companyName: string;
    productType: string;
    lots: LotDetails[];
  }
  
  export interface BaseAuction {
    id: number;
    auctionDescription: string;
    auctionLotType: string;
    auctionTitle: string;
    auctionType: string;
    companyName: string;
    productType: string;
    auctionLotNumbers: number;
    auctionItem: Item;
  }
  
  // Specific Interfaces for each auction type
  export interface UpcomingAuction extends BaseAuction {
    auctionBidderRegistrationStartDate: string;
    auctionBidderRegistrationEndDate: string;
    auctionStartDate: string;
    auctionEndDate: string;
    auctionPublishDate: string;
    minBidderRequired: string;
  }
  
  export interface OngoingAuction extends BaseAuction {
    currentBid: number;
    bidderRegistered: number;
    totalBids: number;
  }
  
  export interface EndedAuction extends BaseAuction {
    winningBid: number;
    paymentStatus: string;
    paymentCompletedTime: string;
    winnerId: number;
  }
  
  export interface ListedAuction extends BaseAuction {
    auctionBidderRegistrationStartDate: string;
    auctionBidderRegistrationEndDate: string;
    auctionStartDate: string;
    auctionEndDate: string;
    auctionPublishDate: string;
    minBidderRequired: string;
    bidderRegistered: string;
  }
  
  export interface UnlistedItem {
    auctionActive: boolean;
    itemId: number;
    auctionType: string;
    auctionDescription: string;
    auctionTitle: string;
    auctionLotType: string;
    companyName: string;
    productType: string;
    itemLotNumber: number;
    createdAt : string;
    lots: LotDetails[];
  }
  
  export interface AllItems {
    totalItems: number;
    loginId: string;
    upcomingAuctions: UpcomingAuction[];
    listedAuctions: ListedAuction[];
    ongoingAuctions: OngoingAuction[];
    endedAuctions: EndedAuction[];
    unlistedItems: UnlistedItem[];
  }
  