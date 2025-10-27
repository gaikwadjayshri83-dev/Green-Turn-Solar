import React, { useState, useEffect } from 'react';
import AnimatedHeading from './common/AnimatedHeading';
import ImageWithSpinner from './common/ImageWithSpinner';

// --- StarIcon Component (Inlined to fix build error) ---
interface StarIconProps {
  fill: 'full' | 'half' | 'empty';
  className?: string;
}

const StarIcon: React.FC<StarIconProps> = ({ fill, className = 'w-5 h-5' }) => {
  if (fill === 'half') {
    return (
      <svg className={`${className} text-yellow-400`} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        <path d="M12 15.4V6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z" fill="currentColor" className="text-gray-300" />
      </svg>
    );
  }

  return (
    <svg 
      className={`${className} ${fill === 'full' ? 'text-yellow-400' : 'text-gray-300'}`} 
      fill="currentColor" 
      viewBox="0 0 24 24"
    >
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );
};

// --- GoogleLogo Component (Inlined to fix build error) ---
const GoogleLogo: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path fill="#4285F4" d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.19,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.19,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.19,22C17.6,22 21.5,18.33 21.5,12.33C21.5,11.76 21.35,11.1 21.35,11.1Z"/>
    </svg>
);

// --- SkeletonLoader Component (Inlined to fix build error) ---
const SkeletonLoader: React.FC = () => {
  return (
    <div className="p-4 rounded-md border animate-pulse">
      <div className="flex items-center mb-3">
        <div className="w-10 h-10 rounded-full bg-gray-200 mr-3"></div>
        <div className="flex-grow">
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-1"></div>
          <div className="h-3 bg-gray-200 rounded w-1/4"></div>
        </div>
      </div>
      <div className="h-3 bg-gray-200 rounded w-full mb-1"></div>
      <div className="h-3 bg-gray-200 rounded w-5/6"></div>
    </div>
  );
};

// --- Type Definitions ---
interface Review {
    author_name: string;
    profile_photo_url: string;
    rating: number;
    text: string;
}

interface GoogleReviewsData {
    name: string;
    rating: number;
    totalRatings: number;
    reviews: Review[];
}

// --- Sub-components ---
const RatingStars: React.FC<{ rating: number }> = ({ rating }) => (
    <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
            <StarIcon key={i} fill={i < Math.round(rating) ? 'full' : 'empty'} className="w-4 h-4" />
        ))}
    </div>
);

const DefaultAvatar: React.FC<{ name: string }> = ({ name }) => (
    <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-lg mr-3 flex-shrink-0">
        {name.charAt(0).toUpperCase()}
    </div>
);

// --- Main Component ---
const GoogleReviews: React.FC = () => {
    const [data, setData] = useState<GoogleReviewsData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch('/api/google-reviews');
                if (!response.ok) {
                    const errorData = await response.json().catch(() => null);
                    if (errorData && errorData.error === 'Server configuration error.') {
                        throw new Error('Server configuration error.');
                    }
                    throw new Error(`The server responded with status: ${response.status}`);
                }
                const result: GoogleReviewsData = await response.json();
                setData(result);
            } catch (e) {
                console.error("Failed to fetch Google reviews:", e);
                if (e instanceof Error && e.message === 'Server configuration error.') {
                    setError("Live reviews could not be loaded. Please ensure API keys are set in your deployment environment's variables.");
                } else {
                    setError("Could not load live reviews. Showing examples.");
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchReviews();
    }, []);

    const reviewsToShow = (data?.reviews && data.reviews.length > 0) ? data.reviews.slice(0, 3) : staticReviewsData;
    const overallRating = data?.rating ?? 4.2;
    const totalRatings = data?.totalRatings ?? 125;

    const renderOverallStars = (rating: number) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

        for (let i = 0; i < fullStars; i++) {
            stars.push(<StarIcon key={`full-${i}`} fill="full" />);
        }
        if (hasHalfStar) {
            stars.push(<StarIcon key="half" fill="half" />);
        }
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<StarIcon key={`empty-${i}`} fill="empty" />);
        }
        return stars;
    };
    
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <AnimatedHeading text="Real Reviews from Real Customers" className="text-3xl font-bold text-gray-800" />
                <p className="text-gray-600 max-w-2xl mx-auto mt-4">
                    We're Nagpur's top-rated solar installer for a reason. See what our clients are saying on Google.
                </p>
                 {error && <p className="mt-4 text-sm text-yellow-800 bg-yellow-100 p-3 rounded-md inline-block shadow-sm border border-yellow-200">{error}</p>}
            </div>
            
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg border border-gray-200">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 pb-6 border-b">
                   <div className="flex items-center gap-4">
                        <GoogleLogo className="w-10 h-10" />
                        <div>
                            <h3 className="text-xl font-bold text-gray-800">Green Turn Solar</h3>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-lg font-bold text-gray-700">{overallRating.toFixed(1)}</span>
                                <div className="flex items-center">
                                    {renderOverallStars(overallRating)}
                                </div>
                                <span className="text-gray-500 text-sm">{totalRatings}+ reviews</span>
                            </div>
                        </div>
                   </div>
                   <a
                     href="https://www.google.com/maps/search/?api=1&query=Green+Turn+Solar%2C+Nagpur"
                     target="_blank"
                     rel="noopener noreferrer"
                     className="bg-blue-500 text-white font-bold py-2 px-6 rounded-full hover:bg-blue-600 transition-all duration-300 transform hover:scale-105"
                   >
                     See All Reviews on Google
                   </a>
                </div>

                <div className="space-y-6">
                    {isLoading ? (
                        <>
                            <SkeletonLoader />
                            <SkeletonLoader />
                            <SkeletonLoader />
                        </>
                    ) : (
                        reviewsToShow.map((review, index) => (
                            <div key={index} className="p-4 rounded-md border animate-fade-in">
                                <div className="flex items-center mb-2">
                                    {review.profile_photo_url ? (
                                        <div className="w-10 h-10 rounded-full mr-3 flex-shrink-0 overflow-hidden">
                                            <ImageWithSpinner src={review.profile_photo_url} alt={`${review.author_name}'s profile picture`} />
                                        </div>
                                    ) : (
                                        <DefaultAvatar name={review.author_name} />
                                    )}
                                    <div>
                                        <p className="font-semibold text-gray-800">{review.author_name}</p>
                                        <RatingStars rating={review.rating} />
                                    </div>
                                </div>
                                <p className="text-gray-600 text-sm italic">"{review.text}"</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default GoogleReviews;
