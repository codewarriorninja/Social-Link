import { getProfileByUsername } from "@/actions/profileAction"
import { notFound } from "next/navigation";


export async function generateMetaData({params}:{params: Promise<{username:string}>}){
    const {username} = await params
    const user = await getProfileByUsername(username);
    if(!user) return;

    return {
        title:`${user.name ?? user.username}`,
        description: user.bio || `Check out ${user.username}'s profile.`,
    }
}
const ProfilePage = async({params}:{params:Promise<{username:string}>}) => {
    const {username} = await params
    const user = await getProfileByUsername(username);

  if(!user) notFound();


  return (
    <div>profilePage</div>
  )
}

export default ProfilePage