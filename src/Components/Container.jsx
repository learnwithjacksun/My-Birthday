import { Link } from "react-router-dom";


const Container = () => {
  return (
    <>
      <div className="border-t py-10">
              <div className="text-center">
                  <h1 className=" font-semibold text-xl">Any Offers?🎁</h1>
                  <p className="text-sm font-sans text-sub">Please select the type of gift you would love to offer...</p>
              </div>
        <div className="mt-6 flex items-center flex-col md:flex-row gap-2 md:gap-4">
          <Link to="/wishes" className="flex-1 border p-4 rounded-lg shadow-lg shadow-orange-100 w-full">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 flex-center bg-orange-400 rounded">
                <span className="material-symbols-outlined text-white">
                  mark_as_unread
                </span>
              </div>

              <span>Well wishes</span>
            </div>
                  </Link>
                  
                  <p className="text-sm text-sub font-medium">- Or -</p>

          <Link to="/cash" className="flex-1 border p-4 rounded-lg shadow-lg shadow-green-100 w-full">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 flex-center bg-green-400 rounded">
                <span className="material-symbols-outlined text-white">
                currency_exchange
                </span>
              </div>

              <span>Cash Gifts</span>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Container;
