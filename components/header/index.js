import Link from "next/link";
import { Web3Context,Web3Provider,web3Api,checkpoint,useWeb3 } from "../../provider"
export default function Header(){
    const { connect,disconnect,provider,contract,loaded,address} = useWeb3();

    return(
        <div>
            <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" href="#">
            {address ? address : "Navbar" }
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active " aria-current="page" href="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link " href="/about">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="#">
                  Pricing
                </Link>
              </li>
              <li className="nav-item">
                {!loaded ?
                <button onClick={connect} className="btn btn-primary" type="submit">Connect</button>
                :<button onClick={disconnect} className="btn btn-primary" type="submit">Logout</button>
                }
              
              
              </li>
              
              
            </ul>
          </div>
        </div>
      </nav>
        </div>
    )
    
}