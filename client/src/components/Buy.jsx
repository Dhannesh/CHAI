import React from 'react'
import { ethers } from 'ethers'

const Buy = ({state}) => {
    const buyChai = async (event)=>{
        event.preventDefault()
        const {contract, signer} = state;
        const name = document.querySelector('#name').value;
        const message = document.querySelector('#message').value;
        console.log(name,message,contract);
        const amount = {value: ethers.parseEther("0.001")}
        const transaction = await contract.buyChai(name,message,amount)
        await transaction.wait();
        console.log('Transaction is done');
    }
  return (
    <>
    <form onSubmit={buyChai}>
        <label htmlFor="name">Name</label>
        <input type="text" name="" id="name" placeholder='Enter your name' />

        <label htmlFor="message">Message</label>
        <input type="text" name="" id="message" placeholder='Enter your Message' />
        <button type='submit'>Pay</button>

    </form>
    </>
  )
}

export default Buy