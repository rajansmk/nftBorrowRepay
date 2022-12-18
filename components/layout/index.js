import Web3Provider from "../../provider"
import Header from "../header"
export default function Layout({children}){
    return(
        <Web3Provider>
            <Header/>
            {children}
        </Web3Provider>
    )
}