import { useEffect, useState } from "react";
import Layout from "./Layout";
import toast from "react-hot-toast";
import { databases } from "../Lib/appwrite";
import { ID } from "appwrite";
import loader from "../assets/rolling-loader.svg";
import { Link } from "react-router-dom";

const Wishes = () => {
  const [wishes, setWishes] = useState([]);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name) toast.error("Name is required!");
    else if (!form.message) toast.error("Write your wishes");
    else {
      addWishes(form.name, form.message);
    }
  };

  const addWishes = async (name, message) => {
    setLoading(true);
    try {
      const promise = databases.createDocument(
        "birthdaydb",
        "wishes",
        ID.unique(),
        {
          name: name,
          message: message,
        }
      );

        console.log(promise);
      toast.success("Wishes Sent!");
        toggleForm();
        
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
        setLoading(false);
        setForm({
            name: "",
                message: "",
        })
    }
  };

  const toggleForm = () => {
    setShow((prev) => !prev);
  };

 

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

  return (
    <>
      <Layout>
              <div>
                  <Link to="/" className="h-10 w-10 flex-center border bg-secondary rounded-lg mb-6 text-sub">
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

              <button type="submit" className="bg-orange-500 h-10 rounded text-sm text-white font-semibold">
                {loading ? <div className="flex-center"><img width={30} src={loader} /></div> : "Send"}
              </button>
            </form>
          )}

          {!show && (
            <div className="my-6">
              {wishes.length === 0 && <p className="text-sub text-sm text-center">Sorry, no wishes yet! 😥</p>}
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {wishes.map((x, y) => (
                  <li
                    key={y}
                    className="shadow-lg border shadow-orange-100 p-4 rounded-lg"
                  >
                    <div className="flex items-center gap-4 mb-2">
                      <div className="h-10 w-10 flex-center bg-secondary rounded-full text-sub">
                        {x.name.charAt(0, 1)}
                      </div>
                      <span>{x.name}</span>
                    </div>
                    <div className="text-sm font-sans text-sub opacity-80">
                      {x.message}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Layout>
    </>
  );
};

export default Wishes;
