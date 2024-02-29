import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signin } from "./action";

export default function Signin() {
  return (
    <div className="grid min-h-lvh w-full place-items-center">
      <form className="min-w-96 rounded-lg bg-gray-200 p-6" action={signin}>
        <Input
          name="phone_number"
          className="rounded-none rounded-t-md border-black"
          placeholder="Phone number"
        />
        <Input
          name="password"
          type="password"
          className="rounded-none border-black"
          placeholder="Password"
        />
        <Button className="w-full rounded-none rounded-b-md">Sign me in</Button>
      </form>
    </div>
  );
}
