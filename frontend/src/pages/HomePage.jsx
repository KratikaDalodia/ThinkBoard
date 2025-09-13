import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import RateLimitUi from '../components/RateLimitUi';
import NoteCard from '../components/NoteCard';
import toast from 'react-hot-toast'
import api from '../libs/axios.js';
import NotesNotFound from '../components/NotesNotFound.jsx';

const HomePage = () => {
  const [isRateLimited, setRateLimited] = useState(false);
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    const fetchNotes = async ()=>{ 
      try {
        const res = await api.get("/notes")
        console.log(res.data)
        setNotes(res.data)
        setRateLimited(false)
      } catch (error) {
        console.log("error fetching notes")
        if(error.response.status === 429) {
          setRateLimited(true)
        }
        else{
          toast.error("Failed to fetch notes")
        }
      }
      finally{
        setLoading(false)
      }
    }

    fetchNotes();
  },[])
  return (
    <div className='min-h-screen'>
      <Navbar/>
      {isRateLimited && <RateLimitUi/>}
      {notes.length === 0 && !isRateLimited && !loading && <NotesNotFound/>}
      <div className='max-w-7xl mx-20 p-4 mt-6'>
        {loading && <div className='text-center text-primary py-10'>Loading notes...</div>}

        {notes.length > 0 && !isRateLimited && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {notes.map(note => (
              <NoteCard key={note._id} note={note} setNotes={setNotes}/>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
 
export default HomePage
