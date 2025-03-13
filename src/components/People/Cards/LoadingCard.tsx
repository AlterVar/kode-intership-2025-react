import styled from "styled-components";

import type { loadingStatusType } from "../../../app/features/loadingSlice";
import { JSX } from "react";
import { useAppSelector } from "../../../app/hooks";

const LoadingCard = styled.li`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 16px;
  padding: 6px 0;

  .image-container {
    width: 72px;
    height: 72px;
    border-radius: 50%;
    background: linear-gradient(90deg, #f3f3f6 0%, #fafafa 100%);
  }

  .content {
    h3 {
      background: linear-gradient(90deg, #f3f3f6 0%, #fafafa 100%);
      border-radius: 50px;
      width: 144px;
      height: 16px;

      margin-bottom: 6px;
    }

    p {
      background: linear-gradient(90deg, #f3f3f6 0%, #fafafa 100%);
      border-radius: 50px;
      width: 80px;
      height: 12px;
    }
  }
`;

const Card = (): JSX.Element => {
  const loadingStatus: loadingStatusType = useAppSelector(
    (state) => state.loading
  );

  return (
    <>
      {loadingStatus.value === "loading" && (
        <LoadingCard>
          <div className="image-container"></div>
          <div className="content">
            <h3></h3>
            <p></p>
          </div>
        </LoadingCard>
      )}
    </>
  );
};

export default Card;
