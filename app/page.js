export default function Home() {
  return (
    <>
      <main className="flex flex-col items-center justify-center text-amber-50 h-[50vh]">
        <div className="p-8 shadow-md">
          <h1 className="text-3xl font-bold items-center justify-center">
            GetmeChai
          </h1>
          <p className="items-center justify-center">
            Welcome to your Next.js app.
          </p>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            type="button"
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-4 py-2.5 text-center"
          >
            Start now
          </button>

          <button
            type="button"
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-4 py-2.5 text-center"
          >
            Read more
          </button>
        </div>
      </main>

      {/* Divider line */}
      <div className="bg-white h-2 opacity-10 my-4"></div>
      
      <div className="flex justify-around items-center text-amber-50 text-center">
        {/* Pehla Card */}
        <div className="item w-64 h-40 px-6 text-center flex flex-col items-center justify-between py-6">
          <img
            className="rounded-full mx-auto"
            src="image1.png"
            alt="user"
            width={60}
          />
          <p className="font-bold">fund yourself</p>
        </div>

        {/* Beech Wala Coin Card */}
        <div className="item w-64 h-40 px-6 text-center flex flex-col items-center justify-between py-6">
          <img
            src="image2.png"
            alt="Golden coin"
            className="w-20 mx-auto animate-coin"
          />
          <p className="font-bold">fund yourself</p>
        </div>

        {/* Teesra Card */}
        <div className="item w-64 h-40 px-6 text-center flex flex-col items-center justify-between py-6">
          <img
            className="rounded-full mx-auto"
            src="image1.png"
            alt="user"
            width={60}
          />
          <p className="font-bold">fund yourself</p>
        </div>
      </div>

      <div className="bg-white h-2 opacity-10 my-4"></div>
      
      <div className="justify-center items-center flex flex-col pb-4">
        <h2 className="text-amber-50 font-bold text-3xl pb-6">Learn me about more us</h2>
        <iframe 
          width="400" 
          height="315" 
          src="https://www.youtube.com/embed/QtaorVNAwbI?si=nz55tRvOGg_CWKUn" 
          title="YouTube video player" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          referrerPolicy="strict-origin-when-cross-origin" 
          allowFullScreen
        ></iframe>
      </div>
    </>
  );
}