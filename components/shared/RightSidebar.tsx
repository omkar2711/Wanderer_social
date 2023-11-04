  import { currentUser } from "@clerk/nextjs";
  import { Button } from "../ui/button";
  import UserCard from "../cards/UserCard";
  import Image from 'next/image';
  import { useRouter } from "next/navigation";
  import { fetchCommunities } from "@/lib/actions/community.actions";
  import { fetchUsers } from "@/lib/actions/user.actions";
  import wandererImg from "@/public/assets/Wanderer_frontPage.jpg"
  async function RightSidebar() {

    // const router = useRouter();
    const user = await currentUser();
    if (!user) return null;
  
    const similarMinds = await fetchUsers({
      userId: user.id,
      pageSize: 4,
    });

    const suggestedCOmmunities = await fetchCommunities({ pageSize: 4 });

    return (
      <section className='custom-scrollbar rightsidebar'>
        <div className='flex flex-1 flex-col justify-start'>
          <h3 className='text-heading4-medium text-light-1'>
            Get Started
          </h3>

          <div className='mt-7 flex w-[350px] flex-col gap-9'>
          <Image src={wandererImg} alt="img" />
        
          </div>
          <div className="text-white bg-stone-500 hover:bg-sky-600 rounded-md px-4 py-2 mt-10">
            <a href="https://wanderer-livid-chi.vercel.app/" className="hover:text-white w-full h-full block text-center">
              App
            </a>
          </div>
        </div>

        <div className='flex flex-1 flex-col justify-start'>
          <h3 className='text-heading4-medium text-light-1'>Similar Minds</h3>
          <div className='mt-7 flex w-[350px] flex-col gap-10'>
            {similarMinds.users.length > 0 ? (
              <>
                {similarMinds.users.map((person) => (
                  <UserCard
                    key={person.id}
                    id={person.id}
                    name={person.name}
                    username={person.username}
                    imgUrl={person.image}
                    personType='User'
                  />
                ))}
              </>
            ) : (
              <p className='!text-base-regular text-light-3'>No users yet</p>
            )}
          </div>
        </div>
      </section>
    );
  }

  export default RightSidebar;
