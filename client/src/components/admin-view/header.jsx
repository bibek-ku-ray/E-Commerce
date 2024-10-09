import React from 'react'
import { Button } from '../ui/button'
import { AlignCenter, LogOut } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { loginUser } from '@/store/auth-slice'

const AdminHeader = ({setOpen}) => {
  const dispatch = useDispatch()

  function handleLogout(){
    dispatch(loginUser())
  }
  return (
      <header className="flex items-center justify-between px-4 py-3 border-b bg-background">
          <Button 
            onClick={() => setOpen(true)} 
            className="lg:hidden sm:block"
          >
              <AlignCenter />
              <span className="sr-only">Toggle Menu</span>
          </Button>
          <div className="flex justify-end flex-1">
              <Button
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md shadow"
                  onClick={handleLogout}
              >
                  <LogOut />
                  Logout
              </Button>
          </div>
      </header>
  );
}

export default AdminHeader