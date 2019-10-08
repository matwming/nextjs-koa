import { withRouter } from "next/router";
import styled from "styled-components";

const Title = styled.h1`
  color: yellow;
  font-size: 40px;
`;
const a = ({ router, name, time }) => {
  return (
    <>
      <Title>this is title</Title>
      <p>
        this is page a,{router.query.id} {name}
        time:{time}
      </p>
      <style jsx>{`
        p {
          color: blue;
        }
      `}</style>
    </>
  );
};

a.getInitialProps = async ctx => {
  const moment = await import("moment");
  const promise = new Promise(resolve => {
    setTimeout(() => {
      resolve({
        name: "ming",
        time: moment.default(Date.now() - 60 * 1000).fromNow()
      });
    }, 1000);
  });
  return await promise;
};
export default withRouter(a);
