import { useWeb3 } from "../provider";
import { ethers } from "ethers";
const { useContext, useState, useEffect } = require("react");
import cryptokids from "../artifacts/contracts/Parentbank.sol/cryptokids.json";
const defaultdat = {
  childaddress: "",
  fname: "",
  amount: "",
  lname: "",
  lperiod: "",
};
const defaultprofile = {
  ffname: "",
  llname: "",
  aamount: "",
  llperiod: "",
};
export default function Home() {
  const { connect, provider, contractread, contractwrite, loaded,address, admin } = useWeb3();

  const [form, setFormdata] = useState(defaultdat)
  const [profile,setProfile]=useState(defaultprofile)

  //console.log(admin)
  // const [fname, setfname] = useState("");
  // const [lname, setlname] = useState("");
  // const [lperiod, setlperiod] = useState("");
  // const [caddress, setcaddress] = useState("");
  const [owner, setowner] = useState("");
  const [Widthrawamt, setWidthrawamt] = useState("");
  const flag = false;

  const [amount, setAmount] = useState("");
  const [balanceamt, setbalanceamt] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata({
      ...form,
      [name]: value,
    });
  };
  useEffect(()=>{
    // const getprofile = async () => {
    //   console.log(contractwrite);
    //   //debugger
      
    //   let profiles = await contractwrite.getProfile();
  
    //   setProfile({
    //     ffname : profiles.fname,
    //     llname : profiles.lname,
    //     aamount : ethers.utils.formatEther(profiles.amount),
    //     llperiod : profiles.timestamp,
  
    //   })
    //   //console.log(profiles.lperiod);
      
    // };
    // if(address)
    // {
    //   getprofile()
    // }
    
  },[contractwrite,address])
  const resetForm = () => setFormdata(defaultdat);
  // const lnameChange = (event) => {
  //   setlname(event.target.value);
  // };
  // const lperiodChange = (event) => {
  //   setlperiod(event.target.value);
  // };
  // const caddressChange = (event) => {
  //   setcaddress(event.target.value);
  // };

  const WidthrawamtChange = (event) => {
    setWidthrawamt(event.target.value);
  };

  const changeAmount = (event) => {
    setAmount(event.target.value);
  };

  const depositAmount = async () => {
    debugger;
    if (contractwrite !== undefined && contractwrite !== null) {
      const transaction = await contractwrite.deposit(
        form.childaddress,
        form.fname,
        form.lname,
        form.lperiod,
        { value: ethers.utils.parseEther(form.amount) }
      );
      await transaction.wait();
      setFormdata(defaultdat);
    }
  };

  const Widthraw = async () => {
    debugger;
    const transaction = await contractwrite.widthraw(ethers.utils.parseEther(Widthrawamt));
    await transaction.wait();
    getprofile();
  };

  const getBalance = async () => {
    console.log(contractwrite);
    
    const mybalance = await contractwrite.balance();
    const value = ethers.utils.formatEther(mybalance);
    //console.log(`my balance ${ethers.utils.formatEther(mybalance)}`)
    //const mybalanceconv = ethers.utils.formatEther(value);
    //const balance = await contractread.getOwner();
    setbalanceamt(value);
    //console.log(value);
  };
  
  const getOwner = async () => {
    console.log(contractwrite);
    debugger;
    const cowner = await contractread.getOwner();
    setowner(cowner);
  };

  return (
    <div>
      {loaded && (
        <div className="container contact">
          <div className="row">
            <div className="col-md-6">
              <div className="contact-form">
                <div className="form-group">
                  <label className="control-label col-sm-4" >
                    Child Address:
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      value={form.childaddress}
                      onChange={handleChange}
                      className="form-control"
                      id="caddress"
                      placeholder="Address"
                      name="childaddress"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label col-sm-2" >
                    Amount Min 0.025:
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      value={form.amount}
                      onChange={handleChange}
                      className="form-control"
                      id="amount"
                      placeholder="Amount"
                      name="amount"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label col-sm-2" >
                    First Name:
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      value={form.fname}
                      onChange={handleChange}
                      className="form-control"
                      id="fname"
                      placeholder="First Name"
                      name="fname"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label col-sm-2" >
                    Last Name:
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      value={form.lname}
                      onChange={handleChange}
                      className="form-control"
                      id="lname"
                      placeholder="Last Name"
                      name="lname"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label col-sm-4" >
                    Locking period:
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      value={form.lperiod}
                      onChange={handleChange}
                      className="form-control"
                      id="lp"
                      placeholder="Locking period"
                      name="lperiod"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <div className="col-sm-offset-2 col-sm-10">
                    <button onClick={depositAmount} className="btn btn-default">
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Balance</th>
                    <th scope="col">Locking Period</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    
                    <td>{profile.ffname}</td>
                    <td>{profile.llname}</td>
                    <td>{profile.aamount}</td>
                    <td>{profile.lperiod}</td>
                  </tr>
                  
                </tbody>
              </table>
              <div className="contact-form">
                <div>{balanceamt}</div>
                <div className="form-group">
                  <div className="col-sm-offset-2 col-sm-10">
                    <button onClick={getBalance} className="btn btn-default">
                      Check My Balance
                    </button>
                  </div>
                </div>
              </div>

              <div className="contact-form">
                <div>{owner}</div>
                <div className="form-group">
                  <div className="col-sm-offset-2 col-sm-10">
                    <button onClick={getOwner} className="btn btn-default">
                      Owner
                    </button>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="control-label col-sm-4" >
                  Widthraw:
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    onChange={WidthrawamtChange}
                    className="form-control"
                    id="lp"
                    placeholder="Amount"
                    name="lp"
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="col-sm-offset-2 col-sm-10">
                  <button onClick={Widthraw} className="btn btn-default">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
