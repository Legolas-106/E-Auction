import { createContext, useContext, ReactNode } from "react";
import { useQuery, useMutation, useQueryClient, QueriesObserver, QueryObserverBaseResult, QueryObserverResult, QueryClientProvider, QueryClient } from "@tanstack/react-query";
import axios from 'axios';
import { VendorService } from "../../vendor/vendorService";
import { useAuth } from "../../auth/useAuthHook";
import { AllItems,OngoingAuction,ListedAuction,UpcomingAuction,EndedAuction,UnlistedItem } from "./types";
import { transformers } from "./auctionDatatransformer";

// API Service Functions
const auctionApi = {
  // Fetch functions
  fetchAllItems : (loginId:string) => VendorService.getAllItems(loginId),

  // Update functions
  updateUpcoming: (auction: UpcomingAuction) => 
    axios.put(`/api/auctions/upcoming/${auction.id}`, auction).then(res=>res.data),
  updateListed : (auction : ListedAuction) =>
    axios.put(`/api/auctions/listed/${auction.id}`,auction).then(res=>res.data),
  updateOngoing: (auction: OngoingAuction) => 
    axios.put(`/api/auctions/ongoing/${auction.id}`, auction).then(res=>res.data),
  updateEnded: (auction: EndedAuction) => 
    axios.put(`/api/auctions/ended/${auction.id}`, auction).then(res=>res.data),
  updateUnlisted: (item: UnlistedItem) => 
    axios.put(`/api/items/unlisted/${item.itemId}`, item).then(res=>res.data),
};

// Context Interface
interface AuctionContextType {
  // Data
  totalItems : number;
  loginId : string;
  upcoming: UpcomingAuction[];
  listed: ListedAuction[];
  ongoing: OngoingAuction[];
  ended: EndedAuction[];
  unlisted: UnlistedItem[];
  
  // Methods
  updateUpcoming: (auction: UpcomingAuction) => Promise<UpcomingAuction>;
  updateListed : (auction : ListedAuction) => Promise<ListedAuction>;
  updateOngoing: (auction: OngoingAuction) => Promise<OngoingAuction>;
  updateEnded: (auction: EndedAuction) => Promise<EndedAuction>;
  updateUnlisted: (item: UnlistedItem) => Promise<UnlistedItem>;
  
  // Loading states
  isLoading: boolean;
  isError: boolean;
  refetch: () => Promise<QueryObserverBaseResult<AllItems,Error>>;
}

const AuctionContext = createContext<AuctionContextType | null>(null);

