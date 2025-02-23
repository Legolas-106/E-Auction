import {
    UpcomingAuction,
    OngoingAuction,
    ListedAuction,
    EndedAuction,
    UnlistedItem,
    Item,
    LotDetails
  } from './types';
  
  export const transformers = {
    toLotDetails (lot : any) : LotDetails{
        const img: string[] = lot.images.map((image: { id: number; url: string })  => image.url);

        return{
            lotNumber : lot.auctionLotNumber,
            productCategory: lot.productCategory,
            weight: lot.lotWeight,
            emd: lot.lotEMD,
            auctionAmount: lot.lotAuctionAmount,
            address: lot.lotAddress,
            city: lot.lotCity,
            state: lot.lotState,
            postalCode: lot.lotPostalCode,
            contactNumber: lot.lotSellerContactNumber,
            lotDescription: lot.lotDescription,
            images: img,
        };
    },
    toItemDetails(item : any) : Item{
        return{
            itemId : item.id,
            auctionType: item.auctionType,
            auctionDescription: item.auctionDescription,
            auctionTitle: item.auctionTitle,
            auctionLotType: item.auctionLotType,
            companyName: item.companyName,
            productType: item.productType,
            lots: Array.isArray(item.itemLotDetails) ? item.itemLotDetails.map(transformers.toLotDetails) : []
        };
    },
    toUpcomingAuctions(auctions: any[], itemArray: any[]): UpcomingAuction[] {
        if (!auctions?.length || !itemArray?.length) {
          return [];
        }
    
        return auctions.map((auction) => {
          const correspondingItem = itemArray.find(item => item.id === auction.itemId);
          
          if (!correspondingItem) {
            return null; // If no matching item found, return null (we'll filter these out)
          }
    
          return {
            id: auction.auctionId || auction.id,
            auctionDescription: auction.auctionDescription,
            auctionLotType: auction.auctionLotType,
            auctionTitle: auction.auctionTitle,
            auctionType: auction.auctionType,
            companyName: correspondingItem.companyName,
            productType: auction.product,
            auctionLotNumbers: correspondingItem.itemLotDetails.length,
            auctionItem: transformers.toItemDetails(correspondingItem), // Attach the matched item
            auctionBidderRegistrationStartDate: auction.auctionBidderRegistrationStartDate,
            auctionBidderRegistrationEndDate: auction.auctionBidderRegistrationEndDate,
            auctionStartDate: auction.auctionStartDate,
            auctionEndDate: auction.auctionEndDate,
            auctionPublishDate: auction.auctionPublishDate,
            minBidderRequired: auction.minBidderRequired
          };
        }).filter((auction): auction is UpcomingAuction => auction!=null); // Remove any null values from the array
    },
  
    toOngoingAuction(auctions : any[],items : any[]): OngoingAuction[] {
        if (!auctions?.length || !items?.length) {
            return [];
        }
        return auctions.map((auction)=>{
            const correspondingItem = items.find(item => item.id === auction.itemId);
            if (!correspondingItem) {
                return null; // If no matching item found, return null (we'll filter these out)
            }
            return {
                id: auction.auctionId || auction.id,
                auctionDescription: auction.auctionDescription,
                auctionLotType: auction.auctionLotType,
                auctionTitle: auction.auctionTitle,
                auctionType: auction.auctionType,
                companyName: correspondingItem.companyName,
                productType: auction.product,
                auctionLotNumbers: correspondingItem.itemLotDetails.length,
                auctionItem: transformers.toItemDetails(correspondingItem),
                currentBid: Number(auction?.currentHighestBidId ?? "0"),
                bidderRegistered: auction?.registeredBidderTableId ?? 0,
                totalBids: auction?.totalBids ?? 2
            };
        }).filter((auction): auction is OngoingAuction => auction!=null);
    },
  
    toListedAuction(auctions : any[],items : any[]): ListedAuction[] {
        if(!auctions.length || !items.length){
            return [];
        }
        return auctions.map((auction)=>{       
            const correspondingItem = items.find(item => item.id === auction.itemId);  
            if(!correspondingItem){
                return null;
            }
            return {
                id: auction.auctionId || auction.id,
                auctionDescription: auction.auctionDescription,
                auctionLotType: auction.auctionLotType,
                auctionTitle: auction.auctionTitle,
                auctionType: auction.auctionType,
                companyName: correspondingItem.companyName,
                productType: auction.product,
                auctionLotNumbers: correspondingItem.itemLotDetails.length,
                auctionItem: transformers.toItemDetails(correspondingItem),
                auctionBidderRegistrationStartDate: auction.auctionBidderRegistrationStartDate,
                auctionBidderRegistrationEndDate: auction.auctionBidderRegistrationEndDate,
                auctionStartDate: auction.auctionStartDate,
                auctionEndDate: auction.auctionEndDate,
                auctionPublishDate: auction.auctionPublishDate,
                bidderRegistered: auction?.bidderRegistered ?? "NA"
            };
        }).filter((auction): auction is ListedAuction => auction!=null);
    },
  
    toEndedAuction(auctions : any[],items : any[]): EndedAuction[] {
        if(!auctions.length || !items.length){
            return [];
        }
        return auctions.map((auction)=>{
            const correspondingItem = items.find((item)=> item.id === auction.itemId);
            if(!correspondingItem){
                return null;
            }
            return {
                id: auction.auctionId || auction.id,
                auctionDescription: auction.auctionDescription,
                auctionLotType: auction.lotType,
                auctionTitle: auction.auctionTitle,
                auctionType: auction.auctionType,
                companyName: correspondingItem.companyName,
                productType: auction.productType,
                auctionLotNumbers: correspondingItem.itemLotDetails.length,
                auctionItem: transformers.toItemDetails(correspondingItem),
                winningBid: Number(auction?.winningBid ?? 0),
                paymentStatus: auction?.paymentStatus ?? "NA",
                paymentCompletedTime: auction?.paymentCompletedTime ?? "NA",
                winnerId: auction?.winnerId ?? 0
              };
        }).filter((auction): auction is EndedAuction => auction!==null);
    },
  
    toUnlistedItem(apiData: any): UnlistedItem {
      return {
        auctionActive: apiData.auctionActive,
        itemId: apiData.id,
        auctionType: apiData.auctionType,
        auctionDescription: apiData.auctionDescription,
        auctionTitle: apiData.auctionTitle,
        auctionLotType: apiData.auctionLotType,
        companyName: apiData.companyName,
        productType: apiData.productType,
        itemLotNumber: apiData.itemLotDetails.length,
        createdAt : apiData.createdAt,
        lots: Array.isArray(apiData.itemLotDetails) ? apiData.itemLotDetails.map(transformers.toLotDetails) : []
      };
    }
  };
  