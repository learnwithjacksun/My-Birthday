import { useEffect, useState } from "react";
import Layout from "./Layout";
import { databases } from "../Lib/appwrite";
import toast from "react-hot-toast";
import loader from "../assets/rolling-loader.svg";

const Admin = () => {
  const [wishes, setWishes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [replies, setReplies] = useState({}); // Store replies for each wish

  // Fetch all wishes on page load
  useEffect(() => {
    const getWishes = async () => {
      try {
        const res = await databases.listDocuments("birthdaydb", "wishes");
        console.log(res);
        setWishes(res.documents.reverse());
      } catch (error) {
        console.log(error);
      }
    };
    getWishes();
  }, [wishes]);

  // Handle reply change for each wish
  const handleReplyChange = (e, id) => {
    const { value } = e.target;
    setReplies((prevReplies) => ({
      ...prevReplies,
      [id]: value, // Update reply specific to this wish
    }));
  };

  // Add reply for a specific wish
  const addReply = async (id) => {
    if (!replies[id]) {
      toast.error("Add reply first!");
      return;
    }

    setLoading(true);
    try {
      await databases.updateDocument("birthdaydb", "wishes", id, {
        reply: replies[id],
      });
      setReplies((prevReplies) => ({
        ...prevReplies,
        [id]: "", // Clear reply for the wish after successful update
      }));
      toast.success("Reply Sent!");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Layout>
        <div>
          <div>
            <h1 className="text-primary text-4xl font-protest">Admin</h1>
            <p>I see and control shits here! 😐</p>
          </div>

          <div className="my-6">
            <div className="border p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 flex-center bg-primary rounded">
                  <span className="material-symbols-outlined text-white">person</span>
                </div>
                <span>Participants</span>
              </div>

              <div className="h-12 w-12 flex-center border text-2xl font-semibold rounded bg-secondary">
                {wishes.length}
              </div>
            </div>
          </div>

          <div>
            <h3 className="">Reply wishes 👇</h3>
            <div className="my-6">
              {wishes.length === 0 && (
                <p className="text-sub text-sm text-center">
                  Sorry, no wishes yet! 😥
                </p>
              )}
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {wishes.map((wish) => (
                  <li
                    key={wish.$id}
                    className="shadow-lg relative border p-4 rounded-lg flex flex-col gap-2"
                  >
                    <div className="flex items-center gap-4 mb-2">
                      <div className="h-10 w-10 flex-center bg-secondary rounded-full text-sub">
                        {wish.name.charAt(0)}
                      </div>
                      <span>{wish.name}</span>
                    </div>
                    <div className="text-sm font-sans text-sub">{wish.message}</div>

                    {wish.reply && (
                      <div className="bg-secondary ms-0 mt-auto font-sans text-sm text-sub border rounded overflow-hidden">
                        <span className="font-semibold text-[12px] text-primary bg-white p-1 border rounded-r-lg px-2 shadow">
                          Reply 👋
                        </span>
                        <p className="text-sub p-2 text-sm font-sans">{wish.reply}</p>
                      </div>
                    )}

                    <div className="flex flex-col gap-4 border p-4 rounded">
                      <input
                        type="text"
                        name="reply"
                        id="reply"
                        placeholder="My Reply"
                        value={replies[wish.$id] || ""} // Bind input value to the specific reply
                        onChange={(e) => handleReplyChange(e, wish.$id)} // Handle change for each wish
                        className="border h-10 bg-secondary font-light focus-within:border-primary text-sm px-4 rounded"
                      />

                      <button
                        onClick={() => addReply(wish.$id)}
                        type="submit"
                        className="flex-center text-sm font-semibold bg-primary text-white h-10 px-6 rounded hover:brightness-90"
                      >
                        {loading ? (
                          <div className="flex-center">
                            <img width={30} src={loader} alt="loading" />
                          </div>
                        ) : (
                          "Reply"
                        )}
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Admin;
