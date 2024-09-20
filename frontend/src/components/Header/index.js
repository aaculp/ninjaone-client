// Libraries

import Image from "next/image";
import React from "react";
import styled from "styled-components";

// Dependencies

import Logo from "../../assets/NinjaOneLogo.svg";

// Component

const StyledContainer = styled.div`
  background: #002a42;
  border-bottom: 1px;
  display: flex;
  padding: 12px 0;

  > img {
    margin-left: 24px;
  }
`;

export default function Header() {
  return (
    <StyledContainer>
      <Image
        src={Logo}
        width={120}
        height={'auto'}
        alt="Picture of the author"
        priority
      />
    </StyledContainer>
  );
}
