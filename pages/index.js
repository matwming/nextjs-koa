import Link from "next/link";
import Router from "next/router";
import { useDispatch, useSelector } from "react-redux";

export default () => {
  const count = useSelector(state => state.count);
  const username = useSelector(state => state.username);
  const dispatch = useDispatch();
  console.log("index_store", count);
  return (
    <div>
      <button
        onClick={() => {
          Router.push({
            pathname: "/a/a",
            query: {
              id: 2
            }
          });
        }}
      >
        a
      </button>
      <p>username is : {username}</p>
      <button onClick={() => dispatch({ type: "add" })}>change state</button>
      <button
        onClick={() => dispatch({ type: "update_name", payload: "ying" })}
      >
        change name to ying
      </button>
      <Link href="/b/b">
        <button>b</button>
      </Link>
    </div>
  );
};
