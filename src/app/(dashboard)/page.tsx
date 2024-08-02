import HomeScreen from "@/screen/Home/HomeScreen";
import { getUsers } from "../../actions/get-users";

export default async function Home() {
  const { users } = await getUsers()

  return (
    <div>
      <HomeScreen users={users} />
    </div>
  );
}
