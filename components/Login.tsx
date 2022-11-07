import axios from "axios";
import { useState } from "react";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export const Login = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<User>();

  const handleClick = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setLoading(true)
    try {
      const { data } = await axios.get<User>(
        "https://jsonplaceholder.typicode.com/users/1"
      );

      setUser(data);
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
      setError(true);
    }
    setLoading(false)
  };

  return (
    <div>
      <span>{user?.name}</span>
      <form>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button disabled={!username || !password} onClick={handleClick}>
          {loading ? "please wait" : "Login"}
        </button>
        <span
          data-testid="error"
          style={{ display: error ? "inline" : "none" }}
        >
          Something went wornd
        </span>
      </form>
    </div>
  );
};
