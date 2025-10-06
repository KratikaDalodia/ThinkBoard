import React, { useContext } from 'react'
import { NotebookIcon } from 'lucide-react'
import { Link } from 'react-router'
import { AuthContext } from '@/context/AuthContext'

const NotesNotFound = ({username}) => {
  const {user} = useContext(AuthContext);
  console.log(username)
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center">
      <div className="bg-primary/10 rounded-full p-6">
        <NotebookIcon className="size-14 text-success" />
      </div>
      <h3 className="text-3xl font-bold">{`Hello! ${user.name}`}</h3>
      <p className="text-base-content/70">
        Ready to organize your thoughts? Create your first note to get started on your journey.
      </p>
      <Link to="/create" className="btn btn-primary">
        Create Your First Note
      </Link>
    </div>
  )
}

export default NotesNotFound
