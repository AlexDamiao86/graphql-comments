import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import "./App.css";

import Comment from "./components/Comment";
import Form from "./components/Form";

const GET_COMMENTS = gql`
  query {
    getComments {
      id
      name
      content
    }
  }
`;

const SAVE_COMMENT = gql`
  mutation SaveComment($name: String!, $content: String!) {
    saveComment(input: { name: $name, content: $content }) {
      id
      name
      content
    }
  }
`;

export default function App() {
  const { loading, error, data } = useQuery(GET_COMMENTS);
  const [saveComment, commentSaved] = useMutation(SAVE_COMMENT);

  const [comments, setComments] = useState([]);

  useEffect(() => {
    data && 
    data.getComments && 
    setComments(data.getComments);
  }, [data]);

  useEffect(() => {
    commentSaved &&
    commentSaved.data && 
    commentSaved.data.saveComment &&
    setComments([...comments, commentSaved.data.saveComment]);
  // eslint-disable-next-line
  }, [ commentSaved ]);

  if (error) return "Oops.. aconteceu algum erro...";

  function handleSubmit(values) {
    saveComment({ variables: values });
  }

  return (
    <>
      <h1>RocketComments</h1>
      <Form onSubmit={handleSubmit} />
      {loading ? (
        "Carregando..."
      ) : (
        <section className="comments">
          {comments.map(({ id, name, content }) => (
            <Comment key={id} name={name} description={content} />
          ))}
        </section>
      )}
    </>
  );
}
