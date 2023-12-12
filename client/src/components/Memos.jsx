import React from 'react'
import { useState, useEffect } from 'react'

const Memos = ({state}) => {
    const [memos,setMemos] = useState([]);
    const {contract} = state;
    useEffect(()=>{
        const memosMessage =  async()=>{
            const memos = await contract.getMemos();
            setMemos(memos);
        }
        contract && memosMessage();
    },[contract])
  return (
    <>
    <p>Messages</p>
    <table border='1'>
<tbody>
    
    {
        memos.map((memo)=>{
            const {name,message,timestamp,from} = memo;
            return  <tr key={timestamp}>
                        <td>{name}</td>
                        <td>{message}</td>
                        <td>{timestamp}</td>
                        <td>{from}</td>
                    </tr>
              
            
        })
    }
    </tbody>
    </table>
    
    
    </>
  )
}

export default Memos