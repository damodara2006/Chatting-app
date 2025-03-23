import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
function Home() {
  const [data, setdata] = useState();
  const [profile, setprofile] = useState(false);
  const navigate = useNavigate();
  const handlefile = async () => {
    let inp = document.getElementById("in");
    let data = inp.files[0];
    let file = new FormData();
    await file.append("file", data);

    axios.defaults.withCredentials = true;
    axios
      .post("http://localhost:8080/profilepic", file, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then((res) => {
        if (typeof res.data.profile == "string") {
          toast.success("Updated", { autoClose: 2000 });
        }
        setdata(res.data);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/checks", { withCredentials: true })
      .then((res) => setdata(res.data.user));
  });

  const handlelogout = () => {
    axios.defaults.withCredentials = true;
    axios.post("http://localhost:8080/logout");
    toast.success("Logged out", { autoClose: 1500 });
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <div className="relative">
      <ToastContainer />
      {data ? (
        <center className="flex justify-evenly max-h-20 fixed border py-3.5 w-full top-0 bg-gradient-to-r from-green-400 to-green-600 ">
          <div className="w-[30%]  font-winky relative flex right-0">
            <h1 className="absolute text-center w-full">{data?.username}</h1>
          </div>

          <img
            src={data?.profile}
            className="active:scale-90 w-[40%]"
            onClick={() => setprofile(!profile)}
            style={{ borderRadius: "100%", width: "30px", height: "30px" }}
            alt=""
          />
          <button
            className="w-[10%] font-winky border  rounded-lg hover:bg-gradient-to-r from-gray-300 to-gray-500 transition-all duration-400 flex justify-center items-center "
            onClick={handlelogout}
          >
            <p className="">
              <IoIosLogOut />
            </p>
          </button>
        </center>
      ) : (
        "Please login"
      )}

      {data && profile ? (
        <center className=" items-center justify-center mt-10">
          <input type="file" id="in" className="mt-10 " />
          <div className=" w-fit  rounded-[100%] overflow-hidden h-96 flex justify-center  items-center mt-5">
            <img src={data?.profile} className=" h-96 w-96" alt="" />
          </div>

          <button
            onClick={handlefile}
            className="border px-5 py-2 mt-4 rounded-md hover:bg-gray-400 transition-all duration-75 ease-in active:scale-75 "
          >
            Submit
          </button>
        </center>
      ) : (
        ""
      )}
    </div>
  );
}

export default Home;
