import { useEffect, useState } from "react";
import Layout from "./Layout";
import toast from "react-hot-toast";
import { databases } from "../Lib/appwrite";
import { ID } from "appwrite";
import loader from "../assets/rolling-loader.svg";
import { Link } from "react-router-dom";
import Modal from "../Components/Modal";

const Wishes = () => {
  const [wishes, setWishes] = useState([]);
  const [show, setShow] = useState(false); // Form visibility toggle
  const [loading, setLoading] = useState(false); // Loading state
  const [modal, setModal] = useState(false); // Modal visibility toggle
  const [wishId, setWishId] = useState(null); // Track the wish being edited
  const [form, setForm] = useState({
    name: "",
    message: "",
  });

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name) toast.error("Name is required!");
    else if (!form.message) toast.error("Write your wishes");
    else {
      // If editing a wish, call updateWish, otherwise add a new wish
      if (wishId) {
        editWish(wishId);
      } else {
        addWishes(form.name, form.message);
      }
    }
  };

  // Add a new wish
  const addWishes = async (name, message) => {
    setLoading(true);
    try {
      const promise = await databases.createDocument(
        "birthdaydb",
        "wishes",
        ID.unique(),
        {
          name,
          message,
        }
      );
      console.log(promise);
      toast.success("Wishes Sent!");
      toggleForm();
      setWishId(null);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
      setForm({ name: "", message: "" });
    }
  };

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

  // Open the form to edit a wish
  const editMessage = (wish) => {
    setForm({ name: wish.name, message: wish.message });
    setWishId(wish.$id); // Track the wish ID for editing
    setModal(true);
  };

  // Update the wish
  const editWish = async (id) => {
    setLoading(true);
    try {
      await databases.updateDocument("birthdaydb", "wishes", id, {
        name: form.name,
        message: form.message,
      });
      toast.success("Wish Edited!");
      setModal(false);
      setWishId(null);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
      setForm({ name: "", message: "" });
    }
  };

  // Toggle visibility for the "send wishes" form
  const toggleForm = () => {
    setShow((prev) => !prev);
  };

  return (
    <>
      <Layout>
        <div>
          <Link
            to="/"
            className="h-10 w-10 flex-center border bg-secondary rounded-lg mb-6 text-sub"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <div>
            <h1 className="font-semibold text-xl text-orange-400">
              Well Wishes 🎁
            </h1>
            <h1 className="text-sm text-sub">Thank you for your kind heart!</h1>
          </div>

          <button
            onClick={toggleForm}
            className="flex-center mt-6 text-sm font-semibold bg-orange-500 text-white h-10 px-6 rounded hover:brightness-90"
          >
            <span className="material-symbols-outlined">add</span>
            <span>{show ? "Close Form" : "Send Wishes"}</span>
          </button>

          {/* Add Wish Form */}
          {show && (
            <form
              onSubmit={handleSubmit}
              className="border shadow-lg shadow-orange-100 my-6 p-4 rounded-lg flex gap-4 flex-col"
            >
              <div className="flex gap-1 flex-col">
                <label htmlFor="name" className="text-sm font-medium">
                  I&apos;d love to know you:
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={form.name}
                  onChange={handleChange}
                  autoComplete="off"
                  placeholder="Please enter your name..."
                  className="border h-10 capitalize font-light focus-within:border-orange-500 text-sm px-4 rounded"
                />
              </div>

              <div className="flex gap-1 flex-col">
                <label htmlFor="message" className="text-sm font-medium">
                  Your message:
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Please enter your message here..."
                  className="border font-light focus-within:border-orange-500 text-sm px-4 py-2 rounded"
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-orange-500 h-10 rounded text-sm text-white font-semibold"
              >
                {loading ? (
                  <div className="flex-center">
                    <img width={30} src={loader} />
                  </div>
                ) : wishId ? (
                  "Update"
                ) : (
                  "Send"
                )}
              </button>
            </form>
          )}

          {/* List of Wishes */}
          {!show && (
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
                    className="shadow-lg relative border shadow-orange-100 p-4 rounded-lg flex flex-col gap-2"
                  >
                    <div
                      onClick={() => editMessage(wish)}
                      className="h-10 w-10 text-sm absolute right-2 border rounded top-2 flex-center bg-secondary"
                    >
                      <span className="material-symbols-outlined text-xl">
                        edit_square
                      </span>
                    </div>
                    <div className="flex items-center gap-4 mb-2">
                      <div className="h-10 w-10 flex-center bg-secondary rounded-full text-sub">
                        {wish.name.charAt(0)}
                      </div>
                      <span>{wish.name}</span>
                    </div>
                    <div className="text-sm font-sans text-sub">
                      {wish.message}
                    </div>

                    {wish.reply && (
                      <div className="bg-secondary ms-0 mt-auto font-sans text-sm text-sub border rounded overflow-hidden">
                        <span className="font-semibold text-[12px] text-orange-500 bg-white p-1 border rounded-r-lg px-2 shadow">
                          Reply 👋
                        </span>
                        <p className="text-sub p-2 text-sm font-sans">
                          {wish.reply}
                        </p>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Layout>

      {/* Modal for Editing Wish */}
      {modal && (
        <Modal title="Update Wish" toggleModal={() => setModal(false)}>
          <form
            onSubmit={handleSubmit}
            className="rounded-lg flex gap-4 flex-col"
          >
            <div className="flex gap-1 flex-col">
              <label htmlFor="name" className="text-sm font-medium">
                Name:
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={form.name}
                onChange={handleChange}
                autoComplete="off"
                placeholder="Please enter your name..."
                className="border h-10 capitalize font-light focus-within:border-orange-500 text-sm px-4 rounded"
              />
            </div>

            <div className="flex gap-1 flex-col">
              <label htmlFor="message" className="text-sm font-medium">
                Message:
              </label>
              <textarea
                name="message"
                id="message"
                rows={5}
                value={form.message}
                onChange={handleChange}
                placeholder="Please enter your message here..."
                className="border font-light focus-within:border-orange-500 text-sm px-4 py-2 rounded"
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-orange-500 h-10 rounded text-sm text-white font-semibold"
            >
              {loading ? (
                <div className="flex-center">
                  <img width={30} src={loader} />
                </div>
              ) : (
                "Update"
              )}
            </button>
          </form>
        </Modal>
      )}
    </>
  );
};

export default Wishes;
