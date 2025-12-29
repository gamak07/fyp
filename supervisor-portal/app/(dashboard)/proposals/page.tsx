import Breadcrum from "@/features/proposals_page/Breadcrum";
import PendingReview from "@/features/proposals_page/PendingReview";
import RecentlyViewed from "@/features/proposals_page/RecentlyViewed";
import { getSupervisorProposals } from "@/lib/actions/review";

export default async function ReviewProposals() {
  // Fetch real data
  const { pending, recent } = await getSupervisorProposals();
  console.log(pending, recent)

  return (
    <div className="p-8">
      <Breadcrum />

      {/* Pass data to Client Components */}
      <PendingReview proposals={pending} />

      <RecentlyViewed proposals={recent} />
    </div>
  );
}