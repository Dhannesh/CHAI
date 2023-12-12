import React from 'react'
import { useState,useEffect } from 'react'
import { ethers } from 'ethers'
import api from './contract/chai.json'
import Buy from './components/Buy'
import Memos from './components/Memos'
const App = () => {
  const [state, setState] = useState({
    provider:null,
    signer:null,
    contract:null
  })
  const [account,setAccount] = useState('None')
  useEffect(()=>{
    const connectWallet = async ()=>{
      const contractAddress = '0xd6525ff942a1a3238f67438112feb00337220e49';
      const contractAbi = api.abi;
      try {
        const {ethereum} = window;
        if(ethereum){
          const account = await ethereum.request({method:'eth_requestAccounts'})
        
          window.ethereum.on('chainChanged',()=>{
            window.location.reload();
          })

          window.ethereum.on('accountsChanged',()=>{
            window.location.reload();
          })
        // new ethers.BrowserProvider(window.ethereum)
        const provider = new ethers.BrowserProvider(ethereum)
        const signer  = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress,contractAbi,signer)
        setAccount(account)
        setState({provider,signer,contract})
        }else{
          alert('Please install metamask')
        }

      } catch (error) {
        console.log(error);
      }

    }
    connectWallet();
  },[])
  // console.log(state);
  return (
    <div>
      <p>Connected Account - {account}</p>
      <Buy state={state}/>
      <Memos state={state}/>
    </div>
  )
}

export default App