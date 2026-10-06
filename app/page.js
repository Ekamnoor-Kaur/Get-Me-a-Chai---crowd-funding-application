import Link from "next/link";
export default function Home() {
  return (
    <>
      <div className="flex justify-center items-center flex-col text-white md:h-[55vh] h-[40vh] gap-4 px-5 md:px-0 text-xs md:text-base">
        <div className="font-bold md:text-5xl text-xl flex gap-2 items-center">Get me A Chai <span><img className="invertImg md:w-30 w-10" src="/tea.gif" alt="" /></span></div>
        <p className="text-center md:text-left">A crowdfunding platform for creators. Get funded by your fans and followers. Start now!</p>
        <div className="flex gap-4">
          <Link href="/login">
          <button type="button" className="text-white bg-linear-to-br from-purple-600 to-blue-500 hover:bg-linear-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-base text-sm md:px-4 px-2 py-2.5 text-center leading-5 rounded-lg">Start Here</button>
          </Link>
          <Link href="/about">
          <button type="button" className="text-white bg-linear-to-br from-purple-600 to-blue-500 hover:bg-linear-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-base text-sm md:px-4 px-2 py-2.5  text-center leading-5 rounded-lg">Read More</button>
          </Link>
        </div>
      </div>
      <div className="bg-white h-1 opacity-10 "></div>

      <div className="text-white container mx-auto py-10 px-8">
        <h2 className="text-2xl font-bold text-center mb-10">Your fans want to buy you a chai</h2>
        <div className="flex gap-5 justify-around">
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img className="bg-slate-400 rounded-full p-2 text-black" width={70} src="/man.gif" alt="" />
            <p className="font-bold text-center">Fans want to help</p>
            <p className="text-center">Your fans are available to help you</p>
          </div>
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img className="bg-slate-400 rounded-full p-2 text-black" width={70} src="/coin.gif" alt="" />
            <p className="font-bold text-center">Fans want to contribute</p>
            <p className="text-center">Your fans are willing to contribute financially</p>
          </div>
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img className="bg-slate-400 rounded-full p-2 text-black" width={70} src="/group.gif" alt="" />
            <p className="font-bold text-center">Fans want to collaborate</p>
            <p className="text-center">Your fans are ready to collaborate with you</p>
          </div>
        </div>
      </div>

      <div className="bg-white h-1 opacity-10"></div>

      <div className="text-white container mx-auto pb-32 pt-14 flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold text-center mb-14">Learn more about us</h2>
        <div className="w-[90%] h-[40vh] md:w-[50%] md:h-[40vh] lg:w-[50%] lg:h-[40vh] xl:w-[50%] xl:h-[40vh]">
          <iframe className="border-0 w-full h-fit" src="https://www.youtube.com/embed/ojuUnfqnUI0?si=wMUv4DG3ia6Wt4zn" title="YouTube video player"allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>

        </div>


      </div>

    </>
  );
}
