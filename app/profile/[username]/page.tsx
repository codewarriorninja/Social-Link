import {
  getProfileByUsername,
  getUserLikedPosts,
  getUserPosts,
  isFollowing,
} from "@/actions/profileAction";
import { notFound } from "next/navigation";
import ProfilePageClient from "./ProfilePageClient";
import { Metadata } from "next"; 


type Params = Promise<{username:string}>



export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { username } = await params;

  try {
    const user = await getProfileByUsername(username);

    if (!user) {
      return { title: 'User Not Found' }; 
    }

    return {
      title: `${user.name ?? user.username}`,
      description: user.bio || `Check out ${user.username}'s profile.`,
    };
  } catch (error) {
    console.error(error)
   
    notFound(); 
  }
}

async function ProfilePageServer({ params }: { params: Params }) {
  const { username } = await params;
  const user = await getProfileByUsername(username);

  if (!user) {
    notFound();
  }

  const [posts, likedPosts, isCurrentUserFollowing] = await Promise.all([
    getUserPosts(user.id),
    getUserLikedPosts(user.id),
    isFollowing(user.id),
  ]);

  return (
    <ProfilePageClient
      user={user}
      posts={posts}
      likedPosts={likedPosts}
      isFollowing={isCurrentUserFollowing}
    />
  );
}
export default ProfilePageServer;