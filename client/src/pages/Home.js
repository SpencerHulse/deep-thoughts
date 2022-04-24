import React from "react";
import ThoughtList from "../components/ThoughtList";
import { useQuery } from "@apollo/client";
import { QUERY_THOUGHTS } from "../utils/queries";

const Home = () => {
  // Use useQuery hook to make query request
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  // Optional chaining negates the need to check if an object exists before accessing its properties
  const thoughts = data?.thoughts || [];

  return (
    <main>
      <div className="flex-row justify-space-between">
        <div className="col-12 mb-3">
          {/* Loading becomes undefined when the query is complete,
          allowing it to move on to the next part of the if/else */}
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ThoughtList
              thoughts={thoughts}
              title="Some Feed for Thought(s)..."
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
