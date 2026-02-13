import { Button } from "@/components/ui/button";
import userImg from './../../../assets/userImg.jpg'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import Image from "next/image";




export function DropdownMenuBasic({ Logout}:{Logout:any}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger >
        <Image alt="user" src={userImg} width={35} height={35} className="rounded-full cursor-pointer"/> 
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href="/profile">Profile</Link>
          </DropdownMenuItem>
           <DropdownMenuItem>
            <Link href="/allorders">My orders</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>

            <span className="cursor-pointer text-green-700" onClick={Logout}>
              Logout
            </span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
