import { School } from "lucide-react"
import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import ThemeToggle from "./ThemeToggle"

const Navbar = () => {
  const { user } = useSelector((store) => store.auth)
  const navigate = useNavigate()
  return (
    <div className="fixed top-0 right-0 left-0 z-10 h-16 border-b border-b-gray-200 bg-white duration-300 dark:border-b-gray-800 dark:bg-[#020817]">
      {/* Desktop */}
      <div className="mx-auto hidden h-full max-w-7xl items-center justify-between gap-10 md:flex">
        <div className="flex items-center gap-2">
          <School size={"30"} />
          <Link to="/">
            <h1 className="hidden text-2xl font-extrabold md:block">
              E-Learning
            </h1>
          </Link>
        </div>

        {/* user icon and dark mode icons */}
        <div className="flex items-center gap-8">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage
                    src={user?.photoUrl || "https://github.com/shadcn.png"}
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className={"w-56"}>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Link to="my-learning">My learning</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    {" "}
                    <Link to="profile">Edit Profile</Link>{" "}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => {}}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                {user?.role === "instructor" && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link to="/admin/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button onClick={() => navigate("/login")}>Login</Button>
              <Button onClick={() => navigate("/login")}>Signup</Button>
            </div>
          )}
          <ThemeToggle />
        </div>
      </div>
    </div>
  )
}

export default Navbar
