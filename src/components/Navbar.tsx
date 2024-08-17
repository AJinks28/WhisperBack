'use client'
//'use client' is used to indicate that a specific file or component should be treated as a client-side component rather than a server-side component. 
//Client-Side Components: React hooks,Event Handlers,Browser-Specific APIs(e.g. localStorage)
//Server-Side Components: Components that do not need to run on the client, such as those that only render static content, fetch data at build time, or rely on server-side logic
//'use client' not used in Pages and Layouts That Don’t Require Client-Side Interaction


//*we will add <Navbar/> in Layout at top

import React from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Button } from './ui/button';
import { User } from 'next-auth';

//useSession is used to retrieve data from session

function Navbar() {
  const { data: session } = useSession();
  console.log("session Data in navbar: ", session);
  //retrieving user from session
  const user: User = session?.user;

  return (
    <nav className="p-4 md:p-6 shadow-md bg-gray-900 text-white">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <a href="#" className="text-xl font-bold mb-4 md:mb-0">
          WhisperBack
        </a>
        {session ? (
          <>
            <span className="mr-4">
              Welcome, {user.username || user.email}
            </span>
            {/* signOut comes from nextAuth */}
            <Button onClick={() => signOut()} className="w-full md:w-auto bg-slate-100 text-black" variant='outline'>
              Logout
            </Button>
          </>
        ) : (
          <Link href="/sign-in">
            <Button className="w-full md:w-auto bg-slate-100 text-black" variant={'outline'}>Login</Button>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
