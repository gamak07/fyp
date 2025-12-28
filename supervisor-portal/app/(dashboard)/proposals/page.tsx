import Breadcrum from "@/features/proposals_page/Breadcrum";
import PendingReview from "@/features/proposals_page/PendingReview";
import RecentlyViewed from "@/features/proposals_page/RecentlyViewed";

export default function ReviewProposals() {
  return (
    <div className="p-8">
      <Breadcrum />

      <PendingReview />

      <RecentlyViewed />
    </div>
  );
}
