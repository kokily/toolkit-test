import React from 'react';
import styled from 'styled-components';

// Styles
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 32px);
  position: relative;
`;

const LoadingBox = styled.div`
  position: absolute;
  top: calc(50% - 32px);
  left: calc(50% - 32px);
  width: 64px;
  height: 64px;
  border-radius: 50%;
  perspective: 800px;
`;

const Circle = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;

  &.one {
    left: 0%;
    top: 0%;
    animation: rotate-one 1s linear infinite;
    border-bottom: 3px solid #0a74ff;
  }

  &.two {
    left: 0%;
    top: 0%;
    animation: rotate-two 1s linear infinite;
    border-bottom: 3px solid #ff8640;
  }

  &.three {
    left: 0%;
    top: 0%;
    animation: rotate-three 1s linear infinite;
    border-bottom: 3px solid #c955ff;
  }

  @keyframes rotate-one {
    0% {
      transform: rotateX(35deg) rotateY(-45deg) rotateZ(0deg);
    }
    100% {
      transform: rotateX(35deg) rotateY(-45deg) rotateZ(360deg);
    }
  }

  @keyframes rotate-two {
    0% {
      transform: rotateX(50deg) rotateY(10deg) rotateZ(0deg);
    }
    100% {
      transform: rotateX(50deg) rotateY(10deg) rotateZ(360deg);
    }
  }

  @keyframes rotate-three {
    0% {
      transform: rotateX(35deg) rotateY(55deg) rotateZ(0deg);
    }
    100% {
      transform: rotateX(35deg) rotateY(55deg) rotateZ(360deg);
    }
  }
`;

const TextBox = styled.div`
  position: absolute;
  top: calc(50% + 50px);
  left: calc(50% - 50px);
  width: 100px;
  height: 100px;
  text-align: center;
  animation: blink 0.3s ease-in-out infinite alternate;

  @keyframes blink {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

interface Props {}

const Loading: React.FC<Props> = () => {
  return (
    <Container>
      <LoadingBox>
        <Circle className="one" />
        <Circle className="two" />
        <Circle className="three" />
      </LoadingBox>

      <TextBox>로딩 중...</TextBox>
    </Container>
  );
};

export default Loading;
