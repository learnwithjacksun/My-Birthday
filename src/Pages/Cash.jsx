import Layout from "./Layout";
import opay from "../assets/opay.png";
import loader from "../assets/rolling-loader.svg";
import CopyInput from "../Components/CopyInput";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import Modal from "../Components/Modal";
import { Link } from "react-router-dom";

const FORMSPARK_ACTION_URL = "https://submit-form.com/P2W0xUuGj";

const Cash = () => {
  const [modal, setModal] = useState(false);
  const [payment, setPayment] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    number: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name) toast.error("Please your name is required!");
    else {
      setLoading(true);
      try {
        const res = axios.post(FORMSPARK_ACTION_URL, {
          name: form.name,
          number: form.number,
        });
        console.log(res);
        toast.success("Submitted!");
        setPayment(true);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    };
    
    const toggleModal = () => {
        setModal(prev => !prev)
    }

  return (
    <>
      <Layout>
              <div>
              <Link to="/" className="h-10 w-10 flex-center border bg-secondary rounded-lg mb-6 text-sub">
                      <span className="material-symbols-outlined">arrow_back</span>
                  </Link>
          <div>
            <h1 className="font-semibold text-xl text-green-500">
              Cash Gifts 🎁
            </h1>
            <h1 className="text-sm text-sub">Thank you for your kind heart!</h1>
          </div>

          {!payment && (
            <form
              onSubmit={handleSubmit}
              className="border shadow-lg shadow-green-100 my-6 p-4 rounded-lg flex gap-4 flex-col"
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
                  className="border h-10 font-light focus-within:border-green-500 text-sm px-4 rounded"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="number" className="text-sm font-medium">
                  WhatsApp Number (Optional):
                </label>
                <input
                  type="text"
                  name="number"
                  id="number"
                  value={form.number}
                  onChange={handleChange}
                  autoComplete="off"
                  placeholder="Please enter your phone number..."
                  className="border font-light h-10 focus-within:border-green-500 text-sm px-4 rounded"
                />
              </div>
              {/* <div className="flex flex-col gap-1">
                          <label htmlFor="name" className="text-sm font-medium">Amount of Gift (&#8358;):</label>
                          <input type="text" name="amount" id="amount" placeholder="This is just for my calculation" className="border font-light h-10 focus-within:border-green-500 text-sm px-4 rounded" />
                      </div> */}

              <button
                type="submit"
                className="bg-green-500 h-10 rounded text-sm text-white font-semibold"
              >
                {loading ? (
                  <div className="flex-center"><img width={30} src={loader} /></div>
                ) : (
                  "Proceed to payment"
                )}
              </button>
            </form>
          )}

          {payment && (
            <div className="p-4 my-6 border shadow-md shadow-green-100 rounded-lg flex flex-col gap-4">
              <div>
                <img src={opay} width={80} alt="" />
              </div>
              <div>
                <div className="flex text-sm items-center justify-between">
                  <b>Celebrant Name:</b>
                  <span>Gift Uwem Jackson</span>
                </div>
              </div>
              <CopyInput text="8137411338" />
              <button onClick={toggleModal} className="bg-green-500 h-10 rounded text-sm text-white font-semibold">
                I have sent you something!
              </button>
            </div>
          )}
        </div>
      </Layout>

      {modal && (
        <Modal title="Thanks" toggleModal={toggleModal}>
          <div>
            <p className="mb-4 text-sm text-sub">
              I am so grateful. you&apos;ll be notified when I receive it!
            </p>
            <Link to="/" className="bg-green-500 text-white py-2 px-6 rounded text-sm font-semibold">
              You&apos;re Welcome!
            </Link>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Cash;