export const AuctionProvider : React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const queryClient = useQueryClient();
  const {getCurrUserInfo} = useAuth();
  const loginId = getCurrUserInfo()?.id ?? "";

  // Queries for fetching data
   const {data:allItems,isLoading,isError,refetch} = useQuery({
    queryKey: ["allItems",loginId],
    queryFn: () => auctionApi.fetchAllItems(loginId),
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    refetchOnWindowFocus: false
  });
  console.log("All Items are : ",allItems);
  // Mutations for updating data
  const ongoingMutation = useMutation({
    mutationFn: auctionApi.updateOngoing,
    onSuccess: (updatedAuction: OngoingAuction) => {
      // Update the cache directly
      queryClient.setQueryData<AllItems>(["allItems"], (oldData) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          ongoingAuctions: oldData.ongoingAuctions.map(auction => 
            auction.id === updatedAuction.id ? updatedAuction : auction
          )
        };
      });
    }
  });

  // Similar optimized mutations for other types
  const upcomingMutation = useMutation({
    mutationFn: auctionApi.updateUpcoming,
    onSuccess: (updatedAuction: UpcomingAuction) => {
      queryClient.setQueryData<AllItems>(["allItems"], (oldData) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          upcomingAuctions: oldData.upcomingAuctions.map(auction => 
            auction.id === updatedAuction.id ? updatedAuction : auction
          )
        };
      });
    }
  });

  const endedMutation = useMutation({
    mutationFn: auctionApi.updateEnded,
    onSuccess: (updatedAuction: EndedAuction) => {
      queryClient.setQueryData<AllItems>(["allItems"], (oldData) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          endedAuctions: oldData.endedAuctions.map(auction => 
            auction.id === updatedAuction.id ? updatedAuction : auction
          )
        };
      });
    }
  });

  const listedMutation = useMutation({
    mutationFn: auctionApi.updateListed,
    onSuccess: (updatedAuction: ListedAuction) => {
      queryClient.setQueryData<AllItems>(["allItems"], (oldData) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          listedAuctions: oldData.listedAuctions.map(auction => 
            auction.id === updatedAuction.id ? updatedAuction : auction
          )
        };
      });
    }
  });

  const unlistedMutation = useMutation({
    mutationFn: auctionApi.updateUnlisted,
    onSuccess: (updatedItem: UnlistedItem) => {
      queryClient.setQueryData<AllItems>(["allItems"], (oldData) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          unlistedItems: oldData.unlistedItems.map(item => 
            item.itemId === updatedItem.itemId ? updatedItem : item
          )
        };
      });
    }
  });

  // Update methods now return the updated item
  const updateOngoing = async (auction: OngoingAuction) => {
    const response = await ongoingMutation.mutateAsync(auction);
    return response;
  };

  const updateUpcoming = async (auction: UpcomingAuction) => {
    const response = await upcomingMutation.mutateAsync(auction);
    return response;
  };

  const updateEnded = async (auction: EndedAuction) => {
    const response = await endedMutation.mutateAsync(auction);
    return response;
  };

  const updateListed = async (auction: ListedAuction) => {
    const response = await listedMutation.mutateAsync(auction);
    return response;
  };

  const updateUnlisted = async (item: UnlistedItem) => {
    const response = await unlistedMutation.mutateAsync(item);
    return response;
  };

  // Loading and error states

  const value: AuctionContextType = {
    totalItems : allItems?.totalItems ?? 0,
    loginId : allItems?.loginId ?? "",
    upcoming: transformers.toUpcomingAuctions(
      allItems?.upcomingAuctions?.upcomingAuction ?? [], 
      allItems?.upcomingAuctions?.itemDetails ?? []
    ) ?? [],
    listed: transformers.toListedAuction(
      allItems?.listedAuctions?.listedAuction ?? [],
      allItems?.listedAuctions?.itemDetails ?? []
    ) ?? [],
    ongoing: transformers.toOngoingAuction(
      allItems?.ongoingAuctions?.ongoingAuction ?? [],
      allItems?.ongoingAuctions?.itemDetails ?? []
    ) ?? [],
    ended: transformers.toEndedAuction(
      allItems?.endedAuctions?.endAuction ?? [],
      allItems?.endedAuctions?.itemDetails ?? []
    ) ?? [],
    unlisted: allItems?.unlistedItems.map(transformers.toUnlistedItem) ?? [],
    updateUpcoming,
    updateListed,
    updateOngoing,
    updateEnded,
    updateUnlisted,
    isLoading,
    isError,
    refetch
  };

  return (
      <AuctionContext.Provider value={value}>
        {children}
      </AuctionContext.Provider>
  );
};

// Hook for using the auction context
export const useAuctions = () => {
  const context = useContext(AuctionContext);
  if (!context) {
    throw new Error("useAuctions must be used within AuctionProvider");
  }
  return context;
};














// / Base Interface for common auction properties
// interface lotDetails {
//   lotNumber : number;
//   productCategory : string;
//   weight?: number;
//   emd: number;
//   auctionAmount : number;
//   address : string;
//   city : string;
//   state : string;
//   postalCode : string;
//   contactNumber : string;
//   lotDescription : string;
//   images : string[];
// }

// interface item {
//   itemId : number;
//   auctionType : string;
//   auctionDescription : string;
//   auctionTitle : string;
//   auctionLotType : string;
//   companyName : string;
//   productType : string;
//   lots : lotDetails[];
// }

// interface BaseAuction {
//   id: number;
//   title: string;
//   auctionDescription : string;
//   auctionLotType : string;
//   auctionTitle : string;
//   auctionType : string;
//   companyName : string;
//   productType : string;
//   auctionLotNumbers : number;
//   auctionItem : item;

// }

// // Specific Interfaces for each auction type
// interface UpcomingAuction extends BaseAuction {
//   auctionBidderRegistrationStartDate : string;
//   auctionBidderRegistrationEndDate : string;
//   auctionStartDate : string;
//   auctionEndDate : string;
//   auctionPublishDate : string;
//   minBidderRequired : string;
// }

// interface OngoingAuction extends BaseAuction {
//   currentBid: number;
//   bidderRegistered?: number;
//   totalBids : number;
// }

// interface EndedAuction extends BaseAuction {
//   winningBid: number;
//   paymentStatus: string;
//   paymentCompletedTime?: string;
//   winnerId?: number;
// }

// interface ListedAuction extends BaseAuction{
//   auctionBidderRegistrationStartDate : string;
//   auctionBidderRegistrationEndDate : string;
//   auctionStartDate : string;
//   auctionEndDate : string;
//   auctionPublishDate : string;
//   minBidderRequired : string;
//   bidderRegistered : string;
// }

// interface UnlistedItem{
//   auctionActive : boolean;
//   item : item;
// }

// interface AllItems{
//   totalItems : number;
//   loginId : string;
//   upcomingAuctions : UpcomingAuction[];
//   listedAuctions : ListedAuction[];
//   ongoingAuctions : OngoingAuction[];
//   endedAuctions : EndedAuction[];
//   unlistedItems : UnlistedItem[];
// }
